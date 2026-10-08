import Image from "next/image";
import { ChevronDown, Diamond, Facebook, Instagram, MapPin, ShieldCheck, ShoppingBag } from "lucide-react";
import { footerGroups } from "@/lib/content";
import type { Category } from "@/lib/products";
import { ShopLink } from "./shop-link";
import { NewsletterForm } from "./newsletter";
import type { Panel } from "./store-provider";

function footerPanel(label: string, shop: boolean): Panel {
  if (shop) return { kind: "catalog", category: label as Category };
  if (label === "Gift Guide") return { kind: "catalog", category: "Gifts", title: "The Gift Edit" };
  if (label === "New Arrivals") return { kind: "catalog", category: "All Jewelry", title: "New In" };
  return { kind: "info", title: label };
}

const benefits = [
  { icon: Diamond, title: "27 Years", text: "A legacy you can trust" },
  { icon: ShieldCheck, title: "Silver Specialists", text: "Quality in every detail" },
  { icon: ShoppingBag, title: "Retail + Wholesale", text: "For individuals & businesses" },
  { icon: MapPin, title: "Online & In-Store", text: "Always closer to you" },
];

export function BrandFooter() {
  return <footer><div className="onyx-world"><div><h2>THE ONYX WORLD</h2><ShopLink panel={{ kind: "info", title: "Our Story" }}>DISCOVER MORE</ShopLink></div><p>For 27 years, Onyx Silver has brought refined silver jewelry, trusted service, and a distinctive retail and wholesale presence to generations of customers.</p></div><div className="footer-main"><div className="footer-columns"><a className="footer-logo" href="#top" aria-label="Onyx Silver home"><Image src="/images/onyx-logo.png" alt="ONYX SILVER" width={195} height={82} /></a>{footerGroups.map((group) => <div className="footer-link-group" key={group.title}><h3>{group.title}</h3><ul>{group.links.map((link) => <li key={link}><ShopLink className="footer-link" panel={footerPanel(link, group.title === "Shop")}>{link}</ShopLink></li>)}</ul></div>)}<div className="why-onyx"><h3>WHY ONYX</h3>{benefits.map(({ icon: Icon, title, text }) => <div className="footer-benefit" key={title}><Icon size={34} strokeWidth={1.2} /><p>{title}<span>{text}</span></p></div>)}</div></div><NewsletterForm /></div><div className="footer-bottom"><div className="locale-control"><span>Country &amp; Language:</span><ShopLink className="locale-button" panel={{ kind: "info", title: "Language" }}>Kosovo (EUR)<span className="locale-divider">|</span>English / Shqip<ChevronDown size={16} /></ShopLink></div><div className="footer-legal"><ShopLink className="footer-bottom-link" panel={{ kind: "info", title: "Privacy Policy" }}>Privacy Policy</ShopLink><span aria-hidden="true">|</span><ShopLink className="footer-bottom-link" panel={{ kind: "info", title: "Terms & Conditions" }}>Terms &amp; Conditions</ShopLink></div><div className="footer-socials"><ShopLink className="icon-button" panel={{ kind: "info", title: "Social" }}><span className="sr-only">Onyx Instagram</span><Instagram size={24} /></ShopLink><ShopLink className="icon-button" panel={{ kind: "info", title: "Social" }}><span className="sr-only">Onyx Facebook</span><Facebook size={22} /></ShopLink><ShopLink className="icon-button" panel={{ kind: "info", title: "Social" }}><span className="sr-only">Onyx Pinterest</span><span className="pinterest-icon" aria-hidden="true">p</span></ShopLink></div></div></footer>;
}
