def remove_duplicates(results):
    seen = set()
    unique_results = []

    for item in results:
        # create a tuple of fields that define uniqueness
        key = (item["name"].lower(), item["location"].lower())
        if key not in seen:
            seen.add(key)
            unique_results.append(item)

    return unique_results