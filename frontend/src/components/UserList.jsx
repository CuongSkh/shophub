import { useState, useEffect } from 'react';
import axios from 'axios';

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lấy toàn bộ danh sách users
  useEffect(() => {
    axios.get('https://fakestoreapi.com/users')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Không thể tải danh sách tài khoản.');
        setLoading(false);
      });
  }, []);

  // Lấy chi tiết 1 user khi selectedUserId thay đổi
  useEffect(() => {
    if (!selectedUserId) return;
    setDetailLoading(true);
    axios.get(`https://fakestoreapi.com/users/${selectedUserId}`)
      .then((response) => {
        setUserDetail(response.data);
        setDetailLoading(false);
      })
      .catch(() => {
        setDetailLoading(false);
      });
  }, [selectedUserId]);

  if (loading) return <div style={{ padding: '24px', textAlign: 'center' }}>🔄 Đang xử lý danh sách tài khoản...</div>;
  if (error) return <div style={{ padding: '24px', textAlign: 'center', color: 'red' }}>⚠️ {error}</div>;

  return (
    <section style={{ padding: '24px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      {/* Cột danh sách User */}
      <div style={{ flex: '1', minWidth: '300px' }}>
        <h3>ShopHub System Accounts</h3>
        <p>Chọn một tài khoản để xem chi tiết thông tin bảo mật.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUserId(user.id)}
              style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer', backgroundColor: selectedUserId === user.id ? '#e3f2fd' : '#fff' }}
            >
              <strong>{user.username}</strong> - {user.email}
            </div>
          ))}
        </div>
      </div>

      {/* Cột hiển thị chi tiết User chọn lựa */}
      <div style={{ flex: '1', minWidth: '300px', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#fafafa' }}>
        <h3>User Detailed Profile</h3>
        {detailLoading && <p>🔄 Đang truy xuất thông tin chi tiết...</p>}
        {!selectedUserId && !detailLoading && <p style={{ color: '#888' }}>Vui lòng chọn một người dùng từ danh sách bên trái.</p>}
        {selectedUserId && userDetail && !detailLoading && (
          <div style={{ lineHeight: '1.8' }}>
            <p><strong>ID tài khoản:</strong> {userDetail.id}</p>
            <p><strong>Tên đăng nhập:</strong> {userDetail.username}</p>
            <p><strong>Họ và tên:</strong> {userDetail.name.firstname.toUpperCase()} {userDetail.name.lastname.toUpperCase()}</p>
            <p><strong>Email hệ thống:</strong> {userDetail.email}</p>
            <p><strong>Số điện thoại:</strong> {userDetail.phone}</p>
            <p><strong>Địa chỉ:</strong> {userDetail.address.number}, {userDetail.address.street}, {userDetail.address.city}</p>
          </div>
        )}
      </div>
    </section>
  );
};