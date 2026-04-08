from fastapi import APIRouter, HTTPException
from elasticsearch import Elasticsearch
from elasticsearch.exceptions import TransportError
from pydantic import BaseModel
from typing import Any, List, Dict
from sentence_transformers import SentenceTransformer
import os

from ..utility import sort_by_proximity
from ..remove_dupes import remove_duplicates
from ..long_lat_con import geocode_address

ELASTICSEARCH_URL = os.getenv("ELASTICSEARCH_URL", "http://elastic_search:9200")

es_client = Elasticsearch([ELASTICSEARCH_URL])
router = APIRouter()

embedding_model = SentenceTransformer("all-MiniLM-L6-v2")


def embed(text: str) -> list[float]:
    return embedding_model.encode(text).tolist()


class AISearchRequest(BaseModel):
    query: str
    userLocation: list[str] | None = None
    date: str | None = None
    location: list[str] | None = None


@router.post("/ai-search", response_model=List[Dict[str, Any]])
def ai_search(req: AISearchRequest):
    query_vector = embed(req.query)

    filters = []
    if req.date:
        filters.append({"term": {"date": req.date}})
    if req.location:
        filters.append({"terms": {"location": req.location}})

    body: dict = {
        "knn": {
            "field": "embedding",
            "query_vector": query_vector,
            "k": 50,
            "num_candidates": 200,
            "boost": 0.7,
            **({"filter": filters} if filters else {}),
        },
        "query": {
            "bool": {
                "should": [{"match": {"name": {"query": req.query, "boost": 0.3}}}],
                **({"filter": filters} if filters else {}),
            }
        },
        "size": 50,
    }

    try:
        resp = es_client.search(index="foods", body=body)
    except TransportError as e:
        raise HTTPException(status_code=500, detail=f"ES error: {e}")

    results = []
    for hit in resp["hits"]["hits"]:
        item = hit["_source"]
        item["score"] = hit["_score"]
        
        #don't send the vector to the frontend
        item.pop("embedding", None)  
        results.append(item)

    results.sort(key=lambda x: x["score"], reverse=True)
    results = remove_duplicates(results)

    if req.userLocation:
        lat, lon = geocode_address(req.userLocation)
        if lat and lon:
            results = sort_by_proximity(lat, lon, results)

    return results