import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductList } from '../components/ProductList';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('none');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        const data = res.data;

        const mappedProducts = data.map((item) => ({
          id: item.id,
          name: item.title,
          price: item.price,
          category: item.category,
          imageUrl: item.image,
          description: item.description,
        }));

        setProducts(mappedProducts);
        setFilteredProducts(mappedProducts);
      } catch (err) {
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let updated = [...products];

    if (searchTerm.trim() !== '') {
      const lower = searchTerm.toLowerCase();
      updated = updated.filter((p) => p.name.toLowerCase().includes(lower));
    }

    if (selectedCategory !== 'All') {
      updated = updated.filter((p) => p.category === selectedCategory);
    }

    if (sortOption === 'price-asc') {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      updated.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updated);
  }, [searchTerm, selectedCategory, sortOption, products]);

  const categories = [
    'All',
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  if (loading) {
    return <p style={{ padding: '24px', textAlign: 'center' }}>Loading products...</p>;
  }

  if (error) {
    return <p style={{ padding: '24px', color: 'red', textAlign: 'center' }}>{error}</p>;
  }

  return (
    <section style={{ padding: '24px' }}>
      <h2>Product Catalog</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>Search, filter, and sort products.</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', minWidth: '250px', border: '1px solid #ccc', borderRadius: '4px' }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '10px', minWidth: '150px', border: '1px solid #ccc', borderRadius: '4px' }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'All' ? 'All Categories' : cat}
            </option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{ padding: '10px', minWidth: '180px', border: '1px solid #ccc', borderRadius: '4px' }}
        >
          <option value="none">Sort by price (none)</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>

        <button
          onClick={() => {
            setSearchTerm('');
            setSelectedCategory('All');
            setSortOption('none');
          }}
          style={{
            padding: '10px 16px',
            backgroundColor: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Clear Filters
        </button>
      </div>

      <p style={{ marginBottom: '16px', color: '#555', fontStyle: 'italic' }}>
        Showing {filteredProducts.length} of {products.length} products
      </p>

      <ProductList products={filteredProducts} />
    </section>
  );
};

export default ProductPage;