from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pydantic import ValidationError
from requests.exceptions import JSONDecodeError, RequestException
from elasticsearch import Elasticsearch
from elasticsearch.exceptions import TransportError
from typing import Any, List, Dict
import requests
import json
import os
import random

from .schemas.nutrislice_api import Root, Day, MenuItem, Food
from .models.models import UserQuery
from .constants import NUTRISLICE_URLS
from .utility import make_es_search

# ES docker url should be injected to the api container's env var
ELASTICSEARCH_URL = os.getenv("ELASTICSEARCH_URL", "http://elastic_search:9200")
es_client = Elasticsearch([ELASTICSEARCH_URL])

app = FastAPI()

origins = [ # only localhost links so for development cors doesnt complain
    "http://localhost:5173", # believe vite runs on this
    "http://127.0.0.1:5173" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods = ["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Ctrl F ood!"}

@app.post("/query", response_model=List[Dict[str, Any]])
def test_query(user_query: UserQuery):
    '''
    mvp function.

    For future I think it is better to make the querying route async otherwise I think it runs sync on another thread
    which I don't know how well that will work in high loads

    '''
    q = make_es_search(user_query.query)

    try:
        resp = es_client.search(index="foods", size=200, body=q)
    except TransportError as e:
        raise HTTPException(status_code=500, detail=f"Es client error when searching: {e}")

    print(resp)

    hits = resp["hits"]["hits"]

    temp_cleaned = [ hit["_source"] for hit in hits]
    return temp_cleaned

@app.get("/insert")
def test_insert():
    '''
    mvp function just for now with naive logic.

    For future work definetly split up the functionality and then explore ways to speed up the process
    as currently it is not very fast and I am not 100% sure what the bottle neck is maybe the i/o.

    I think the structure makes it possible to parallelize it somehow where each restaurant to one worker
    but the below is not thread safe and I am not sure about the safety of the functions. (If doing this will need to modularize teh route)

    '''
    for i in range(len(NUTRISLICE_URLS)):

        api_url = NUTRISLICE_URLS[i]

        try:
            response = requests.get(api_url)
            response.raise_for_status()

            data = response.json()
            root = Root.model_validate(data)
        except ValidationError as e:
            raise HTTPException(status_code=500, detail="Failed to validate API endpoint response")
        except JSONDecodeError as e:
            raise HTTPException(status_code=500, detail="Failed to parse JSON response from API")
        except RequestException as e:
            raise HTTPException(status_code=503, detail="Failed to make request to API endpoint")

        food_list = []
        for day in root.days or []:
            for menu_item in day.menu_items or []:
                if menu_item.food and menu_item.food.name: # if there is no name assume it is not a food item dont include
                    food_list.append({
                        "name": menu_item.food.name,
                        "date": day.date,
                        "description": menu_item.food.description or "",
                        "location": NUTRISLICE_URLS[i].split("/")[7],
                        "coordinates": {
                            "lat": round(random.uniform(-90, 90), 6),
                            "lng": round(random.uniform(-180, 180), 6),
                        },
                    })

        lines = []
        for item in food_list:
            lines.append(json.dumps({"index": {"_index": "foods"}}))
            lines.append(json.dumps(item))
        bulk_data = "\n".join(lines) + "\n"

        # Send to Elasticsearch
        es_url = ELASTICSEARCH_URL + "/_bulk" # TODO change later to use es library
        headers = {"Content-Type": "application/json"}
        
        try:
            res = requests.post(es_url, headers=headers, data=bulk_data.encode("utf-8"))
            res.raise_for_status()
        except requests.exceptions.RequestException as e:
            print(f"Request failed when inserting data into es bulk ep: {e}")
            raise HTTPException(status_code=500, detail=f"Elasticsearch error: {e}")
        
    return {"message": "success"}




