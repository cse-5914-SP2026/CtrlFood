from .models.models import UserQuery

def get_distance(loc1, loc2):
    # TODO: calc distance between user loc and restaurant loc 
    # and then tiebreak by distance if the score is the same
    # by passing in the distance to the es query?
    pass

def make_es_search(user_query: str, date: str = None):
    must = [
        {
            "match": {
                "name": {
                    "query": user_query.query,
                    "fuzziness": "AUTO"
                }
            }
        }
    ]
    # filter -> satisfy this but don't score it 
    filter_clauses = []
    if user_query.date:
        # term: exact match, no fuzziness
        filter_clauses.append({"term": {"date": user_query.date}})
    if user_query.location:
        # location is a text field with a .keyword sub-field for exact matching
        filter_clauses.append({"terms": {"location.keyword": user_query.location}})

    return {
        "query": {
            "bool": {
                "must": must,
                "filter": filter_clauses
            }
        }
    }