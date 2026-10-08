import Image from "next/image";
import { ShopLink } from "./shop-link";

export function AnnouncementBar() {
  return <div className="announcement" id="top"><span>Discover the Onyx Collection.</span> <ShopLink className="announcement-link">Shop Now</ShopLink></div>;
}

export function Hero() {
  return <section className="hero-section" aria-labelledby="hero-title"><div className="hero-panels"><div className="hero-model"><Image src="/images/hero-model.jpg" alt="Model wearing Onyx’s statement crystal chandelier earrings" fill priority sizes="(max-width: 700px) 100vw, 50vw" className="hero-model-photo" /><div className="hero-editorial"><p>THE ONYX EDIT</p><span>Refined silver jewelry.<br />Elegant statement pieces.<br />Designed to elevate every look.</span></div><h1 id="hero-title" className="hero-wordmark">ONYX</h1></div><div className="hero-jewelry"><Image src="/images/chandelier-earrings.jpg" alt="Matching statement chandelier earrings, presented on a light background" fill priority sizes="(max-width: 700px) 100vw, 50vw" /></div></div><div className="hero-information"><p>THE ONYX EDIT<br /><span>STATEMENT SILVER, REFINED FOR EVERY OCCASION</span></p><ShopLink>SHOP NOW</ShopLink></div></section>;
}

export function BrandStatement() {
  return <section className="brand-statement" aria-labelledby="why-heading"><h2 id="why-heading">WHY ONYX SILVER?</h2><div className="brand-statement-copy"><p>For 27 years, Onyx Silver has built its reputation through elegant silver jewelry, refined taste, and a lasting commitment to quality.</p><p>Alongside our retail collections, we also offer silver wholesale, serving both individual customers and business partners.</p><ShopLink>SHOP THE COLLECTION</ShopLink></div></section>;
}

export function EditorialSplit() {
  return <section className="editorial-split" aria-label="Explore Onyx edits"><article className="merchandising-panel"><Image src="/images/essentials.jpg" alt="Silver-tone pearl, crystal and colorful stud earrings arranged on textured beige stone" fill sizes="(max-width: 700px) 100vw, 50vw" /><div className="merchandising-copy"><h2>ESSENTIALS</h2><ShopLink panel={{ kind: "catalog", category: "Earrings", title: "Essentials" }}>SHOP NOW</ShopLink></div></article><article className="merchandising-panel"><Image src="/images/exclusive-editorial.jpg" alt="Statement crystal chandelier earrings against warm textured stone" fill sizes="(max-width: 700px) 100vw, 50vw" /><div className="merchandising-copy"><h2>EXCLUSIVE BRAND</h2><ShopLink panel={{ kind: "info", title: "Exclusive Brand" }}>DISCOVER MORE</ShopLink></div></article></section>;
}

const experiences = [
  { title: "OUR BOUTIQUE", image: "boutique-reference.jpg", alt: "Provisional boutique interior from the approved design reference", description: "Step into a refined jewelry space designed for discovery, elegance, and personal service.", cta: "VISIT OUR STORE", info: "Our Boutique", provisional: true },
  { title: "THE GIFT EDIT", image: "gift-edit.jpg", alt: "A curated selection of silver-tone gifts arranged on warm stone", description: "Thoughtfully selected silver pieces for meaningful moments and timeless gifting.", cta: "SHOP GIFTS" },
  { title: "SILVER WHOLESALE", image: "wholesale-edit.jpg", alt: "An editorial assortment of silver-tone rings, earrings, and necklaces", description: "Explore wholesale opportunities with a trusted name in silver jewelry.", cta: "ENQUIRE NOW", info: "Silver Wholesale" },
];

export function OnyxExperience() {
  return <section className="experience-section" id="experience" aria-labelledby="experience-heading"><div className="experience-heading"><h2 id="experience-heading">THE ONYX EXPERIENCE</h2><p>Discover more ways to experience Onyx Silver — from boutique shopping to gifting and wholesale partnerships.</p></div><div className="experience-grid">{experiences.map((experience) => <article className="editorial-card" key={experience.title}><div className="editorial-card-image"><Image src={`/images/${experience.image}`} alt={experience.alt} fill sizes="(max-width: 700px) 100vw, 33vw" />{experience.provisional && <span className="image-disclaimer">DESIGN REFERENCE · STORE PHOTO PENDING</span>}</div><div className="editorial-card-copy"><h3>{experience.title}</h3><p>{experience.description}</p><ShopLink panel={experience.info ? { kind: "info", title: experience.info } : { kind: "catalog", category: "Gifts", title: "The Gift Edit" }}>{experience.cta}</ShopLink></div></article>)}</div></section>;
}
