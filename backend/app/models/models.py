from typing import List, Optional
from pydantic import BaseModel

# TODO this is for prototyping may need to change as app changes
class UserQuery(BaseModel):
    query: str
    location: Optional[List[str]] = None  # selected cafes OR userAddress wrapped in a list
    date: Optional[str] = None
    userLocation: Optional[List[str]] | None = None
