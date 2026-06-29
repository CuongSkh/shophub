# backend/main.py
import os
import json
import shutil
from typing import List, Optional
from fastapi import FastAPI, HTTPException, File, UploadFile, Form, Query, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

app = FastAPI(title="ShopHub Product API", version="1.1.0") # [cite: 772]

# --- 1. CẤU HÌNH CORS CHO PHÉP FRONTEND REACT GỌI API ---
origins = [
    "http://localhost:5173",  # Cổng chạy ứng dụng dev của Vite React [cite: 728, 774]
]

app.add_middleware(
    CORSMiddleware, # [cite: 771, 778]
    allow_origins=origins, # [cite: 779]
    allow_credentials=True, # [cite: 780]
    allow_methods=["GET", "POST", "PUT", "DELETE"], # [cite: 781]
    allow_headers=["*"], # [cite: 782]
)

# Đường dẫn vật lý đến các phân khu thư mục
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "data", "products.json") # [cite: 762, 763, 830]
UPLOAD_DIR = os.path.join(BASE_DIR, "data_images") # [cite: 764, 767]

os.makedirs(UPLOAD_DIR, exist_ok=True)


# --- 2. ĐỊNH NGHĨA PYDANTIC SCHEMAS ĐỂ VALIDATE DỮ LIỆU ---

# Mô hình lưu trữ nội bộ (Domain Model - Có chứa trường giá vốn nhạy cảm costPrice)
class ProductDomain(BaseModel):
    id: int # [cite: 791]
    name: str = Field(..., min_length=3, max_length=100) # [cite: 792]
    price: float = Field(..., gt=0) # [cite: 793]
    category: str = Field(..., min_length=3, max_length=50) # [cite: 794]
    description: str = Field(..., min_length=5) # [cite: 795]
    imagePath: str  # Đường dẫn vật lý trên server, ví dụ: "data_images/pic.jpg" [cite: 796]
    costPrice: Optional[float] = None  # Trường bảo mật ẩn đi [cite: 797]

# Output Schema - Dữ liệu an toàn gửi trả ra ngoài cho Frontend xem (Giấu costPrice)
class ProductPublic(BaseModel):
    id: int # [cite: 821]
    name: str # [cite: 822]
    price: float # [cite: 823]
    category: str # [cite: 824]
    description: str # [cite: 825]
    imageUrl: str  # URL công khai phục vụ thẻ img src bên React [cite: 826]

# Wrapper Schema để trả về kết quả cấu trúc phân trang hoàn chỉnh
class ProductListResponse(BaseModel):
    total: int # [cite: 887]
    page: int # [cite: 888]
    size: int # [cite: 889]
    items: List[ProductPublic] # [cite: 889]


# --- HÀM BỔ TRỢ ĐỌC/GHI FILE JSON CƠ SỞ DỮ LIỆU MOCK ---
def load_db() -> List[dict]:
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []

def save_db(data: List[dict]):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


# --- 3. XÂY DỰNG CÁC ENDPOINT API HỆ THỐNG ---

