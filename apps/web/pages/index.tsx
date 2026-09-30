import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ setTimeout(()=>setLoading(false), 1800); },[]);

  if(loading){
    return (
      <div style={{height:'100vh', background:'#0a0a0a', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <div style={{width:80, height:80, border:'3px solid #222', borderTop:'3px solid #0096FF', borderRadius:'50%', animation:'spin 1s linear infinite'}}></div>
        <img src="/logo.png" style={{height:50, marginTop:30, background:'white', padding:8, borderRadius:12}} />
        <p style={{color:'#0096FF', marginTop:20, letterSpacing:4, fontSize:12, fontWeight:'bold'}}>LOADING MUSINA POS...</p>
        <style>{`@keyframes spin {0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <div style={{minHeight:'100vh', background:'radial-gradient(circle at 30% 20%, #1e2a3a 0%, #0a0a0a 60%)', color:'white', fontFamily:'sans-serif', overflow:'hidden'}}>
      {/* TOP BAR */}
      <div style={{padding:'20px 40px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <div style={{background:'white', borderRadius:10, padding:'6px 10px'}}>
            <img src="/logo.png" style={{height:32}} />
          </div>
          <div>
            <div style={{fontWeight:'900', letterSpacing:1}}>MUSINA POS SYSTEMS</div>
            <div style={{fontSize:10, color:'#0096FF', letterSpacing:2}}>Your Business, Our Priority</div>
          </div>
        </div>
        <Link href="/pos" style={{background:'#0096FF', color:'white', padding:'10px 24px', borderRadius:30, textDecoration:'none', fontWeight:'bold', fontSize:13}}>OPEN POS →</Link>
      </div>

      {/* HERO */}
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', textAlign:'center', padding:'80px 20px'}}>
        <div style={{background:'rgba(255,255,255,0.95)', borderRadius:24, padding:20, boxShadow:'0 0 80px rgba(0,150,255,0.25)', marginBottom:30, animation:'float 3s ease-in-out infinite'}}>
          <img src="/logo.png" style={{width:280, maxWidth:'80vw'}} />
        </div>

        <h1 style={{fontSize:'clamp(28px, 6vw, 56px)', fontWeight:'900', margin:0, lineHeight:1.1, letterSpacing:-1}}>MUSINA POS<br/><span style={{color:'#0096FF'}}>SYSTEMS</span></h1>
        <p style={{color:'#0096FF', fontWeight:'bold', letterSpacing:4, marginTop:16, fontSize:14}}>Your Business, Our Priority</p>
        <p style={{maxWidth:500, color:'#aaa', marginTop:20, fontSize:14, lineHeight:1.6}}>Cloud-based Sales, Stock Control & Real-time Reports. Built for spaza shops, restaurants & retail in Musina.</p>

        <div style={{marginTop:40, display:'flex', gap:16}}>
          <Link href="/pos" style={{background:'linear-gradient(90deg, #0096FF, #0066CC)', color:'white', padding:'16px 36px', borderRadius:50, textDecoration:'none', fontWeight:'bold', boxShadow:'0 10px 30px rgba(0,150,255,0.4)'}}>Launch Till System</Link>
          <a href="https://wa.me/27700000000" style={{border:'1px solid #333', color:'white', padding:'16px 28px', borderRadius:50, textDecoration:'none', background:'#1a1a1a'}}>WhatsApp Us</a>
        </div>

        <div style={{marginTop:60, display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12, maxWidth:600, width:'100%'}}>
          <div style={{background:'rgba(255,255,255,0.06)', border:'1px solid #222', padding:16, borderRadius:16}}><div style={{fontSize:20}}>🛒</div><b style={{fontSize:12}}>SELL FAST</b><br/><small style={{color:'#888'}}>Barcode • Touch</small></div>
          <div style={{background:'rgba(255,255,255,0.06)', border:'1px solid #222', padding:16, borderRadius:16}}><div style={{fontSize:20}}>📦</div><b style={{fontSize:12}}>STOCK ALERT</b><br/><small style={{color:'#888'}}>Low Stock Warning</small></div>
          <div style={{background:'rgba(255,255,255,0.06)', border:'1px solid #222', padding:16, borderRadius:16}}><div style={{fontSize:20}}>📊</div><b style={{fontSize:12}}>DAILY REPORTS</b><br/><small style={{color:'#888'}}>Sales & Profit</small></div>
        </div>
      </div>
      <style>{`@keyframes float {0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
    </div>
  );
}
