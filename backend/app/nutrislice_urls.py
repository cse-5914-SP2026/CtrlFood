from datetime import date, timedelta

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


def nutrislice_urls_this_and_next_week() -> list[str]:

    today = date.today()

    # monday of current week
    this_monday = today - timedelta(days=today.weekday())
    # monday of next week
    next_monday = this_monday + timedelta(weeks=1)

    urls = []
    for base_url in NUTRISLICE_URLS:
        for monday in [this_monday, next_monday]:
            urls.append(f"{base_url}{monday.year}/{monday.month}/{monday.day}/")

    return urls
