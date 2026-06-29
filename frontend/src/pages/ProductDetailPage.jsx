// src/pages/ProductDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Dùng useParams đọc tham số ID động [cite: 306]
import axios from 'axios';

const ProductDetailPage = () => {
  const { id } = useParams(); // Giải mã lấy biến :id từ URL [cite: 306]
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Gọi API Fakestore đồng bộ với API gốc của Catalog Session 4
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load product details.');
        setLoading(false);
      });
  }, [id]); // Thực hiện lại hiệu ứng fetch nếu ID trên URL thay đổi

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>🔄 Loading product details...</div>;
  if (error) return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>⚠️ {error}</div>;
  
  // Nghiệp vụ xử lý Lab: Nếu ID không hợp lệ hoặc API trả về mảng rỗng
  if (!product || Object.keys(product).length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h3 style={{ color: '#e53935' }}>Product not found.</h3>
        <p>The product you are trying to view does not exist.</p>
        <Link to="/products" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}>← Back to Products</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Nút quay lại trang danh sách sản phẩm */}
      <Link to="/products" style={{ display: 'inline-block', padding: '8px 16px', marginBottom: '20px', textDecoration: 'none', backgroundColor: '#555', color: '#fff', borderRadius: '4px' }}>
        ← Back to Products
      </Link>
      
      {/* Khung chứa thông tin chi tiết cấu trúc rõ ràng */}
      <div style={{ display: 'flex', gap: '32px', border: '1px solid #ddd', padding: '24px', borderRadius: '8px', backgroundColor: '#fff', flexWrap: 'wrap' }}>
        <img src={product.image} alt={product.title} style={{ width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto' }} />
        <div style={{ flex: '1', minWidth: '280px' }}>
          <h2>{product.title}</h2>
          <p style={{ color: '#757575', textTransform: 'uppercase', fontSize: '13px' }}>Category: {product.category}</p>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#e53935', margin: '12px 0' }}>${product.price}</p>
          <p style={{ lineHeight: '1.6', color: '#444' }}>{product.description}</p>
          
          <button style={{ marginTop: '20px', padding: '12px 20px', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Add to Cart (UI Only)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;