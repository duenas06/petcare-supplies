"use client";

import Image from "next/image";
import { useMemo, useState, type FormEvent } from "react";
import {
  BadgeCheck,
  Cat,
  CheckCircle2,
  Clock,
  CreditCard,
  Landmark,
  HeartPulse,
  Minus,
  PackageCheck,
  PawPrint,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
  WalletCards,
  X
} from "lucide-react";
import { PAYMENT_OPTIONS, PRODUCTS, type CustomerDetails, type PaymentMethod, type Product, type ProductCategory } from "@jibs/shared";
import { addToCart, clearCart, decreaseQuantity, removeLine, toggleCart } from "@/features/cart/cartSlice";
import { setCategory, setQuery } from "@/features/catalog/catalogSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { submitCheckout } from "@/lib/api";
import { formatPeso } from "@/lib/format";

const categoryLabels: Record<ProductCategory | "all", string> = {
  all: "All cat essentials",
  food: "Cat food",
  treats: "Kitty treats",
  litter: "Cat litter",
  toys: "Enrichment toys",
  grooming: "Coat care",
  beds: "Naps & perches",
  health: "Feline wellness"
};

const deliveryStats = [
  { icon: Truck, label: "Same-day cat supply delivery" },
  { icon: PackageCheck, label: "Food and litter packed separately" },
  { icon: BadgeCheck, label: "Cat-only aisles, focused picks" }
];

const heroChips = ["Kitten pantry", "Indoor cat care", "Low-dust litter", "Play & scratch"];

const catRoutineCards = [
  {
    icon: Cat,
    title: "Kitten starters",
    text: "Small-bite food, gentle treats, and first litter picks for tiny paws."
  },
  {
    icon: Sparkles,
    title: "Indoor cat reset",
    text: "Hairball care, enrichment toys, odor control, and window-perch comfort."
  },
  {
    icon: ShieldCheck,
    title: "Litter box care",
    text: "Low-dust clumping and tofu litter options for cleaner daily scooping."
  },
  {
    icon: HeartPulse,
    title: "Feline wellness",
    text: "Hydration-friendly food, grooming tools, and wellness support for routine care."
  }
];

