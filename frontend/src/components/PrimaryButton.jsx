const PrimaryButton = ({ label }) => {
  return (
    <button 
      style={{ 
        backgroundColor: '#1976d2', 
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold'
      }}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;