# Endpoint 1: GET /products (Hỗ trợ Lọc dữ liệu, Tìm kiếm nâng cao và Phân trang)
@app.get("/products", response_model=ProductListResponse) # [cite: 827, 886]
def get_products(
    category: Optional[str] = None, # [cite: 860, 908]
    min_price: Optional[float] = None, # [cite: 861]
    max_price: Optional[float] = None, # [cite: 862]
    search: Optional[str] = None,  # Yêu cầu mở rộng: Tìm kiếm text chuỗi [cite: 913]
    page: int = Query(1, ge=1), # [cite: 863, 908]
    size: int = Query(10, ge=1, le=100) # [cite: 864, 908]
):
    raw_list = load_db() # [cite: 877]
    filtered_list = []

    for item in raw_list:
        # Lọc danh mục (Category Filter)
        if category and item.get("category") != category: # [cite: 879]
            continue
        # Lọc khoảng giá (Price Range Filter)
        if min_price is not None and item.get("price", 0) < min_price: # [cite: 880]
            continue
        if max_price is not None and item.get("price", 0) > max_price: # [cite: 880]
            continue
        # Lọc theo từ khóa tìm kiếm (Search Query)
        if search: # [cite: 913]
            s_lower = search.lower()
            in_name = s_lower in item.get("name", "").lower()
            in_desc = s_lower in item.get("description", "").lower()
            if not (in_name or in_desc):
                continue

        # Chuyển đổi cấu trúc imagePath nội bộ thành đường dẫn URL public cho client
        img_path = item.get("imagePath", "")
        if img_path.startswith("http"):
            public_url = img_path
        else:
            filename = os.path.basename(img_path)
            public_url = f"http://localhost:8000/images/{filename}" # [cite: 835, 899]

        filtered_list.append(ProductPublic(
            id=item["id"], name=item["name"], price=item["price"],
            category=item["category"], description=item["description"],
            imageUrl=public_url
        ))

    # Thực hiện thuật toán chia mảng phân trang (Pagination Slicing)
    total_items = len(filtered_list)
    start = (page - 1) * size # [cite: 882]
    end = start + size # [cite: 883]
    paginated_items = filtered_list[start:end] # [cite: 884]

    return ProductListResponse(
        total=total_items, page=page, size=size, items=paginated_items # [cite: 886]
    )


# Endpoint 2: GET /products/{id} (Xem thông tin chi tiết đơn lẻ)
@app.get("/products/{id}", response_model=ProductPublic) # [cite: 857, 867]
def get_product_by_id(id: int):
    raw_list = load_db()
    item = next((p for p in raw_list if p["id"] == id), None)
    
    if not item:
        raise HTTPException(status_code=404, detail="Product not found.") # [cite: 869]

    img_path = item.get("imagePath", "")
    public_url = img_path if img_path.startswith("http") else f"http://localhost:8000/images/{os.path.basename(img_path)}"

    return ProductPublic(
        id=item["id"], name=item["name"], price=item["price"],
        category=item["category"], description=item["description"], imageUrl=public_url
    )


# Endpoint 3: POST /products (Tạo sản phẩm mới kèm Upload ảnh)
@app.post("/products", response_model=ProductPublic, status_code=status.HTTP_201_CREATED) # [cite: 745, 836]
def create_product(
    name: str = Form(...), # [cite: 839]
    price: float = Form(...), # [cite: 839]
    category: str = Form(...), # [cite: 839]
    description: str = Form(...), # [cite: 839]
    imageUrl: Optional[str] = Form(None), # [cite: 839]
    costPrice: Optional[float] = Form(None),
    image_file: Optional[UploadFile] = File(None) # [cite: 840]
):
    # Ràng buộc kiểm tra thủ công dữ liệu Form đầu vào (Validation Checks)
    if len(name) < 3 or len(name) > 100: raise HTTPException(status_code=422, detail="Invalid name length (3-100).") # [cite: 792, 912]
    if price <= 0: raise HTTPException(status_code=422, detail="Price must be greater than 0.") # [cite: 793, 912]
    if len(category) < 3 or len(category) > 50: raise HTTPException(status_code=422, detail="Invalid category length.") # [cite: 794, 912]
    if len(description) < 5: raise HTTPException(status_code=422, detail="Description too short.") # [cite: 795]

    # Bắt lỗi validation nghiệp vụ: Không upload file ảnh và cũng không nhập link ảnh URL ngoại [cite: 911]
    if not image_file and not imageUrl: # [cite: 847, 911]
        raise HTTPException(status_code=400, detail="Missing image. Provide imageUrl or upload image_file.") # [cite: 848, 911]

    final_path = ""
    raw_list = load_db()
    next_id = max([p["id"] for p in raw_list], default=0) + 1

    # Lưu file hình ảnh vật lý lên server nếu có tệp đính kèm [cite: 748, 842]
    if image_file: # [cite: 842]
        ext = os.path.splitext(image_file.filename)[1]
        filename = f"prod_{next_id}{ext}"
        save_path = os.path.join(UPLOAD_DIR, filename) # [cite: 843]
        
        with open(save_path, "wb") as buffer:
            shutil.copyfileobj(image_file.file, buffer)
        final_path = f"data_images/{filename}" # [cite: 844]
    else:
        final_path = imageUrl # [cite: 845]

    new_record = {
        "id": next_id, "name": name, "price": price, "category": category,
        "description": description, "imagePath": final_path, "costPrice": costPrice
    }
    raw_list.append(new_record)
    save_db(raw_list)

    p_url = final_path if final_path.startswith("http") else f"http://localhost:8000/images/{os.path.basename(final_path)}" # 
    return ProductPublic(
        id=next_id, name=name, price=price, category=category, description=description, imageUrl=p_url # 
    )


