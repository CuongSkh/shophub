// src/components/Header.jsx
import { NavLink } from 'react-router-dom';

export const Header = ({ title }) => {
  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'Cart', to: '/cart' },
    { label: 'Login', to: '/login' },
    { label: 'About', to: '/about' },     // Bài học trên lớp mở rộng
    { label: 'Contact', to: '/contact' }, // Bài tập về nhà mở rộng
  ];

  const linkStyle = ({ isActive }) => ({
    marginRight: '15px',
    textDecoration: 'none',
    color: isActive ? '#1976d2' : '#555', 
    fontWeight: isActive ? 'bold' : 'normal', 
    fontSize: '1rem'
  });

  return (
    <header style={{
      padding: '16px 24px',
      borderBottom: '1px solid #ddd',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff'
    }}>
      <h1 style={{ margin: 0, color: '#1976d2', fontSize: '1.8rem' }}>{title}</h1>
      <nav>
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} style={linkStyle}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;