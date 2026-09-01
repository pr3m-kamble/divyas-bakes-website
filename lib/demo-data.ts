import type { Product } from "@/types";

export const demoProducts: Product[] = [
  { id: "1", name: "Pink Rose Cake", slug: "pink-rose-cake", description: "A soft, elegant celebration cake.", price: 899, category: "Cakes", image_url: "/images/pink-rose-cake.jpg", available: true, featured: true, created_at: new Date().toISOString() },
  { id: "2", name: "Chocolate Truffle Cake", slug: "chocolate-truffle-cake", description: "Rich chocolate cake with silky ganache.", price: 999, category: "Cakes", image_url: "/images/chocolate-truffle-cake.jpg", available: true, featured: true, created_at: new Date().toISOString() },
  { id: "3", name: "Red Velvet Cake", slug: "red-velvet-cake", description: "Classic red velvet with creamy frosting.", price: 899, category: "Cakes", image_url: "/images/red-velvet-cake.jpg", available: true, featured: true, created_at: new Date().toISOString() },
  { id: "4", name: "Black Forest Cake", slug: "black-forest-cake", description: "Chocolate, cherries and cream in every bite.", price: 799, category: "Cakes", image_url: "/images/black-forest-cake.jpg", available: true, featured: true, created_at: new Date().toISOString() }
];
