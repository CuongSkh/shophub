const Footer = ({ studentName, courseName, classDate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ padding: '24px', borderTop: '1px solid #ddd', textAlign: 'center', color: '#555', lineHeight: '1.6' }}>
      <p style={{ margin: '0 0 4px 0' }}>© {currentYear} ShopHub</p>
      <p style={{ margin: '0 0 4px 0' }}><strong>Student:</strong> {studentName}</p>
      <p style={{ margin: '0 0 4px 0' }}><strong>Course:</strong> {courseName}</p>
      <p style={{ margin: 0 }}><strong>Date:</strong> {classDate}</p>
    </footer>
  );
};

export default Footer;