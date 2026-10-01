"use client";
import { useState, useEffect, useRef } from "react";

type CartItem = { id: string; name: string; price: number; qty: number };

export default function POS() {
  const [logged, setLogged] = useState(false);
  const [pin, setPin] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [paid, setPaid] = useState("");
  const [time, setTime] = useState(new Date());
  const inputRef = useRef<HTMLInputElement>(null);

  const products = [
    { id: '1', name: 'Bread', price: 18, bar: '1' },
    { id: '2', name: 'Milk', price: 22, bar: '2' },
    { id: '3', name: 'Coke', price: 15, bar: '3' },
    { id: '4', name: 'Sugar 1kg', price: 30, bar: '4' },
  ];

  // LIVE DATE TIME
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // BEEP
  const beep = (ok = true) => {
    try {
      const c = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = c.createOscillator();
      o.frequency.value = ok ? 1000 : 200;
      o.connect(c.destination);
      o.start();
      setTimeout(() => o.stop(), 200);
    } catch {}
  };

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const paidNum = parseFloat(paid) || 0;
  const change = paidNum - total;

  const add = (p: any) => {
    setCart(prev => {
      const f = prev.find(x => x.id === p.id);
      if (f) return prev.map(x => x.id === p.id ? {...x, qty: x.qty+1} : x);
      return [...prev, { id: p.id, name: p.name, price: p.price, qty: 1 }];
    });
    beep(true);
    setSearch("");
  };

  const handleScan = (e:any) => {
    e.preventDefault();
    const f = products.find(p => p.bar === search || p.name.toLowerCase().includes(search.toLowerCase()));
    if (f) add(f); else { beep(false); alert("Not found"); }
  };

  const openTill = () => { beep(true); alert("Till Opened 🔓"); };
  
  const sellAirtime = () => {
    const a = prompt("Amount? 20,50,100");
    if (!a) return;
    add({ id: Date.now().toString(), name: `Airtime R${a}`, price: Number(a) });
  };
  
  const sellElec = () => {
    const m = prompt("Meter number?");
    const a = prompt("Amount?");
    if (!m || !a) return;
    add({ id: Date.now().toString(), name: `Electricity ${m.slice(-4)}`, price: Number(a) });
  };

  // LOGIN SCREEN - ONE PASSWORD 1234
  if (!logged) {
    return (
      <div className="min-h-screen bg-[#181615] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl w-full max-w-xs text-center">
          <h1 className="text-2xl font-black text-[#00AEEF]">MUSINA POS</h1>
          <p className="text-sm text-gray-500 mb-4">{time.toLocaleDateString()} - {time.toLocaleTimeString()}</p>
          <input type="password" value={pin} onChange={e=>setPin(e.target.value)} placeholder="PIN 1234" className="w-full p-4 text-2xl text-center border-2 rounded-xl" />
          <button onClick={()=> pin==="1234"? setLogged(true) : alert("Wrong PIN")} className="w-full mt-3 bg-[#00AEEF] text-white py-3 rounded-xl font-black">LOGIN</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER WITH DATE TIME */}
      <div className="bg-[#181615] text-white p-3 flex justify-between items-center">
        <span className="font-black text-[#00AEEF]">MUSINA POS</span>
        <span className="text-sm font-bold">{time.toLocaleDateString()} | {time.toLocaleTimeString()}</span>
        <button onClick={()=>setLogged(false)} className="text-xs bg-white text-black px-3 py-1 rounded">Logout</button>
      </div>

      {/* QUICK BUTTONS */}
      <div className="grid grid-cols-3 gap-2 p-2">
        <button onClick={sellAirtime} className="bg-purple-600 text-white py-3 rounded-xl font-black">📱 AIRTIME</button>
        <button onClick={sellElec} className="bg-amber-500 text-white py-3 rounded-xl font-black">💡 ELECTRIC</button>
        <button onClick={openTill} className="bg-black text-white py-3 rounded-xl font-black">🔓 TILL</button>
      </div>

      <div className="p-2 grid md:grid-cols-2 gap-2">
        {/* PRODUCTS */}
        <div className="bg-white rounded-xl p-3">
          <form onSubmit={handleScan} className="flex gap-2">
            <input ref={inputRef} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Scan barcode..." className="flex-1 p-3 border-2 border-[#00AEEF] rounded-xl" autoFocus />
            <button className="bg-[#00AEEF] text-white px-5 rounded-xl font-bold">ADD</button>
          </form>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {products.map(p=>(
              <button key={p.id} onClick={()=>add(p)} className="border p-3 rounded-xl text-left hover:bg-blue-50">
                <p className="font-bold">{p.name}</p><p className="text-[#00AEEF] font-black">R{p.price}</p>
              </button>
            ))}
          </div>
        </div>

        {/* CART + PAY */}
        <div className="bg-white rounded-xl p-3 border-t-4 border-[#00AEEF]">
          <div className="h-48 overflow-auto">
            {cart.length===0? <p className="text-center text-gray-400 mt-10">Cart empty</p> : cart.map(i=>(
              <div key={i.id} className="flex justify-between border-b py-2">
                <span>{i.name} x{i.qty}</span><span className="font-black">R{(i.price*i.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-2xl font-black flex justify-between"><span>TOTAL</span><span className="text-[#00AEEF]">R{total.toFixed(2)}</span></div>
          
          <input type="number" value={paid} onChange={e=>setPaid(e.target.value)} placeholder="Customer paid e.g. 100" className="w-full mt-3 p-4 text-2xl border-2 rounded-xl" />
          
          {paid && <div className={`mt-2 p-3 text-center text-2xl font-black rounded-xl ${change>=0? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{change>=0? `CHANGE R${change.toFixed(2)}` : `NEED R${Math.abs(change).toFixed(2)}`}</div>}
          
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button onClick={()=>window.print()} className="border-2 py-3 rounded-xl font-bold">🖨️ PRINT</button>
            <button disabled={cart.length===0 || paidNum<total} onClick={()=>{ openTill(); setCart([]); setPaid(""); beep(true); }} className="bg-[#00AEEF] disabled:bg-gray-300 text-white py-3 rounded-xl font-black">✅ SELL</button>
          </div>
        </div>
      </div>
    </div>
  );
}
