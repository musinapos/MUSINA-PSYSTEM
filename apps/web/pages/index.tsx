export default function Home() {
  return (
    <div style={{background:'#020617', color:'white', fontFamily:'system-ui', overflowX:'hidden'}}>
      
      {/* HEADER */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 24px', maxWidth:'1100px', margin:'0 auto'}}>
        <div style={{fontWeight:900, fontSize:'18px'}}>MUSINA <span style={{color:'#0ea5e9'}}>▲</span> POS</div>
        <div style={{display:'flex', gap:'10px'}}>
          <a href="tel:+27680361133" style={{background:'#1e293b', color:'white', padding:'8px 14px', borderRadius:'20px', fontSize:'12px', textDecoration:'none'}}>📞 068 036 1133</a>
          <a href="https://wa.me/27799073779" target="_blank" style={{background:'#25D366', color:'white', padding:'8px 14px', borderRadius:'20px', fontSize:'12px', textDecoration:'none', fontWeight:700}}>WhatsApp</a>
        </div>
      </div>

      {/* HERO */}
      <div style={{textAlign:'center', padding:'40px 20px 20px', background:'radial-gradient(600px at 50% -10%, #0a2447 0%, transparent 70%)'}}>
        <div style={{background:'rgba(14,165,233,0.15)', border:'1px solid rgba(14,165,233,0.3)', color:'#0ea5e9', display:'inline-block', padding:'6px 16px', borderRadius:'20px', fontSize:'11px', letterSpacing:'1px'}}>TRUSTED BY 500+ SHOPS IN LIMPOPO</div>
        <h1 style={{fontSize:'52px', fontWeight:900, lineHeight:1, margin:'20px 0 0', letterSpacing:'-2px'}}>MUSINA <span style={{background:'linear-gradient(90deg,#0ea5e9,#38bdf8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>POS</span><br/>SYSTEMS</h1>
        <p style={{color:'#94a3b8', fontSize:'18px', marginTop:'16px'}}>The All-in-One POS for Spaza, Taverns, Restaurants & Retail</p>
        <p style={{color:'#0ea5e9', fontWeight:700, fontSize:'13px', letterSpacing:'3px', marginTop:'8px'}}>YOUR BUSINESS OUR PRIORITY</p>

        {/* ===== BOSS PICTURE IS NOW INSIDE CODE BOSS - TABLET + 2 PHONES ===== */}
        <div style={{display:'flex', gap:'16px', alignItems:'center', justifyContent:'center', padding:'30px 10px 10px', flexWrap:'wrap', maxWidth:'950px', margin:'0 auto'}}>
          
          {/* PHONE 1 */}
          <div style={{background:'#0f0f0f', border:'8px solid #1e1e1e', borderRadius:'32px', width:'200px', minHeight:'420px', padding:'14px', boxShadow:'0 20px 50px rgba(0,0,0,0.6)', position:'relative'}}>
            <div style={{width:'70px', height:'6px', background:'#2a2a2a', borderRadius:'10px', margin:'0 auto 12px'}}></div>
            <div style={{fontSize:'11px', fontWeight:900, letterSpacing:'0.5px'}}>QuickPOS • Products</div>
            <div style={{background:'#1a1a1a', borderRadius:'10px', padding:'8px', marginTop:'10px', display:'flex', gap:'6px'}}>
              <div style={{background:'#222', padding:'6px 8px', borderRadius:'6px', fontSize:'8px'}}>🔍 Search</div>
              <div style={{background:'#222', padding:'6px 8px', borderRadius:'6px', fontSize:'8px'}}>All</div>
            </div>
            {/* EDIT PRODUCTS HERE BOSS */}
            <div style={{marginTop:'12px', display:'flex', flexDirection:'column', gap:'8px', fontSize:'10px'}}>
              <div style={{background:'#1a1a1a', padding:'8px 10px', borderRadius:'10px', display:'flex', justifyContent:'space-between'}}><span>🥛 Milk 2L</span><span style={{color:'#22c55e', fontWeight:800}}>R32.50</span></div>
              <div style={{background:'#1a1a1a', padding:'8px 10px', borderRadius:'10px', display:'flex', justifyContent:'space-between'}}><span>🍞 Bread</span><span style={{color:'#22c55e', fontWeight:800}}>R18.99</span></div>
              <div style={{background:'#1a1a1a', padding:'8px 10px', borderRadius:'10px', display:'flex', justifyContent:'space-between'}}><span>🥤 Coke 500ml</span><span style={{color:'#22c55e', fontWeight:800}}>R22.50</span></div>
              <div style={{background:'#1a1a1a', padding:'8px 10px', borderRadius:'10px', display:'flex', justifyContent:'space-between'}}><span>🍌 Bananas</span><span style={{color:'#22c55e', fontWeight:800}}>R24.50</span></div>
            </div>
            <div style={{background:'#14b8a6', textAlign:'center', padding:'10px', borderRadius:'10px', marginTop:'14px', fontWeight:900, fontSize:'11px'}}>View Cart • R85.09</div>
          </div>

          {/* TABLET */}
          <div style={{background:'#0f0f0f', border:'10px solid #1e1e1e', borderRadius:'22px', width:'360px', minHeight:'420px', padding:'16px', boxShadow:'0 30px 80px rgba(14,165,233,0.25)', position:'relative'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div style={{fontWeight:900, fontSize:'13px'}}>QuickPOS • Cart (3)</div>
              <div style={{background:'#1e293b', padding:'4px 8px', borderRadius:'6px', fontSize:'9px'}}>🛒</div>
            </div>
            {/* EDIT TABLET PRODUCTS HERE BOSS */}
            <div style={{marginTop:'14px', display:'flex', flexDirection:'column', gap:'10px'}}>
              <div style={{background:'#1a1a1a', padding:'12px', borderRadius:'12px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div><div style={{fontSize:'12px', fontWeight:700}}>Milk 2L</div><div style={{fontSize:'9px', color:'#64748b'}}>1 x R32.50</div></div><span style={{fontWeight:800, fontSize:'12px'}}>R32.50</span>
              </div>
              <div style={{background:'#1a1a1a', padding:'12px', borderRadius:'12px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div><div style={{fontSize:'12px', fontWeight:700}}>Brown Bread</div><div style={{fontSize:'9px', color:'#64748b'}}>1 x R18.99</div></div><span style={{fontWeight:800, fontSize:'12px'}}>R18.99</span>
              </div>
              <div style={{background:'#1a1a1a', padding:'12px', borderRadius:'12px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div><div style={{fontSize:'12px', fontWeight:700}}>Coca-Cola 500ml</div><div style={{fontSize:'9px', color:'#64748b'}}>1 x R22.50</div></div><span style={{fontWeight:800, fontSize:'12px'}}>R22.50</span>
              </div>
            </div>
            <div style={{marginTop:'16px', borderTop:'1px dashed #333', paddingTop:'12px'}}>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:'11px', color:'#94a3b8'}}><span>Subtotal</span><span>R73.99</span></div>
              <div style={{display:'flex', justifyContent:'space-between', fontWeight:900, fontSize:'14px', marginTop:'6px'}}><span>Total</span><span style={{color:'#14b8a6'}}>R85.09</span></div>
            </div>
            <div style={{background:'linear-gradient(90deg,#14b8a6,#0ea5e9)', textAlign:'center', padding:'12px', borderRadius:'12px', marginTop:'14px', fontWeight:900, fontSize:'12px'}}>✅ Checkout • Pay Now</div>
          </div>

          {/* PHONE 2 */}
          <div style={{background:'#0f0f0f', border:'8px solid #1e1e1e', borderRadius:'32px', width:'200px', minHeight:'420px', padding:'14px', boxShadow:'0 20px 50px rgba(0,0,0,0.6)'}}>
            <div style={{width:'70px', height:'6px', background:'#2a2a2a', borderRadius:'10px', margin:'0 auto 12px'}}></div>
            <div style={{fontSize:'11px', fontWeight:900}}>Cart • 3 items</div>
            <div style={{marginTop:'12px', display:'flex', flexDirection:'column', gap:'8px', fontSize:'10px'}}>
              <div style={{background:'#1a1a1a', padding:'8px 10px', borderRadius:'10px'}}>Milk 2L x1<br/><span style={{color:'#64748b'}}>R32.50</span></div>
              <div style={{background:'#1a1a1a', padding:'8px 10px', borderRadius:'10px'}}>Brown Bread x1<br/><span style={{color:'#64748b'}}>R18.99</span></div>
              <div style={{background:'#1a1a1a', padding:'8px 10px', borderRadius:'10px'}}>Coca-Cola x1<br/><span style={{color:'#64748b'}}>R22.50</span></div>
            </div>
            <div style={{marginTop:'14px', background:'#1e293b', padding:'10px', borderRadius:'10px', textAlign:'center'}}>
              <div style={{fontSize:'9px', color:'#94a3b8'}}>TOTAL</div>
              <div style={{fontWeight:900, fontSize:'16px', color:'#14b8a6'}}>R85.09</div>
            </div>
            <div style={{background:'#25D366', textAlign:'center', padding:'10px', borderRadius:'10px', marginTop:'10px', fontWeight:900, fontSize:'10px'}}>💳 PAY NOW</div>
          </div>

        </div>
        {/* ===== END PICTURE CODE BOSS ===== */}

        <div style={{marginTop:'28px', display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap'}}>
          <a href="https://wa.me/27799073779?text=Hi%20Musina%20POS%20I%20need%20demo" target="_blank" style={{background:'linear-gradient(90deg,#0ea5e9,#0284c7)', color:'white', padding:'14px 28px', borderRadius:'12px', fontWeight:800, textDecoration:'none', boxShadow:'0 10px 30px rgba(14,165,233,0.4)'}}>🚀 GET FREE DEMO</a>
          <a href="tel:+27680361133" style={{background:'#1e293b', border:'1px solid #334155', color:'white', padding:'14px 28px', borderRadius:'12px', fontWeight:700, textDecoration:'none'}}>📞 Call 068 036 1133</a>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{textAlign:'center', padding:'30px 20px', background:'linear-gradient(180deg, transparent, #0a2447)', marginTop:'20px'}}>
        <a href="https://wa.me/27799073779?text=Hi%20I%20want%20Musina%20POS" target="_blank" style={{background:'#25D366', color:'white', padding:'16px 32px', borderRadius:'12px', fontWeight:900, textDecoration:'none', fontSize:'16px', display:'inline-block'}}>💬 WhatsApp 079 907 3779</a>
        <div style={{marginTop:'16px', fontSize:'11px', color:'#475569'}}>📞 068 036 1133 • 📘 Musina POS Systems • Musina, Limpopo</div>
      </div>

      <a href="https://wa.me/27799073779" target="_blank" style={{position:'fixed', bottom:'20px', right:'20px', background:'#25D366', width:'64px', height:'64px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px', textDecoration:'none', boxShadow:'0 8px 30px rgba(37,211,102,0.6)', zIndex:9999}}>💬</a>
    </div>
  )
}
