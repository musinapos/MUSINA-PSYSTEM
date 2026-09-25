import { type ReactNode, useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  CreditCard,
  Minus,
  Package,
  Plus,
  Printer,
  Receipt,
  Search,
  Settings as SettingsIcon,
  ShoppingCart,
  Store,
  Trash2,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";
import { Link, Route, Switch, useLocation } from "wouter";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  tone: string;
};
type CartItem = Product & { quantity: number };
type Transaction = {
  id: string;
  createdAt: string;
  items: { name: string; price: number; quantity: number }[];
  total: number;
  cash: number;
  change: number;
};
type Settings = {
  storeName: string;
  address: string;
  phone: string;
  showAddress: boolean;
  showPhone: boolean;
};

const productsSeed: Product[] = [
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
    price: 13.0,
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
    price: 20.0,
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
const readStore = <T,>(key: string, fallback: T): T => {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};
const writeStore = (key: string, value: unknown) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* local-only fallback */
  }
};

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

const navItems = [
  { href: "/", label: "Sales", icon: ShoppingCart },
  { href: "/products", label: "Products & Stock", icon: Package },
  { href: "/reports", label: "Reports", icon: TrendingUp },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];

function Navigation() {
  const [location] = useLocation();
  return (
    <>
      <aside className="sidebar">
        <Brand />
        <div className="nav-label">Workspace</div>
        <nav className="nav-list">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`nav-item ${location === href ? "active" : ""}`}
              data-testid={`link-${label.toLowerCase().replaceAll(" ", "-")}`}
            >
              <Icon />
              <span>{label}</span>
            </Link>
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
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`nav-item ${location === href ? "active" : ""}`}
            data-testid={`mobile-link-${label.toLowerCase().replaceAll(" ", "-")}`}
          >
            <Icon />
            <span>{label === "Products & Stock" ? "Stock" : label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}

function PageHeader({
  eyebrow,
  title,
  copy,
  action,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  action?: ReactNode;
}) {
  return (
    <header className="topbar">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="page-title">{title}</h1>
        <p className="page-copy">{copy}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {action}
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
  );
}

function ProductIcon({ tone }: { tone: string }) {
  return (
    <div className={`product-icon ${tone}`}>
      <Package size={18} />
    </div>
  );
}

