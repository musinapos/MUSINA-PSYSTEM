import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  ClipboardList,
  Minus,
  Package,
  Plus,
  Printer,
  Search,
  Settings,
  ShoppingCart,
  Trash2,
  TrendingUp,
} from "lucide-react";
import "./VelvetCounter.css";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  tone: "warm" | "mint" | "coral";
};

type CartItem = Product & { quantity: number };

const products: Product[] = [
  { id: "bread", name: "Albany White Bread", price: 18.99, stock: 16, category: "Groceries", tone: "warm" },
  { id: "milk", name: "Clover Full Cream Milk 1L", price: 19.49, stock: 12, category: "Groceries", tone: "mint" },
  { id: "coke", name: "Coca-Cola 440ml", price: 15, stock: 24, category: "Drinks", tone: "coral" },
  { id: "water", name: "Valpre Water 500ml", price: 9.5, stock: 30, category: "Drinks", tone: "mint" },
  { id: "chips", name: "Simba Chips 120g", price: 17.99, stock: 9, category: "Snacks", tone: "warm" },
  { id: "sweets", name: "Jelly Tots 100g", price: 16.5, stock: 7, category: "Snacks", tone: "coral" },
  { id: "soap", name: "Sunlight Bar Soap", price: 14.99, stock: 11, category: "Household", tone: "mint" },
  { id: "matches", name: "Lion Matches", price: 6.5, stock: 18, category: "Household", tone: "warm" },
  { id: "airtime", name: "Airtime Voucher R20", price: 20, stock: 25, category: "Airtime", tone: "coral" },
  { id: "eggs", name: "Eggs 6 Pack", price: 24.99, stock: 8, category: "Groceries", tone: "warm" },
];

const money = (value: number) => `R ${value.toFixed(2)}`;

const navItems = [
  { label: "Sales", icon: ShoppingCart },
  { label: "Products & Stock", icon: Package },
  { label: "Reports", icon: TrendingUp },
  { label: "Settings", icon: Settings },
];

function VelvetNavigation() {
  return (
    <>
      <aside className="vc-sidebar">
        <div className="vc-brand">
          <div className="vc-brand-mark">M.</div>
          <div>
            <div className="vc-brand-title">MUSINA POS<br />SYSTEMS</div>
            <div className="vc-brand-subtitle">Retail, made simple</div>
          </div>
        </div>
        <div className="vc-nav-label">Workspace</div>
        <nav className="vc-nav-list" aria-label="Primary navigation">
          {navItems.map(({ label, icon: Icon }) => (
            <div className={`vc-nav-item ${label === "Sales" ? "vc-active" : ""}`} key={label}>
              <Icon />
              <span>{label}</span>
            </div>
          ))}
        </nav>
        <div className="vc-sidebar-bottom">
          <div className="vc-slogan">“passion moves us to your satisfaction.”</div>
          <div className="vc-shift"><span className="vc-shift-dot" /> Till open · Counter 01</div>
        </div>
      </aside>
      <nav className="vc-mobile-nav" aria-label="Mobile navigation">
        {navItems.map(({ label, icon: Icon }) => (
          <div className={`vc-nav-item ${label === "Sales" ? "vc-active" : ""}`} key={label}>
            <Icon />
            <span>{label === "Products & Stock" ? "Stock" : label}</span>
          </div>
        ))}
      </nav>
    </>
  );
}

