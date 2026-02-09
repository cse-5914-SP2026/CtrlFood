def make_es_search(query: str):
    return(
        {
            "query": {
                "match": {
                    "name": {
                        "query": f"{query}",
                        "fuzziness": "AUTO"
                    }
                }
            }
        }
    )