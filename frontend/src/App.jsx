// src/App.jsx
import { Routes, Route } from 'react-router-dom'; // Khai báo các thành phần của Router [cite: 329]
import { Header } from './components/Header';
import Footer from './components/Footer';

// Nhập đầy đủ (Import) các trang từ thư mục pages sang [cite: 338, 339, 639, 640, 641, 642, 643, 644]
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';

const App = () => {
  const studentName = 'Nguyễn Hoàng Quốc Cường'; // Thông tin cá nhân của bạn 

  return (
    <>
      {/* Header chứa NavLink, luôn hiển thị cố định ở đầu mọi trang web [cite: 332, 419] */}
      <Header title="ShopHub" />
      
      {/* Khung nội dung chính thay đổi linh hoạt dựa trên URL thanh địa chỉ */}
      <main style={{ minHeight: '75vh', backgroundColor: '#fafafa', paddingBottom: '30px' }}>
        <Routes> {/* Container chứa toàn bộ các Route đơn lẻ [cite: 301] */}
          <Route path="/" element={<HomePage />} /> {/* Trang chủ [cite: 309] */}
          <Route path="/products" element={<ProductPage />} /> {/* Trang danh mục sản phẩm [cite: 310] */}
          <Route path="/products/:id" element={<ProductDetailPage />} /> {/* Trang chi tiết sản phẩm động :id [cite: 311] */}
          <Route path="/cart" element={<CartPage />} /> {/* Trang giỏ hàng mẫu [cite: 331] */}
          <Route path="/login" element={<LoginPage />} /> {/* Trang đăng nhập form [cite: 331] */}
          <Route path="/about" element={<AboutPage />} /> {/* Trang phụ bài học */}
          <Route path="/contact" element={<ContactPage />} /> {/* Trang phụ bài tập về nhà */}
          
          {/* Bẫy lỗi 404: Nếu gõ sai bất kỳ URL nào không khớp phía trên sẽ tự nhảy vào đây [cite: 405] */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer chung hiển thị thông tin sinh viên ở cuối website [cite: 332] */}
      <Footer
        studentName={studentName}
        courseName="Full-Stack Web Development"
        classDate="June 2026"
      />
    </>
  );
};

export default App;