from fastapi import FastAPI

app = FastAPI()

# 1. Period 4 - API gốc mặc định theo giáo trình
@app.get("/")
def root():
    return {
        "message": "Welcome to ShopHub API"
    }

# 2. End-of-Session Lab - API /about
@app.get("/about")
def about():
    return {
        "project": "ShopHub",
        "version": "1.0"
    }

# 3. Homework - Exercise 2 - API /products
@app.get("/products")
def get_products():
    return [
        {
            "id": 1,
            "name": "Laptop"
        },
        {
            "id": 2,
            "name": "Mouse"
        }
    ]