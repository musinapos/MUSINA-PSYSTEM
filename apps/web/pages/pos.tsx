import { useState } from 'react'

const PRODUCTS = [
  { id: 1, name: 'Coca-Cola', price: 15, cat: 'Drinks' },
  { id: 2, name: 'Bread', price: 20, cat: 'Food' },
  { id: 3, name: 'Chips', price: 25, cat: 'Snacks' },
  { id: 4, name: 'Water', price: 10, cat: 'Drinks' },
  { id: 5, name: 'Milk', price: 28, cat: 'Food' },
  { id: 6, name: 'Sweets', price: 12, cat: 'Snacks' },
]

export default function POS() {
  const [cart, setCart] = useState<any[]>([])
  const [pin, setPin] = useState('')
  const [unlocked, setUnlocked] = useState(false)

  // PIN SCREEN BOSS
  if (!unlocked) {
    return (
      <div style={{background:'black', color:'white', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style={{background:'#111', padding:'40px', borderRadius:'20px', width:'350px', textAlign:'center', border:'1px solid #333'}}>
          <h1 style={{fontSize:'30px', fontWeight:900, marginBottom:'10px'}}>MUSINA POS BOSS 🔒</h1>
          <p style={{color:'#888', marginBottom:'20px'}}>Enter PIN BOSS: 1234</p>
          <input 
            type="password" 
            value={pin} 
            onChange={e=>setPin(e.target.value)}
            style={{width:'100%', padding:'15px', fontSize:'24px', textAlign:'center', borderRadius:'10px', background:'#222', color:'white', border:'1px solid #444', letterSpacing:'10px'}}
            placeholder="****"
          />
          <button 
            onClick={()=>{if(pin==='1234') setUnlocked(true); else alert('WRONG PIN BOSS! Try 1234'); setPin('')}}
            style={{width:'100%', marginTop:'15px', padding:'15px', background:'white', color:'black', fontWeight:900, fontSize:'18px', borderRadius:'10px', border:'none', cursor:'pointer'}}
          >
            UNLOCK BOSS
          </button>
          <a href="/" style={{display:'block', marginTop:'20px', color:'#666', textDecoration:'none'}}>← Back Home BOSS</a>
        </div>
      </div>
    )
  }

  const total = cart.reduce((s,i)=>s + i.price*i.qty, 0)

  const addToCart = (p:any) => {
    setCart(c=>{ const f=c.find(x=>x.id===p.id); if(f) return c.map(x=>x.id===p.id?{...x, qty:x.qty+1}:x); return [...c, {...p, qty:1}] })
  }

  return (
    <div style={{background:'#000', color:'white', minHeight:'100vh', padding:'20px', fontFamily:'sans-serif', display:'flex', gap:'20px'}}>
      {/* LEFT - PRODUCTS BOSS */}
      <div style={{flex:2}}>
        <h1 style={{fontSize:'30px', fontWeight:900}}>TILL LIVE BOSS 🔥</h1>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'15px', marginTop:'20px'}}>
          {PRODUCTS.map(p=>(
            <button key={p.id} onClick={()=>addToCart(p)} style={{background:'#111', border:'1px solid #333', padding:'20px', borderRadius:'15px', color:'white', textAlign:'left', cursor:'pointer'}}>
              <div style={{fontSize:'12px', color:'#888'}}>{p.cat}</div>
              <div style={{fontWeight:800, fontSize:'18px', marginTop:'5px'}}>{p.name}</div>
              <div style={{marginTop:'10px', fontWeight:900, fontSize:'20px'}}>R {p.price}</div>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT - CART BOSS */}
      <div style={{flex:1, background:'#111', borderRadius:'20px', padding:'20px', border:'1px solid #333', height:'fit-content'}}>
        <h2 style={{fontWeight:900, fontSize:'22px'}}>CART BOSS 🛒 ({cart.length})</h2>
        <div style={{marginTop:'20px', minHeight:'200px'}}>
          {cart.length===0 && <p style={{color:'#666'}}>No items BOSS - Click products BOSS!</p>}
          {cart.map(i=>(
            <div key={i.id} style={{display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #222'}}>
              <div><b>{i.name}</b> x{i.qty}</div>
              <div>R {i.price*i.qty}</div>
            </div>
          ))}
        </div>
        <div style={{borderTop:'2px solid white', marginTop:'20px', paddingTop:'20px'}}>
          <div style={{display:'flex', justifyContent:'space-between', fontSize:'28px', fontWeight:900}}>
            <span>TOTAL BOSS:</span><span>R {total}</span>
          </div>
          <button onClick={()=>{if(cart.length===0) return alert('Cart empty BOSS!'); alert(`SALE DONE BOSS! R ${total} PAID BOSS! 🔥`); setCart([])}} style={{width:'100%', marginTop:'20px', padding:'20px', background:'#22c55e', color:'black', fontWeight:900, fontSize:'20px', borderRadius:'12px', border:'none', cursor:'pointer'}}>
            PAY NOW BOSS
          </button>
          <button onClick={()=>setCart([])} style={{width:'100%', marginTop:'10px', padding:'12px', background:'#222', color:'white', borderRadius:'10px', border:'1px solid #333'}}>
            Clear BOSS
          </button>
        </div>
      </div>
    </div>
  )
}
