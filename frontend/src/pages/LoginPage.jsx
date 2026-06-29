// src/pages/LoginPage.jsx
import { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn trình duyệt load lại trang khi bấm submit form
    alert(`Simulation Auth Success for: ${email}`);
  };

  return (
    <div style={{ padding: '40px 24px', display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ border: '1px solid #ddd', padding: '24px', borderRadius: '8px', width: '320px', backgroundColor: '#fff' }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 20px 0', color: '#1976d2' }}>Login</h2>
        
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Username or Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;