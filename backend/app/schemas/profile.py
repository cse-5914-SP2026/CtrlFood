from pydantic import BaseModel, Field
from typing import List


class UserProfile(BaseModel):
    username: str = ""
    displayName: str = ""
    bio: str = ""
    favoriteFoods: List[str] = Field(default_factory=list)
    favoriteLocations: List[str] = Field(default_factory=list)