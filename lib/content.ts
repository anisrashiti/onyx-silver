import type { Category } from "./products";

export const navigation: { label: string; category?: Category; info?: string }[] = [
  { label: "All Jewelry", category: "All Jewelry" },
  { label: "Best Sellers", info: "Best Sellers" },
  { label: "New In", category: "All Jewelry" },
  { label: "Collections", category: "All Jewelry" },
  { label: "Rings", category: "Rings" },
  { label: "Earrings", category: "Earrings" },
  { label: "Necklaces", category: "Necklaces" },
  { label: "Bracelets", category: "Bracelets" },
];

export const footerGroups = [
  { title: "Customer Care", links: ["FAQs", "Order Status", "Shipping & Delivery", "Returns & Exchanges", "Contact Us"] },
  { title: "Shop", links: ["Rings", "Necklaces", "Bracelets", "Earrings", "Sets", "Gifts"] },
  { title: "Discover Onyx", links: ["New Arrivals", "Best Sellers", "Gift Guide", "Jewelry Care", "Size Guide"] },
  { title: "About Onyx", links: ["Our Story", "27 Years of Onyx", "Retail & Wholesale", "Payment Options"] },
];

export const information: Record<string, { text: string; detail?: string }> = {
  "Our Story": { text: "For 27 years, Onyx Silver has brought refined silver jewelry, trusted service, and a distinctive retail and wholesale presence to generations of customers.", detail: "The heritage statement is client-provided and awaits final verification before launch." },
  "27 Years of Onyx": { text: "A legacy of refined silver jewelry, personal service, and timeless style.", detail: "The 27-year heritage is client-provided content, pending final verification." },
  "Our Boutique": { text: "Experience Onyx Silver in person.", detail: "The boutique image is a design-reference visual. Actual store photography, address, opening hours, and directions are awaiting confirmation." },
  "Silver Wholesale": { text: "Explore Onyx Silver’s wholesale offering and business opportunities.", detail: "The wholesale contact and enquiry destination will be provided before launch. No enquiry is sent from this prototype." },
  "Retail & Wholesale": { text: "Onyx Silver serves individual customers and business partners.", detail: "Wholesale terms and a verified enquiry contact are awaiting confirmation." },
  "Account": { text: "Your Onyx account will bring your orders and saved pieces together.", detail: "Account registration and sign-in will be available with the future store integration. Your demo wishlist is saved only in this browser." },
  "Best Sellers": { text: "A curated selection will appear here once the live inventory is connected.", detail: "No sales rankings or bestseller claims are available for this demo inventory." },
  "FAQs": { text: "This is a browsing prototype. You can explore demo pieces, save favorites, and try the shopping bag.", detail: "Purchases, account sign-in, and newsletter delivery are not connected. Official customer care information will be added before launch." },
  "Order Status": { text: "Order tracking will be available when the live store is connected.", detail: "This prototype does not accept or process orders." },
  "Shipping & Delivery": { text: "Shipping destinations, delivery times, and fees are awaiting confirmation from Onyx Silver." },
  "Returns & Exchanges": { text: "The official returns and exchanges policy is awaiting confirmation from Onyx Silver." },
  "Contact Us": { text: "Verified store and customer care contact details will be added before launch." },
  "Jewelry Care": { text: "Product-specific care guidance will be added with the confirmed materials and product catalog." },
  "Size Guide": { text: "A verified Onyx size guide will be added with the live catalog.", detail: "The bracelet lengths in this prototype are demonstration options only." },
  "Payment Options": { text: "Payment methods will be confirmed when the live store is connected.", detail: "No payments are accepted in this prototype." },
  "Privacy Policy": { text: "Onyx Silver’s official privacy policy will be supplied before launch.", detail: "This prototype stores demo bag and wishlist selections in this browser only. Newsletter email addresses are validated locally and are not retained or sent." },
  "Terms & Conditions": { text: "Official terms and conditions will be supplied before launch.", detail: "Demo names, prices, materials, and options do not constitute a live offer for sale." },
  "Social": { text: "Official Onyx Silver social profiles will be linked here once verified URLs are supplied." },
  "Language": { text: "English is available in Prototype V1.", detail: "Shqip localization is planned. Albanian content will be added and reviewed before enabling the language switch." },
  "Exclusive Brand": { text: "An exclusive edit of statement silver.", detail: "This is a provisional campaign category. An exclusive brand partner has not been confirmed." },
};
