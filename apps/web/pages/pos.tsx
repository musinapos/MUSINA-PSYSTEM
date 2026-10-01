"use client"
import { useState, useEffect } from 'react';
const SHOP_NAME = "MUSINA POS SYSTEM";
const PHONE = "0680361133";
const WHATSAPP = "0799073779";
const ICONS:any={"Coke":"🥤","Fanta":"🍊","Sprite":"🍋","Water":"💧","Coffee":"☕","Bread":"🍞","Milk":"🥛","Eggs":"🥚","Sugar":"🧂","Maize":"🌽","Lays":"🍟","Doritos":"🌮","Chocolate":"🍫","Nik Naks":"🥜","Cigarettes":"🚬","Airtime":"📱","Lighter":"🔥","Soap":"🧼"};
function getIcon(n:string){for(let k in ICONS){if(n.includes(k))return ICONS[k];}return"📦";}
const ITEMS=[
  {id:1,name:"Coke 330 Can",price:12,stock:8,expiry:"2026-12-31"},
  {id:2,name:"Coke 500ml",price:15,stock:50,expiry:"2027-01-15"},
  {id:3,name:"Fanta 330",price:12,stock:25,expiry:"2026-11-20"},
  {id:4,name:"Sprite 500ml",price:15,stock:5,expiry:"2026-12-01"},
  {id:5,name:"Water 500ml",price:10,stock:100,expiry:"2027-06-01"},
  {id:6,name:"Bread White",price:18,stock:20,expiry:"2026-10-02"},
  {id:7,name:"Milk 1L",price:28,stock:3,expiry:"2026-10-04"},
  {id:8,name:"Eggs 6pk",price:35,stock:15,expiry:"2026-10-10"},
  {id:9,name:"Lays Chips",price:12,stock:60,expiry:"2027-02-01"},
  {id:10,name:"Doritos",price:18,stock:40,expiry:"2027-02-01"},
  {id:11,name:"Chocolate",price:20,stock:2,expiry:"2027-03-01"},
  {id:12,name:"Nik Naks",price:10,stock:30,expiry:"2027-01-01"},
  {id:13,name:"Cigarettes",price:45,stock:12,expiry:"2027-12-31"},
  {id:14,name:"Airtime R10",price:10,stock:999,expiry:"2028-01-01"},
  {id:15,name:"Airtime R20",price:20,stock:999,expiry:"2028-01-01"},
  {id:16,name:"Lighter",price:8,stock:50,expiry:"2028-01-01"},
];
export default function POS(){
  const [locked,setLocked]=useState(true);
  const [pin,setPin]=useState("");const [msg,setMsg]=useState("");const [load,setLoad]=useState(false);
  const [products,setProducts]=useState(ITEMS);const [cart,setCart]=useState<any[]>([]);
  const [time,setTime]=useState(new Date());const [showAdd,setShowAdd]=useState(false);
  const [showRep,setShowRep]=useState(false);const [repType,setRepType]=useState("Today");
  const [sales,setSales]=useState<any[]>([]);const [np,setNp]=useState({name:"",price:"",stock:"",expiry:""});
  const [cash,setCash]=useState("");
  useEffect(()=>{const t=setInterval(()=>setTime(new Date()),1000);return()=>clearInterval(t)},[]);
  const login=()=>{if(pin.length<4){setMsg("Enter 4 PIN");return}setLoad(true);setMsg("Verifying...");setTimeout(()=>{if(pin==="1234"||pin==="0000"){setMsg("Granted ✓");setTimeout(()=>{setLocked(false);setPin("");setMsg("");setLoad(false)},700);}else{setMsg("Wrong PIN - 1234");setLoad(false);setPin("")}},2000);};
  const add=(p:any)=>{if(p.stock<=0)return alert("Out of stock");const f=cart.find((x:any)=>x.id===p.id);if(f)setCart(cart.map((x:any)=>x.id===p.id?{...x,qty:x.qty+1}:x));else setCart([...cart,{...p,qty:1}]);};
  const total=cart.reduce((s:any,i:any)=>s+i.price*i.qty,0);
  const cashNum=Number(cash)||0;const change=cashNum-total;
  const low=products.filter(p=>p.stock<=5);const today=new Date();
  const expiring=products.filter(p=>{const diff=(new Date(p.expiry).getTime()-today.getTime())/86400000;return diff<=7&&diff>=0;});
  const dTotal=sales.reduce((s:any,i:any)=>s+i.total,0);
  const pay=()=>{
    if(!cart.length)return;
    if(cashNum < total){alert(`Customer gave R${cashNum} need R${total} short R${total-cashNum}`);return;}
    const receipt=`============================\n ${SHOP_NAME}\n ${time.toLocaleString()}\n============================\n${cart.map((i:any)=>`${getIcon(i.name)} ${i.name} x${i.qty} = R${i.price*i.qty}`).join("\n")}\n----------------------------\nSUBTOTAL: R${total.toFixed(2)}\nCASH: R${cashNum.toFixed(2)}\nCHANGE: R${change.toFixed(2)}\n============================\nCall: ${PHONE}\nWhatsApp: ${WHATSAPP}\n============================\n`;
    setSales([{id:Date.now(),date:time.toLocaleString(),total,items:cart.length,cash:cashNum,change},...sales]);
    setProducts(products.map((p:any)=>{const c=cart.find((x:any)=>x.id===p.id);return c?{...p,stock:p.stock-c.qty}:p}));
    const w=window.open("","","width=380,height=700");if(w){w.document.write(`<pre style="font-size:15px">${receipt}</pre>`);w.document.close();setTimeout(()=>{w.print();w.close();},400);}
    setCart([]);setCash("");
  };
  if(locked){
    return(<div style={{minHeight:'100vh',background:'#000',display:'flex',alignItems:'center',justifyContent:'center',padding:15}}><div style={{background:'#0d1420',padding:18,borderRadius:20,border:'3px solid #0D47A1',width:'100%',maxWidth:380}}><div style={{background:'#080d18',borderRadius:14,padding:18}}><div style={{display:'flex',justifyContent:'center',marginBottom:12}}><div style={{width:62,height:62,background:'#0D47A1',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:900,fontSize:30}}>P</div></div><h2 style={{textAlign:'center',margin:0,color:'#1565C0',fontSize:18}}>{SHOP_NAME}</h2><p style={{textAlign:'center',fontSize:12,color:'#666'}}>{time.toLocaleString()}</p><div style={{background:'#000',borderRadius:10,padding:14,marginBottom:14,border:'1px solid #222'}}><div style={{color:'#1565C0',fontSize:13,marginBottom:8,fontWeight:700}}>ENTER PIN</div><div style={{background:'#111',color:'#1565C0',padding:14,borderRadius:8,fontSize:24,letterSpacing:8,textAlign:'center'}}>{pin.replace(/./g,"•")||"----"}</div>{msg&&<div style={{color:msg.includes("Granted")?'#1565C0':'#ff4444',fontSize:13,marginTop:8,textAlign:'center'}}>{msg}</div>}</div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>{['1','2','3','4','5','6','7','8','9','C','0','OK'].map(k=><button key={k} onClick={()=>{if(k==='C'){setPin("");setMsg("")}else if(k==='OK'){login()}else if(pin.length<6)setPin(pin+k)}} style={{padding:18,borderRadius:10,background:k==='OK'?'#0D47A1':k==='C'?'#b71c1c':'#1a2332',color:'white',border:'none',fontWeight:900,fontSize:20}}>{k}</button>)}</div></div></div></div>);
  }
  return(
    <div style={{minHeight:'100vh',background:'#000',color:'white',fontFamily:'Arial'}}>
      <header style={{background:'#000',padding:12,display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'3px solid #0D47A1',position:'sticky',top:0,zIndex:20}}><div style={{display:'flex',alignItems:'center',gap:10}}><div style={{width:44,height:44,background:'#0D47A1',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900}}>P</div><div><div style={{fontWeight:900,color:'#1565C0'}}>{SHOP_NAME}</div><div style={{fontSize:11,color:'#888'}}>{time.toLocaleDateString()}</div></div></div><div style={{display:'flex',gap:6}}><button onClick={()=>setLocked(true)} style={{padding:10,borderRadius:20,border:'2px solid #0D47A1',background:'black',color:'#1565C0'}}>🔒</button><button onClick={()=>setShowRep(true)} style={{padding:'10px 14px',borderRadius:20,border:'none',background:'#0D47A1',color:'white',fontWeight:900}}>📊 REPORTS</button></div></header>
      {low.length>0&&<div style={{margin:10,background:'#b71c1c',color:'white',padding:12,borderRadius:10}}><b>🔥 RUNNING OUT:</b> {low.map(p=>`${p.name} (${p.stock})`).join(", ")}</div>}
      {expiring.length>0&&<div style={{margin:'0 10px',background:'#ff9800',color:'black',padding:12,borderRadius:10}}><b>⏰ EXPIRY SOON:</b> {expiring.map(p=>`${p.name} ${p.expiry}`).join(", ")}</div>}
      <div style={{display:'flex',flexDirection:'column',padding:10,gap:12,maxWidth:1200,margin:'0 auto'}}>
        <div style={{background:'#0d1420',borderRadius:14,padding:14,border:'2px solid #0D47A1'}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}><h3 style={{margin:0,color:'#1565C0',fontSize:20}}>🛒 Cart ({cart.reduce((s:any,i:any)=>s+i.qty,0)})</h3><b style={{background:'#0D47A1',padding:'6px 14px',borderRadius:20}}>R{total}</b></div>
          {!cart.length?<p style={{color:'#666',textAlign:'center',padding:15}}>Tap products below</p>:<>
            {cart.map((i:any)=><div key={i.id} style={{display:'flex',justifyContent:'space-between',padding:'12px 0',borderBottom:'1px solid #1a2332'}}><div><div style={{fontWeight:900,fontSize:16}}>{getIcon(i.name)} {i.name}</div><div style={{fontSize:14,color:'#888'}}>R{i.price} x {i.qty}</div></div><div><b style={{color:'#1565C0'}}>R{i.price*i.qty}</b><div><button onClick={()=>setCart(cart.filter((x:any)=>x.id!==i.id))} style={{fontSize:12,background:'#b71c1c',color:'white',border:'none',padding:'4px 8px',borderRadius:5}}>Remove</button></div></div></div>)}
            <div style={{marginTop:14,background:'#000',borderRadius:12,padding:14,border:'2px solid #0D47A1'}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:20,fontWeight:900,marginBottom:12}}><span>TOTAL</span><span style={{color:'#1565C0'}}>R{total.toFixed(2)}</span></div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}><div><label style={{fontSize:12,color:'#888'}}>CASH RECEIVED</label><input type="number" placeholder="100" value={cash} onChange={e=>setCash(e.target.value)} style={{width:'100%',padding:14,fontSize:20,fontWeight:900,borderRadius:10,border:'2px solid #0D47A1',background:'#111',color:'white',marginTop:4}}/></div><div><label style={{fontSize:12,color:'#888'}}>CHANGE</label><div style={{padding:14,fontSize:20,fontWeight:900,borderRadius:10,background:change<0?'#b71c1c':'#0D47A1',color:'white',marginTop:4,textAlign:'center'}}>R{change>=0?change.toFixed(2):'0.00'}</div></div></div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:6,marginBottom:12}}>{[20,50,100,200].map(v=><button key={v} onClick={()=>setCash(String(v))} style={{padding:10,borderRadius:8,border:'1px solid #0D47A1',background:'#111',color:'#1565C0',fontWeight:900}}>R{v}</button>)}</div>
              <button onClick={pay} disabled={cart.length===0} style={{width:'100%',background:change<0?'#555':'#0D47A1',color:'white',border:'none',padding:18,borderRadius:12,fontWeight:900,fontSize:20}}>💳 PAY • CHANGE R{change>=0?change.toFixed(2):'0.00'} • PRINT</button>
            </div>
          </>}
        </div>
        <div><div style={{display:'flex',gap:8,marginBottom:10}}><input placeholder="🔍 Search..." style={{flex:1,padding:16,borderRadius:12,border:'2px solid #1a2332',background:'#0d1420',color:'white',fontSize:16}} onChange={e=>{const v=e.target.value.toLowerCase();if(!v)setProducts(ITEMS);else setProducts(ITEMS.filter(p=>p.name.toLowerCase().includes(v)))}}/><button onClick={()=>setShowAdd(true)} style={{padding:'0 20px',borderRadius:12,border:'none',background:'#0D47A1',color:'white',fontWeight:900,fontSize:24}}>+</button></div><div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10}}>{products.map(p=><button key={p.id} onClick={()=>add(p)} style={{background:p.stock===0?'#222':'#0d1420',padding:14,borderRadius:14,border:p.stock<=2?'2px solid #b71c1c':'2px solid #1a2332',textAlign:'left',color:'white'}}><div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}><div style={{width:46,height:46,background:'#0D47A1',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>{getIcon(p.name)}</div><span style={{fontSize:11,background:p.stock<=2?'#b71c1c':'#1a2332',padding:'4px 8px',borderRadius:20}}>{p.stock} left</span></div><div style={{fontWeight:900,fontSize:15}}>{p.name}</div><div style={{fontSize:11,color:'#888'}}>Exp: {p.expiry}</div><div style={{fontWeight:900,marginTop:6,color:'#1565C0',fontSize:18}}>R{p.price}</div></button>)}</div></div>
      </div>
    </div>
  );
}
