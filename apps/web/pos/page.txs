"use client"
import { useState, useEffect } from "react"

export default function POS(){
  const [step, setStep] = useState<"splash"|"login"|"till">("splash")
  const [pin, setPin] = useState("")
  const [user, setUser] = useState("")
  const [cart, setCart] = useState<any[]>([])

  const products = [
    {id:1, name:"Milk", price:22.50},
    {id:2, name:"Bread", price:18.00},
    {id:3, name:"Coke 500ml", price:20.00},
    {id:4, name:"Sugar 1kg", price:35.00},
    {id:5, name:"Airtime R20", price:20.00},
    {id:6, name:"Eggs 6s", price:28.00},
  ]

  useEffect(()=>{ setTimeout(()=>setStep("login"), 2500) },[])

  const login = ()=>{
    if(pin==="1234"){ setUser("Cashier"); setStep("till") }
    else if(pin==="0000"){ setUser("BOSS"); setStep("till") }
    else alert("Wrong PIN BOSS! Use 1234 or 0000")
    setPin("")
  }

  const addToCart = (p:any)=>{
    const found = cart.find(c=>c.id===p.id)
    if(found) setCart(cart.map(c=>c.id===p.id?{...c, qty:c.qty+1}:c))
    else setCart([...cart, {...p, qty:1}])
  }

  const total = cart.reduce((s,i)=>s+(i.price*i.qty),0)

  // 1. SPLASH BOSS
  if(step==="splash"){
    return (
      <div style={{background:'#020617', height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'white', fontFamily:'system-ui'}}>
        <div style={{width:'280px', height:'180px', background:'linear-gradient(135deg,#0ea5e9,#0284c7)', borderRadius:'24px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'60px', boxShadow:'0 0 80px #0ea5e9'}}>💳</div>
        <h1 style={{fontSize:'42px', fontWeight:900, marginTop:'24px'}}>MUSINA <span style={{color:'#0ea5e9'}}>POS</span></h1>
        <p style={{color:'#0ea5e9', letterSpacing:'4px', fontWeight:700, fontSize:'12px'}}>YOUR BUSINESS OUR PRIORITY</p>
        <p style={{marginTop:'20px', color:'#475569', fontSize:'13px'}}>Loading till...</p>
      </div>
    )
  }

  // 2. LOGIN BOSS
  if(step==="login"){
    return (
      <div style={{background:'#0f172a', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'system-ui'}}>
        <div style={{background:'white', padding:'32px', borderRadius:'24px', width:'320px', textAlign:'center'}}>
          <h2 style={{fontWeight:900, fontSize:'22px'}}>Enter PIN</h2>
          <p style={{color:'#64748b', fontSize:'12px', margin:'8px 0'}}>1234 = Cashier | 0000 = Boss</p>
          <div style={{fontSize:'32px', letterSpacing:'8px', margin:'20px 0', fontWeight:900}}>{pin ? "•".repeat(pin.length) : "----"}</div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px'}}>
            {[1,2,3,4,5,6,7,8,9].map(n=>(
              <button key={n} onClick={()=>setPin(pin+n.toString())} style={{padding:'18px', fontSize:'20px', fontWeight:800, borderRadius:'14px', border:'1px solid #e2e8f0', background:'#f8fafc'}}>{n}</button>
            ))}
            <button onClick={()=>setPin("")} style={{padding:'18px', borderRadius:'14px', border:'1px solid #e2e8f0'}}>C</button>
            <button onClick={()=>setPin(pin+"0")} style={{padding:'18px', fontSize:'20px', fontWeight:800, borderRadius:'14px', border:'1px solid #e2e8f0', background:'#f8fafc'}}>0</button>
            <button onClick={login} style={{padding:'18px', borderRadius:'14px', background:'#0ea5e9', color:'white', fontWeight:900}}>OK</button>
          </div>
        </div>
      </div>
    )
  }

  // 3. TILL BOSS - REAL SELLING
  return (
    <div style={{display:'flex', height:'100vh', fontFamily:'system-ui', background:'#f1f5f9'}}>
      {/* LEFT PRODUCTS */}
      <div style={{flex:1, padding:'16px', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px', alignContent:'start'}}>
        {products.map(p=>(
          <button key={p.id} onClick={()=>addToCart(p)} style={{background:'white', border:'1px solid #e2e8f0', borderRadius:'16px', padding:'20px 10px', fontWeight:800}}>
            <div>{p.name}</div><div style={{color:'#0ea5e9', marginTop:'6px'}}>R{p.price.toFixed(2)}</div>
          </button>
        ))}
      </div>
      {/* RIGHT CART */}
      <div style={{width:'340px', background:'white', borderLeft:'1px solid #e2e8f0', display:'flex', flexDirection:'column', padding:'16px'}}>
        <div style={{display:'flex', justifyContent:'space-between', fontWeight:800}}><span>{user}</span><span style={{color:'#64748b', cursor:'pointer'}} onClick={()=>setStep("login")}>Logout</span></div>
        <div style={{marginTop:'16px', flex:1, overflowY:'auto'}}>
          {cart.length===0 && <p style={{color:'#94a3b8', textAlign:'center', marginTop:'40px'}}>No items BOSS - Tap product</p>}
          {cart.map(i=>(
            <div key={i.id} style={{display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #f1f5f9'}}>
              <span>{i.name} x{i.qty}</span><span style={{fontWeight:800}}>R{(i.price*i.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div style={{borderTop:'2px solid #0f172a', paddingTop:'12px'}}>
          <div style={{display:'flex', justifyContent:'space-between', fontSize:'20px', fontWeight:900}}><span>Total</span><span>R{total.toFixed(2)}</span></div>
          <button onClick={()=>{
            if(total===0) return alert("Cart empty BOSS")
            alert(`SALE DONE BOSS! R${total.toFixed(2)} - Receipt Printed!`)
            setCart([])
          }} style={{width:'100%', marginTop:'12px', background:'#0ea5e9', color:'white', padding:'18px', borderRadius:'14px', fontWeight:900, fontSize:'18px', border:'none'}}>CHARGE R{total.toFixed(2)}</button>
          <button onClick={()=>setCart([])} style={{width:'100%', marginTop:'8px', padding:'12px', borderRadius:'12px', border:'1px solid #e2e8f0', background:'white'}}>Clear</button>
        </div>
      </div>
    </div>
  )
}
