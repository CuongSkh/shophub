// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{ padding: '40px 24px', textAlign: 'center' }}>
    <h2 style={{ fontSize: '40px', color: '#d32f2f', margin: '0' }}>404</h2>
    <h3>Page not found</h3>
    <p>The page you are looking for does not exist.</p>
    <Link to="/" style={{ color: '#1976d2', fontWeight: 'bold' }}>Go Back Home</Link>
  </div>
);
export default NotFound;