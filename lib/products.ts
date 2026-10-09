// Provisional demo inventory. Replace this module with a Shopify data adapter later.
export const inventoryStatus = { confirmed: false, source: "local mock catalog", purchasingEnabled: false } as const;
export type Category = "All Jewelry" | "Rings" | "Earrings" | "Necklaces" | "Bracelets" | "Sets" | "Gifts" | "Charms";
export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  alt: string;
  category: Category;
  material: string;
  swatches: string[];
  options?: string[];
};

export const products: Product[] = [
  { id: "charm-bracelet", name: "Charm Bracelet", price: 129, image: "charm-bracelet.jpg", alt: "Silver-tone bracelet with butterfly, crystal and gold-tone charms", category: "Bracelets", material: "Silver & gold tones", swatches: ["silver", "gold"], options: ["17 cm", "19 cm", "21 cm"] },
  { id: "bow-drops", name: "Bow Crystal Drops", price: 85, image: "bow-earrings.jpg", alt: "Crystal bow earrings with delicate pendant drops", category: "Earrings", material: "Silver tone, crystal details", swatches: ["silver"] },
  { id: "heart-cherry", name: "Heart & Cherry Charms", price: 79, image: "heart-cherry-charms.jpg", alt: "Heart charm beside red cherry charm with green leaves", category: "Charms", material: "Silver tone, enamel details", swatches: ["silver", "rose"] },
  { id: "leaf-drops", name: "Leaf Crystal Earrings", price: 95, image: "leaf-earrings.jpg", alt: "A pair of delicate leaf-shaped crystal drop earrings", category: "Earrings", material: "Silver tone, crystal details", swatches: ["silver"] },
  { id: "angel-wings", name: "Angel Wings Charm", price: 69, image: "angel-charm.jpg", alt: "Silver-tone angel wings charm with a rose-tone heart", category: "Charms", material: "Silver & rose tones", swatches: ["silver", "rose"] },
  { id: "chandelier", name: "Chandelier Crystal Earrings", price: 119, image: "chandelier-earrings.jpg", alt: "Statement crystal chandelier earrings on a light background", category: "Earrings", material: "Silver tone, crystal details", swatches: ["silver"] },
  { id: "floral", name: "Floral Crystal Drops", price: 89, image: "floral-earrings.jpg", alt: "Crystal flower earrings with long delicate silver-tone chains", category: "Earrings", material: "Silver tone, crystal details", swatches: ["silver"] },
  { id: "pearl", name: "Pearl Link Earrings", price: 75, image: "pearl-earrings.jpg", alt: "Gold-tone elongated link earrings with pearl-like drops", category: "Earrings", material: "Gold tone, pearl details", swatches: ["gold"] },
];

export const money = (amount: number) => new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);
export const productById = (id: string) => products.find((product) => product.id === id);
