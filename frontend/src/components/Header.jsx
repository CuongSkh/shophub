import { useState } from 'react';

export const Header = ({ title, activeTab, onTabChange }) => {
  const navItems = ['Home', 'Products', 'Users', 'Cart', 'Login'];

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #ddd', backgroundColor: '#fff' }}>
      <h1 style={{ margin: 0, fontSize: '26px', color: '#333' }}>{title}</h1>
      <nav>
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={(e) => {
              if (item === 'Products' || item === 'Users' || item === 'Home') {
                e.preventDefault();
                onTabChange(item);
              }
            }}
            style={{
              marginLeft: '20px',
              textDecoration: 'none',
              color: (item === activeTab || (item === 'Products' && activeTab === 'ProductDetail')) ? '#1976d2' : '#555',
              fontWeight: (item === activeTab || (item === 'Products' && activeTab === 'ProductDetail')) ? 'bold' : 'normal',
            }}
          >
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
};