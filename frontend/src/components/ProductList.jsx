import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductCard } from './ProductCard';

export const ProductList = ({ onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Không thể tải danh sách sản phẩm. Vui lòng thử lại!');
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '24px', textAlign: 'center' }}>🔄 Đang tải danh mục sản phẩm...</div>;
  if (error) return <div style={{ padding: '24px', textAlign: 'center', color: 'red' }}>⚠️ {error}</div>;

  return (
    <section style={{ padding: '24px' }}>
      <h2>Product Catalog</h2>
      <p>Browse products fetched in real-time from external API.</p>
      <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.title}
            price={product.price}
            category={product.category}
            imageUrl={product.image}
            description={product.description}
            onViewDetails={onSelectProduct}
          />
        ))}
      </div>
    </section>
  );
};