# Endpoint 4: PUT /products/{id} (Cập nhật thông tin và đổi file ảnh)
@app.put("/products/{id}", response_model=ProductPublic) # [cite: 746, 850]
def update_product(
    id: int,
    name: Optional[str] = Form(None), # [cite: 851]
    price: Optional[float] = Form(None), # [cite: 851]
    category: Optional[str] = Form(None), # [cite: 851]
    description: Optional[str] = Form(None), # [cite: 851]
    imageUrl: Optional[str] = Form(None), # [cite: 851]
    costPrice: Optional[float] = Form(None),
    image_file: Optional[UploadFile] = File(None) # [cite: 851]
):
    raw_list = load_db()
    idx = next((i for i, p in enumerate(raw_list) if p["id"] == id), None)

    if idx is None:
        raise HTTPException(status_code=404, detail="Product not found.")

    target = raw_list[idx]

    # Tiến hành validate và cập nhật thông tin nếu có truyền Form lên
    if name is not None: target["name"] = name
    if price is not None:
        if price <= 0: raise HTTPException(status_code=422, detail="Price must be gt 0.")
        target["price"] = price
    if category is not None: target["category"] = category
    if description is not None: target["description"] = description
    if costPrice is not None: target["costPrice"] = costPrice

    # Ghi đè cập nhật file hình ảnh mới nếu user đăng tải ảnh thay thế [cite: 852]
    if image_file: # [cite: 852]
        ext = os.path.splitext(image_file.filename)[1]
        filename = f"prod_{id}{ext}"
        save_path = os.path.join(UPLOAD_DIR, filename)
        with open(save_path, "wb") as buffer:
            shutil.copyfileobj(image_file.file, buffer)
        target["imagePath"] = f"data_images/{filename}" # [cite: 853]
    elif imageUrl is not None:
        target["imagePath"] = imageUrl # [cite: 855]

    raw_list[idx] = target
    save_db(raw_list)

    img_p = target["imagePath"]
    p_url = img_p if img_p.startswith("http") else f"http://localhost:8000/images/{os.path.basename(img_p)}"
    return ProductPublic(
        id=target["id"], name=target["name"], price=target["price"],
        category=target["category"], description=target["description"], imageUrl=p_url # [cite: 856]
    )


# Endpoint 5: DELETE /products/{id} (Xóa bản ghi và xóa file ảnh vật lý trên đĩa)
@app.delete("/products/{id}", status_code=status.HTTP_204_NO_CONTENT) # [cite: 747, 870]
def delete_product(id: int):
    raw_list = load_db()
    item = next((p for p in raw_list if p["id"] == id), None)

    if not item:
        raise HTTPException(status_code=404, detail="Product not found.")

    # Gỡ bỏ file ảnh vật lý tương ứng lưu trong thư mục data_images [cite: 872]
    img_path = item.get("imagePath", "")
    if img_path and not img_path.startswith("http"):
        full_path = os.path.join(BASE_DIR, img_path)
        if os.path.exists(full_path):
            os.remove(full_path) # [cite: 872]

    # Lọc gỡ bỏ sản phẩm khỏi file JSON database mock [cite: 871]
    updated_list = [p for p in raw_list if p["id"] != id] # [cite: 871]
    save_db(updated_list)
    return None # Trả về mã lỗi 240 No Content đúng chuẩn RESTful [cite: 873]


# --- 4. API PHỤ PHỤC VỤ TRẢ VỀ FILE ẢNH TĨNH (AUXILIARY IMAGE API) ---
@app.get("/images/{filename}") # [cite: 891, 892]
def get_image(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename) # [cite: 894]
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Image file not found.")
    return FileResponse(file_path) # [cite: 895]