import { ProductCard } from './ProductCard';

export const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <p style={{ padding: '32px', textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
        No products found for the selected filters.
      </p>
    );
  }

  return (
    <div
      style={{
        marginTop: '16px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'flex-start'
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          category={product.category}
          imageUrl={product.imageUrl}
          description={product.description}
        />
      ))}
    </div>
  );
};