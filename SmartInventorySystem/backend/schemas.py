from pydantic import BaseModel

class ItemBase(BaseModel):
    name: str
    description: str | None = None
    quantity: int
    price: float

class ItemCreate(ItemBase):
    pass

class ItemResponse(ItemBase):
    id: int

    class Config:
        orm_mode = True
