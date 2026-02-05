import requests
import json

api_url = "https://osu.api.nutrislice.com/menu/api/weeks/school/12th-avenue-bread-company/menu-type/all-day/2026/02/03/"
response = requests.get(api_url)

if response.status_code != 200:
    print(response.status_code, response.text)
    exit(1)

data = response.json()

# Flatten menu items
menu_items = []
for day in data.get("days"):
    date = day.get("date")
    for item in day.get("menu_items"):
        if not item["food"]:
            food_name=None
        else:
            food_name = item["food"].get("name")
        menu_items.append({
            "name": food_name,
            "date": date,
            "menu_type_id": data.get("menu_type_id")
        })

# Build bulk payload
bulk_data = ""
for item in menu_items:
    bulk_data += json.dumps({"index": {"_index": "foods"}}) + "\n"
    bulk_data += json.dumps(item) + "\n"

# Send to Elasticsearch
es_url = "http://localhost:9200/_bulk"
headers = {"Content-Type": "application/json"}
res = requests.post(es_url, headers=headers, data=bulk_data.encode("utf-8"))

print(res.text)