function ProductArt({ product }: { product: Product }) {
  return (
    <div className="product-art" style={{ "--product-color": product.color } as React.CSSProperties}>
      <span className="cat-ear left-ear" />
      <span className="cat-ear right-ear" />
      <span className="bag bag-large" />
      <span className="bag bag-small" />
      <Cat aria-hidden="true" />
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const catNote = getCatNote(product);

  return (
    <article className="product-card">
      <ProductArt product={product} />
      <div className="product-body">
        <div className="product-meta">
          <span>{categoryLabels[product.category]}</span>
          <span>{product.rating.toFixed(1)} cat rating</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <span className="cat-note">
          <PawPrint size={14} />
          {catNote}
        </span>
        <div className="product-footer">
          <div>
            <strong>{formatPeso(product.price)}</strong>
            {product.compareAtPrice ? <small>{formatPeso(product.compareAtPrice)}</small> : null}
          </div>
          <button type="button" onClick={() => dispatch(addToCart(product))} aria-label={`Add ${product.name} to cart`}>
            <ShoppingBag size={18} />
            Add
          </button>
        </div>
        {product.badge ? <span className="product-badge">{product.badge}</span> : null}
      </div>
    </article>
  );
}

function getCatNote(product: Product) {
  const notes: Record<ProductCategory, string> = {
    food: "Matched for feline nutrition routines",
    treats: "Tiny rewards for training and bonding",
    litter: "Litter box refresh for cleaner paws",
    toys: "Daily hunting play and enrichment",
    grooming: "Coat care for less shedding",
    beds: "Perches and nap zones cats choose",
    health: "Wellness support for cat parents"
  };

  if (product.name.toLowerCase().includes("kitten")) {
    return "Sized for growing kittens";
  }

  if (product.name.toLowerCase().includes("hairball")) {
    return "Made for indoor-cat hairball care";
  }

  return notes[product.category];
}

function CartDrawer() {
  const dispatch = useAppDispatch();
  const { lines, isOpen } = useAppSelector((state) => state.cart);
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const deliveryFee = subtotal >= 1500 || subtotal === 0 ? 0 : 120;
  const total = subtotal + deliveryFee;
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("gcash");
  const [paymentReference, setPaymentReference] = useState("");
  const [checkoutState, setCheckoutState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const selectedPayment = PAYMENT_OPTIONS.find((option) => option.id === paymentMethod) ?? PAYMENT_OPTIONS[0];

  const handleCheckout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCheckoutState("loading");
    setCheckoutMessage("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const submittedCustomer: CustomerDetails = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      address: String(formData.get("address") ?? ""),
      city: String(formData.get("city") ?? ""),
      deliveryDate: String(formData.get("deliveryDate") ?? "")
    };

    try {
      const response = await submitCheckout({
        items: lines,
        customer: submittedCustomer,
        paymentMethod,
        paymentReference
      });

      setCheckoutState("success");
      setCheckoutMessage(`Order ${response.data.id.slice(0, 8).toUpperCase()} received. ${response.payment.instructions}`);
      dispatch(clearCart());
      form.reset();
      setPaymentReference("");
    } catch (error) {
      setCheckoutState("error");
      setCheckoutMessage(error instanceof Error ? error.message : "Checkout failed");
    }
  };

  return (
    <aside className={`cart-drawer ${isOpen ? "open" : ""}`} aria-hidden={!isOpen}>
      <div className="cart-header">
        <div>
          <span>Cart</span>
          <h2>Cat basket</h2>
        </div>
        <button type="button" className="icon-button" onClick={() => dispatch(toggleCart(false))} aria-label="Close cart">
          <X size={20} />
        </button>
      </div>

      {checkoutState === "success" ? (
        <div className="order-success">
          <CheckCircle2 size={40} />
          <h3>Order received</h3>
          <p>{checkoutMessage}</p>
          <button type="button" onClick={() => setCheckoutState("idle")}>
            Continue shopping
          </button>
        </div>
      ) : lines.length === 0 ? (
        <div className="empty-cart">
          <ShoppingBag size={34} />
          <h3>Your cat basket is ready.</h3>
          <p>Add food, litter, treats, toys, and perch-worthy comforts for the next supply run.</p>
        </div>
      ) : (
        <>
          <div className="cart-lines">
            {lines.map((line) => (
              <div className="cart-line" key={line.productId}>
                <div>
                  <strong>{line.name}</strong>
                  <span>{formatPeso(line.price)} each</span>
                </div>
                <div className="quantity-controls">
                  <button type="button" onClick={() => dispatch(decreaseQuantity(line.productId))} aria-label={`Decrease ${line.name}`}>
                    <Minus size={16} />
                  </button>
                  <span>{line.quantity}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const product = PRODUCTS.find((item) => item.id === line.productId);
                      if (product) dispatch(addToCart(product));
                    }}
                    aria-label={`Increase ${line.name}`}
                  >
                    <Plus size={16} />
                  </button>
                  <button type="button" onClick={() => dispatch(removeLine(line.productId))} aria-label={`Remove ${line.name}`}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <form className="checkout-form" onSubmit={handleCheckout}>
            <div className="totals">
              <span>
                Subtotal <strong>{formatPeso(subtotal)}</strong>
              </span>
              <span>
                Delivery <strong>{deliveryFee === 0 ? "Free" : formatPeso(deliveryFee)}</strong>
              </span>
              <span className="grand-total">
                Total <strong>{formatPeso(total)}</strong>
              </span>
            </div>

            <div className="form-grid">
              <input required name="fullName" placeholder="Full name" />
              <input required name="email" type="email" placeholder="Email" />
              <input required name="phone" placeholder="Mobile number" />
              <input required name="city" placeholder="City" defaultValue="Metro Manila" />
              <input required name="address" className="wide" placeholder="Delivery address and cat note" />
              <input required name="deliveryDate" type="date" className="wide" />
            </div>

            <fieldset className="payment-options">
              <legend>Payment method</legend>
              <label className={paymentMethod === "gcash" ? "selected" : ""}>
                <input type="radio" name="payment" checked={paymentMethod === "gcash"} onChange={() => setPaymentMethod("gcash")} />
                <WalletCards size={18} />
                GCash
              </label>
              <label className={paymentMethod === "bank-transfer" ? "selected" : ""}>
                <input type="radio" name="payment" checked={paymentMethod === "bank-transfer"} onChange={() => setPaymentMethod("bank-transfer")} />
                <Landmark size={18} />
                Bank transfer
              </label>
            </fieldset>

            <div className="payment-note">
              <CreditCard size={18} />
              <p>
                <strong>{selectedPayment.accountName}</strong>
                <span>{selectedPayment.accountNumber}</span>
                <em>{selectedPayment.instructions}</em>
              </p>
            </div>

            <input
              placeholder="Payment reference number"
              value={paymentReference}
              onChange={(event) => setPaymentReference(event.target.value)}
            />

            <button className="checkout-button" type="submit" disabled={checkoutState === "loading" || lines.length === 0}>
              {checkoutState === "loading" ? "Placing cat order..." : "Place cat order"}
            </button>

            {checkoutMessage ? (
              <p className={`checkout-message ${checkoutState}`}>
                {checkoutMessage}
              </p>
            ) : null}
          </form>
        </>
      )}
    </aside>
  );
}

export default function Storefront() {
  const dispatch = useAppDispatch();
  const { activeCategory, query } = useAppSelector((state) => state.catalog);
  const { lines } = useAppSelector((state) => state.cart);
  const cartCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.category === activeCategory;
      const matchesQuery =
        !normalizedQuery ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="brand">
          <Cat size={28} />
          <span>Jibs Petcare Supplies & Delivery</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#shop">Cat shop</a>
          <a href="#cat-care">Cat care</a>
          <a href="#delivery">Delivery</a>
          <a href="#payment">Payment</a>
        </nav>
        <button type="button" className="cart-button" onClick={() => dispatch(toggleCart(true))}>
          <ShoppingBag size={19} />
          <span>{cartCount}</span>
        </button>
      </header>

      <section className="hero" id="top">
        <Image src="/images/jibs-cat-hero-orange.png" alt="Orange cat with supplies arranged for delivery at Jibs" fill priority sizes="100vw" />
        <div className="hero-overlay">
          <p>Built only for cats</p>
          <h1>Jibs Petcare Supplies & Delivery</h1>
          <span>Fresh feline food, low-dust litter, hunting toys, grooming care, wellness picks, and nap-worthy perches delivered for cats across the city.</span>
          <div className="cat-chips" aria-label="Cat care highlights">
            {heroChips.map((chip) => (
              <span key={chip}>
                <PawPrint size={14} />
                {chip}
              </span>
            ))}
          </div>
          <div className="hero-actions">
            <a href="#shop">Shop for cats</a>
            <button type="button" onClick={() => dispatch(toggleCart(true))}>
              <ShoppingBag size={18} />
              Open cat basket
            </button>
          </div>
        </div>
      </section>

      <section className="trust-band" id="delivery">
        {deliveryStats.map((item) => (
          <div key={item.label}>
            <item.icon size={22} />
            <span>{item.label}</span>
          </div>
        ))}
        <div>
          <Clock size={22} />
          <span>Free delivery from {formatPeso(1500)}</span>
        </div>
      </section>

      <section className="cat-care-section" id="cat-care">
        <div className="section-heading">
          <div>
            <p>Feline routines</p>
            <h2>Shop by the way your cat lives</h2>
          </div>
          <span>
            From kitten meals to senior comfort, every shelf is organized around real cat habits: eating, grooming,
            scratching, sleeping, hiding, and box care.
          </span>
        </div>
        <div className="cat-care-grid">
          {catRoutineCards.map((card) => (
            <article key={card.title} className="cat-care-card">
              <card.icon size={26} />
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading">
          <div>
            <p>Curated for whiskers</p>
            <h2>Cat food, litter, toys, and comfort essentials</h2>
          </div>
          <label className="search-box">
            <Search size={18} />
            <input value={query} onChange={(event) => dispatch(setQuery(event.target.value))} placeholder="Search kitten food, tofu litter, catnip..." />
          </label>
        </div>

        <div className="category-tabs" role="tablist" aria-label="Product categories">
          {(Object.keys(categoryLabels) as Array<ProductCategory | "all">).map((category) => (
            <button
              key={category}
              type="button"
              className={activeCategory === category ? "active" : ""}
              onClick={() => dispatch(setCategory(category))}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="payment-section" id="payment">
        <div>
          <p>Online payment ready</p>
          <h2>Pay for cat supplies with GCash or bank transfer</h2>
          <span>
            Cat parents can choose a payment method at checkout, submit their reference number, and receive payment
            instructions with the recorded food, litter, toy, or wellness order.
          </span>
        </div>
        <div className="payment-cards">
          {PAYMENT_OPTIONS.map((option) => (
            <article key={option.id}>
              {option.id === "gcash" ? <WalletCards size={24} /> : <Landmark size={24} />}
              <h3>{option.label}</h3>
              <p>{option.accountName}</p>
              <strong>{option.accountNumber}</strong>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <span>Jibs Petcare Supplies & Delivery</span>
        <p>Cat-only storefront demo for feline food, litter, toys, grooming, beds, and wellness delivery.</p>
      </footer>

      <CartDrawer />
    </main>
  );
}
