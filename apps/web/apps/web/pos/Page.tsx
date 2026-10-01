"use client"
import { useState, useEffect, useRef } from 'react';

const INITIAL = [
  { id:1, name:"Coke 330 Can", price:12, stock:8, cat:"Drinks", barcode:"5449000001" },
  { id:2, name:"Coke 500ml", price:15, stock:50, cat:"Drinks", barcode:"5449000002" },
  { id:3, name:"Fanta 330 Can", price:12, stock:25, cat:"Drinks", barcode:"5449000003" },
  { id:4, name:"Sprite 500ml", price:15, stock:5, cat:"Drinks", barcode:"5449000004" },
  { id:5, name:"Water 500ml", price:10, stock:100, cat:"Drinks", barcode:"5449000005" },
  { id:6, name:"Bread White", price:18, stock:20, cat:"Food", barcode:"600100001" },
  { id:7, name:"Milk 1L", price:28, stock:3, cat:"Food", barcode:"600100002" },
  { id:8, name:"Eggs 6pk", price:35, stock:15, cat:"Food", barcode:"600100003" },
  { id:9, name:"Lays Chips", price:12, stock:60, cat:"Snacks", barcode:"600200001" },
  { id:10, name:"Doritos", price:18, stock:40, cat:"Snacks", barcode:"600200002" },
  { id:11, name:"Chocolate", price:20, stock:2, cat:"Snacks", barcode:"600200003" },
  { id:12, name:"Nik Naks", price:10, stock:30, cat:"Snacks", barcode:"600200004" },
  { id:13, name:"Cigarettes", price:45, stock:12, cat:"Other", barcode:"600300001" },
  { id:14, name:"Airtime R10", price:10, stock:999, cat:"Other", barcode:"600300002" },
  { id:15, name:"Airtime R20", price:20, stock:999, cat:"Other", barcode:"600300003" },
  { id:16, name:"Lighter", price:8, stock:50, cat:"Other", barcode:"600300004" },
  { id:17, name:"Coffee", price:25, stock:18, cat:"Drinks", barcode:"5449000006" },
  { id:18, name:"Sugar 1kg", price:32, stock:22, cat:"Food", barcode:"600100004" },
  { id:19, name:"Maize 5kg", price:85, stock:10, cat:"Food", barcode:"600100005" },
  { id:20, name:"Soap", price:15, stock:7, cat:"Other", barcode:"600300005" },
];

