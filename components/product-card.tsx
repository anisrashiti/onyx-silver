"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { money, type Product } from "@/lib/products";
import { useStore } from "./store-provider";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, add, open } = useStore();
  const saved = wishlist.includes(product.id);
  return <article className="product-card">
    <div className="product-photo">
      <button className="product-image-link" aria-label={`View ${product.name}`} onClick={() => open({ kind: "product", id: product.id })}><Image src={`/images/${product.image}`} alt={product.alt} fill sizes="(max-width: 600px) 76vw, (max-width: 1000px) 35vw, 20vw" /></button>
      <button className="quick-add" onClick={() => add(product)} aria-label={product.options ? `Choose options for ${product.name}` : `Add ${product.name} to bag`}>{product.options ? "CHOOSE OPTIONS" : "ADD +"}</button>
    </div>
    <div className="product-details">
      <button className="product-name" onClick={() => open({ kind: "product", id: product.id })}>{product.name}</button>
      <button className={`wishlist-button ${saved ? "is-saved" : ""}`} aria-label={`${saved ? "Remove" : "Save"} ${product.name}${saved ? " from" : " to"} wishlist`} aria-pressed={saved} onClick={() => toggleWishlist(product.id)}><Heart size={21} fill={saved ? "currentColor" : "none"} strokeWidth={1.4} /></button>
      <span className="product-price">{money(product.price)}</span>
      <div className="product-material"><span className="swatches" aria-hidden="true">{product.swatches.map((color) => <i key={color} className={color} />)}</span><span>{product.material}</span></div>
    </div>
  </article>;
}
