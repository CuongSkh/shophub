const FeatureSection = () => {
  const features = [
    {
      title: 'Fast Delivery',
      description: 'Get your products delivered within 2–3 days.',
    },
    {
      title: 'Secure Payments',
      description: 'All transactions are protected with modern encryption.',
    },
    {
      title: 'Multiple Shops',
      description: 'Browse products from different shops in one place.',
    },
  ];

  return (
    <section style={{ padding: '40px 24px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '26px', marginBottom: '24px', color: '#333' }}>Why ShopHub?</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
        {features.map((feature) => (
          <div 
            key={feature.title} 
            style={{ 
              border: '1px solid #eee', 
              borderRadius: '8px', 
              padding: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}
          >
            <h3 style={{ margin: '0 0 8px 0', color: '#444', fontSize: '20px' }}>{feature.title}</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '15px' }}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;