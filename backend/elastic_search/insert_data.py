import requests
import json
import concurrent.futures

#api_url = "https://osu.api.nutrislice.com/menu/api/weeks/school/12th-avenue-bread-company/menu-type/all-day/2026/02/03/"
#response = requests.get(api_url)

api_urls = [
    "https://osu.api.nutrislice.com/menu/api/weeks/school/12th-avenue-bread-company/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/berry-cafe/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/cafe-carmenton/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/cfaes-cafe/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/connecting-grounds/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/courtside-cafe/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/crane-cafe/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/curl-market/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/espressoh/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/hamilton-cafe/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/juice-2/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/juice-north/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/ksa-cafe/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/marketplace/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/marketplace-c-store/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/mirror-lake-eatery/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/oxleys-to-go/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/oxleys-by-the-numbers/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/postle-cafe/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/sloopys-diner/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/terra-byte-cafe/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/the-caffeine-element/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/the-campus-grind-mcpherson/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/the-coffey-road-cafe-at-vet-med/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/union-market/menu-type/all-day/2026/02/03/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/woodys-tavern/menu-type/all-day/2026/02/03/"
]

#if response.status_code != 200:
#    print(response.status_code, response.text)
#    exit(1)

# data = response.json()

def fetch_data(url):
    try:
        response = requests.get(url)
        if response.status_code != 200:
            print(response.status_code, response.text)
            exit(1)
        data = response.json()
        return {
            "source": url,
            "status": "success",
            "data": data
        }
    except Exception as e:
        return {
            "source": url,
            "status": "error",
            "error": str(e)
        }



# 3. Fetch them in parallel
# The 'single variable' you requested is `all_results`
all_results = []

# max_workers=10 means 10 requests happen at the exact same time.
# You can increase this, but 10-20 is usually a safe sweet spot.
with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
    # This submits the tasks and returns an iterator that yields results as they finish
    future_to_url = {executor.submit(fetch_data, url): url for url in api_urls}
    
    for future in concurrent.futures.as_completed(future_to_url):
        data = future.result()
        all_results.append(data)

# 4. Process the single variable
print(f"Total results fetched: {len(all_results)}")
# Filter out failures if needed
successful_data = [item for item in all_results if item['status'] == 'success']
data = successful_data
# Flatten menu items
menu_items = []
for location in data:
    if not location.get("days"): 
        #print(location)
        continue
    else:
        for day in location.get("days"):
            date = day.get("date")
            for item in day.get("menu_items"):
                if not item["food"]:
                    food_name = "None"
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
