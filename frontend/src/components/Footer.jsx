const Footer = ({ studentName, courseName, classDate }) => {
  const currentYear = new Date().getFullYear(); // [cite: 619]

  return (
    <footer style={{ padding: '24px', borderTop: '1px solid #ddd', textAlign: 'center', color: '#555', lineHeight: '1.6' }}>
      <p style={{ margin: '0 0 4px 0' }}>© {currentYear} ShopHub</p> {/* [cite: 622] */}
      <p style={{ margin: '0 0 4px 0' }}><strong>Student:</strong> {studentName}</p> {/* [cite: 623] */}
      <p style={{ margin: '0 0 4px 0' }}><strong>Course:</strong> {courseName}</p> {/* [cite: 624] */}
      <p style={{ margin: 0 }}><strong>Date:</strong> {classDate}</p>
    </footer>
  );
};

export default Footer;