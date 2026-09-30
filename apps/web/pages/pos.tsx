import { useState, useEffect } from 'react';

const LOGO = "/IMG-20261001-WA0691.jpg";

type Product = { id:number, name:string, price:number, stock:number, image:string, category:string };
type CartItem = { product: Product, qty:number };

export default function POS(){
  const [loading, setLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [pin, setPin] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cash, setCash] = useState('');
  const [tab, setTab] = useState('sell');

  const [products] = useState<Product[]>([
    {id:1, name:'Brown Bread', price:15, stock:45, category:'Bakery', image:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200'},
    {id:2, name:'White Bread', price:15, stock:32, category:'Bakery', image:'https://images.unsplash.com/photo-1549931319-a545dcf3d696?w=200'},
    {id:3, name:'Coke Can 330ml', price:12, stock:80, category:'Drinks', image:'https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=200'},
    {id:4, name:'Coke 1L', price:20, stock:40, category:'Drinks', image:'https://images.unsplash.com/photo-1624552163849-8300bc1c1e0c?w=200'},
    {id:5, name:'White Sugar 1kg', price:28, stock:60, category:'Grocery', image:'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200'},
    {id:6, name:'Cooking Oil 750ml', price:35, stock:25, category:'Grocery', image:'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200'},
  ]);

  useEffect(()=>{ setTimeout(()=>setLoading(false), 7000); },[]);

  const addToCart = (p:Product)=>{
    const ex = cart.find(c=>c.product.id===p.id);
    if(ex) setCart(cart.map(c=>c.product.id===p.id? {...c, qty:c.qty+1}:c));
    else setCart([...cart, {product:p, qty:1}]);
  };

  const total = cart.reduce((s,c)=>s + c.product.price * c.qty, 0);

  // LOADING - YOUR PICTURE BEAUTIFUL
  if(loading){
    return (
      <div style={{height:'100vh', background:'radial-gradient(ellipse at center, #2a221e 0%, #181615 100%)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <div style={{position:'relative', width:140, height:140, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div style={{position:'absolute', width:140, height:140, border:'3px solid #2a221e', borderTop:'3px solid #00AEEF', borderRight:'3px solid #00AEEF', borderRadius:'50%', animation:'spin 1.2s linear infinite'}}></div>
          <div style={{background:'white', borderRadius:20, padding:12, width:90, height:90, display:'flex', alignItems:'center', justifyContent:'center', zIndex:2, boxShadow:'0 0 40px #00AEEF88'}}>
            <img src={LOGO} style={{width:'100%', height:'100%', objectFit:'contain'}} alt="logo" />
          </div>
        </div>
        <h2 style={{color:'white', marginTop:28, fontWeight:900, letterSpacing:2}}>MUSINA POS SYSTEMS</h2>
        <p style={{color:'#00AEEF', letterSpacing:4, fontSize:11, fontWeight:'bold', marginTop:6}}>SMART SOLUTION</p>
        <p style={{color:'#665e58', fontSize:10, marginTop:30, letterSpacing:3}}>LOADING YOUR BEAUTIFUL STORE...</p>
        <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  // LOCK - ATM STYLE
  if(isLocked){
    return (
      <div style={{minHeight:'100vh', background:'#181615', display:'flex', alignItems:'center', justifyContent:'center', padding:16}}>
        <div style={{background:'#1f1c1a', borderRadius:28, padding:28, width:'100%', maxWidth:380, border:'1px solid #2a2624', boxShadow:'0 20px 80px #000'}}>
          <div style={{background:'white', borderRadius:18, padding:14, marginBottom:22, textAlign:'center'}}>
            <img src={LOGO} style={{height:68, width:'auto', objectFit:'contain'}} alt="logo" />
          </div>
          <h2 style={{color:'white', textAlign:'center', margin:0, fontSize:17, letterSpacing:1}}>MUSINA POS SYSTEMS</h2>
          <p style={{color:'#00AEEF', textAlign:'center', fontSize:10, letterSpacing:3, fontWeight:'bold', marginTop:6, marginBottom:24}}>Your Business, Our Priority</p>

          <div style={{background:'#0f0e0d', borderRadius:16, padding:18, border:'2px solid #2a2624', marginBottom:20, textAlign:'center'}}>
            <p style={{color:'#665e58', fontSize:10, letterSpacing:2, margin:0, marginBottom:10}}>ENTER PIN - ATM STYLE</p>
            <div style={{background:'#0a1a0a', borderRadius:10, padding:14, border:'1px solid #1a3322', minHeight:50, display:'flex', alignItems:'center', justifyContent:'center'}}>
              <span style={{color:'#00ff88', fontSize:36, letterSpacing:10, fontFamily:'monospace', fontWeight:'bold'}}>
                {pin? '•'.repeat(pin.length) : <span style={{color:'#2a3a2a', fontSize:14, letterSpacing:2}}>____</span>}
              </span>
            </div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12}}>
            {[1,2,3,4,5,6,7,8,9].map(n=>(
              <button key={n} onClick={()=>{ if(pin.length<6) setPin(pin+n.toString())}} style={{height:68, background:'#2a2624', color:'white', border:'1px solid #3a3634', borderRadius:14, fontSize:24, fontWeight:'900', cursor:'pointer'}}>{n}</button>
            ))}
            <button onClick={()=>setPin('')} style={{height:68, background:'#3a1a1a', color:'#ff6666', border:'1px solid #4a2222', borderRadius:14, fontSize:13, fontWeight:'900'}}>CLEAR</button>
            <button onClick={()=>{ if(pin.length<6) setPin(pin+'0')}} style={{height:68, background:'#2a2624', color:'white', border:'1px solid #3a3634', borderRadius:14, fontSize:24, fontWeight:'900'}}>0</button>
            <button onClick={()=>{ if(pin==='1234'){ setIsLocked(false); setPin(''); } else { alert('Wrong PIN! 1234'); setPin(''); }}} style={{height:68, background:'#00AEEF', color:'white', border:'none', borderRadius:14, fontSize:14, fontWeight:'900'}}>ENTER</button>
          </div>
        </div>
      </div>
    );
  }

  // POS MAIN - DARK CHOCOLATE FULL STYLE
  return (
    <div style={{minHeight:'100vh', background:'#181615', color:'white'}}>
      {/* TOP BAR - DARK CHOCOLATE */}
      <div style={{background:'#1f1c1a', padding:'12px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid #2a2624', position:'sticky', top:0, zIndex:10}}>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <div style={{background:'white', borderRadius:10, padding:6}}><img src={LOGO} style={{height:32}} alt="logo" /></div>
          <div><div style={{fontWeight:900, fontSize:13}}>MUSINA POS</div><div style={{color:'#00AEEF', fontSize:8, letterSpacing:2}}>SMART SOLUTION</div></div>
        </div>
        <button onClick={()=>setIsLocked(true)} style={{background:'#2a2624', color:'#aaa', border:'1px solid #3a3634', padding:'8px 14px', borderRadius:8, fontSize:11}}>LOCK</button>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1.2fr 0.8fr', gap:16, padding:16, maxWidth:1200, margin:'0 auto'}}>
        {/* PRODUCTS */}
        <div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))', gap:12}}>
            {products.map(p=>(
              <div key={p.id} onClick={()=>addToCart(p)} style={{background:'#1f1c1a', borderRadius:16, overflow:'hidden', border:'1px solid #2a2624', cursor:'pointer'}}>
                <img src={p.image} style={{width:'100%', height:90, objectFit:'cover'}} alt={p.name} />
                <div style={{padding:10}}>
                  <div style={{fontSize:12, fontWeight:'bold', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{p.name}</div>
                  <div style={{display:'flex', justifyContent:'space-between', marginTop:6}}><span style={{color:'#00AEEF', fontWeight:900, fontSize:13}}>R{p.price}</span><span style={{fontSize:10, color: p.stock<10? '#ff6666':'#665e58'}}>Stock:{p.stock}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CART - DARK CHOCOLATE */}
        <div style={{background:'#1f1c1a', borderRadius:20, padding:16, border:'1px solid #2a2624', height:'fit-content', position:'sticky', top:80}}>
          <h3 style={{margin:0, fontSize:14}}>Cart ({cart.length})</h3>
          <div style={{marginTop:12, maxHeight:300, overflowY:'auto'}}>
            {cart.length===0? <p style={{color:'#665e58', fontSize:12, textAlign:'center', padding:20}}>No items - tap product</p> :
              cart.map(c=>(
                <div key={c.product.id} style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #2a2624', fontSize:12}}>
                  <span>{c.product.name} x{c.qty}</span><span style={{color:'#00AEEF', fontWeight:'bold'}}>R{c.product.price*c.qty}</span>
                </div>
              ))
            }
          </div>
          <div style={{borderTop:'2px solid #2a2624', marginTop:12, paddingTop:12, display:'flex', justifyContent:'space-between', fontWeight:900, fontSize:18}}><span>TOTAL</span><span style={{color:'#00AEEF'}}>R{total.toFixed(2)}</span></div>
          <input value={cash} onChange={e=>setCash(e.target.value)} placeholder="Cash R" type="number" style={{width:'100%', marginTop:12, padding:12, borderRadius:10, border:'1px solid #2a2624', background:'#181615', color:'white'}} />
          <button onClick={()=>{
            const ch = Number(cash)-total;
            if(ch<0 && cart.length>0) return alert('Not enough cash');
            alert(`Sale Done! Change R${ch.toFixed(2)}`);
            setCart([]); setCash('');
          }} style={{width:'100%', marginTop:10, padding:14, background:'#00AEEF', color:'white', border:'none', borderRadius:12, fontWeight:900, fontSize:14}}>PAY R{total.toFixed(2)}</button>
        </div>
      </div>
    </div>
  );
}
