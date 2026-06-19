import { useState, useEffect } from 'react';
import axios from 'axios';

export const ProductDetail = ({ productId, onBack }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Không thể tải thông tin chi tiết sản phẩm.');
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <div style={{ padding: '24px', textAlign: 'center' }}>🔄 Đang tải chi tiết sản phẩm...</div>;
  if (error) return <div style={{ padding: '24px', textAlign: 'center', color: 'red' }}>⚠️ {error}</div>;

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={onBack} style={{ padding: '8px 16px', marginBottom: '20px', cursor: 'pointer', backgroundColor: '#555', color: '#fff', border: 'none', borderRadius: '4px' }}>
        ← Quay lại danh mục
      </button>
      {product && (
        <div style={{ display: 'flex', gap: '24px', border: '1px solid #ddd', padding: '24px', borderRadius: '8px', backgroundColor: '#fff' }}>
          <img src={product.image} alt={product.title} style={{ width: '250px', height: '250px', objectFit: 'contain' }} />
          <div>
            <h2>{product.title}</h2>
            <p style={{ color: '#757575', textTransform: 'uppercase', fontSize: '13px' }}>Category: {product.category}</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#e53935' }}>${product.price}</p>
            <p style={{ lineHeight: '1.6', color: '#444' }}>{product.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};