import { useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
};

const PRODUCTS: Product[] = [
  { id: 1, name: 'Coca-Cola 330ml', price: 15, stock: 48, image: 'https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=300' },
  { id: 2, name: 'White Sugar 1kg', price: 28, stock: 20, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300' },
  { id: 3, name: 'Bread Loaf', price: 18, stock: 12, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300' },
  { id: 4, name: 'Kota', price: 35, stock: 30, image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=300' },
  { id: 5, name: 'Lays Chips', price: 12, stock: 50, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300' },
  { id: 6, name: 'Milk 1L', price: 22, stock: 15, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300' },
];

export default function POS() {
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<{product: Product, qty: number}[]>([]);
  const [cash, setCash] = useState('');

  if (!unlocked) {
    return (
      <div style={{ display:'flex', minHeight:'100vh', alignItems:'center', justifyContent:'center', background:'#000', padding:20 }}>
        <div style={{ background:'white', padding:32, borderRadius:16, width:'100%', maxWidth:360, textAlign:'center' }}>
          <img src="/logo.png" alt="MUSINA POS" style={{ width:'100%', maxWidth:260, margin:'0 auto 20px auto', display:'block' }} />
          <h3 style={{margin:0, color:'#000'}}>Enter Staff PIN</h3>
          <input type="password" value={pin} onChange={e=>setPin(e.target.value)} placeholder="PIN: 1234" style={{width:'100%', padding:14, marginTop:16, borderRadius:8, border:'1px solid #ccc', fontSize:16}} />
          <button onClick={()=> pin==='1234' ? setUnlocked(true) : alert('Wrong PIN')} style={{width:'100%', padding:14, marginTop:12, background:'#0096FF', color:'white', border:'none', borderRadius:8, fontWeight:'bold', fontSize:16}}>UNLOCK POS</button>
          <p style={{fontSize:12, color:'#666', marginTop:12}}>Your Business, Our Priority</p>
        </div>
      </div>
    );
  }

  const addToCart = (p: Product) => {
    if (p.stock <= 0) return;
    const f = cart.find(c=>c.product.id===p.id);
    if (f) setCart(cart.map(c=>c.product.id===p.id ? {...c, qty:c.qty+1} : c));
    else setCart([...cart, {product:p, qty:1}]);
  };

  const total = cart.reduce((s, c)=> s + c.product.price * c.qty, 0);
  const change = Number(cash) - total;

  return (
    <div style={{ display:'flex', height:'100vh', fontFamily:'sans-serif', background:'#f8f9fa' }}>
      <div style={{ flex:3, display:'flex', flexDirection:'column' }}>
        <div style={{ background:'#000', padding:'10px 20px', display:'flex', alignItems:'center', gap:15 }}>
          <img src="/logo.png" alt="logo" style={{ height:40, objectFit:'contain' }} />
          <span style={{ color:'white', fontWeight:'bold' }}>MUSINA POS - Till</span>
          <span style={{ marginLeft:'auto', color:'#0096FF', fontSize:12 }}>CLOUD BASED • SECURE</span>
        </div>
        <div style={{ padding:20, overflowY:'auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))', gap:15 }}>
            {products.map(p=>(
              <div key={p.id} onClick={()=>addToCart(p)} style={{ background:'white', borderRadius:12, padding:10, cursor:'pointer', border: p.stock===0 ? '2px solid red' : '1px solid #e0e0e0', opacity: p.stock===0 ? 0.5 : 1 }}>
                <img src={p.image} style={{ width:'100%', height:90, objectFit:'cover', borderRadius:8 }} />
                <h4 style={{margin:'8px 0 2px 0', fontSize:13}}>{p.name}</h4>
                <p style={{margin:0, fontWeight:'bold', color:'#0096FF'}}>R{p.price}</p>
                <small style={{color: p.stock < 5 ? 'red' : '#666'}}>Stock: {p.stock}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ flex:1, padding:20, background:'white', borderLeft:'1px solid #ddd', display:'flex', flexDirection:'column' }}>
        <h3 style={{marginTop:0}}>Order</h3>
        <div style={{flex:1}}>
          {cart.length===0 && <p style={{color:'#999'}}>Tap products to add</p>}
          {cart.map(c=>(
            <div key={c.product.id} style={{ display:'flex', justifyContent:'space-between', marginBottom:10, fontSize:14 }}>
              <span>{c.product.name} x{c.qty}</span>
              <b>R{c.product.price * c.qty}</b>
            </div>
          ))}
        </div>
        <hr />
        <h2 style={{margin:'10px 0'}}>Total: R{total}</h2>
        <input value={cash} onChange={e=>setCash(e.target.value)} type="number" placeholder="Cash given" style={{width:'100%', padding:12, borderRadius:8, border:'1px solid #ccc'}} />
        {cash && <p style={{color: change>=0 ? 'green' : 'red'}}>Change: R{change>=0 ? change.toFixed(2) : '0.00'}</p>}
        <button onClick={()=>{
          if(change<0) return alert('Cash not enough');
          setProducts(products.map(p=>{
            const inCart = cart.find(c=>c.product.id===p.id);
            return inCart ? {...p, stock: p.stock - inCart.qty} : p;
          }));
          alert(`SALE OK - Change R${change.toFixed(2)}`);
          setCart([]); setCash('');
        }} disabled={cart.length===0} style={{width:'100%', padding:14, marginTop:10, background:'#0096FF', color:'white', border:'none', borderRadius:8, fontWeight:'bold'}}>PAY</button>
        <button onClick={()=>setUnlocked(false)} style={{width:'100%', padding:10, marginTop:8, background:'#eee', border:'none', borderRadius:8}}>Lock</button>
      </div>
    </div>
  );
}
