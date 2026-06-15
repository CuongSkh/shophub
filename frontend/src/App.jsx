import Header from './components/Header';
import Banner from './components/Banner';
import FeatureSection from './components/FeatureSection';
import Footer from './components/Footer';

const App = () => {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
      {/* Truyền các thông tin thông qua Props */}
      <Header title="ShopHub" />
      
      <Banner subtitle="Welcome to our store" buttonText="Shop Now" />
      
      <FeatureSection />
      
      {/* Điền thông tin cá nhân của bạn tại đây để hiển thị ra Footer */}
      <Footer 
        studentName="Nguyễn Quốc Cường" 
        courseName="Full-Stack Web Development" 
        classDate="2026-06-15" 
      />
    </div>
  );
};

export default App;