import { useState } from 'react';
import { Header } from './components/Header';
import Banner from './components/Banner';
import { ProductList } from './components/ProductList';      
import { ProductDetail } from './components/ProductDetail';  
import { UserList } from './components/UserList';            
import Footer from './components/Footer';

const App = () => {
  // Đặt mặc định hiển thị 'Products' để vừa vào trang là danh mục sản phẩm hiện ra ngay
  const [activeTab, setActiveTab] = useState('Products'); 
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Hàm điều phối chuyển đổi qua lại giữa các tab điều hướng
  const handleTabChange = (tab) => {
    if (tab === 'Home') {
      setActiveTab('Products');
      setSelectedProductId(null);
    } else {
      setActiveTab(tab);
      if (tab !== 'ProductDetail') setSelectedProductId(null);
    }
  };

  // Hàm xử lý khi click vào nút "View Details" trên từng thẻ sản phẩm
  const handleSelectProduct = (id) => {
    setSelectedProductId(id);
    setActiveTab('ProductDetail'); // Chuyển sang giao diện chi tiết sản phẩm
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Thanh Header điều hướng */}
      <Header title="ShopHub" activeTab={activeTab} onTabChange={handleTabChange} />
      
      {/* Vùng nội dung thay đổi linh hoạt theo Tab */}
      <main style={{ flexGrow: 1 }}>
        {activeTab === 'Products' && (
          <>
            <Banner subtitle="Welcome to our store" buttonText="Shop Now" />
            <ProductList onSelectProduct={handleSelectProduct} />
          </>
        )}

        {activeTab === 'ProductDetail' && (
          <ProductDetail productId={selectedProductId} onBack={() => handleTabChange('Products')} />
        )}

        {activeTab === 'Users' && (
          <UserList />
        )}
      </main>
    
      <Footer 
        studentName="Nguyễn Hoàng Quốc Cường" 
        courseName="Full-Stack Web Development" 
        classDate="2026-06-19" 
      />
    </div>
  );
};

export default App;