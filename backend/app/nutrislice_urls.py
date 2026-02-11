from datetime import date

NUTRISLICE_URLS = [
    "https://osu.api.nutrislice.com/menu/api/weeks/school/12th-avenue-bread-company/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/berry-cafe/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/cafe-carmenton/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/cfaes-cafe/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/connecting-grounds/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/courtside-cafe/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/crane-cafe/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/curl-market/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/espressoh/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/hamilton-cafe/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/juice-2/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/juice-north/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/ksa-cafe/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/marketplace/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/marketplace-c-store/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/mirror-lake-eatery/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/oxleys-to-go/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/oxleys-by-the-numbers/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/postle-cafe/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/sloopys-diner/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/terra-byte-cafe/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/the-caffeine-element/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/the-campus-grind-mcpherson/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/the-coffey-road-cafe-at-vet-med/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/union-market/menu-type/all-day/",
    "https://osu.api.nutrislice.com/menu/api/weeks/school/woodys-tavern/menu-type/all-day/",
]

def nutrislice_urls_today():
    today = date.today()

    month = today.month
    day = today.day
    year = today.year
    
    nutrislice_urls_today=[]
    
    for url in NUTRISLICE_URLS:
        nutrislice_urls_today.append(url+str(year)+"/"+str(month)+"/"+str(day)+"/")
    
    return nutrislice_urls_today
    
