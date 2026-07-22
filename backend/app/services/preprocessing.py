import pandas as pd
import json
from app.core.config import settings

with open(settings.locations_path) as f:
    ALLOWED_LOCATIONS = set(json.load(f))


def request_to_dataframe(data: dict) -> pd.DataFrame:
    location = data["location"] if data["location"] in ALLOWED_LOCATIONS else "other"

    row = {
        "carpet_area_sqft": data["carpet_area_sqft"],
        "floor_num": data["floor_num"],
        "bathroom_num": data["bathroom"],
        "balcony_num": data["balcony"],
        "location_grouped": location,
        "Furnishing": data["furnishing"],
        "Transaction": data["transaction"],
        "Ownership": data["ownership"],
        "facing": data["facing"],
    }

    return pd.DataFrame([row])