function Sales() {
  const [products, setProducts] = useState<Product[]>(() =>
    readStore("musina-products", productsSeed),
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All items");
  const [cash, setCash] = useState("");
  const [toast, setToast] = useState("");
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const categories = useMemo(
    () => [
      "All items",
      ...Array.from(new Set(products.map((item) => item.category))),
    ],
    [products],
  );
  const filtered = products.filter(
    (item) =>
      (category === "All items" || item.category === category) &&
      item.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    writeStore("musina-products", products);
  }, [products]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const addToCart = (product: Product) =>
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing && existing.quantity >= product.stock) {
        setToast("That is all the stock available for this item.");
        return items;
      }
      if (existing)
        return items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      return [...items, { ...product, quantity: 1 }];
    });
  const changeQty = (id: string, delta: number) =>
    setCart((items) =>
      items.flatMap((item) => {
        if (item.id !== id) return [item];
        const next = item.quantity + delta;
        return next > 0
          ? [{ ...item, quantity: Math.min(next, item.stock) }]
          : [];
      }),
    );
  const clearSale = () => {
    setCart([]);
    setCash("");
    setToast("New sale ready at the counter.");
  };
  const cashValue = Number.parseFloat(cash) || 0;
  const change = cashValue - total;
  const completeSale = () => {
    if (!cart.length || cashValue < total) return;
    const transaction: Transaction = {
      id: `MS-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      items: cart.map(({ name, price, quantity }) => ({
        name,
        price,
        quantity,
      })),
      total,
      cash: cashValue,
      change,
    };
    const transactions = readStore<Transaction[]>("musina-transactions", []);
    writeStore("musina-transactions", [transaction, ...transactions]);
    setProducts((items) =>
      items.map((product) => {
        const line = cart.find((item) => item.id === product.id);
        return line
          ? { ...product, stock: product.stock - line.quantity }
          : product;
      }),
    );
    setCart([]);
    setCash("");
    setToast(`Sale ${transaction.id} complete. Change due: ${money(change)}.`);
  };
  const printReceipt = () => {
    if (cart.length) window.print();
  };

  return (
    <div className="sales-screen">
      <PageHeader
        eyebrow="Counter 01 · Sales"
        title="Make a sale"
        copy="Tap a product to add it to the current basket."
        action={
          <button
            className="secondary-btn"
            onClick={clearSale}
            data-testid="button-new-sale"
          >
            <Plus size={16} /> New sale
          </button>
        }
      />
      <div className="content-grid sales-content-grid">
        <section className="panel catalog-panel sales-catalog-panel">
          <div className="panel-head sales-panel-head">
            <div>
              <div className="sales-panel-kicker">
                <span className="sales-kicker-dot" /> Product library
              </div>
              <h2 className="panel-title">Quick catalogue</h2>
              <span className="panel-note">
                {products.length} products · stock updated locally
              </span>
            </div>
            <div className="sales-panel-icon">
              <ClipboardList size={19} />
            </div>
          </div>
          <div className="catalog-toolbar sales-catalog-toolbar">
            <div className="search-wrap">
              <Search />
              <input
                className="search-input"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                data-testid="input-search-products"
              />
            </div>
            <span className="sales-search-hint">Tap a product to add</span>
          </div>
          <div className="category-list">
            {categories.map((item) => (
              <button
                key={item}
                className={`category-btn ${category === item ? "active" : ""}`}
                onClick={() => setCategory(item)}
                data-testid={`button-category-${item.toLowerCase().replaceAll(" ", "-")}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="product-grid">
            {filtered.map((product) => (
              <button
                key={product.id}
                className="product-card sales-product-card"
                disabled={product.stock === 0}
                onClick={() => addToCart(product)}
                data-testid={`card-product-${product.id}`}
              >
                <ProductIcon tone={product.tone} />
                {product.stock === 0 && (
                  <span className="out-badge">Out of stock</span>
                )}
                <span className="product-name">{product.name}</span>
                <span className="product-meta">
                  <span className="product-price">{money(product.price)}</span>
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
          {!filtered.length && (
            <div className="empty-table">
              No products match “{search}”.
              <br />
              <span>Try another search or category.</span>
            </div>
          )}
        </section>
        <section className="panel cart-panel sales-cart-panel">
          <div className="panel-head cart-head sales-cart-head">
            <div className="cart-title">
              <ShoppingCart size={19} />
              <div>
                <h2 className="panel-title">Current sale</h2>
                <span className="sales-cart-subtitle">
                  Review items before taking payment
                </span>
              </div>
              <span className="cart-count">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <span className="panel-note">Not paid</span>
          </div>
          <div className="cart-items sales-cart-items">
            {cart.length ? (
              cart.map((item) => (
                <div className="cart-row" key={item.id}>
                  <div className="cart-row-main">
                    <div className="cart-row-name">{item.name}</div>
                    <div className="cart-row-price">
                      {money(item.price)} each
                    </div>
                  </div>
                  <div className="cart-row-actions">
                    <div className="qty-control">
                      <button
                        className="icon-btn"
                        onClick={() => changeQty(item.id, -1)}
                        aria-label={`Decrease ${item.name}`}
                        data-testid={`button-decrease-${item.id}`}
                      >
                        <Minus />
                      </button>
                      <span
                        className="qty-value"
                        data-testid={`text-quantity-${item.id}`}
                      >
                        {item.quantity}
                      </span>
                      <button
                        className="icon-btn"
                        onClick={() => changeQty(item.id, 1)}
                        aria-label={`Increase ${item.name}`}
                        data-testid={`button-increase-${item.id}`}
                      >
                        <Plus />
                      </button>
                    </div>
                    <button
                      className="icon-btn remove-btn"
                      onClick={() => changeQty(item.id, -item.quantity)}
                      aria-label={`Remove ${item.name}`}
                      data-testid={`button-remove-${item.id}`}
                    >
                      <X />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="cart-empty">
                <div>
                  <div className="empty-icon">
                    <ShoppingCart size={21} />
                  </div>
                  <div className="empty-title">Your basket is waiting</div>
                  <div className="empty-copy">
                    Tap any product on the left
                    <br />
                    to start a new sale.
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="cart-summary sales-cart-summary">
            <div className="summary-line">
              <span>Items</span>
              <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="summary-line">
              <span>VAT included</span>
              <span>Included</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span className="total-value" data-testid="text-sale-total">
                {money(total)}
              </span>
            </div>
            <div className="payment-box">
              <label className="payment-label" htmlFor="cash-received">
                <span>Cash received</span>
                <span>South African rand</span>
              </label>
              <input
                id="cash-received"
                className="cash-input input"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                value={cash}
                onChange={(event) => setCash(event.target.value)}
                placeholder="R 0.00"
                data-testid="input-cash-received"
              />
              <div className="change-row">
                <span>Change due</span>
                <span
                  className={`change-value ${cash && change < 0 ? "insufficient" : ""}`}
                  data-testid="text-change"
                >
                  {cash ? money(Math.max(change, 0)) : "—"}
                </span>
              </div>
              {cash && change < 0 && (
                <div className="error-note">
                  Cash is {money(Math.abs(change))} short. Enter a higher amount
                  to complete.
                </div>
              )}
            </div>
          </div>
          <div className="cart-footer">
            <button
              className="primary-btn full-btn"
              disabled={!cart.length || cashValue < total}
              onClick={completeSale}
              data-testid="button-complete-sale"
            >
              <Check size={17} /> Complete sale
            </button>
            <button
              className="secondary-btn full-btn"
              disabled={!cart.length}
              onClick={printReceipt}
              data-testid="button-print-receipt"
            >
              <Printer size={16} /> Print receipt
            </button>
            <button
              className="secondary-btn new-sale"
              disabled={!cart.length && !cash}
              onClick={clearSale}
              data-testid="button-clear-sale"
            >
              <Trash2 size={15} /> Clear sale
            </button>
          </div>
        </section>
      </div>
      {toast && (
        <div className="toast" role="status" data-testid="status-sale-feedback">
          <Check />
          <span>{toast}</span>
        </div>
      )}
      <div className="print-receipt">
        <h1>MUSINA POS SYSTEMS</h1>
        <p style={{ textAlign: "center" }}>
          passion moves us to your satisfaction.
        </p>
        <p>{new Date().toLocaleString("en-ZA")}</p>
        <div className="receipt-rule" />
        {cart.map((item) => (
          <div className="print-line" key={item.id}>
            <span>
              {item.quantity} × {item.name}
            </span>
            <span>{money(item.price * item.quantity)}</span>
          </div>
        ))}
        <div className="print-total print-line">
          <span>TOTAL</span>
          <span>{money(total)}</span>
        </div>
        <div className="print-line">
          <span>Cash</span>
          <span>{money(cashValue)}</span>
        </div>
        <div className="print-line">
          <span>Change</span>
          <span>{money(Math.max(change, 0))}</span>
        </div>
        <div className="receipt-rule" />
        <p style={{ textAlign: "center" }}>Thank you for shopping local.</p>
      </div>
    </div>
  );
}

function Products() {
  const [products, setProducts] = useState<Product[]>(() =>
    readStore("musina-products", productsSeed),
  );
  const [saved, setSaved] = useState("");
  const saveStock = (id: string, value: string) => {
    const stock = Math.max(0, Number.parseInt(value, 10) || 0);
    setProducts((items) =>
      items.map((item) => (item.id === id ? { ...item, stock } : item)),
    );
    setSaved(id);
    window.setTimeout(() => setSaved(""), 1800);
  };
  useEffect(() => {
    writeStore("musina-products", products);
  }, [products]);
  const low = products.filter((item) => item.stock < 6).length;
  return (
    <>
      <PageHeader
        eyebrow="Inventory desk"
        title="Products & stock"
        copy="Keep your shelf count current so the counter always knows what is available."
        action={
          <span className="status-pill">
            <Store size={13} /> Local inventory
          </span>
        }
      />
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">
            Products <Package size={16} />
          </div>
          <div className="stat-value">{products.length}</div>
          <div className="stat-foot">in catalogue</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">
            Units on hand <ClipboardList size={16} />
          </div>
          <div className="stat-value">
            {products.reduce((sum, item) => sum + item.stock, 0)}
          </div>
          <div className="stat-foot">across all shelves</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">
            Low stock <TrendingUp size={16} />
          </div>
          <div
            className="stat-value"
            style={{ color: low ? "var(--coral)" : "var(--teal)" }}
          >
            {low}
          </div>
          <div className="stat-foot">below 6 units</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">
            Price list <CircleDollarSign size={16} />
          </div>
          <div className="stat-value">R</div>
          <div className="stat-foot">rand pricing</div>
        </div>
      </div>
      <section className="panel page-panel">
        <div className="panel-head">
          <div>
            <h2 className="panel-title">Catalogue and stock levels</h2>
            <span className="panel-note">Edit a count, then tap save.</span>
          </div>
          <Package size={19} color="var(--teal)" />
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock on hand</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <span className="item-strong">{product.name}</span>
                  </td>
                  <td>
                    <span className="category-tag">{product.category}</span>
                  </td>
                  <td>{money(product.price)}</td>
                  <td>
                    <div className="stock-editor">
                      <input
                        className="input"
                        type="number"
                        min="0"
                        defaultValue={product.stock}
                        aria-label={`Stock for ${product.name}`}
                        data-testid={`input-stock-${product.id}`}
                        onBlur={(event) =>
                          saveStock(product.id, event.target.value)
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter")
                            saveStock(product.id, event.currentTarget.value);
                        }}
                      />
                      <button
                        className="secondary-btn"
                        style={{ minHeight: 36, padding: "0 10px" }}
                        onClick={() => {
                          const input = document.querySelector(
                            `[data-testid="input-stock-${product.id}"]`,
                          ) as HTMLInputElement | null;
                          if (input) saveStock(product.id, input.value);
                        }}
                        data-testid={`button-save-stock-${product.id}`}
                      >
                        {saved === product.id ? <Check size={14} /> : "Save"}
                      </button>
                    </div>
                  </td>
                  <td>
                    <span
                      className={
                        product.stock < 6 ? "low-stock" : "status-pill"
                      }
                    >
                      {product.stock < 6 ? "Restock soon" : "In stock"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function Reports() {
  const transactions = readStore<Transaction[]>("musina-transactions", []);
  const today = new Date().toDateString();
  const todayTransactions = transactions.filter(
    (item) => new Date(item.createdAt).toDateString() === today,
  );
  const total = todayTransactions.reduce((sum, item) => sum + item.total, 0);
  const units = todayTransactions.reduce(
    (sum, item) =>
      sum + item.items.reduce((qty, line) => qty + line.quantity, 0),
    0,
  );
  const average = todayTransactions.length
    ? total / todayTransactions.length
    : 0;
  return (
    <>
      <PageHeader
        eyebrow="Till overview"
        title="Reports"
        copy="A clear view of what moved through the counter."
        action={
          <span className="date-chip">
            <Wallet size={16} /> Today
          </span>
        }
      />
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">
            Today’s sales <CircleDollarSign size={16} />
          </div>
          <div className="stat-value" data-testid="text-today-sales">
            {money(total)}
          </div>
          <div className="stat-foot">
            {todayTransactions.length
              ? "completed transactions"
              : "No sales yet"}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">
            Transactions <Receipt size={16} />
          </div>
          <div className="stat-value">{todayTransactions.length}</div>
          <div className="stat-foot">completed today</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">
            Items sold <Package size={16} />
          </div>
          <div className="stat-value">{units}</div>
          <div className="stat-foot">units across baskets</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">
            Average sale <CreditCard size={16} />
          </div>
          <div className="stat-value">{money(average)}</div>
          <div className="stat-foot">per transaction</div>
        </div>
      </div>
      <section className="panel page-panel">
        <div className="panel-head">
          <div>
            <h2 className="panel-title">Recent transactions</h2>
            <span className="panel-note">
              Saved on this device · newest first
            </span>
          </div>
          <Receipt size={19} color="var(--teal)" />
        </div>
        {transactions.length ? (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Time</th>
                  <th>Items</th>
                  <th>Payment</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 20).map((transaction) => (
                  <tr key={transaction.id}>
                    <td>
                      <span className="item-strong">{transaction.id}</span>
                    </td>
                    <td className="muted">
                      {new Date(transaction.createdAt).toLocaleString("en-ZA", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>
                      {transaction.items.reduce(
                        (sum, item) => sum + item.quantity,
                        0,
                      )}{" "}
                      items
                    </td>
                    <td className="muted">Cash</td>
                    <td>
                      <span className="item-strong">
                        {money(transaction.total)}
                      </span>
                    </td>
                    <td>
                      <span className="status-pill">
                        <Check size={12} /> Complete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-table">
            <div className="empty-icon">
              <TrendingUp size={20} />
            </div>
            <div className="empty-title">Your first sale will appear here</div>
            <div className="empty-copy">
              Completed counter transactions are collected in this report.
            </div>
            <Link
              href="/"
              className="primary-btn"
              style={{ marginTop: 15 }}
              data-testid="link-start-first-sale"
            >
              Start a sale
            </Link>
          </div>
        )}
      </section>
    </>
  );
}

function Settings() {
  const [settings, setSettings] = useState<Settings>(() =>
    readStore("musina-settings", {
      storeName: "Musina General Dealer",
      address: "12 Market Street, Musina",
      phone: "015 534 1042",
      showAddress: true,
      showPhone: true,
    }),
  );
  const [saved, setSaved] = useState(false);
  const update = (key: keyof Settings, value: string | boolean) =>
    setSettings((current) => ({ ...current, [key]: value }));
  const save = () => {
    writeStore("musina-settings", settings);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2600);
  };
  return (
    <>
      <PageHeader
        eyebrow="Workspace preferences"
        title="Settings"
        copy="Set the details that appear on your receipts and at your counter."
      />
      <div className="settings-layout">
        <section className="panel page-panel">
          <div className="settings-section">
            <h2 className="section-heading">Store details</h2>
            <p className="section-copy">
              These details help customers identify your shop on a printed
              receipt.
            </p>
            <div className="field-grid">
              <label className="field full">
                <span className="field-label">Store name</span>
                <input
                  className="input"
                  value={settings.storeName}
                  onChange={(event) => update("storeName", event.target.value)}
                  data-testid="input-store-name"
                />
              </label>
              <label className="field">
                <span className="field-label">Address</span>
                <input
                  className="input"
                  value={settings.address}
                  onChange={(event) => update("address", event.target.value)}
                  data-testid="input-store-address"
                />
              </label>
              <label className="field">
                <span className="field-label">Phone number</span>
                <input
                  className="input"
                  value={settings.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  data-testid="input-store-phone"
                />
              </label>
            </div>
            <div className="settings-actions">
              <button
                className="primary-btn"
                onClick={save}
                data-testid="button-save-settings"
              >
                <Check size={16} /> {saved ? "Saved locally" : "Save settings"}
              </button>
            </div>
          </div>
          <div className="settings-section">
            <h2 className="section-heading">Receipt preferences</h2>
            <p className="section-copy">
              Choose what your customers see on each receipt.
            </p>
            <div className="toggle-row">
              <div>
                <div className="toggle-name">Show store address</div>
                <div className="toggle-description">
                  Print your shop address below the name.
                </div>
              </div>
              <button
                className={`toggle ${settings.showAddress ? "on" : ""}`}
                onClick={() => update("showAddress", !settings.showAddress)}
                aria-label="Toggle store address"
                data-testid="button-toggle-address"
              >
                <span />
              </button>
            </div>
            <div className="toggle-row">
              <div>
                <div className="toggle-name">Show phone number</div>
                <div className="toggle-description">
                  Make it easy for customers to call the shop.
                </div>
              </div>
              <button
                className={`toggle ${settings.showPhone ? "on" : ""}`}
                onClick={() => update("showPhone", !settings.showPhone)}
                aria-label="Toggle phone number"
                data-testid="button-toggle-phone"
              >
                <span />
              </button>
            </div>
          </div>
        </section>
        <aside className="panel page-panel receipt-preview">
          <div className="receipt-paper">
            <div className="receipt-brand">
              {settings.storeName || "Your store name"}
            </div>
            {settings.showAddress && <p>{settings.address}</p>}
            {settings.showPhone && <p>{settings.phone}</p>}
            <div className="receipt-rule" />
            <p>Receipt preview · Counter 01</p>
            <div className="receipt-rule" />
            <p className="receipt-total">R 86.47</p>
            <p>Thank you for shopping local.</p>
          </div>
          <div
            style={{
              textAlign: "center",
              color: "var(--ink-soft)",
              fontSize: 11,
              marginTop: 14,
            }}
          >
            Printed receipts use these preferences.
          </div>
        </aside>
      </div>
    </>
  );
}

function Router() {
  return (
    <>
      <Navigation />
      <main className="main">
        <Switch>
          <Route path="/" component={Sales} />
          <Route path="/products" component={Products} />
          <Route path="/reports" component={Reports} />
          <Route path="/settings" component={Settings} />
          <Route>
            <div className="panel empty-table">
              <div className="empty-title">Page not found</div>
              <Link
                href="/"
                className="primary-btn"
                style={{ marginTop: 15 }}
                data-testid="link-back-to-sales"
              >
                Back to sales
              </Link>
            </div>
          </Route>
        </Switch>
      </main>
    </>
  );
}

function App() {
  return <Router />;
}

export default App;
