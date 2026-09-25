import { useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  ClipboardList,
  Package,
  Plus,
  Printer,
  Search,
  Settings,
  ShoppingCart,
  Trash2,
  TrendingUp,
} from "lucide-react";
import "./_group.css";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  tone: string;
};
const products: Product[] = [
  {
    id: "bread",
    name: "Albany White Bread",
    price: 18.99,
    stock: 16,
    category: "Groceries",
    tone: "warm",
  },
  {
    id: "milk",
    name: "Clover Full Cream Milk 1L",
    price: 19.49,
    stock: 12,
    category: "Groceries",
    tone: "mint",
  },
  {
    id: "coke",
    name: "Coca-Cola 440ml",
    price: 15.0,
    stock: 24,
    category: "Drinks",
    tone: "coral",
  },
  {
    id: "water",
    name: "Valpre Water 500ml",
    price: 9.5,
    stock: 30,
    category: "Drinks",
    tone: "mint",
  },
  {
    id: "chips",
    name: "Simba Chips 120g",
    price: 17.99,
    stock: 9,
    category: "Snacks",
    tone: "warm",
  },
  {
    id: "sweets",
    name: "Jelly Tots 100g",
    price: 16.5,
    stock: 7,
    category: "Snacks",
    tone: "coral",
  },
  {
    id: "soap",
    name: "Sunlight Bar Soap",
    price: 14.99,
    stock: 11,
    category: "Household",
    tone: "mint",
  },
  {
    id: "matches",
    name: "Lion Matches",
    price: 6.5,
    stock: 18,
    category: "Household",
    tone: "warm",
  },
  {
    id: "airtime",
    name: "Airtime Voucher R20",
    price: 20,
    stock: 25,
    category: "Airtime",
    tone: "coral",
  },
  {
    id: "eggs",
    name: "Eggs 6 Pack",
    price: 24.99,
    stock: 8,
    category: "Groceries",
    tone: "warm",
  },
];
const money = (value: number) => `R ${value.toFixed(2)}`;

function Brand() {
  return (
    <div className="brand">
      <div className="brand-mark">M.</div>
      <div>
        <div className="brand-title">
          MUSINA POS
          <br />
          SYSTEMS
        </div>
        <div className="brand-subtitle">Retail, made simple</div>
      </div>
    </div>
  );
}
function Nav() {
  const items = [
    { label: "Sales", icon: ShoppingCart },
    { label: "Products & Stock", icon: Package },
    { label: "Reports", icon: TrendingUp },
    { label: "Settings", icon: Settings },
  ];
  return (
    <>
      <aside className="sidebar">
        <Brand />
        <div className="nav-label">Workspace</div>
        <nav className="nav-list">
          {items.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className={`nav-item ${label === "Sales" ? "active" : ""}`}
            >
              <Icon />
              <span>{label}</span>
            </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="slogan">“passion moves us to your satisfaction.”</div>
          <div className="shift">
            <span className="shift-dot" /> Till open · Counter 01
          </div>
        </div>
      </aside>
      <nav className="mobile-nav">
        {items.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className={`nav-item ${label === "Sales" ? "active" : ""}`}
          >
            <Icon />
            <span>{label === "Products & Stock" ? "Stock" : label}</span>
          </div>
        ))}
      </nav>
    </>
  );
}

