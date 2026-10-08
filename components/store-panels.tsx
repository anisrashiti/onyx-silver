"use client";

import Image from "next/image";
import { Heart, Minus, Plus, Search, ShoppingBag, X, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { information, navigation } from "@/lib/content";
import { money, products, productById, type Category, type Product } from "@/lib/products";
import { ProductCard } from "./product-card";
import { useStore } from "./store-provider";

function EmptyState({ type }: { type: "bag" | "wishlist" }) {
  const { open } = useStore();
  const Icon = type === "bag" ? ShoppingBag : Heart;
  return <div className="empty-state"><Icon size={38} strokeWidth={1} /><h3>{type === "bag" ? "Your bag is waiting." : "Keep the pieces you love."}</h3><p>{type === "bag" ? "Discover your next everyday favorite." : "Tap the heart on a piece to save it here."}</p><button className="solid-button" onClick={() => open({ kind: "catalog", category: "All Jewelry" })}>EXPLORE THE COLLECTION <ArrowRight size={16} /></button></div>;
}

function CartDrawer() {
  const { cart, quantity } = useStore();
  const total = cart.reduce((sum, line) => sum + productById(line.id)!.price * line.quantity, 0);
  if (!cart.length) return <EmptyState type="bag" />;
  return <div className="bag-content"><div className="cart-lines">{cart.map((line) => {
    const product = productById(line.id)!;
    return <article className="cart-line" key={`${line.id}:${line.option}`}><div className="cart-image"><Image src={`/images/${product.image}`} alt={product.alt} fill sizes="120px" /></div><div className="cart-line-details"><h3>{product.name}</h3><p>{line.option || product.material}</p><span>{money(product.price * line.quantity)}</span><div className="cart-line-controls"><div className="quantity-control"><button aria-label={`Decrease quantity of ${product.name}${line.option ? ` ${line.option}` : ""}`} onClick={() => quantity(line, line.quantity - 1)}><Minus size={13} /></button><output aria-label={`Quantity of ${product.name}`}>{line.quantity}</output><button aria-label={`Increase quantity of ${product.name}${line.option ? ` ${line.option}` : ""}`} disabled={line.quantity >= 20} onClick={() => quantity(line, line.quantity + 1)}><Plus size={13} /></button></div><button className="remove-link" aria-label={`Remove ${product.name}${line.option ? ` ${line.option}` : ""} from bag`} onClick={() => quantity(line, 0)}>Remove</button></div></div></article>;
  })}</div><div className="bag-summary"><div><span>Demo subtotal</span><strong data-testid="bag-total">{money(total)}</strong></div><p>Sample prices. Shipping and taxes are not calculated.</p><div className="checkout-notice"><ShoppingBag size={18} /><p>Checkout will be available with the live store. This prototype does not process orders or payments.</p></div></div></div>;
}

function Catalog({ search = false, initialCategory = "All Jewelry", title }: { search?: boolean; initialCategory?: Category; title?: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>(initialCategory);
  const filtered = products.filter((product) => (category === "All Jewelry" || category === "Gifts" || product.category === category) && `${product.name} ${product.material} ${product.category}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <div className="catalog-content">
    <div className="search-field"><Search size={20} /><label className="sr-only" htmlFor="jewelry-search">Search demo products</label><input autoFocus={search} id="jewelry-search" type="search" placeholder="Search jewelry, charms, earrings…" value={query} onChange={(event) => setQuery(event.target.value)} />{query && <button className="icon-button" aria-label="Clear search" onClick={() => setQuery("")}><X size={17} /></button>}</div>
    <div className="category-filters" aria-label="Filter jewelry">{(["All Jewelry", "Earrings", "Bracelets", "Charms", "Rings", "Necklaces", "Sets", "Gifts"] as Category[]).map((item) => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
    <p className="catalog-note">{title === "New In" || title === "Collections" ? "A preview of the collection. " : ""}Demo inventory · sample names, prices, and material descriptions.</p>
    {search && !query && <p className="search-prompt">Find a piece that speaks to you. Try “crystal” or “charm”.</p>}
    <p className="result-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? "piece" : "pieces"}{query ? ` for “${query}”` : " in this demo"}</p>
    {filtered.length ? <div className="catalog-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><Search size={32} strokeWidth={1} /><h3>{query ? "No pieces found." : "This collection is on its way."}</h3><p>{query ? "Try another word or explore all jewelry." : "There are no demo products in this category. The confirmed catalog will be added with the live store."}</p><button className="text-link" onClick={() => { setQuery(""); setCategory("All Jewelry"); }}>VIEW ALL DEMO PIECES</button></div>}
  </div>;
}

function ProductOptions({ product }: { product: Product }) {
  const { add, wishlist, toggleWishlist } = useStore();
  const [option, setOption] = useState("");
  return <div className="product-view"><div className="product-view-photo"><Image src={`/images/${product.image}`} alt={product.alt} fill sizes="(max-width: 600px) 95vw, 450px" /></div><p className="product-view-price">{money(product.price)} <small>Sample price</small></p><p className="product-view-material">{product.material}</p>{product.options && <fieldset className="product-options"><legend>Choose bracelet length <span>(demo options)</span></legend>{product.options.map((length) => <label key={length}><input type="radio" name="length" value={length} checked={option === length} onChange={() => setOption(length)} /><span>{length}</span></label>)}</fieldset>}<button className="solid-button" disabled={Boolean(product.options && !option)} onClick={() => add(product, option)}>{product.options && !option ? "SELECT A LENGTH" : "ADD TO DEMO BAG"}<ShoppingBag size={17} /></button><button className="save-product" aria-pressed={wishlist.includes(product.id)} onClick={() => toggleWishlist(product.id)}><Heart size={17} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />{wishlist.includes(product.id) ? "Saved to your wishlist" : "Save to your wishlist"}</button><p className="catalog-note">A prototype piece. Product name, price, materials, and options are provisional and await confirmation.</p></div>;
}

function MobileNavigation() {
  const { open } = useStore();
  return <nav className="mobile-navigation" aria-label="Mobile navigation">{navigation.map((item) => <button key={item.label} onClick={() => item.category ? open({ kind: "catalog", category: item.category, title: item.label }) : open({ kind: "info", title: item.info! })}>{item.label}<ArrowRight size={18} /></button>)}<div className="mobile-secondary"><button onClick={() => open({ kind: "wishlist" })}>Your wishlist</button><button onClick={() => open({ kind: "info", title: "Account" })}>Your account</button><button onClick={() => open({ kind: "info", title: "Our Boutique" })}>Our boutique</button><button onClick={() => open({ kind: "info", title: "Silver Wholesale" })}>Silver wholesale</button></div></nav>;
}

export function StorePanels() {
  const { panel, close, wishlist, open } = useStore();
  const dialog = useRef<HTMLDialogElement>(null);
  const isOpen = Boolean(panel);
  useEffect(() => {
    const element = dialog.current!;
    if (isOpen) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      if (!element.open) element.showModal();
      return () => { document.body.style.overflow = previous; if (element.open) element.close(); };
    }
  }, [isOpen]);

  let title = "";
  if (panel) {
    if (panel.kind === "bag") title = "YOUR BAG";
    else if (panel.kind === "wishlist") title = "YOUR WISHLIST";
    else if (panel.kind === "search") title = "FIND YOUR PIECE";
    else if (panel.kind === "menu") title = "EXPLORE ONYX";
    else if (panel.kind === "product") title = productById(panel.id)!.name;
    else if (panel.kind === "catalog") title = panel.title || panel.category;
    else if (panel.kind === "info") title = panel.title;
  }

  return <dialog ref={dialog} className={`store-dialog ${panel?.kind === "catalog" || panel?.kind === "search" || panel?.kind === "wishlist" ? "wide-dialog" : ""}`} aria-labelledby="panel-title" onCancel={(event) => { event.preventDefault(); close(); }} onClose={close} onClick={(event) => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close(); } }}>
    <div className="panel-header"><div><p>ONYX SILVER</p><h2 id="panel-title">{title}</h2></div><button className="icon-button" aria-label="Close panel" onClick={close}><X size={23} /></button></div>
    <div className="panel-body" key={JSON.stringify(panel)}>
      {panel?.kind === "bag" && <><p className="panel-prototype">PROTOTYPE BAG · NO REAL PURCHASES</p><CartDrawer /></>}
      {panel?.kind === "wishlist" && (wishlist.length ? <><p className="catalog-note">Your favorites are saved in this browser only.</p><div className="catalog-grid">{products.filter((product) => wishlist.includes(product.id)).map((product) => <ProductCard key={product.id} product={product} />)}</div></> : <EmptyState type="wishlist" />)}
      {panel?.kind === "search" && <Catalog search />}
      {panel?.kind === "catalog" && <Catalog initialCategory={panel.category} title={panel.title} />}
      {panel?.kind === "product" && <ProductOptions product={productById(panel.id)!} />}
      {panel?.kind === "menu" && <MobileNavigation />}
      {panel?.kind === "info" && <div className="information-content"><p>{(information[panel.title] || { text: "Confirmed details will be added before launch." }).text}</p>{information[panel.title]?.detail && <p className="information-detail">{information[panel.title].detail}</p>}{panel.title === "Language" && <div className="language-options"><span>English <small>Active</small></span><span lang="sq">Shqip <small>Coming soon</small></span></div>}<button className="text-link" onClick={() => open({ kind: "catalog", category: "All Jewelry" })}>EXPLORE THE DEMO COLLECTION</button></div>}
    </div>
  </dialog>;
}
