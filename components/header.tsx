"use client";

import Image from "next/image";
import { Heart, Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/content";
import { useStore } from "./store-provider";

export function Header() {
  const { open, cart, wishlist } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const bagCount = cart.reduce((total, line) => total + line.quantity, 0);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 60);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
    <button className="icon-button mobile-menu-toggle" aria-label="Open navigation menu" onClick={() => open({ kind: "menu" })}><Menu size={23} /></button>
    <a className="header-logo" href="#top" aria-label="Onyx Silver home"><Image src="/images/onyx-logo.png" alt="ONYX SILVER" width={160} height={68} priority /></a>
    <nav className="desktop-navigation" aria-label="Main navigation">{navigation.map((item) => <button key={item.label} onClick={() => item.category ? open({ kind: "catalog", category: item.category, title: item.label }) : open({ kind: "info", title: item.info! })}>{item.label}</button>)}</nav>
    <div className="header-actions">
      <button aria-label="Search jewelry" onClick={() => open({ kind: "search" })}><Search /><span>Search</span></button>
      <button className="account-action" aria-label="Account" onClick={() => open({ kind: "info", title: "Account" })}><UserRound /><span>Account</span></button>
      <button className="wishlist-action" aria-label={`Open wishlist, ${wishlist.length} saved items`} onClick={() => open({ kind: "wishlist" })}><Heart /><span>Wishlist{wishlist.length ? ` (${wishlist.length})` : ""}</span>{wishlist.length > 0 && <small className="mobile-count">{wishlist.length}</small>}</button>
      <button aria-label={`Open shopping bag, ${bagCount} items`} onClick={() => open({ kind: "bag" })}><ShoppingBag /><span>Bag{bagCount ? ` (${bagCount})` : ""}</span>{bagCount > 0 && <small className="mobile-count">{bagCount}</small>}</button>
    </div>
  </header>;
}
