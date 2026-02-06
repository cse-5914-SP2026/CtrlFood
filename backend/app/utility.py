def make_es_search(query: str):
    return(
        query = {
            "query": {
                "match": {
                    "field_name": {
                        "query": f"{query}",
                        "fuzziness": "AUTO"
                    }
                }
            }
        }
    )