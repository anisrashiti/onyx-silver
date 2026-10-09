"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "./product-card";

export function ProductCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ progress: 0, end: false });
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const element = track.current!;
    const update = () => {
      const max = element.scrollWidth - element.clientWidth;
      setPosition({ progress: max > 0 ? element.scrollLeft / max : 0, end: max <= 0 || element.scrollLeft >= max - 2 });
    };
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => { element.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);

  function move(direction: number) {
    const element = track.current!;
    const card = element.querySelector<HTMLElement>(".product-card")!;
    const step = card.offsetWidth + parseFloat(getComputedStyle(element).columnGap);
    const currentIndex = direction > 0 ? Math.ceil((element.scrollLeft - 2) / step) : Math.floor((element.scrollLeft + 2) / step);
    const destination = Math.max(0, Math.min(element.scrollWidth - element.clientWidth, (currentIndex + direction) * step));
    element.scrollTo({ left: destination, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    setAnnouncement(direction > 0 ? "Showing the next selection" : "Showing the previous selection");
  }

  return <section className="product-section" id="picked" aria-labelledby="picked-heading">
    <div className="section-heading-row"><h2 id="picked-heading">PICKED JUST FOR YOU.</h2></div>
    <div ref={track} className="product-track" role="region" aria-label="Curated jewelry carousel. Use left and right arrow keys to browse." tabIndex={0} onKeyDown={(event) => { if ((event.key === "ArrowLeft" || event.key === "ArrowRight") && event.target === event.currentTarget) { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }}>{products.map((product) => <ProductCard product={product} key={product.id} />)}</div>
    <div className="carousel-controls"><button className="icon-button" aria-label="Previous products" disabled={position.progress <= 0.001} onClick={() => move(-1)}><ChevronLeft size={18} /></button><div className="carousel-progress" aria-hidden="true"><span style={{ left: `${position.progress * 85}%` }} /></div><button className="icon-button" aria-label="Next products" disabled={position.end} onClick={() => move(1)}><ChevronRight size={18} /></button></div>
    <span className="sr-only" aria-live="polite">{announcement}</span>
  </section>;
}