export default function POS() {
  const [isLocked, setIsLocked] = useState(true);
  const [pin, setPin] = useState("");
  const [loginMsg, setLoginMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState(INITIAL);
  const [cart, setCart] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [time, setTime] = useState(new Date());
  const [showAdd, setShowAdd] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [newProd, setNewProd] = useState({name:"", price:"", stock:""});
  const [sales, setSales] = useState<any[]>([]);

  useEffect(()=>{ const t=setInterval(()=>setTime(new Date()),1000); return ()=>clearInterval(t); },[]);

  const handleLogin = () => {
    if(pin.length < 4) { setLoginMsg("Enter 4 digit PIN"); return; }
    setIsLoading(true);
    setLoginMsg("Verifying...");
    setTimeout(()=>{
      if(pin === "1234" || pin === "0000") {
        setLoginMsg("Access Granted ✓");
        setTimeout(()=>{
          setIsLocked(false);
          setPin("");
          setLoginMsg("");
          setIsLoading(false);
        }, 800);
      } else {
        setLoginMsg("Wrong PIN - Try 1234");
        setIsLoading(false);
        setPin("");
      }
    }, 2500);
  };

  const addToCart = (p:any)=>{
    if(p.stock<=0) return alert("Out of stock!");
    const f=cart.find((i:any)=>i.id===p.id);
    if(f) setCart(cart.map((i:any)=>i.id===p.id?{...i,qty:i.qty+1}:i));
    else setCart([...cart,{...p,qty:1}]);
  };

  const total=cart.reduce((s:any,i:any)=>s+i.price*i.qty,0);
  const lowStock=products.filter(p=>p.stock<=10 && p.stock>0);
  const outStock=products.filter(p=>p.stock===0);
  const dailyTotal=sales.reduce((s:any,i:any)=>s+i.total,0);

  const pay = ()=>{
    if(cart.length===0) return;
    const receipt=`=== POS RECEIPT ===\nDate: ${time.toLocaleString()}\n\n${cart.map((i:any)=>`${i.name} x${i.qty} = R${(i.price*i.qty).toFixed(2)}`).join('\n')}\n\nTOTAL: R${total.toFixed(2)}\nThank you!`;
    const newSale={id:Date.now(), date:time.toLocaleString(), total, items:cart.length};
    setSales([newSale,...sales]);
    setProducts(products.map((p:any)=>{
      const c=cart.find((i:any)=>i.id===p.id);
      return c? {...p, stock: p.stock - c.qty}: p;
    }));
    const w=window.open("","","width=300,height=600");
    if(w){
      w.document.write(`<pre style="font-family:monospace">${receipt}</pre>`);
      w.document.close();
      w.focus();
      w.print();
      w.close();
    }
    setCart([]);
  };

  if(isLocked) {
    return (
      <div style={{minHeight:'100vh', background:'#3e2723', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'monospace', padding:'20px'}}>
        <div style={{background:'#5d4037', padding:'20px', borderRadius:'24px', border:'8px solid #3e2723', boxShadow:'0 20px 60px rgba(0,0,0,0.6)', width:'100%', maxWidth:'380px'}}>
          <div style={{background:'#8d6e63', height:'12px', borderRadius:'6px', marginBottom:'15px'}}></div>
          <div style={{background:'#efebe9', borderRadius:'16px', padding:'20px', border:'4px solid #3e2723'}}>
            <div style={{display:'flex', justifyContent:'center', marginBottom:'15px'}}>
              <div style={{width:'56px', height:'56px', background:'#3e2723', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#d7ccc8', fontWeight:900, fontSize:'26px', animation:'bounce 1.2s infinite', border:'3px solid #8d6e63'}}>P</div>
            </div>
            <h2 style={{textAlign:'center', margin:'0 0 5px', fontWeight:900, color:'#3e2723', letterSpacing:'2px'}}>POS TERMINAL</h2>
            <p style={{textAlign:'center', margin:'0 0 20px', fontSize:'12px', color:'#8d6e63'}}>{time.toLocaleDateString()} • {time.toLocaleTimeString()}</p>
            <div style={{background:'black', borderRadius:'10px', padding:'15px', marginBottom:'15px'}}>
              <div style={{color:'#4caf50', fontSize:'12px', marginBottom:'8px'}}>ENTER PIN TO UNLOCK</div>
              <div style={{background:'#111', color:'#4caf50', padding:'12px', borderRadius:'6px', fontSize:'20px', letterSpacing:'8px', textAlign:'center', minHeight:'48px', border:'2px inset #333'}}>
                {pin.replace(/./g, "•") || "----"}
              </div>
              {loginMsg && <div style={{color: loginMsg.includes('Granted')?'#4caf50':'#ff5252', fontSize:'12px', marginTop:'8px', textAlign:'center'}}>{loginMsg}</div>}
              {isLoading && <div style={{color:'#4caf50', fontSize:'10px', marginTop:'8px', textAlign:'center'}}>Please wait... Connecting...</div>}
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px'}}>
              {['1','2','3','4','5','6','7','8','9','C','0','OK'].map(k=>(
                <button key={k} onClick={()=>{
                  if(k==='C'){ setPin(""); setLoginMsg(""); }
                  else if(k==='OK'){ handleLogin(); }
                  else if(pin.length<6){ setPin(pin+k); }
                }} style={{
                  padding:'16px', borderRadius:'8px',
                  background: k==='OK'?'#4caf50': k==='C'?'#ff5252':'#d7ccc8',
                  color: k==='OK'||k==='C'?'white':'#3e2723',
                  border:'3px outset #8d6e63', fontWeight:900, fontSize:'18px', cursor:'pointer',
                  boxShadow:'0 4px 0 #3e2723'
                }}>{k}</button>
              ))}
            </div>
            <div style={{textAlign:'center', marginTop:'15px', fontSize:'10px', color:'#8d6e63'}}>
              Default PIN: 1234 or 0000<br/>ATM Secure System v2.0
            </div>
          </div>
          <div style={{background:'#8d6e63', height:'20px', borderRadius:'0 0 12px 12px', marginTop:'15px', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px'}}>
            <div style={{width:'40px', height:'6px', background:'#3e2723', borderRadius:'3px'}}></div>
            <div style={{width:'40px', height:'6px', background:'#3e2723', borderRadius:'3px'}}></div>
          </div>
        </div>
        <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>
      </div>
    );
  }

  return (
    <div style={{minHeight:'100vh', background:'#f2f2f2', fontFamily:'Arial'}}>
      <header style={{background:'white', padding:'12px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', boxShadow:'0 2px 10px rgba(0,0,0,0.1)', position:'sticky', top:0, zIndex:20}}>
        <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
          <div style={{width:'44px', height:'44px', background:'#3e2723', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#d7ccc8', fontWeight:900, fontSize:'22px', animation:'bounce 1.2s infinite'}}>P</div>
          <div>
            <h1 style={{margin:0, fontSize:'18px', fontWeight:900}}>POS SYSTEM</h1>
            <div style={{fontSize:'11px', color:'#666'}}>{time.toLocaleDateString()} • {time.toLocaleTimeString()}</div>
          </div>
        </div>
        <div style={{display:'flex', gap:'8px'}}>
          <button onClick={()=>setIsLocked(true)} style={{padding:'8px 12px', borderRadius:'20px', border:'2px solid #3e2723', background:'white', fontWeight:700, cursor:'pointer'}}>🔒 Lock</button>
          <button onClick={()=>setShowReport(true)} style={{padding:'8px 14px', borderRadius:'20px', border:'none', background:'#3e2723', color:'white', fontWeight:700, cursor:'pointer'}}>📊 Reports</button>
          <div style={{background:'#3e2723', color:'white', padding:'8px 16px', borderRadius:'20px', fontWeight:900}}>R{total.toFixed(2)}</div>
        </div>
      </header>
      <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>
      {(lowStock.length>0 || outStock.length>0) && (
        <div style={{margin:'12px 18px', background:outStock.length?'#ffebee':'#fff3e0', border:`2px solid ${outStock.length?'#f44336':'#ff9800'}`, borderRadius:'12px', padding:'12px'}}>
          <b>⚠️ STOCK ALERT:</b> {outStock.length>0 && <span style={{color:'red'}}> {outStock.length} OUT! </span>}
          {lowStock.length>0 && <span> {lowStock.length} low: {lowStock.map(p=>p.name).join(', ')} </span>}
        </div>
      )}
      <div style={{display:'grid', gridTemplateColumns:'1fr 380px', gap:'16px', padding:'16px', maxWidth:'1400px', margin:'0 auto'}}>
        <div>
          <div style={{display:'flex', gap:'8px', marginBottom:'12px'}}>
            <input placeholder="🔍 Search..." value={search} onChange={e=>setSearch(e.target.value)} style={{flex:1, padding:'14px', borderRadius:'12px', border:'2px solid #ddd', fontSize:'16px'}}/>
            <button onClick={()=>setShowAdd(true)} style={{padding:'0 18px', borderRadius:'12px', border:'none', background:'#3e2723', color:'white', fontWeight:900, cursor:'pointer', fontSize:'20px'}}>+</button>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(150px, 1fr))', gap:'12px'}}>
            {products.filter(p=>p.name.toLowerCase().includes(search.toLowerCase())).slice(0,20).map(p=>(
              <button key={p.id} onClick={()=>addToCart(p)} style={{background: p.stock===0?'#eee': p.stock<=5?'#ffebee':'white', padding:'18px 12px', borderRadius:'16px', border: p.stock<=5?'2px solid red':'2px solid transparent', cursor: p.stock===0?'not-allowed':'pointer', textAlign:'left', boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
                <div style={{width:'48px', height:'48px', background:p.stock===0?'#999':'#3e2723', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:900, marginBottom:'10px'}}>{p.name[0]}</div>
                <div style={{fontWeight:900, fontSize:'14px'}}>{p.name}</div>
                <div style={{fontSize:'11px', color:p.stock<=5?'red':'#666', fontWeight:700}}>Stock: {p.stock} {p.stock<=5?'⚠️':''}</div>
                <div style={{fontWeight:900, fontSize:'18px', marginTop:'6px'}}>R{p.price}</div>
              </button>
            ))}
          </div>
        </div>
        <div style={{background:'white', borderRadius:'16px', padding:'18px', height:'fit-content', position:'sticky', top:'80px', boxShadow:'0 4px 20px rgba(0,0,0,0.08)'}}>
          <h2 style={{margin:0, fontWeight:900}}>Cart ({cart.length})</h2>
          {cart.length===0 && <p style={{color:'#999', textAlign:'center', padding:'30px 0'}}>Cart empty</p>}
          {cart.map((item:any)=>(
            <div key={item.id} style={{display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #eee'}}>
              <div><div style={{fontWeight:700, fontSize:'14px'}}>{item.name}</div><div style={{fontSize:'12px', color:'#666'}}>R{item.price} x {item.qty}</div></div>
              <div style={{fontWeight:900}}>R{(item.price*item.qty).toFixed(2)}</div>
            </div>
          ))}
          {cart.length>0 && <>
            <div style={{display:'flex', justifyContent:'space-between', marginTop:'16px', fontWeight:900, fontSize:'20px'}}><span>TOTAL</span><span>R{total.toFixed(2)}</span></div>
            <button onClick={pay} style={{width:'100%', marginTop:'12px', background:'#3e2723', color:'white', border:'none', padding:'16px', borderRadius:'12px', fontWeight:900, fontSize:'16px', cursor:'pointer'}}>💳 PAY • PRINT RECEIPT</button>
            <button onClick={()=>setCart([])} style={{width:'100%', marginTop:'8px', background:'#f5f5f5', border:'none', padding:'12px', borderRadius:'12px', fontWeight:700, cursor:'pointer'}}>Clear</button>
          </>}
        </div>
      </div>
      {showAdd && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:99, padding:'20px'}}>
          <div style={{background:'white', borderRadius:'16px', padding:'20px', width:'100%', maxWidth:'400px'}}>
            <h3 style={{margin:'0 0 15px', fontWeight:900}}>Add Product</h3>
            <input placeholder="Name" value={newProd.name} onChange={e=>setNewProd({...newProd, name:e.target.value})} style={{width:'100%', padding:'12px', borderRadius:'10px', border:'2px solid #ddd', marginBottom:'10px'}}/>
            <input placeholder="Price" type="number" value={newProd.price} onChange={e=>setNewProd({...newProd, price:e.target.value})} style={{width:'100%', padding:'12px', borderRadius:'10px', border:'2px solid #ddd', marginBottom:'10px'}}/>
            <input placeholder="Stock" type="number" value={newProd.stock} onChange={e=>setNewProd({...newProd, stock:e.target.value})} style={{width:'100%', padding:'12px', borderRadius:'10px', border:'2px solid #ddd', marginBottom:'15px'}}/>
            <div style={{display:'flex', gap:'10px'}}>
              <button onClick={()=>setShowAdd(false)} style={{flex:1, padding:'12px', borderRadius:'10px', border:'none', background:'#eee', fontWeight:700}}>Cancel</button>
              <button onClick={()=>{ if(!newProd.name||!newProd.price) return; setProducts([...products, {id:Date.now(), name:newProd.name, price:Number(newProd.price), stock:Number(newProd.stock)||50, cat:"Custom", barcode:String(Date.now())}]); setNewProd({name:"", price:"", stock:""}); setShowAdd(false); }} style={{flex:1, padding:'12px', borderRadius:'10px', border:'none', background:'#3e2723', color:'white', fontWeight:900}}>Add</button>
            </div>
          </div>
        </div>
      )}
      {showReport && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:99, padding:'20px'}}>
          <div style={{background:'white', borderRadius:'16px', padding:'20px', width:'100%', maxWidth:'500px', maxHeight:'80vh', overflow:'auto'}}>
            <h3 style={{margin:'0 0 15px', fontWeight:900}}>📊 Daily Reports - {time.toLocaleDateString()}</h3>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'15px'}}>
              <div style={{background:'#f5f5f5', padding:'15px', borderRadius:'12px'}}><div style={{fontSize:'12px', color:'#666'}}>Today Sales</div><div style={{fontSize:'22px', fontWeight:900}}>R{dailyTotal.toFixed(2)}</div></div>
              <div style={{background:'#f5f5f5', padding:'15px', borderRadius:'12px'}}><div style={{fontSize:'12px', color:'#666'}}>Transactions</div><div style={{fontSize:'22px', fontWeight:900}}>{sales.length}</div></div>
            </div>
            <button onClick={()=>setShowReport(false)} style={{width:'100%', padding:'12px', borderRadius:'10px', border:'none', background:'#3e2723', color:'white', fontWeight:900}}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
