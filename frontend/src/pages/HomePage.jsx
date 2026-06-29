// src/pages/HomePage.jsx
import Banner from '../components/Banner';
import FeatureSection from '../components/FeatureSection';

const HomePage = () => {
  return (
    <>
      {/* Hiển thị Banner kèm nút Shop Now điều hướng */}
      <Banner subtitle="Welcome to our store" buttonText="Shop Now" /> [cite: 345]
      
      {/* Đoạn văn giới thiệu ngắn về ShopHub theo yêu cầu Assignment */}
      <div style={{ 
        padding: '30px 24px', 
        textAlign: 'center', 
        backgroundColor: '#fff', 
        maxWidth: '800px', 
        margin: '20px auto', 
        borderRadius: '8px', 
        border: '1px solid #eee' 
      }}>
        <h3 style={{ color: '#1976d2', fontSize: '22px', marginBottom: '12px' }}>
          Welcome to the ShopHub E-commerce Ecosystem!
        </h3>
        <p style={{ color: '#666', lineHeight: '1.6' }}>
          ShopHub provides a fully optimized Single Page Application (SPA) architecture. [cite: 290]
          Use the navigation links above to search real-time catalog items, seamlessly inspect granular 
          product metrics, inspect active user databases, and maintain isolated mock states.
        </p>
      </div>
      
      {/* Hiển thị danh sách tính năng Why ShopHub */}
      <FeatureSection />
    </>
  );
};

export default HomePage;