import { useState } from 'react';
import { Header } from './components/Header';
import Banner from './components/Banner';
import  ProductPage  from './components/ProductPage'; 
import { UserList } from './components/UserList';
import Footer from './components/Footer';

const App = () => {
  // Quản lý tab đang hiển thị, mặc định mở lên sẽ vào tab Products để bạn test cho tiện
  const [activeTab, setActiveTab] = useState('Products');
  const studentName = 'Nguyễn Hoàng Quốc Cường';

  return (
    <>
      {/* Header điều khiển trạng thái đổi Tab */}
      <Header title="ShopHub" activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Nội dung thay đổi linh hoạt theo Tab được chọn */}
      {activeTab === 'Home' && (
        <>
          <Banner subtitle="Welcome to our store" buttonText="Shop Now" />
          <div style={{ padding: '40px 24px', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
            <h3>Chào mừng bạn đến với Hệ thống E-commerce ShopHub Monorepo!</h3>
            <p style={{ color: '#666' }}>Sử dụng menu trên Header để khám phá các tính năng.</p>
          </div>
        </>
      )}

      {/* Tab Products: Dẫn vào trang Catalog có bộ lọc nâng cao của Session 4 */}
      {activeTab === 'Products' && <ProductPage />}

      {/* Tab Users: Giữ nguyên tính năng danh sách thành viên từ Session 3 */}
      {activeTab === 'Users' && <UserList />}

      <Footer
        studentName={studentName}
        courseName="Full-Stack Web Development"
      />
    </>
  );
};

export default App;