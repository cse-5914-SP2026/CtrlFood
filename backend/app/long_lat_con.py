from geopy.geocoders import Nominatim

# create the geolocator once
geolocator = Nominatim(user_agent="food_search_app")

def geocode_address(address: str):
    if not address:
        return None, None
    loc = geolocator.geocode(address)
    if loc:
        return loc.latitude, loc.longitude
    return None, None