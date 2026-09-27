export default function Page() {
  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 48, fontWeight: 900 }}>PARKER JOHNSON</h1>
      <p style={{ fontSize: 20, marginTop: 10 }}>Official Store - LIVE ✅</p>
      <div style={{ marginTop: 30, padding: 20, background: 'black', color: 'white', borderRadius: 12 }}>
        Boss your shop is working boss!
      </div>
      <a href="/products" style={{ display: 'inline-block', marginTop: 20, color: 'blue', textDecoration: 'underline' }}>
        Go to Products →
      </a>
    </div>
  );
}
