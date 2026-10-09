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
  "Our Story": { text: "For 27 years, Onyx Silver has built its reputation through refined silver jewelry, timeless elegance, and a commitment to quality.", detail: "From carefully selected collections to wholesale partnerships, we bring exceptional jewelry to those who appreciate the details." },
  "27 Years of Onyx": { text: "A legacy of refined silver jewelry, personal service, and timeless style.", detail: "For 27 years, Onyx Silver has served individuals and business partners with a considered approach to jewelry." },
  "Our Boutique": { text: "Experience Onyx Silver in person.", detail: "Store details, opening hours, and directions are currently unavailable. Please check back soon." },
  "Silver Wholesale": { text: "Explore silver jewelry for your business.", detail: "Wholesale enquiries are currently unavailable online. Please check back for contact details and partnership information." },
  "Retail & Wholesale": { text: "Onyx Silver serves individual customers and business partners.", detail: "Wholesale enquiries and partnership details are currently unavailable online." },
  "Account": { text: "Account sign-in is currently unavailable.", detail: "You can continue exploring and save your favorite pieces on this device." },
  "Best Sellers": { text: "Our best sellers selection is currently unavailable.", detail: "Explore the collection to discover pieces that speak to you." },
  "FAQs": { text: "Customer care answers are currently unavailable.", detail: "Please check back for information about ordering, delivery, and caring for your jewelry." },
  "Order Status": { text: "Order tracking is currently unavailable online." },
  "Shipping & Delivery": { text: "Delivery information is currently unavailable.", detail: "Destinations, delivery times, and fees will be confirmed before orders are accepted." },
  "Returns & Exchanges": { text: "Our returns and exchanges policy is currently unavailable." },
  "Contact Us": { text: "Customer care contact details are currently unavailable. Please check back soon." },
  "Jewelry Care": { text: "Care instructions for individual pieces are currently unavailable.", detail: "Please confirm the materials and care requirements of your chosen piece before purchasing." },
  "Size Guide": { text: "Our size guide is currently unavailable.", detail: "Sizes and availability will be confirmed before orders are accepted." },
  "Payment Options": { text: "Online payments are currently unavailable.", detail: "Payment options will be confirmed before orders are accepted." },
  "Privacy Policy": { text: "Our privacy policy is currently unavailable.", detail: "Your bag and saved pieces stay on this device. Newsletter email addresses are not saved or sent." },
  "Terms & Conditions": { text: "Our terms and conditions are currently unavailable.", detail: "Online purchasing is unavailable. Prices and availability will be confirmed before orders are accepted." },
  "Social": { text: "Our social profiles are currently unavailable. Please check back soon." },
  "Language": { text: "Explore Onyx Silver in English.", detail: "Shqip is coming soon." },
  "S&A Jewellery Design": { text: "Discover S&A Jewellery Design through Onyx Silver.", detail: "A considered approach to jewellery, with sculptural forms, natural gemstones, and amber. Explore the brand’s collections on the official S&A website." },
};
