"use client"
import { useState, useEffect } from 'react';

const ICONS: any = {
  "Coke": "🥤", "Fanta": "🍊", "Sprite": "🍋", "Water": "💧", "Coffee": "☕",
  "Bread": "🍞", "Milk": "🥛", "Eggs": "🥚", "Sugar": "🧂", "Maize": "🌽",
  "Lays": "🍟", "Doritos": "🌮", "Chocolate": "🍫", "Nik Naks": "🥜",
  "Cigarettes": "🚬", "Airtime": "📱", "Lighter": "🔥", "Soap": "🧼"
};

function getIcon(name: string){
  for(let k in ICONS){ if(name.includes(k)) return ICONS[k]; }
  return "📦";
}

const ITEMS = [
  {id:1,name:"Coke 330 Can",price:12,stock:8},
  {id:2,name:"Coke 500ml",price:15,stock:50},
  {id:3,name:"Fanta 330 Can",price:12,stock:25},
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
    const rec=`MUSINA POS SYSTEM\n${time.toLocaleString()}\n\n${cart.map((i:any)=>`${getIcon(i.name)} ${i.name} x${i.qty} = R${i.price*i.qty}`).join("\n")}\n\nTOTAL: R${total}\nThank You!`;
    setSales([{id:Date.now(),date:time.toLocaleString(),total,items:cart.length},...sales]);
    setProducts(products.map((p:any)=>{const c=cart.find((x:any)=>x.id===p.id);return c?{...p,stock:p.stock-c.qty}:p}));
    const w=window.open("","","width=300,height=600");
    if(w){w.document.write(`<pre style="font-family:monospace">${rec}</pre>`);w.document.close();w.print();w.close();}
    setCart([]);
  };

  if(locked){
    return(
      <div style={{minHeight:'100vh',background:'#000',display:'flex',alignItems:'center',justifyContent:'center',padding:20,fontFamily:'monospace'}}>
        <div style={{background:'#111',padding:20,borderRadius:24,border:'4px solid #CCFF00',width:'100%',maxWidth:380,boxShadow:'0 0 40px #CCFF0055'}}>
          <div style={{background:'#0a0a0a',borderRadius:16,padding:20,border:'2px solid #CCFF00'}}>
            <div style={{display:'flex',justifyContent:'center',marginBottom:15}}>
              <div style={{width:60,height:60,background:'#CCFF00',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#000',fontWeight:900,fontSize:28,animation:'b 1.2s infinite'}}>P</div>
            </div>
            <h2 style={{textAlign:'center',margin:0,color:'#CCFF00',letterSpacing:2}}>MUSINA POS SYSTEM</h2>
            <p style={{textAlign:'center',fontSize:11,color:'#888'}}>{time.toLocaleString()}</p>
            <div style={{background:'black',borderRadius:10,padding:15,marginBottom:15,border:'1px solid #333'}}>
              <div style={{color:'#CCFF00',fontSize:12,marginBottom:8}}>ENTER PIN TO UNLOCK</div>
              <div style={{background:'#111',color:'#CCFF00',padding:12,borderRadius:6,fontSize:22,letterSpacing:8,textAlign:'center',minHeight:48,border:'2px inset #333'}}>{pin.replace(/./g,"•")||"----"}</div>
              {msg&&<div style={{color:msg.includes("Granted")?'#CCFF00':'#ff4444',fontSize:12,marginTop:8,textAlign:'center'}}>{msg}</div>}
              {load&&<div style={{color:'#CCFF00',fontSize:10,marginTop:8,textAlign:'center'}}>Connecting...</div>}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
              {['1','2','3','4','5','6','7','8','9','C','0','OK'].map(k=>(
                <button key={k} onClick={()=>{if(k==='C'){setPin("");setMsg("")}else if(k==='OK'){login()}else if(pin.length<6)setPin(pin+k)}} style={{padding:16,borderRadius:10,background:k==='OK'?'#CCFF00':k==='C'?'#ff2222':'#222',color:k==='OK'?'#000':k==='C'?'white':'#CCFF00',border:'2px solid #333',fontWeight:900,fontSize:18,cursor:'pointer'}}>{k}</button>
              ))}
            </div>
            <div style={{textAlign:'center',marginTop:12,fontSize:10,color:'#666'}}>PIN: 1234 or 0000 • Black & Lime System</div>
          </div>
        </div>
        <style>{`@keyframes b{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
      </div>
    );
  }

  return(
    <div style={{minHeight:'100vh',background:'#080808',fontFamily:'Arial',color:'white'}}>
      <header style={{background:'#000',padding:'14px 18px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'3px solid #CCFF00',position:'sticky',top:0,zIndex:20}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:44,height:44,background:'#CCFF00',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#000',fontWeight:900,fontSize:22,animation:'b 1.2s infinite'}}>P</div>
          <div>
            <div style={{fontWeight:900,letterSpacing:1,color:'#CCFF00'}}>MUSINA POS SYSTEM</div>
            <div style={{fontSize:11,color:'#888'}}>{time.toLocaleDateString()} • {time.toLocaleTimeString()}</div>
          </div>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <button onClick={()=>setLocked(true)} style={{padding:'8px 12px',borderRadius:20,border:'2px solid #CCFF00',background:'black',color:'#CCFF00',fontWeight:700}}>🔒 Lock</button>
          <button onClick={()=>setShowRep(true)} style={{padding:'8px 14px',borderRadius:20,border:'none',background:'#CCFF00',color:'black',fontWeight:900}}>📊 Reports</button>
          <div style={{background:'#CCFF00',color:'black',padding:'8px 16px',borderRadius:20,fontWeight:900}}>R{total}</div>
        </div>
      </header>
      {low.length>0&&<div style={{margin:12,background:'#111',border:'2px solid #CCFF00',borderRadius:12,padding:12,color:'#CCFF00'}}><b>⚠️ LOW STOCK:</b> {low.map(p=>`${getIcon(p.name)} ${p.name} (${p.stock})`).join(", ")}</div>}
      <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:16,padding:16,maxWidth:1400,margin:'0 auto'}}>
        <div>
          <div style={{display:'flex',gap:8,marginBottom:12}}>
            <input placeholder="🔍 Search product..." style={{flex:1,padding:14,borderRadius:12,border:'2px solid #333',background:'#111',color:'white'}} onChange={e=>{const v=e.target.value.toLowerCase();if(!v)setProducts(ITEMS);else setProducts(ITEMS.filter(p=>p.name.toLowerCase().includes(v)))}}/>
            <button onClick={()=>setShowAdd(true)} style={{padding:'0 18px',borderRadius:12,border:'none',background:'#CCFF00',color:'black',fontWeight:900,fontSize:22}}>+</button>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(145px,1fr))',gap:12}}>
            {products.slice(0,20).map(p=>(
              <button key={p.id} onClick={()=>add(p)} style={{background:p.stock===0?'#222':p.stock<=5?'#1a1a00':'#111',padding:'16px 12px',borderRadius:16,border:p.stock<=5?'2px solid #CCFF00':'2px solid #222',textAlign:'left',cursor:'pointer',color:'white'}}>
                <div style={{width:48,height:48,background:p.stock===0?'#333':'#CCFF00',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,marginBottom:10}}>{getIcon(p.name)}</div>
                <div style={{fontWeight:900,fontSize:13,color:p.stock<=5?'#CCFF00':'white'}}>{p.name}</div>
                <div style={{fontSize:11,color:p.stock<=5?'#CCFF00':'#888'}}>Stock: {p.stock} {p.stock<=5?'⚠️':''}</div>
                <div style={{fontWeight:900,marginTop:6,color:'#CCFF00',fontSize:16}}>R{p.price}</div>
              </button>
            ))}
          </div>
        </div>
        <div style={{background:'#111',borderRadius:16,padding:18,height:'fit-content',border:'2px solid #222',position:'sticky',top:80}}>
          <h3 style={{margin:0,color:'#CCFF00'}}>Cart ({cart.length})</h3>
          {!cart.length&&<p style={{color:'#666',textAlign:'center',padding:30}}>Empty - Tap buttons</p>}
          {cart.map((i:any)=><div key={i.id} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid #222'}}><div><div style={{fontWeight:700,fontSize:13}}>{getIcon(i.name)} {i.name}</div><div style={{fontSize:12,color:'#888'}}>R{i.price} x {i.qty}</div></div><b style={{color:'#CCFF00'}}>R{i.price*i.qty}</b></div>)}
          {cart.length>0&&<><div style={{display:'flex',justifyContent:'space-between',marginTop:16,fontWeight:900,fontSize:22,color:'#CCFF00'}}><span>TOTAL</span><span>R{total}</span></div><button onClick={pay} style={{width:'100%',marginTop:12,background:'#CCFF00',color:'black',border:'none',padding:16,borderRadius:12,fontWeight:900,fontSize:16}}>💳 PAY • PRINT</button><button onClick={()=>setCart([])} style={{width:'100%',marginTop:8,background:'#222',color:'white',border:'none',padding:12,borderRadius:12}}>Clear Cart</button></>}
        </div>
      </div>
      {showAdd&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,zIndex:99}}><div style={{background:'#111',border:'2px solid #CCFF00',borderRadius:16,padding:20,width:'100%',maxWidth:400}}><h3 style={{color:'#CCFF00'}}>Add Product</h3><input placeholder="Name" value={np.name} onChange={e=>setNp({...np,name:e.target.value})} style={{width:'100%',padding:12,borderRadius:10,border:'2px solid #333',background:'#000',color:'white',marginBottom:10}}/><input placeholder="Price" type="number" value={np.price} onChange={e=>setNp({...np,price:e.target.value})} style={{width:'100%',padding:12,borderRadius:10,border:'2px solid #333',background:'#000',color:'white',marginBottom:10}}/><input placeholder="Stock" type="number" value={np.stock} onChange={e=>setNp({...np,stock:e.target.value})} style={{width:'100%',padding:12,borderRadius:10,border:'2px solid #333',background:'#000',color:'white',marginBottom:15}}/><div style={{display:'flex',gap:10}}><button onClick={()=>setShowAdd(false)} style={{flex:1,padding:12,borderRadius:10,border:'none',background:'#222',color:'white'}}>Cancel</button><button onClick={()=>{if(!np.name||!np.price)return;setProducts([...products,{id:Date.now(),name:np.name,price:Number(np.price),stock:Number(np.stock)||50}]);setNp({name:"",price:"",stock:""});setShowAdd(false)}} style={{flex:1,padding:12,borderRadius:10,border:'none',background:'#CCFF00',color:'black',fontWeight:900}}>Add</button></div></div></div>}
      {showRep&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,zIndex:99}}><div style={{background:'#111',border:'2px solid #CCFF00',borderRadius:16,padding:20,width:'100%',maxWidth:400}}><h3 style={{color:'#CCFF00'}}>📊 MUSINA POS SYSTEM Reports {time.toLocaleDateString()}</h3><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:15}}><div style={{background:'#000',padding:15,borderRadius:12,border:'1px solid #333'}}><div style={{fontSize:12,color:'#888'}}>Today Sales</div><div style={{fontSize:22,fontWeight:900,color:'#CCFF00'}}>R{dTotal}</div></div><div style={{background:'#000',padding:15,borderRadius:12,border:'1px solid #333'}}><div style={{fontSize:12,color:'#888'}}>Transactions</div><div style={{fontSize:22,fontWeight:900,color:'#CCFF00'}}>{sales.length}</div></div></div><button onClick={()=>setShowRep(false)} style={{width:'100%',padding:12,borderRadius:10,border:'none',background:'#CCFF00',color:'black',fontWeight:900}}>Close</button></div></div>}
      <style>{`@keyframes b{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
    </div>
  );
}
