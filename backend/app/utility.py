from .models.models import UserQuery
from .constants import location_coordinates
import math


def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in km

    lat1 = math.radians(lat1)
    lon1 = math.radians(lon1)
    lat2 = math.radians(lat2)
    lon2 = math.radians(lon2)

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    )

    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c


def sort_by_proximity(user_lat, user_lon, results):

    for item in results:
        restaurant = item["location"]

        coords = location_coordinates.get(restaurant)

        if coords:
            rest_lat, rest_lon = coords
            item["distance"] = haversine_distance(
                user_lat, user_lon, rest_lat, rest_lon
            )
        else:
            item["distance"] = float("inf")

    return sorted(results, key=lambda x: (-x["score"], x["distance"]))


def make_es_search(
    user_query: str, date: str = None, lat: float = None, lon: float = None
):
    must = [{"match": {"name": {"query": user_query.query, "fuzziness": "AUTO"}}}]

    filter_clauses = []

    if user_query.date:
        filter_clauses.append({"term": {"date": user_query.date}})
    if user_query.location:
        # location is a text field with a .keyword sub-field for exact matching
        filter_clauses.append({"terms": {"location.keyword": user_query.location}})

    es_query = {"query": {"bool": {"must": must, "filter": filter_clauses}}}

    return es_query
