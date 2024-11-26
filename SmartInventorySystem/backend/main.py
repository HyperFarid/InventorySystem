from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from backend.database import async_session
from backend.schemas import ItemCreate, ItemResponse
from backend.crud import create_item, get_items

app = FastAPI()

@app.post("/items/", response_model=ItemResponse)
async def add_item(item: ItemCreate, db: AsyncSession = Depends(async_session)):
    return await create_item(db, item)

@app.get("/items/", response_model=list[ItemResponse])
async def list_items(db: AsyncSession = Depends(async_session)):
    return await get_items(db)
