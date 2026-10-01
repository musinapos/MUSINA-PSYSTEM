"use client"
import { useState, useEffect } from 'react';

const ITEMS = [
  {id:1,name:"Coke 330 Can",price:12,stock:8},
  {id:2,name:"Coke 500ml",price:15,stock:50},
  {id:3,name:"Fanta 330",price:12,stock:25},
  {id:4,name:"Sprite 500ml",price:15,stock:5},
  {id:5,name:"Water 500ml",price:10,stock:100},
  {id:6,name:"Bread White",price:18,stock:20},
  {id:7,name:"Milk 1L",price:28,stock:3},
  {id:8,name:"Eggs 6pk",price:35,stock:15},
  {id:9,name:"Lays Chips",price:12,stock:60},
  {id:10,name:"Doritos",price:18,stock:40},
  {id:11,name:"Chocolate",price:20,stock:2},
  {id:12,name:"Nik Naks",price:10,stock:30},
  {id:13,name:"Cigarettes",price:45,stock:12},
  {id:14,name:"Airtime R10",price:10,stock:999},
  {id:15,name:"Airtime R20",price:20,stock:999},
  {id:16,name:"Lighter",price:8,stock:50},
  {id:17,name:"Coffee",price:25,stock:18},
  {id:18,name:"Sugar 1kg",price:32,stock:22},
  {id:19,name:"Maize 5kg",price:85,stock:10},
  {id:20,name:"Soap",price:15,stock:7},
];

