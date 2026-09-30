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

        {/* BEAUTIFUL DEVICES PICTURE - EDITABLE IF YOU USE /pos-devices.png */}
        <div style={{maxWidth:'850px', margin:'30px auto 0', borderRadius:'24px', overflow:'hidden', boxShadow:'0 20px 80px rgba(14,165,233,0.35)', border:'1px solid rgba(255,255,255,0.1)', background:'#0a0a0a'}}>
          <img src="/pos-devices.png" alt="Musina POS System - Tablet and Phones" style={{width:'100%', display:'block'}} />
        </div>

        <div style={{marginTop:'28px', display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap'}}>
          <a href="https://wa.me/27799073779?text=Hi%20Musina%20POS%20I%20need%20demo" target="_blank" style={{background:'linear-gradient(90deg,#0ea5e9,#0284c7)', color:'white', padding:'14px 28px', borderRadius:'12px', fontWeight:800, textDecoration:'none', boxShadow:'0 10px 30px rgba(14,165,233,0.4)'}}>🚀 GET FREE DEMO</a>
          <a href="tel:+27680361133" style={{background:'#1e293b', border:'1px solid #334155', color:'white', padding:'14px 28px', borderRadius:'12px', fontWeight:700, textDecoration:'none'}}>📞 Call 068 036 1133</a>
        </div>

        {/* GLASS CARDS */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:'12px', maxWidth:'900px', margin:'40px auto 0'}}>
          {[
            {i:'🛒', t:'SALES & STOCK', d:'Real-time control'},
            {i:'📊', t:'REPORTS', d:'Daily profit & sales'},
            {i:'📱', t:'TABLET READY', d:'Any device'},
            {i:'🌐', t:'MULTI-LANGUAGE', d:'Venda, Tsonga'},
            {i:'☁️', t:'CLOUD BACKUP', d:'Never lose data'},
            {i:'🛡️', t:'SECURE', d:'PIN control'},
          ].map(c=>(
            <div key={c.t} style={{background:'rgba(255,255,255,0.04)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.08)', padding:'16px 12px', borderRadius:'16px'}}>
              <div style={{fontSize:'22px'}}>{c.i}</div>
              <div style={{fontWeight:800, fontSize:'10px', marginTop:'8px'}}>{c.t}</div>
              <div style={{color:'#64748b', fontSize:'9px', marginTop:'3px'}}>{c.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{textAlign:'center', padding:'30px 20px', background:'linear-gradient(180deg, transparent, #0a2447)', marginTop:'20px'}}>
        <h2 style={{fontSize:'24px', fontWeight:900}}>Ready to Grow?</h2>
        <a href="https://wa.me/27799073779?text=Hi%20I%20want%20Musina%20POS" target="_blank" style={{background:'#25D366', color:'white', padding:'16px 32px', borderRadius:'12px', fontWeight:900, textDecoration:'none', fontSize:'16px', display:'inline-block', marginTop:'16px'}}>💬 WhatsApp 079 907 3779</a>
        <div style={{marginTop:'16px', fontSize:'11px', color:'#475569'}}>📞 068 036 1133 • 📘 Musina POS Systems • Musina, Limpopo</div>
      </div>

      {/* FLOATING WHATSAPP */}
      <a href="https://wa.me/27799073779" target="_blank" style={{position:'fixed', bottom:'20px', right:'20px', background:'#25D366', width:'64px', height:'64px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px', textDecoration:'none', boxShadow:'0 8px 30px rgba(37,211,102,0.6)', zIndex:9999}}>💬</a>
      <a href="tel:+27680361133" style={{position:'fixed', bottom:'90px', right:'20px', background:'#0ea5e9', width:'56px', height:'56px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', textDecoration:'none', boxShadow:'0 8px 20px rgba(14,165,233,0.5)', zIndex:9999}}>📞</a>
    </div>
  )
}
