export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      background: '#0a0a0a',
      color: 'white',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '48px', margin: '0 0 10px', letterSpacing: '2px' }}>
        MUSINA P SYSTEM
      </h1>
      
      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: '400', 
        color: '#22c55e',
        margin: '0 0 30px'
      }}>
        PARKER JOHNSON - LIVE
      </h2>

      <div style={{
        background: '#171717',
        padding: '30px 50px',
        borderRadius: '12px',
        border: '1px solid #333'
      }}>
        <p style={{ fontSize: '18px', margin: '0 0 15px' }}>
          Boss system is running!
        </p>
        <p style={{ fontSize: '14px', color: '#888', margin: 0 }}>
          Deployment: SUCCESS ✓
        </p>
      </div>

      <p style={{ marginTop: '40px', color: '#555', fontSize: '12px' }}>
        apps/web/pages/index.tsx
      </p>
    </div>
  )
}
