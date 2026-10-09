import Image from "next/image";
import { ShopLink } from "./shop-link";

export function AnnouncementBar() {
  return <div className="announcement" id="top"><span>Discover the Onyx Collection.</span> <ShopLink className="announcement-link">Shop Now</ShopLink></div>;
}

export function Hero() {
  return <section className="hero-section" aria-labelledby="hero-title"><div className="hero-panels"><div className="hero-model"><Image src="/images/hero-model.jpg" alt="Model wearing Onyx’s statement crystal chandelier earrings" fill priority sizes="(max-width: 700px) 100vw, 50vw" className="hero-model-photo" /><div className="hero-editorial"><span>Refined silver jewelry.<br />Elegant statement pieces.<br />Designed to elevate every look.</span></div><h1 id="hero-title" className="sr-only">Onyx Silver — refined silver jewelry</h1><Image className="hero-wordmark" src="/images/onyx-wordmark.png" alt="" aria-hidden="true" width={908} height={283} priority sizes="(max-width: 700px) 88vw, 39vw" /></div><div className="hero-jewelry"><Image src="/images/chandelier-earrings.jpg" alt="Matching statement chandelier earrings, presented on a light background" fill priority sizes="(max-width: 700px) 100vw, 50vw" /></div></div><div className="hero-information"><p>STATEMENT SILVER, REFINED FOR EVERY OCCASION</p><ShopLink>SHOP NOW</ShopLink></div></section>;
}

export function BrandStatement() {
  return <section className="brand-statement" aria-labelledby="why-heading"><div className="brand-statement-inner"><h2 id="why-heading">WHY ONYX SILVER?</h2><div className="brand-statement-copy"><p>For 27 years, Onyx Silver has built its reputation through refined silver jewelry, timeless elegance, and a commitment to quality.</p><p>From carefully selected collections to wholesale partnerships, we bring exceptional jewelry to those who appreciate the details.</p><ShopLink panel={{ kind: "info", title: "Our Story" }}>DISCOVER OUR STORY</ShopLink></div></div></section>;
}

export function EditorialSplit() {
  return <section className="editorial-split" aria-label="Explore Onyx edits"><article className="merchandising-panel"><Image src="/images/essentials.jpg" alt="Silver-tone pearl, crystal and colorful stud earrings arranged on textured beige stone" fill sizes="(max-width: 700px) 100vw, 50vw" /><div className="merchandising-copy"><h2>ESSENTIALS</h2><ShopLink panel={{ kind: "catalog", category: "Earrings", title: "Essentials" }}>SHOP NOW</ShopLink></div></article><article className="merchandising-panel"><Image src="/images/exclusive-editorial.jpg" alt="Statement crystal chandelier earrings against warm textured stone" fill sizes="(max-width: 700px) 100vw, 50vw" /><div className="merchandising-copy partner-copy"><p className="campaign-label">DISCOVER S&amp;A</p><h2>S&amp;A <span>JEWELLERY DESIGN</span></h2><ShopLink panel={{ kind: "info", title: "S&A Jewellery Design" }}>EXPLORE THE COLLECTION</ShopLink></div></article></section>;
}

const experiences = [
  { title: "OUR BOUTIQUE", image: "boutique-reference.jpg", alt: "A light, stone-toned jewelry boutique interior", description: "A refined space for discovery, elegance, and personal service.", cta: "VISIT OUR STORE", info: "Our Boutique" },
  { title: "THE GIFT EDIT", image: "gift-edit.jpg", alt: "A curated selection of silver-tone gifts arranged on warm stone", description: "Thoughtfully selected silver pieces for meaningful moments and timeless gifting.", cta: "SHOP GIFTS" },
  { title: "SILVER WHOLESALE", image: "wholesale-edit.jpg", alt: "An editorial assortment of silver-tone rings, earrings, and necklaces", description: "Explore wholesale opportunities with a trusted name in silver jewelry.", cta: "ENQUIRE NOW", info: "Silver Wholesale" },
];

export function OnyxExperience() {
  return <section className="experience-section" id="experience" aria-labelledby="experience-heading"><div className="experience-heading"><h2 id="experience-heading">THE ONYX EXPERIENCE.</h2><p>Discover more ways to experience Onyx Silver — from boutique shopping to gifting and wholesale partnerships.</p></div><div className="experience-grid">{experiences.map((experience) => <article className="editorial-card" key={experience.title}><div className="editorial-card-image"><Image src={`/images/${experience.image}`} alt={experience.alt} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><div className="editorial-card-copy"><h3>{experience.title}</h3><p>{experience.description}</p><ShopLink panel={experience.info ? { kind: "info", title: experience.info } : { kind: "catalog", category: "Gifts", title: "The Gift Edit" }}>{experience.cta}</ShopLink></div></article>)}</div></section>;
}
