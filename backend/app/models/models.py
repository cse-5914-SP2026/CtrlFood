from pydantic import BaseModel

# TODO this is for prototyping may need to change as app changes
class UserQuery(BaseModel):
    query: str
