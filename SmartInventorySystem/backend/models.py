from sqlalchemy import Column, Integer, String
from backend.database import Base

class Item(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    quantity = Column(Integer)
    price = Column(Integer)