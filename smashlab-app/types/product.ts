export type Product = {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  brand: string;
  category: "rackets" | "apparel" | "footwear" | "gear";
  subcategory?: string;
  variant?: string;
  price: number;
  image: string;
  description: string;
  stock: number;
};