export default function POS(){
  const [locked,setLocked]=useState(true);
  const [pin,setPin]=useState("");
  const [msg,setMsg]=useState("");
  const [load,setLoad]=useState(false);
  const [products,setProducts]=useState(ITEMS);
  const [cart,setCart]=useState<any[]>([]);
  const [time,setTime]=useState(new Date());
  const [showAdd,setShowAdd]=useState(false);
  const [showRep,setShowRep]=useState(false);
  const [sales,setSales]=useState<any[]>([]);
  const [np,setNp]=useState({name:"",price:"",stock:""});

  useEffect(()=>{const t=setInterval(()=>setTime(new Date()),1000);return()=>clearInterval(t)},[]);

  const login=()=>{
    if(pin.length<4){setMsg("Enter 4 PIN");return}
    setLoad(true);setMsg("Verifying...");
    setTimeout(()=>{
      if(pin==="1234"||pin==="0000"){
        setMsg("Granted ✓");
        setTimeout(()=>{setLocked(false);setPin("");setMsg("");setLoad(false)},700);
      }else{setMsg("Wrong PIN - Try 1234");setLoad(false);setPin("")}
    },2500);
  };

  const add=(p:any)=>{
    if(p.stock<=0)return alert("Out of stock");
    const f=cart.find((x:any)=>x.id===p.id);
    if(f)setCart(cart.map((x:any)=>x.id===p.id?{...x,qty:x.qty+1}:x));
    else setCart([...cart,{...p,qty:1}]);
  };

  const total=cart.reduce((s:any,i:any)=>s+i.price*i.qty,0);
  const low=products.filter(p=>p.stock<=10);
  const dTotal=sales.reduce((s:any,i:any)=>s+i.total,0);

  const pay=()=>{
    if(!cart.length)return;
    const rec=`RECEIPT ${time.toLocaleString()} ${cart.map((i:any)=>`${i.name} x${i.qty} R${i.price*i.qty}`).join(" ")} TOTAL R${total}`;
    setSales([{id:Date.now(),date:time.toLocaleString(),total,items:cart.length},...sales]);
    setProducts(products.map((p:any)=>{const c=cart.find((x:any)=>x.id===p.id);return c?{...p,stock:p.stock-c.qty}:p}));
    const w=window.open("","","width=300,height=500");
    if(w){w.document.write(`<pre>${rec}</pre>`);w.document.close();w.print();w.close();}
    setCart([]);
    alert("Paid R"+total);
  };

  if(locked){
    return(
      <div style={{minHeight:'100vh',background:'#3e2723',display:'flex',alignItems:'center',justifyContent:'center',padding:20,fontFamily:'monospace'}}>
        <div style={{background:'#5d4037',padding:20,borderRadius:24,width:'100%',maxWidth:380}}>
          <div style={{background:'#efebe9',borderRadius:16,padding:20}}>
            <div style={{display:'flex',justifyContent:'center',marginBottom:15}}>
              <div style={{width:56,height:56,background:'#3e2723',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#d7ccc8',fontWeight:900,fontSize:26,animation:'b 1.2s infinite'}}>P</div>
            </div>
            <h2 style={{textAlign:'center',margin:0,color:'#3e2723'}}>POS TERMINAL</h2>
            <p style={{textAlign:'center',fontSize:12}}>{time.toLocaleString()}</p>
            <div style={{background:'black',borderRadius:10,padding:15,marginBottom:15}}>
              <div style={{color:'#4caf50',fontSize:12}}>ENTER PIN</div>
              <div style={{background:'#111',color:'#4caf50',padding:12,borderRadius:6,fontSize:20,letterSpacing:8,textAlign:'center',minHeight:48}}>{pin.replace(/./g,"•")||"----"}</div>
              {msg&&<div style={{color:msg.includes("Granted")?'#4caf50':'#ff5252',fontSize:12,marginTop:8,textAlign:'center'}}>{msg}</div>}
              {load&&<div style={{color:'#4caf50',fontSize:10,marginTop:8,textAlign:'center'}}>Connecting...</div>}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
              {['1','2','3','4','5','6','7','8','9','C','0','OK'].map(k=>(
                <button key={k} onClick={()=>{if(k==='C'){setPin("");setMsg("")}else if(k==='OK'){login()}else if(pin.length<6)setPin(pin+k)}} style={{padding:16,borderRadius:8,background:k==='OK'?'#4caf50':k==='C'?'#ff5252':'#d7ccc8',color:k==='OK'||k==='C'?'white':'#3e2723',border:'none',fontWeight:900,fontSize:18,cursor:'pointer'}}>{k}</button>
              ))}
            </div>
            <div style={{textAlign:'center',marginTop:10,fontSize:10}}>PIN: 1234 or 0000</div>
          </div>
        </div>
        <style>{`@keyframes b{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>
      </div>
    );
  }

  return(
    <div style={{minHeight:'100vh',background:'#f2f2f2',fontFamily:'Arial'}}>
      <header style={{background:'white',padding:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:40,height:40,background:'#3e2723',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:900,animation:'b 1.2s infinite'}}>P</div>
          <div><b>POS SYSTEM</b><div style={{fontSize:11}}>{time.toLocaleString()}</div></div>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button onClick={()=>setLocked(true)} style={{padding:'8px 12px',borderRadius:20,border:'1px solid #3e2723',background:'white'}}>🔒</button>
          <button onClick={()=>setShowRep(true)} style={{padding:'8px 14px',borderRadius:20,border:'none',background:'#3e2723',color:'white',fontWeight:700}}>📊 Reports</button>
          <div style={{background:'#3e2723',color:'white',padding:'8px 14px',borderRadius:20,fontWeight:900}}>R{total}</div>
        </div>
      </header>
      {low.length>0&&<div style={{margin:12,background:'#fff3e0',border:'2px solid orange',borderRadius:12,padding:12}}><b>⚠️ LOW STOCK:</b> {low.map(p=>`${p.name} (${p.stock})`).join(", ")}</div>}
      <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:16,padding:16,maxWidth:1400,margin:'0 auto'}}>
        <div>
          <div style={{display:'flex',gap:8,marginBottom:12}}>
            <input placeholder="Search..." style={{flex:1,padding:14,borderRadius:12,border:'2px solid #ddd'}} onChange={e=>{const v=e.target.value.toLowerCase();if(!v)setProducts(ITEMS);else setProducts(ITEMS.filter(p=>p.name.toLowerCase().includes(v)))}}/>
            <button onClick={()=>setShowAdd(true)} style={{padding:'0 18px',borderRadius:12,border:'none',background:'#3e2723',color:'white',fontWeight:900,fontSize:20}}>+</button>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:12}}>
            {products.slice(0,20).map(p=>(
              <button key={p.id} onClick={()=>add(p)} style={{background:p.stock===0?'#eee':p.stock<=5?'#ffebee':'white',padding:'16px 12px',borderRadius:16,border:p.stock<=5?'2px solid red':'none',textAlign:'left',cursor:'pointer'}}>
                <div style={{width:40,height:40,background:p.stock===0?'#999':'#3e2723',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:900,marginBottom:8}}>{p.name[0]}</div>
                <div style={{fontWeight:900,fontSize:13}}>{p.name}</div>
                <div style={{fontSize:11,color:p.stock<=5?'red':'#666'}}>Stock: {p.stock}</div>
                <div style={{fontWeight:900,marginTop:6}}>R{p.price}</div>
              </button>
            ))}
          </div>
        </div>
        <div style={{background:'white',borderRadius:16,padding:18,height:'fit-content'}}>
          <h3 style={{margin:0}}>Cart ({cart.length})</h3>
          {!cart.length&&<p style={{color:'#999',textAlign:'center',padding:30}}>Empty - Tap buttons</p>}
          {cart.map((i:any)=><div key={i.id} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #eee'}}><div><b style={{fontSize:13}}>{i.name}</b><div style={{fontSize:12}}>R{i.price} x {i.qty}</div></div><b>R{i.price*i.qty}</b></div>)}
          {cart.length>0&&<><div style={{display:'flex',justifyContent:'space-between',marginTop:16,fontWeight:900,fontSize:20}}><span>TOTAL</span><span>R{total}</span></div><button onClick={pay} style={{width:'100%',marginTop:12,background:'#3e2723',color:'white',border:'none',padding:16,borderRadius:12,fontWeight:900}}>PAY • PRINT</button><button onClick={()=>setCart([])} style={{width:'100%',marginTop:8,background:'#f5f5f5',border:'none',padding:12,borderRadius:12}}>Clear</button></>}
        </div>
      </div>
      {showAdd&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,zIndex:99}}><div style={{background:'white',borderRadius:16,padding:20,width:'100%',maxWidth:400}}><h3>Add Product</h3><input placeholder="Name" value={np.name} onChange={e=>setNp({...np,name:e.target.value})} style={{width:'100%',padding:12,borderRadius:10,border:'2px solid #ddd',marginBottom:10}}/><input placeholder="Price" type="number" value={np.price} onChange={e=>setNp({...np,price:e.target.value})} style={{width:'100%',padding:12,borderRadius:10,border:'2px solid #ddd',marginBottom:10}}/><input placeholder="Stock" type="number" value={np.stock} onChange={e=>setNp({...np,stock:e.target.value})} style={{width:'100%',padding:12,borderRadius:10,border:'2px solid #ddd',marginBottom:15}}/><div style={{display:'flex',gap:10}}><button onClick={()=>setShowAdd(false)} style={{flex:1,padding:12,borderRadius:10,border:'none',background:'#eee'}}>Cancel</button><button onClick={()=>{if(!np.name||!np.price)return;setProducts([...products,{id:Date.now(),name:np.name,price:Number(np.price),stock:Number(np.stock)||50}]);setNp({name:"",price:"",stock:""});setShowAdd(false)}} style={{flex:1,padding:12,borderRadius:10,border:'none',background:'#3e2723',color:'white',fontWeight:900}}>Add</button></div></div></div>}
      {showRep&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,zIndex:99}}><div style={{background:'white',borderRadius:16,padding:20,width:'100%',maxWidth:400}}><h3>📊 Daily Reports {time.toLocaleDateString()}</h3><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:15}}><div style={{background:'#f5f5f5',padding:15,borderRadius:12}}><div style={{fontSize:12}}>Today Sales</div><div style={{fontSize:22,fontWeight:900}}>R{dTotal}</div></div><div style={{background:'#f5f5f5',padding:15,borderRadius:12}}><div style={{fontSize:12}}>Transactions</div><div style={{fontSize:22,fontWeight:900}}>{sales.length}</div></div></div><button onClick={()=>setShowRep(false)} style={{width:'100%',padding:12,borderRadius:10,border:'none',background:'#3e2723',color:'white',fontWeight:900}}>Close</button></div></div>}
      <style>{`@keyframes b{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>
    </div>
  );
}
