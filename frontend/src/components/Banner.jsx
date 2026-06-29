// src/components/Banner.jsx
import { Link } from 'react-router-dom';

const Banner = ({ subtitle, buttonText }) => {
  return (
    <section style={{ padding: '40px 24px', backgroundColor: '#f5f5f5', textAlign: 'left', borderRadius: '8px', marginBottom: '20px' }}>
      <h2 style={{ fontSize: '32px', margin: '0 0 12px 0', color: '#222' }}>{subtitle}</h2>
      <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>
        Discover our latest products, best deals, and exclusive offers tailored just for you.
      </p>
      <Link 
        to="/products" 
        style={{
          backgroundColor: '#1976d2', 
          color: '#fff',
          padding: '10px 20px',
          textDecoration: 'none',
          borderRadius: '4px',
          display: 'inline-block',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        {buttonText || 'Shop Now'}
      </Link>
    </section>
  );
};

export default Banner;