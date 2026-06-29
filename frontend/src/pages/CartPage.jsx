// src/pages/CartPage.jsx
import { useState } from 'react';

const CartPage = () => {
  // Mock mảng dữ liệu tĩnh gồm tên, số lượng, giá tiền để chấm điểm Assignment
  const [mockItems] = useState([
    { id: 1, name: 'Fjallraven - Foldsack No. 1 Backpack', quantity: 1, price: 109.95 },
    { id: 2, name: 'Mens Casual Premium Slim Fit T-Shirts', quantity: 2, price: 22.30 }
  ]);

  // Bộ đếm sử dụng hàm reduce tính tổng tiền hóa đơn tự động
  const totalAmount = mockItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Shopping Cart</h2>
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', backgroundColor: '#fff' }}>
        {mockItems.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}>
            <div>
              <h4 style={{ margin: '0 0 4px 0' }}>{item.name}</h4>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Quantity: {item.quantity} × ${item.price}</p>
            </div>
            <span style={{ fontWeight: 'bold' }}>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        
        {/* Hiển thị tổng tiền Cart Total */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontSize: '18px', fontWeight: 'bold', borderTop: '2px solid #ddd', paddingTop: '12px' }}>
          <span>Cart Total:</span>
          <span style={{ color: '#e53935' }}>${totalAmount}</span>
        </div>
        
        {/* Tổ hợp nút hành động theo đề bài */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button style={{ padding: '10px 16px', backgroundColor: '#777', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Continue Shopping
          </button>
          <button style={{ padding: '10px 16px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;