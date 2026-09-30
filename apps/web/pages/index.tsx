export default function Page() {
  return (
    <div style={{background: '#05162b', color: 'white', fontFamily: 'system-ui', overflowX: 'hidden'}}>
      {/* TOP HEADER */}
      <div style={{padding: '30px 20px', textAlign: 'center', borderBottom: '1px solid #0f2a4d'}}>
        <h1 style={{fontSize: '42px', fontWeight: 900, margin: 0, letterSpacing: '1px'}}>
          <span style={{color: '#3aa0ff'}}>M</span> MUSINA<br/>
          <span style={{color: '#3aa0ff', fontSize: '28px'}}>POS SYSTEMS</span>
        </h1>
        <p style={{color: '#9fb3c8', marginTop: '8px'}}>Smart Solutions for Your Business</p>
        <p style={{fontStyle: 'italic', color: '#c7d2e0', fontSize: '14px'}}>Passion moves us to your satisfaction...</p>
        
        {/* 5 TYPES */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginTop: '30px', maxWidth: '1000px', margin: '30px auto 0'}}>
          {[
            {n: 'Spaza POS', d: 'Small shops & spaza stores', c: '#22c55e'},
            {n: 'Tavern POS', d: 'Drinks, liquor & quick sales', c: '#f97316'},
            {n: 'Restaurant POS', d: 'Tables, kitchen & orders', c: '#3b82f6'},
            {n: 'Customer Food App', d: 'Order food from anywhere', c: '#a855f7'},
            {n: 'Head Office Admin', d: 'Manage all tablets, shops', c: '#06b6d4'},
          ].map(x => (
            <div key={x.n} style={{background: '#0a2447', padding: '16px 8px', borderRadius: '12px', border: '1px solid #16355f'}}>
              <div style={{width: '48px', height: '48px', background: x.c, borderRadius: '12px', margin: '0 auto 10px'}}></div>
              <div style={{fontWeight: 700, fontSize: '13px'}}>{x.n}</div>
              <div style={{fontSize: '10px', color: '#8aa0b8', marginTop: '4px'}}>{x.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN POS */}
      <div style={{padding: '30px 20px', maxWidth: '1100px', margin: '0 auto'}}>
        <div style={{background: '#0a2447', borderRadius: '16px', padding: '20px', border: '1px solid #1a3a61'}}>
          <h3 style={{textAlign: 'center', margin: '0 0 16px'}}>SPAZA POS - Main Screen (Works Offline)</h3>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
            <div style={{background: '#05162b', borderRadius: '12px', padding: '16px'}}>
              <div>🏠 Home</div><div>📊 Sales</div><div>📦 Products</div><div>📋 Stock</div>
              <div style={{marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px'}}>
                <div style={{background: '#3b82f6', padding: '16px', borderRadius: '8px', textAlign: 'center'}}>New Sale</div>
                <div style={{background: '#22c55e', padding: '16px', borderRadius: '8px', textAlign: 'center'}}>Products</div>
                <div style={{background: '#f97316', padding: '16px', borderRadius: '8px', textAlign: 'center'}}>Stock</div>
                <div style={{background: '#a855f7', padding: '16px', borderRadius: '8px', textAlign: 'center'}}>Reports</div>
              </div>
              <div style={{marginTop: '16px', fontSize: '12px', color: '#8aa0b8'}}>Today's Sales R 2,845.00 | Items 48 | Transactions 12</div>
            </div>
            <div style={{background: 'white', color: 'black', borderRadius: '12px', padding: '12px'}}>
              <input placeholder="Search product..." style={{width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd'}} />
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginTop: '12px', fontSize: '11px'}}>
                {['Bread R12','Milk 1L R16','Soda 500ml R14','Chips R13','Eggs (6) R18','Sugar 1kg R26','Rice 2kg R42','Cooking Oil R36'].map(p => (
                  <div key={p} style={{border: '1px solid #eee', padding: '8px', borderRadius: '6px', textAlign: 'center'}}>{p}</div>
                ))}
              </div>
              <div style={{marginTop: '12px', background: '#f3f4f6', padding: '10px', borderRadius: '8px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px'}}><span>Total</span><span style={{fontWeight: 700}}>R41.00</span></div>
                <div style={{background: '#22c55e', color: 'white', textAlign: 'center', padding: '8px', borderRadius: '6px', marginTop: '8px'}}>Pay</div>
                <div style={{background: '#3b82f6', color: 'white', textAlign: 'center', padding: '8px', borderRadius: '6px', marginTop: '6px'}}>Print Receipt</div>
              </div>
            </div>
          </div>
        </div>

        {/* LANGUAGES */}
        <div style={{marginTop: '30px', background: '#0a2447', borderRadius: '16px', padding: '20px', border: '1px solid #1a3a61'}}>
          <h3 style={{margin: '0 0 12px'}}>Multi-Language Module - Works for Venda, Tsonga, Sepedi, Zulu</h3>
          <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '12px'}}>
            {['English','Tshivenda','Xitsonga','Sepedi','isiZulu'].map(l => (
              <span key={l} style={{background: '#05162b', border: '1px solid #1a3a61', padding: '8px 14px', borderRadius: '20px'}}>{l} ✓</span>
            ))}
          </div>
          <div style={{marginTop: '12px', fontSize: '12px', color: '#8aa0b8'}}>New Sale = U Tsalesa / Reka | Products = Zwipfuno / Dikgopolo | Reports = Mafhungo / Imibiko</div>
        </div>

        {/* AIRTIME & RESTAURANT */}
        <div style={{marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
          <div style={{background: '#0a2447', borderRadius: '16px', padding: '20px', border: '1px solid #1a3a61'}}>
            <h3 style={{margin: 0}}>Airtime, Data & Vouchers</h3>
            <p style={{fontSize: '11px', color: '#8aa0b8'}}>(Works when network is available)</p>
            <div style={{display: 'flex', gap: '8px', marginTop: '12px'}}>
              {['MTN','Vodacom','Telkom','CellC'].map(n => (
                <div key={n} style={{flex: 1, background: n==='MTN'?'#ffcc00':'#111', color: n==='MTN'?'black':'white', padding: '8px', borderRadius: '6px', textAlign: 'center', fontSize: '10px', fontWeight: 700}}>{n}</div>
              ))}
            </div>
            <div style={{marginTop: '12px', fontSize: '12px', color: '#c7d2e0'}}>⚡ Electricity • 📺 TV Licences • 🎫 Voucher Sales • ☁️ Offline Queue</div>
          </div>
          <div style={{background: 'white', color: 'black', borderRadius: '16px', padding: '20px', textAlign: 'center'}}>
            <h3 style={{margin: 0}}>MUSINA RESTAURANT APP</h3>
            <p style={{fontSize: '11px'}}>Good Food • Great Taste • Your Way</p>
            <div style={{marginTop: '12px', fontSize: '12px', background: '#f3f4f6', padding: '12px', borderRadius: '8px'}}>
              1. Scan QR Code → 2. Choose Food → 3. Pay in App → 4. Order goes to Kitchen → 5. Get Notification → 6. Happy Customer!
            </div>
            <div style={{marginTop: '12px', background: 'black', color: 'white', padding: '10px', borderRadius: '8px', fontSize: '12px'}}>Scan QR Code to order your food</div>
          </div>
        </div>

        <div style={{textAlign: 'center', marginTop: '40px', padding: '20px', background: '#021027', borderRadius: '12px'}}>
          <h2 style={{margin: 0}}>Grow Your Business with Musina POS Systems</h2>
          <p style={{color: '#8aa0b8', fontSize: '12px', marginTop: '8px'}}>📍 Musina • Limpopo • South Africa • Passion moves us to your satisfaction...</p>
          <div style={{marginTop: '16px'}}>
            <a href="https://wa.me/27" style={{background: '#22c55e', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700}}>WhatsApp Us - Get Your POS Now</a>
          </div>
        </div>
      </div>
    </div>
  )
}
