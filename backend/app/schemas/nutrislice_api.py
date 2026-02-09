from pydantic import BaseModel
from datetime import date

class Food(BaseModel):
    id: int
    name: str | None # important
    description: str | None
    # nutrition_info: NutritionInfo | None
    # see schema fro more food macro fields can add later

# class NutritionInfo(BaseModel):
#     # see schema

class MenuItem(BaseModel):
    id: int
    text: str | None
    food: Food | None # Important

class Day(BaseModel):
    date: str 
    menu_items: list[MenuItem] | None

class Root(BaseModel):
    start_date: str # Important
    id: int

    days: list[Day] | None