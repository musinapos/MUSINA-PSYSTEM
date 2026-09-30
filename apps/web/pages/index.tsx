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

      {/* HERO BEAUTIFUL */}
      <div style={{textAlign:'center', padding:'60px 20px 40px', background:'radial-gradient(600px at 50% -10%, #0a2447 0%, transparent 70%)'}}>
        <div style={{background:'rgba(14,165,233,0.15)', border:'1px solid rgba(14,165,233,0.3)', color:'#0ea5e9', display:'inline-block', padding:'6px 16px', borderRadius:'20px', fontSize:'11px', letterSpacing:'1px'}}>TRUSTED BY 500+ SHOPS IN LIMPOPO</div>
        <h1 style={{fontSize:'52px', fontWeight:900, lineHeight:1, margin:'20px 0 0', letterSpacing:'-2px'}}>MUSINA <span style={{background:'linear-gradient(90deg,#0ea5e9,#38bdf8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>POS</span><br/>SYSTEMS</h1>
        <p style={{color:'#94a3b8', fontSize:'18px', marginTop:'16px'}}>The All-in-One POS for Spaza, Taverns, Restaurants & Retail</p>
        <p style={{color:'#0ea5e9', fontWeight:700, fontSize:'13px', letterSpacing:'3px', marginTop:'8px'}}>YOUR BUSINESS OUR PRIORITY</p>

        <div style={{marginTop:'32px', display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap'}}>
          <a href="https://wa.me/27799073779?text=Hi%20Musina%20POS%20I%20need%20demo" target="_blank" style={{background:'linear-gradient(90deg,#0ea5e9,#0284c7)', color:'white', padding:'14px 28px', borderRadius:'12px', fontWeight:800, textDecoration:'none', boxShadow:'0 10px 30px rgba(14,165,233,0.4)'}}>🚀 GET FREE DEMO</a>
          <a href="tel:+27680361133" style={{background:'#1e293b', border:'1px solid #334155', color:'white', padding:'14px 28px', borderRadius:'12px', fontWeight:700, textDecoration:'none'}}>📞 Call Now</a>
        </div>

        {/* GLASS CARDS */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'14px', maxWidth:'900px', margin:'50px auto 0'}}>
          {[
            {i:'🛒', t:'SALES & STOCK', d:'Real-time stock control'},
            {i:'📊', t:'REPORTS', d:'Daily profit & sales'},
            {i:'📱', t:'TABLET READY', d:'Works on any device'},
            {i:'🌐', t:'MULTI-LANGUAGE', d:'Venda, Tsonga, Sepedi'},
            {i:'☁️', t:'CLOUD BACKUP', d:'Never lose data'},
            {i:'🛡️', t:'SECURE', d:'PIN + Cashier control'},
          ].map(c=>(
            <div key={c.t} style={{background:'rgba(255,255,255,0.04)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.08)', padding:'20px 14px', borderRadius:'16px'}}>
              <div style={{fontSize:'26px'}}>{c.i}</div>
              <div style={{fontWeight:800, fontSize:'11px', marginTop:'10px', letterSpacing:'0.5px'}}>{c.t}</div>
              <div style={{color:'#64748b', fontSize:'10px', marginTop:'4px'}}>{c.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES BEAUTIFUL */}
      <div style={{maxWidth:'1100px', margin:'0 auto', padding:'40px 20px', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'16px'}}>
        <div style={{background:'linear-gradient(135deg,#0a2447,#082040)', padding:'24px', borderRadius:'20px', border:'1px solid rgba(14,165,233,0.2)'}}>
          <div style={{fontSize:'12px', color:'#0ea5e9', fontWeight:800, letterSpacing:'2px'}}>AIRTIME & DATA</div>
          <div style={{fontSize:'20px', fontWeight:900, marginTop:'8px'}}>Sell Airtime in 2 Seconds</div>
          <div style={{display:'flex', gap:'8px', marginTop:'16px', flexWrap:'wrap'}}>
            <span style={{background:'#FFCC00', color:'black', padding:'6px 12px', borderRadius:'8px', fontSize:'11px', fontWeight:800}}>MTN</span>
            <span style={{background:'#E30613', color:'white', padding:'6px 12px', borderRadius:'8px', fontSize:'11px', fontWeight:800}}>Vodacom</span>
            <span style={{background:'white', color:'black', padding:'6px 12px', borderRadius:'8px', fontSize:'11px', fontWeight:800}}>Telkom</span>
            <span style={{background:'#00BFFF', color:'white', padding:'6px 12px', borderRadius:'8px', fontSize:'11px', fontWeight:800}}>Cell C</span>
          </div>
          <div style={{marginTop:'12px', fontSize:'11px', color:'#7fb0d6'}}>All networks + Electricity + DStv</div>
        </div>

        <div style={{background:'linear-gradient(135deg,#111827,#1f2937)', padding:'24px', borderRadius:'20px', border:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={{fontSize:'12px', color:'#22c55e', fontWeight:800, letterSpacing:'2px'}}>RESTAURANT SYSTEM</div>
          <div style={{fontSize:'20px', fontWeight:900, marginTop:'8px'}}>QR Menu Ordering</div>
          <div style={{marginTop:'14px', display:'flex', alignItems:'center', gap:'8px', fontSize:'11px', color:'#9ca3af'}}>
            <span style={{background:'#22c55e', color:'black', padding:'4px 8px', borderRadius:'6px', fontWeight:800}}>1</span> Scan QR → <span style={{background:'#1f2937', border:'1px solid #374151', padding:'4px 8px', borderRadius:'6px'}}>Menu</span> → Order → Pay
          </div>
          <div style={{marginTop:'12px', fontSize:'11px', color:'#6b7280'}}>Kitchen printer + Table management</div>
        </div>
      </div>

      {/* FOOTER CTA */}
      <div style={{textAlign:'center', padding:'40px 20px', background:'linear-gradient(180deg, transparent, #0a2447)'}}>
        <h2 style={{fontSize:'28px', fontWeight:900}}>Ready to Grow Your Shop?</h2>
        <p style={{color:'#94a3b8', fontSize:'14px', marginTop:'8px'}}>Setup in 1 hour • Training included • Support in Venda & Tsonga</p>
        <div style={{marginTop:'20px', display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap'}}>
          <a href="https://wa.me/27799073779?text=Hi%20I%20want%20Musina%20POS%20System" target="_blank" style={{background:'#25D366', color:'white', padding:'16px 32px', borderRadius:'12px', fontWeight:900, textDecoration:'none', fontSize:'16px'}}>💬 WhatsApp 079 907 3779</a>
        </div>
        <div style={{marginTop:'20px', fontSize:'11px', color:'#475569'}}>
          📞 068 036 1133 • 📘 Musina POS Systems • www.musinapos.co.za • Musina, Limpopo
        </div>
      </div>

      {/* FLOATING */}
      <a href="https://wa.me/27799073779" target="_blank" style={{position:'fixed', bottom:'20px', right:'20px', background:'#25D366', width:'64px', height:'64px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px', textDecoration:'none', boxShadow:'0 8px 30px rgba(37,211,102,0.6)', zIndex:9999}}>💬</a>
    </div>
  )
}
