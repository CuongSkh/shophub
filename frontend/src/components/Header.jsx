const Header = ({ title }) => {
  const navItems = ['Home', 'Products', 'Cart', 'Login'];

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #ddd' }}>
      <h1 style={{ margin: 0, fontSize: '28px', color: '#333' }}>{title}</h1>
      <nav>
        {navItems.map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            style={{ marginLeft: '20px', textDecoration: 'none', color: '#1976d2', fontWeight: '500' }}
          >
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;