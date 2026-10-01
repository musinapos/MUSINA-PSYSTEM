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
        <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translate
