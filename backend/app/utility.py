from datetime import datetime

def get_distance(loc1, loc2):
    # TODO: calc distance between user loc and restaurant loc 
    # and then tiebreak by distance if the score is the same
    # by passing in the distance to the es query?
    pass

def make_es_search(query: str, date: str = None):
    if date is None:
        date = datetime.now().strftime("%Y-%m-%d")
    must = [
        {
            "match": {
                "name": {
                    "query": query,
                    "fuzziness": "AUTO"
                }
            }
        }
    ]
    # filter -> satisfy this but don't score it 
    filter_clauses = []
    if date:
        # term: exact match, no fuzziness
        filter_clauses.append({"term": {"date": date}})

    return {
        "query": {
            "bool": {
                "must": must,
                "filter": filter_clauses
            }
        }
    }