export function Current() {
  const [cart, setCart] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All items");
  const [cash, setCash] = useState("");
  const categories = useMemo(
    () => [
      "All items",
      ...Array.from(new Set(products.map((item) => item.category))),
    ],
    [],
  );
  const filtered = products.filter(
    (item) =>
      (category === "All items" || item.category === category) &&
      item.name.toLowerCase().includes(search.toLowerCase()),
  );
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const cashValue = Number.parseFloat(cash) || 0;
  const add = (product: Product) => setCart((items) => [...items, product]);
  const clear = () => {
    setCart([]);
    setCash("");
  };
  return (
    <div className="musina-sales">
      <div className="app-shell">
        <Nav />
        <main className="main">
          <header className="topbar">
            <div>
              <div className="eyebrow">Counter 01 · Sales</div>
              <h1 className="page-title">Make a sale</h1>
              <p className="page-copy">
                Tap a product to add it to the current basket.
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button className="secondary-btn" onClick={clear}>
                <Plus size={16} /> New sale
              </button>
              <div className="date-chip">
                <CalendarDays />
                {new Intl.DateTimeFormat("en-ZA", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                }).format(new Date())}
              </div>
            </div>
          </header>
          <div className="content-grid">
            <section className="panel catalog-panel">
              <div className="panel-head">
                <div>
                  <h2 className="panel-title">Quick catalogue</h2>
                  <span className="panel-note">
                    {products.length} products · stock updated locally
                  </span>
                </div>
                <ClipboardList size={19} color="var(--teal)" />
              </div>
              <div className="catalog-toolbar">
                <div className="search-wrap">
                  <Search />
                  <input
                    className="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    aria-label="Search products"
                  />
                </div>
              </div>
              <div className="category-list">
                {categories.map((item) => (
                  <button
                    key={item}
                    className={`category-btn ${category === item ? "active" : ""}`}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="product-grid">
                {filtered.map((product) => (
                  <button
                    key={product.id}
                    className="product-card"
                    onClick={() => add(product)}
                  >
                    <div className={`product-icon ${product.tone}`}>
                      <Package size={18} />
                    </div>
                    <span className="product-name">{product.name}</span>
                    <span className="product-meta">
                      <span className="product-price">
                        {money(product.price)}
                      </span>
                      <span
                        className={`stock-label ${product.stock < 6 ? "low" : ""}`}
                      >
                        {product.stock} left
                      </span>
                    </span>
                    <span className="add-product-label">
                      <Plus size={13} /> Add to cart
                    </span>
                  </button>
                ))}
              </div>
            </section>
            <section className="panel cart-panel">
              <div className="panel-head cart-head">
                <div className="cart-title">
                  <ShoppingCart size={19} />
                  <h2 className="panel-title">Current sale</h2>
                  <span className="cart-count">{cart.length}</span>
                </div>
                <span className="panel-note">Not paid</span>
              </div>
              <div className="cart-items">
                <div className="cart-empty">
                  <div>
                    <div className="empty-icon">
                      <ShoppingCart size={21} />
                    </div>
                    <div className="empty-title">
                      {cart.length
                        ? `${cart.length} item${cart.length > 1 ? "s" : ""} in your basket`
                        : "Your basket is waiting"}
                    </div>
                    <div className="empty-copy">
                      {cart.length ? (
                        "Add more products or review your sale."
                      ) : (
                        <>
                          Tap any product on the left
                          <br />
                          to start a new sale.
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="cart-summary">
                <div className="summary-line">
                  <span>Items</span>
                  <span>{cart.length}</span>
                </div>
                <div className="summary-line">
                  <span>VAT included</span>
                  <span>Included</span>
                </div>
                <div className="summary-total">
                  <span>Total</span>
                  <span className="total-value">{money(total)}</span>
                </div>
                <div className="payment-box">
                  <label className="payment-label" htmlFor="cash-received">
                    <span>Cash received</span>
                    <span>South African rand</span>
                  </label>
                  <input
                    id="cash-received"
                    className="cash-input"
                    type="number"
                    min="0"
                    step="0.01"
                    value={cash}
                    onChange={(e) => setCash(e.target.value)}
                    placeholder="R 0.00"
                  />
                  <div className="change-row">
                    <span>Change due</span>
                    <span className="change-value">
                      {cash ? money(Math.max(cashValue - total, 0)) : "—"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="cart-footer">
                <button
                  className="primary-btn full-btn"
                  disabled={!cart.length || cashValue < total}
                >
                  <Check size={17} /> Complete sale
                </button>
                <button
                  className="secondary-btn full-btn"
                  disabled={!cart.length}
                  onClick={() => window.print()}
                >
                  <Printer size={16} /> Print receipt
                </button>
                <button
                  className="secondary-btn new-sale"
                  disabled={!cart.length && !cash}
                  onClick={clear}
                >
                  <Trash2 size={15} /> Clear sale
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