export function VelvetCounter() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All items");
  const [cash, setCash] = useState("");
  const [toast, setToast] = useState("");
  const categories = useMemo(
    () => ["All items", ...Array.from(new Set(products.map((item) => item.category)))],
    [],
  );
  const filtered = products.filter(
    (item) =>
      (category === "All items" || item.category === category) &&
      item.name.toLowerCase().includes(search.toLowerCase()),
  );
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cashValue = Number.parseFloat(cash) || 0;
  const change = cashValue - total;

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const addToCart = (product: Product) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing && existing.quantity >= product.stock) {
        setToast("That is all the stock available for this item.");
        return items;
      }
      if (existing) {
        return items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...items, { ...product, quantity: 1 }];
    });
  };

  const changeQty = (id: string, delta: number) => {
    setCart((items) =>
      items.flatMap((item) => {
        if (item.id !== id) return [item];
        const next = item.quantity + delta;
        return next > 0 ? [{ ...item, quantity: Math.min(next, item.stock) }] : [];
      }),
    );
  };

  const clearSale = () => {
    setCart([]);
    setCash("");
    setToast("New sale ready at the counter.");
  };

  const completeSale = () => {
    if (!cart.length || cashValue < total) return;
    setToast(`Sale complete. Change due: ${money(change)}.`);
    setCart([]);
    setCash("");
  };

  return (
    <div className="velvet-counter">
      <div className="vc-app-shell">
        <VelvetNavigation />
        <main className="vc-main">
          <header className="vc-topbar">
            <div>
              <div className="vc-eyebrow">Counter 01 · Sales</div>
              <h1 className="vc-page-title">Make a sale</h1>
              <p className="vc-page-copy">A quieter way to move the queue along.</p>
            </div>
            <div className="vc-top-actions">
              <button className="vc-secondary-btn" onClick={clearSale}>
                <Plus size={16} /> New sale
              </button>
              <div className="vc-date-chip">
                <CalendarDays />
                {new Intl.DateTimeFormat("en-ZA", { weekday: "short", day: "numeric", month: "short" }).format(new Date())}
              </div>
            </div>
          </header>

          <div className="vc-content-grid">
            <section className="vc-panel">
              <div className="vc-panel-head">
                <div>
                  <div className="vc-catalog-kicker"><span className="vc-kicker-dot" /> Product library</div>
                  <h2 className="vc-panel-title">Quick catalogue</h2>
                  <span className="vc-panel-note">{products.length} products · stock updated locally</span>
                </div>
                <div className="vc-panel-symbol"><ClipboardList size={19} /></div>
              </div>
              <div className="vc-catalog-toolbar">
                <div className="vc-search-wrap">
                  <Search />
                  <input
                    className="vc-search-input"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search products..."
                    aria-label="Search products"
                  />
                </div>
                <span className="vc-search-hint">Tap a product to add</span>
              </div>
              <div className="vc-category-list">
                {categories.map((item) => (
                  <button className={`vc-category-btn ${category === item ? "vc-active" : ""}`} onClick={() => setCategory(item)} key={item}>
                    {item}
                  </button>
                ))}
              </div>
              <div className="vc-product-grid">
                {filtered.map((product) => (
                  <button className="vc-product-card" onClick={() => addToCart(product)} key={product.id}>
                    <div className={`vc-product-icon vc-${product.tone}`}><Package size={18} /></div>
                    <span className="vc-product-name">{product.name}</span>
                    <span className="vc-product-meta">
                      <span className="vc-product-price">{money(product.price)}</span>
                      <span className={`vc-stock-label ${product.stock < 6 ? "vc-low" : ""}`}>{product.stock} left</span>
                    </span>
                    <span className="vc-add-label"><Plus size={13} /> Add to cart</span>
                  </button>
                ))}
              </div>
              {!filtered.length && <div className="vc-empty-search">No products match “{search}”.<br />Try another search or category.</div>}
            </section>

            <section className="vc-panel vc-cart-panel">
              <div className="vc-panel-head vc-cart-head">
                <div className="vc-cart-title">
                  <ShoppingCart size={19} />
                  <div>
                    <h2 className="vc-panel-title">Current sale</h2>
                    <span className="vc-cart-subtitle">Review items before taking payment</span>
                  </div>
                  <span className="vc-cart-count">{itemCount}</span>
                </div>
                <span className="vc-panel-note">Not paid</span>
              </div>
              <div className="vc-cart-items">
                {cart.length ? cart.map((item) => (
                  <div className="vc-cart-row" key={item.id}>
                    <div>
                      <div className="vc-cart-row-name">{item.name}</div>
                      <div className="vc-cart-row-price">{money(item.price)} each</div>
                    </div>
                    <div className="vc-cart-row-actions">
                      <div className="vc-qty-control">
                        <button className="vc-icon-btn" onClick={() => changeQty(item.id, -1)} aria-label={`Decrease ${item.name}`}><Minus /></button>
                        <span className="vc-qty-value">{item.quantity}</span>
                        <button className="vc-icon-btn" onClick={() => changeQty(item.id, 1)} aria-label={`Increase ${item.name}`}><Plus /></button>
                      </div>
                      <button className="vc-icon-btn vc-remove-btn" onClick={() => changeQty(item.id, -item.quantity)} aria-label={`Remove ${item.name}`}><Trash2 size={15} /></button>
                    </div>
                  </div>
                )) : (
                  <div className="vc-cart-empty">
                    <div>
                      <div className="vc-empty-icon"><ShoppingCart size={21} /></div>
                      <div className="vc-empty-title">Your basket is waiting</div>
                      <div className="vc-empty-copy">Tap any product on the left<br />to start a new sale.</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="vc-cart-summary">
                <div className="vc-summary-line"><span>Items</span><span>{itemCount}</span></div>
                <div className="vc-summary-line"><span>VAT included</span><span>Included</span></div>
                <div className="vc-summary-total"><span>Total</span><span className="vc-total-value">{money(total)}</span></div>
                <div className="vc-payment-box">
                  <label className="vc-payment-label" htmlFor="vc-cash-received"><span>Cash received</span><span>South African rand</span></label>
                  <input id="vc-cash-received" className="vc-cash-input" type="number" min="0" step="0.01" inputMode="decimal" value={cash} onChange={(event) => setCash(event.target.value)} placeholder="R 0.00" />
                  <div className="vc-change-row"><span>Change due</span><span className={`vc-change-value ${cash && change < 0 ? "vc-insufficient" : ""}`}>{cash ? money(Math.max(change, 0)) : "—"}</span></div>
                  {cash && change < 0 && <div className="vc-error-note">Cash is {money(Math.abs(change))} short. Enter a higher amount to complete.</div>}
                </div>
              </div>
              <div className="vc-cart-footer">
                <button className="vc-primary-btn vc-full-btn" disabled={!cart.length || cashValue < total} onClick={completeSale}><Check size={17} /> Complete sale</button>
                <button className="vc-secondary-btn vc-full-btn" disabled={!cart.length} onClick={() => window.print()}><Printer size={16} /> Print receipt</button>
                <button className="vc-secondary-btn vc-new-sale" disabled={!cart.length && !cash} onClick={clearSale}><Trash2 size={15} /> Clear sale</button>
              </div>
            </section>
          </div>
        </main>
      </div>
      {toast && <div className="vc-toast" role="status"><Check /><span>{toast}</span></div>}
    </div>
  );
}
