import PrimaryButton from './PrimaryButton'; // [cite: 496]

const Banner = ({ subtitle, buttonText }) => {
  return (
    <section style={{ padding: '40px 24px', backgroundColor: '#f5f5f5', textAlign: 'left' }}>
      <h2 style={{ fontSize: '32px', margin: '0 0 12px 0', color: '#222' }}>{subtitle}</h2>
      <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>
        Discover our latest products, best deals, and exclusive offers tailored just for you.
      </p>
      {/* Tái sử dụng nút PrimaryButton theo bài tập nâng cao [cite: 496] */}
      <PrimaryButton label={buttonText} />
    </section>
  );
};

export default Banner;