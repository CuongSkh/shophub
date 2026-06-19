export const ProductCard = ({ id, name, price, category, imageUrl, description, onViewDetails }) => {
  // Tính năng nâng cao: Gắn nhãn Premium nếu giá lớn hơn $100
  const isPremium = price > 100;

  // Tính năng nâng cao: Giới hạn mô tả dưới 60 ký tự để giao diện đều nhau
  const shortDesc = description.length > 60 ? description.substring(0, 60) + '...' : description;

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        width: '220px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        backgroundColor: '#fff',
        position: 'relative',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {isPremium && (
        <span style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: '#ff9800', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>
          Premium
        </span>
      )}

      <img src={imageUrl} alt={name} style={{ width: '100%', height: '140px', objectFit: 'contain', borderRadius: '4px' }} />
      <h3 style={{ fontSize: '15px', margin: '4px 0', height: '40px', overflow: 'hidden' }}>{name}</h3>
      
      {/* Label style cho Category */}
      <span style={{ alignSelf: 'flex-start', backgroundColor: '#eee', padding: '2px 6px', borderRadius: '12px', fontSize: '11px', color: '#666' }}>
        {category}
      </span>
      
      <p style={{ margin: '4px 0', fontWeight: 'bold', color: '#1976d2' }}>${price}</p>
      <p style={{ margin: '4px 0', fontSize: '12px', color: '#777', flexGrow: 1 }}>{shortDesc}</p>
      
      <button
        onClick={() => onViewDetails(id)}
        style={{ marginTop: 'auto', padding: '8px 12px', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        View Details
      </button>
    </div>
  );
};