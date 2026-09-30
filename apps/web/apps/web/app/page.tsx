"use client"
export default function Home(){
  return (
    <div style={{background:'#020617', color:'white', minHeight:'100vh'}}>
      {/* HEADER */}
      <header style={{padding:'20px', display:'flex', justifyContent:'space-between', alignItems:'center', maxWidth:'1100px', margin:'0 auto'}}>
        <h1 style={{fontWeight:900, fontSize:'22px'}}>MUSINA DIGITAL</h1>
        <a href="https://wa.me/27713354533" style={{background:'#25D366', padding:'10px 18px', borderRadius:'999px', color:'white', textDecoration:'none', fontWeight:700}}>WhatsApp Us</a>
      </header>

      {/* HERO WITH SMALL PICTURE + SLOGAN */}
      <section style={{maxWidth:'1100px', margin:'0 auto', padding:'40px 20px', display:'grid', gridTemplateColumns:'1.2fr 0.8fr', gap:'30px', alignItems:'center'}}>
        <div>
          <p style={{color:'#38bdf8', fontWeight:700, letterSpacing:'2px', fontSize:'12px'}}>YOUR PASSION MOVES US TO YOUR SATISFACTION</p>
          <h2 style={{fontSize:'48px', fontWeight:900, lineHeight:'1.1', margin:'15px 0'}}>The POS System That Speaks Venda & Pedi</h2>
          <p style={{color:'#94a3b8', fontSize:'18px', lineHeight:'1.6'}}>Everything can be seen. No more paper books. Stock, sales, profit - on your phone.</p>
          
          <div style={{marginTop:'25px', display:'flex', gap:'12px', flexWrap:'wrap'}}>
            <div style={{background:'#1e293b', padding:'10px 14px', borderRadius:'10px', fontSize:'13px'}}>✓ Stock Alerts</div>
            <div style={{background:'#1e293b', padding:'10px 14px', borderRadius:'10px', fontSize:'13px'}}>✓ Works Offline</div>
            <div style={{background:'#1e293b', padding:'10px 14px', borderRadius:'10px', fontSize:'13px'}}>✓ WhatsApp Receipts</div>
            <div style={{background:'#1e293b', padding:'10px 14px', borderRadius:'10px', fontSize:'13px'}}>✓ Mobile View</div>
          </div>

          <div style={{marginTop:'30px', display:'flex', gap:'15px'}}>
            <a href="/pos" style={{background:'white', color:'black', padding:'14px 26px', borderRadius:'12px', textDecoration:'none', fontWeight:800}}>Try Live Till →</a>
            <a href="https://wa.me/27713354533?text=Hi%20I%20want%20Musina%20POS" style={{background:'#25D366', color:'white', padding:'14px 26px', borderRadius:'12px', textDecoration:'none', fontWeight:800}}>WhatsApp Demo</a>
          </div>
        </div>

        {/* SMALL PICTURE BOSS */}
        <div style={{background:'#0f172a', borderRadius:'20px', padding:'15px', border:'1px solid #1e293b'}}>
          <img src="/pos-system.png" alt="Musina POS" style={{width:'100%', borderRadius:'14px', objectFit:'cover'}} />
          <p style={{textAlign:'center', marginTop:'12px', color:'#94a3b8', fontSize:'12px'}}>POS + Phone + Printer - All Connected</p>
          <div style={{marginTop:'10px', background:'#020617', borderRadius:'10px', padding:'10px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <span style={{fontSize:'12px'}}>📱 Mobile Ready</span>
            <span style={{fontSize:'12px', color:'#22c55e'}}>● Live</span>
          </div>
        </div>
      </section>

      {/* WHAT IT CAN DO */}
      <section style={{maxWidth:'1100px', margin:'0 auto', padding:'20px 20px 60px', display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'15px'}}>
        <div style={{background:'#0f172a', padding:'20px', borderRadius:'16px', border:'1px solid #1e293b'}}>
          <h3>🛒 Sell Fast</h3><p style={{color:'#94a3b8', fontSize:'14px', marginTop:'8px'}}>Barcode, touch, cash or card. Receipt prints + WhatsApp.</p>
        </div>
        <div style={{background:'#0f172a', padding:'20px', borderRadius:'16px', border:'1px solid #1e293b'}}>
          <h3>📦 Know Stock</h3><p style={{color:'#94a3b8', fontSize:'14px', marginTop:'8px'}}>Low stock alert on phone. Know what sells in Musina.</p>
        </div>
        <div style={{background:'#0f172a', padding:'20px', borderRadius:'16px', border:'1px solid #1e293b'}}>
          <h3>💰 See Profit</h3><p style={{color:'#94a3b8', fontSize:'14px', marginTop:'8px'}}>Daily sales, profit, best product - even when offline.</p>
        </div>
      </section>
    </div>
  )
}
