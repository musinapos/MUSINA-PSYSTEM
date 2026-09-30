import { useState, useEffect } from 'react';

type Product = { id: number; name: string; price: number; stock: number; cost: number; image: string; category: string; };
type Sale = { id: string; date: string; total: number; profit: number; items: any[]; };

const INITIAL: Product[] = [
  { id: 1, name: 'Coca-Cola 330ml', price: 15, cost: 9, stock: 48, category: 'Drinks', image: 'https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=300' },
  { id: 2, name: 'Sugar 1kg', price: 28, cost: 22, stock: 2, category: 'Retail', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300' },
  { id: 3, name: 'Bread Loaf', price: 18, cost: 12, stock: 12, category: 'Retail', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300' },
  { id: 4, name: 'Kota Special', price: 35, cost: 20, stock: 30, category: 'Food', image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=300' },
  { id: 5, name: 'Chips', price: 12, cost: 7, stock: 0, category: 'Retail', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300' },
  { id: 6, name: 'Milk 1L', price: 22, cost: 16, stock: 15, category: 'Retail', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300' },
];

export default function POS() {
  const [pin, setPin] = useState(''); const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState<'SELL'|'STOCK'|'REPORTS'>('SELL');
  const [products, setProducts] = useState<Product[]>(INITIAL);
  const [cart, setCart] = useState<{product: Product, qty: number}[]>([]);
  const [cash, setCash] = useState(''); const [sales, setSales] = useState<Sale[]>([]);
  const [boot, setBoot] = useState(true);

  useEffect(()=>{
    const s = localStorage.getItem('musina_sales'); if(s) setSales(JSON.parse(s));
    const p = localStorage.getItem('musina_products'); if(p) setProducts(JSON.parse(p));
    setTimeout(()=>setBoot(false), 2200);
  },[]);
  useEffect(()=>{ localStorage.setItem('musina_products', JSON.stringify(products)); },[products]);
  useEffect(()=>{ localStorage.setItem('musina_sales', JSON.stringify(sales)); },[sales]);

  // ANIMATED LOCK SCREEN
  if(boot ||!unlocked){
    return (
      <div style={{minHeight:'100vh', background:'radial-gradient(ellipse at center, #1a242f 0%, #050505 100%)', display:'flex', alignItems:'center', justifyContent:'center', padding:20, fontFamily:'sans-serif'}}>
        <div style={{textAlign:'center'}}>
          {boot? (
            <>
              <div style={{position:'relative', width:120, height:120, margin:'0 auto'}}>
                <div style={{position:'absolute', inset:0, border:'3px solid #111', borderTop:'3px solid #0096FF', borderRadius:'50%', animation:'spin 1s linear infinite'}}></div>
                <div style={{position:'absolute', inset:15, background:'white', borderRadius:16, padding:10, display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <img src="/logo.png" style={{width:'100%'}} />
                </div>
              </div>
              <h2 style={{color:'white', marginTop:24, letterSpacing:3}}>MUSINA POS SYSTEMS</h2>
              <p style={{color:'#0096FF', letterSpacing:5, fontSize:11, fontWeight:'bold'}}>Your Business, Our Priority</p>
              <p style={{color:'#555', marginTop:20, fontSize:12}}>Initializing Secure System...</p>
            </>
          ) : (
            <div style={{background:'rgba(20,20,20,0.95)', border:'1px solid #222', padding:36, borderRadius:24, width:360, maxWidth:'90vw', boxShadow:'0 20px 60px rgba(0,0,0,0.9)'}}>
              <div style={{background:'white', borderRadius:18, padding:14, width:120, margin:'0 auto 20px auto', boxShadow:'0 0 30px rgba(0,150,255,0.4)', animation:'float 2s ease-in-out infinite'}}>
                <img src="/logo.png" style={{width:'100%'}} />
              </div>
              <h3 style={{color:'white', margin:0}}>MUSINA POS SYSTEMS</h3>
              <p style={{color:'#0096FF', fontSize:11, letterSpacing:3, fontWeight:'bold', margin:'6px 0 24px 0'}}>Your Business, Our Priority</p>
              <input type="password" value={pin} onChange={e=>setPin(e.target.value)} placeholder="••••" style={{width:'100%', padding:16, borderRadius:12, border:'1px solid #333', background:'#0a0a0a', color:'white', fontSize:24, textAlign:'center', letterSpacing:12}} />
              <button onClick={()=> pin==='1234'? setUnlocked(true) : alert('Wrong PIN: 1234')} style={{width:'100%', padding:16, marginTop:14, background:'linear-gradient(90deg,#0096FF,#0066CC)', color:'white', border:'none', borderRadius:12, fontWeight:'900', letterSpacing:1}}>UNLOCK</button>
              <p style={{color:'#555', fontSize:11, marginTop:14}}>Demo PIN: 1234</p>
            </div>
          )}
        </div>
        <style>{`@keyframes spin {0%{transform:rotate(0)}100%{transform:rotate(360deg)}} @keyframes float {0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>
      </div>
    );
  }

  const addToCart = (p: Product) => {
    if(p.stock<=0) return alert('OUT OF STOCK'); const f = cart.find(c=>c.product.id===p.id); const q=f?f.qty:0; if(q+1>p.stock) return alert(`Only ${p.stock} left`);
    if(f) setCart(cart.map(c=>c.product.id===p.id?{...c,qty:c.qty+1}:c)); else setCart([...cart,{product:p,qty:1}]);
  };
  const total = cart.reduce((s,c)=>s+c.product.price*c.qty,0);
  const totalProfit = cart.reduce((s,c)=>s+(c.product.price-c.product.cost)*c.qty,0);
  const change = Number(cash)-total;
  const todaySales = sales.filter(s=> new Date(s.date).toDateString()===new Date().toDateString());
  const lowStock = products.filter(p=>p.stock<5);

  return (
    <div style={{display:'flex', flexDirection:'column', height:'100vh', background:'#121111', fontFamily:'sans-serif'}}>
      <div style={{background:'#0a0a0a', padding:'12px 20px', display:'flex', alignItems:'center', gap:12, borderBottom:'1px solid #222'}}>
        <div style={{background:'white', borderRadius:8, padding:'4px 8px'}}><img src="/logo.png" style={{height:34}} /></div>
        <div><div style={{color:'white', fontWeight:'900', fontSize:13}}>MUSINA POS SYSTEMS</div><div style={{color:'#0096FF', fontSize:9, letterSpacing:2}}>Your Business, Our Priority</div></div>
        <div style={{marginLeft:'auto', display:'flex', gap:8}}>
          {(['SELL','STOCK','REPORTS'] as const).map(t=><button key={t} onClick={()=>setTab(t)} style={{padding:'9px 18px', borderRadius:10, border:'1px solid', fontWeight:'bold', fontSize:12, background:tab===t?'#0096FF':'#1e1c1b', borderColor:tab===t?'#0096FF':'#333', color:'white', cursor:'pointer'}}>{t} {t==='STOCK'&&lowStock.length>0?`(${lowStock.length})`:''}</button>)}
        </div>
        <button onClick={()=>setUnlocked(false)} style={{marginLeft:8, background:'#1a1a1a', color:'#888', border:'1px solid #333', padding:'8px 12px', borderRadius:8}}>Lock</button>
      </div>

      {tab==='SELL' && (
        <div style={{display:'flex', flex:1, overflow:'hidden'}}>
          <div style={{flex:3, padding:20, overflowY:'auto', background:'#181615'}}>
            {lowStock.length>0 && <div style={{background:'#ffaa0022', border:'1px solid #ffaa00', color:'#ffaa00', padding:10, borderRadius:10, marginBottom:16, fontSize:12}}>⚠️ STOCK ALERT: {lowStock.map(p=>`${p.name} (${p.stock})`).join(', ')} - Need restock!</div>}
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(150px,1fr))', gap:14}}>
              {products.map(p=>(
                <div key={p.id} onClick={()=>addToCart(p)} style={{background:'#23211f', borderRadius:16, padding:12, border:p.stock===0?'1px solid #ff3333':p.stock<5?'1px solid #ffaa00':'1px solid #2a2a2a', opacity:p.stock===0?0.4:1, cursor:'pointer'}}>
                  <img src={p.image} style={{width:'100%', height:90, objectFit:'cover', borderRadius:10}} />
                  <div style={{color:'white', fontSize:13, fontWeight:600, marginTop:8}}>{p.name}</div>
                  <div style={{color:'#0096FF', fontWeight:'bold'}}>R{p.price}</div>
                  <div style={{fontSize:11, marginTop:4, color:p.stock===0?'#ff4444':p.stock<5?'#ffaa00':'#4CAF50'}}>● {p.stock===0?'OUT OF STOCK':p.stock<5?`LOW: ${p.stock} left`:`Stock: ${p.stock}`}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{flex:1, background:'#1e1c1b', borderLeft:'1px solid #2a2a2a', padding:18, display:'flex', flexDirection:'column'}}>
            <h3 style={{marginTop:0, color:'white'}}>Till • R{todaySales.reduce((s,x)=>s+x.total,0)} today</h3>
            <div style={{flex:1, overflowY:'auto'}}>{cart.map(c=><div key={c.product.id} style={{display:'flex', justifyContent:'space-between', marginBottom:10, fontSize:13, background:'#2a2826', padding:'8px 10px', borderRadius:8}}><span style={{color:'white'}}>{c.product.name} x{c.qty}</span><b style={{color:'white'}}>R{c.product.price*c.qty} <span onClick={()=>setCart(cart.filter(x=>x.product.id!==c.product.id))} style={{color:'#ff4444', cursor:'pointer', marginLeft:8}}>✕</span></b></div>)}{cart.length===0&&<p style={{color:'#555', textAlign:'center', marginTop:50}}>Tap products to add</p>}</div>
            <div style={{borderTop:'1px solid #333', paddingTop:12}}><h2 style={{color:'white', margin:'8px 0'}}>Total R{total}</h2><input value={cash} onChange={e=>setCash(e.target.value)} type="number" placeholder="Cash given" style={{width:'100%', padding:12, borderRadius:10, border:'1px solid #333', background:'#111', color:'white'}}/>{cash&&<div style={{marginTop:6, fontWeight:'bold', color:change>=0?'#4CAF50':'#ff4444'}}>Change R{change>=0?change.toFixed(2):'0'} | Profit R{totalProfit.toFixed(2)}</div>}<button onClick={()=>{ if(change<0) return alert('Cash not enough'); setProducts(products.map(p=>{const ic=cart.find(c=>c.product.id===p.id); return ic?{...p, stock:p.stock-ic.qty}:p;})); setSales([{id:Date.now().toString(), date:new Date().toISOString(), total, profit:totalProfit, items:cart},...sales]); alert(`SOLD! Change R${change.toFixed(2)}`); setCart([]); setCash('');}} disabled={cart.length===0} style={{width:'100%', padding:14, marginTop:10, background:'#0096FF', color:'white', border:'none', borderRadius:10, fontWeight:'bold'}}>PAY NOW</button></div>
          </div>
        </div>
      )}

      {tab==='STOCK' && (
        <div style={{padding:20, overflowY:'auto', background:'#181615', flex:1}}>
          <h2 style={{color:'white'}}>Stock Control</h2>
          <div style={{background:'#1e1c1b', borderRadius:16, overflow:'hidden', border:'1px solid #2a2a2a'}}>
            <table style={{width:'100%', borderCollapse:'collapse', color:'white'}}><thead style={{background:'#0a0a0a'}}><tr><th style={{padding:12, textAlign:'left'}}>Product</th><th>Price</th><th>Stock</th><th>Status</th><th>Action</th></tr></thead><tbody>{products.map(p=><tr key={p.id} style={{borderTop:'1px solid #2a2a2a'}}><td style={{padding:12}}>{p.name}</td><td>R{p.price}</td><td><input type="number" value={p.stock} onChange={e=>setProducts(products.map(x=>x.id===p.id?{...x, stock:Number(e.target.value)}:x))} style={{width:60, background:'#111', color:'white', border:'1px solid #333', borderRadius:6, padding:4}} /></td><td style={{color:p.stock===0?'#ff4444':p.stock<5?'#ffaa00':'#4CAF50', fontWeight:'bold'}}>{p.stock===0?'OUT':p.stock<5?'LOW':'OK'}</td><td><button onClick={()=>setProducts(products.map(x=>x.id===p.id?{...x, stock:x.stock+10}:x))} style={{padding:'6px 12px', background:'#0096FF', color:'white', border:'none', borderRadius:6}}>+10</button></td></tr>)}</tbody></table>
          </div>
        </div>
      )}

      {tab==='REPORTS' && (
        <div style={{padding:20, overflowY:'auto', background:'#181615', flex:1}}>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:20}}>
            <div style={{background:'#1e1c1b', padding:18, borderRadius:16, border:'1px solid #2a2a2a'}}><small style={{color:'#888'}}>TODAY SALES</small><h2 style={{margin:'4px 0', color:'#0096FF'}}>R{todaySales.reduce((s,x)=>s+x.total,0).toFixed(2)}</h2><small style={{color:'#666'}}>{todaySales.length} transactions</small></div>
            <div style={{background:'#1e1c1b', padding:18, borderRadius:16, border:'1px solid #2a2a2a'}}><small style={{color:'#888'}}>TODAY PROFIT</small><h2 style={{margin:'4px 0', color:'#4CAF50'}}>R{todaySales.reduce((s,x)=>s+x.profit,0).toFixed(2)}</h2><small style={{color:'#666'}}>Gross profit</small></div>
            <div style={{background:'#1e1c1b', padding:18, borderRadius:16, border:'1px solid #ffaa0022'}}><small style={{color:'#888'}}>STOCK ALERTS</small><h2 style={{margin:'4px 0', color:'#ffaa00'}}>{lowStock.length}</h2><small style={{color:'#666'}}>Need restock</small></div>
          </div>
          <div style={{background:'#1e1c1b', borderRadius:16, border:'1px solid #2a2a2a', overflow:'hidden'}}>{sales.map(s=><div key={s.id} style={{padding:14, borderBottom:'1px solid #2a2a2a', display:'flex', justifyContent:'space-between', color:'white'}}><div><b>{new Date(s.date).toLocaleTimeString()}</b> • {s.items.map((i:any)=>`${i.product.name} x${i.qty}`).join(', ')}<br/><small style={{color:'#666'}}>{new Date(s.date).toLocaleDateString()}</small></div><div style={{textAlign:'right'}}><b>R{s.total}</b><br/><small style={{color:'#4CAF50'}}>Profit R{s.profit.toFixed(2)}</small></div></div>)}{sales.length===0&&<p style={{padding:20, color:'#666'}}>No sales yet</p>}</div>
        </div>
      )}
    </div>
  );
}
