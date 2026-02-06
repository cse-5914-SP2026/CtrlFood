from fastapi import FastAPI, HTTPException
from pydantic import ValidationError
import requests
import json
import os

from .schemas.nutrislice_api import Root, Day, MenuItem, Food
from .models.models import UserQuery
from .constants import NUTRISLICE_URLS
from .utility import make_es_search

# ES docker url should be injected to the api container's env var
ELASTICSEARCH_URL = os.getenv("ELASTICSEARCH_URL", "http://elastic_search:9200")

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.post("/query")
def read_root(user_query: UserQuery):

    return {"message": "Hello, World!"}

@app.get("/insert")
def test_insert():
    
    '''
    Prototyping function just for now with naive logic.

    For future work definetly split up the functionality and then explore ways to speed up the process
    as currently it is not very fast and I am not 100% sure what the bottle neck is.

    I think the structure makes it possible to parallelize it somehow where each restaurant to one worker
    but the below is not thread safe and I am not sure about the safety of the functions. (If doing this will need to definitely split it up)

    '''
    for i in range(len(NUTRISLICE_URLS)):

        api_url = NUTRISLICE_URLS[i]
        response = requests.get(api_url)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Failed to get data from API endpoint")

        data = response.json()

        try:
            root = Root.model_validate(data)
        except:
            raise HTTPException(status_code=500, detail="Failed to validate API endpoint response")

        food_list = []
        for day in root.days or []:
            for menu_item in day.menu_items or []:
                if menu_item.food and menu_item.food.name: # if there is no name assume it is not a food item dont include
                    food_list.append({
                        "name": menu_item.food.name,
                        "date": day.date,
                        "description": menu_item.food.description or "",
                    })

        lines = []
        for item in food_list:
            lines.append(json.dumps({"index": {"_index": "foods"}}))
            lines.append(json.dumps(item))

        bulk_data = "\n".join(lines) + "\n"

        # Send to Elasticsearch
        es_url = ELASTICSEARCH_URL + "/_bulk" # TODO bad pratice.. use a library for joining paths
        headers = {"Content-Type": "application/json"}
        
        try:
            res = requests.post(es_url, headers=headers, data=bulk_data.encode("utf-8"))
            res.raise_for_status()
        except requests.exceptions.RequestException as e:
            print(f"Request failed when inserting data into es bulk ep: {e}")
            raise HTTPException(status_code=500, detail=f"Elasticsearch error: {e}")
        
    return {"message": "success"}




