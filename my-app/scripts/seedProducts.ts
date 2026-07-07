import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

import mongoose from "mongoose";
import { Product } from "../models/Product";

const MONGODB_URI = process.env.MONGODB_URI!;

const products = [
  // =========================
  // RACKETS
  // =========================
  {
    name: "Yonex VCORE 100L",
    slug: "yonex-vcore-100l",
    sku: "RKT-YONEX-001",
    brand: "Yonex",
    category: "rackets",
    subcategory: "spin",
    variant: "lightweight",
    price: 180,
    image: "/products/rackets/vcore100l.webp",
    description: "Lightweight racket designed for control and spin.",
    stock: 12,
  },

  {
    name: "Wilson Blade 98",
    slug: "wilson-blade-98",
    sku: "RKT-WILSON-002",
    brand: "Wilson",
    category: "rackets",
    subcategory: "control",
    variant: "16x19",
    price: 220,
    image: "/products/rackets/blade98.webp",
    description: "Popular racket for advanced players.",
    stock: 8,
  },

  {
    name: "Babolat Pure Aero",
    slug: "babolat-pure-aero",
    sku: "RKT-BABOLAT-003",
    brand: "Babolat",
    category: "rackets",
    subcategory: "spin",
    variant: "rafa",
    price: 210,
    image: "/products/rackets/pureaero.webp",
    description: "Spin-friendly racket used by Nadal.",
    stock: 10,
  },

  {
    name: "Head Speed MP",
    slug: "head-speed-mp",
    sku: "RKT-HEAD-004",
    brand: "Head",
    category: "rackets",
    subcategory: "all-court",
    variant: "mp",
    price: 250,
    image: "/products/rackets/speedmp.webp",
    description:
      "Balanced racket for all-court players seeking speed and power.",
    stock: 9,
  },

  {
    name: "Yonex EZONE 98",
    slug: "yonex-ezone-98",
    sku: "RKT-YONEX-005",
    brand: "Yonex",
    category: "rackets",
    subcategory: "power",
    variant: "98",
    price: 230,
    image: "/products/rackets/ezone98.webp",
    description: "Comfort-oriented racket with explosive power.",
    stock: 11,
  },

  {
    name: "Tecnifibre TF40",
    slug: "tecnifibre-tf40",
    sku: "RKT-TECNI-006",
    brand: "Tecnifibre",
    category: "rackets",
    subcategory: "control",
    variant: "305",
    price: 240,
    image: "/products/rackets/tf40.webp",
    description: "Precision-focused racket for experienced players.",
    stock: 6,
  },

  {
    name: "Wilson RF 01 Pro",
    slug: "wilson-rf-01-pro",
    sku: "RKT-WILSON-001",
    brand: "Wilson",
    category: "rackets",
    subcategory: "power",
    variant: "rf-01-pro",
    price: 299,
    image: "/products/rackets/rf.webp",
    description:
      "Roger Federer's signature-inspired racket with premium feel, stability, and controlled power.",
    stock: 5,
  },
  {
    name: "Head Radical MP",
    slug: "head-radical-mp",
    sku: "RKT-HEAD-001",
    brand: "Head",
    category: "rackets",
    subcategory: "control",
    variant: "radical-mp",
    price: 249,
    image: "/products/rackets/radical.webp",
    description:
      "Versatile all-court racket offering a balanced combination of power, control, and spin.",
    stock: 8,
  },

  // =========================
  // APPAREL
  // =========================
  {
    name: "Nike Court Dri-FIT Tee",
    slug: "nike-court-dri-fit-tee",
    sku: "APP-NIKE-001",
    brand: "Nike",
    category: "apparel",
    subcategory: "tops",
    variant: "black",
    price: 45,
    image: "/products/apparel/nike-tee.avif",
    description: "Sweat-wicking performance tennis shirt.",
    stock: 20,
  },

  {
    name: "Adidas Club Shorts",
    slug: "adidas-club-shorts",
    sku: "APP-ADIDAS-002",
    brand: "Adidas",
    category: "apparel",
    subcategory: "bottoms",
    variant: "white",
    price: 40,
    image: "/products/apparel/adidas-shorts.avif",
    description: "Lightweight tennis shorts with stretch fabric.",
    stock: 18,
  },

  {
    name: "Lululemon Tennis Polo",
    slug: "lululemon-tennis-polo",
    sku: "APP-LULU-003",
    brand: "Lululemon",
    category: "apparel",
    subcategory: "tops",
    variant: "navy",
    price: 75,
    image: "/products/apparel/lulu-polo.avif",
    description: "Premium breathable polo for court performance.",
    stock: 10,
  },

  {
    name: "Fila Heritage Jacket",
    slug: "fila-heritage-jacket",
    sku: "APP-FILA-004",
    brand: "Fila",
    category: "apparel",
    subcategory: "outerwear",
    variant: "cream",
    price: 95,
    image: "/products/apparel/fila-jacket.webp",
    description: "Retro-inspired warm-up jacket.",
    stock: 6,
  },

  {
    name: "Asics Court Tank",
    slug: "asics-court-tank",
    sku: "APP-ASICS-005",
    brand: "Asics",
    category: "apparel",
    subcategory: "tops",
    variant: "pink",
    price: 38,
    image: "/products/apparel/asics-tank.webp",
    description: "Lightweight tank built for hot court sessions.",
    stock: 15,
  },

  {
    name: "Uniqlo Dry-EX Tee",
    slug: "uniqlo-dry-ex-tee",
    sku: "APP-UNIQLO-006",
    brand: "Uniqlo",
    category: "apparel",
    subcategory: "tops",
    variant: "gray",
    price: 30,
    image: "/products/apparel/uniqlo-tee.avif",
    description: "Affordable breathable performance shirt.",
    stock: 25,
  },

  // =========================
  // FOOTWEAR
  // =========================
  {
    name: "Nike Vapor Pro 2",
    slug: "nike-vapor-pro-2",
    sku: "FTW-NIKE-001",
    brand: "Nike",
    category: "footwear",
    subcategory: "tennis-shoes",
    variant: "hard-court",
    price: 140,
    image: "/products/footwear/vaporpro2.webp",
    description: "Responsive tennis shoes for aggressive movement.",
    stock: 10,
  },

  {
    name: "Asics Gel Resolution 9",
    slug: "asics-gel-resolution-9",
    sku: "FTW-ASICS-003",
    brand: "Asics",
    category: "footwear",
    subcategory: "tennis-shoes",
    variant: "stability",
    price: 160,
    image: "/products/footwear/gelresolution9.webp",
    description: "Excellent support and cushioning.",
    stock: 9,
  },

  {
    name: "Wilson Rush Pro Ace",
    slug: "wilson-rush-pro-ace",
    sku: "FTW-WILSON-005",
    brand: "Wilson",
    category: "footwear",
    subcategory: "tennis-shoes",
    variant: "comfort",
    price: 145,
    image: "/products/footwear/rushproace.webp",
    description: "Stable and cushioned court shoes.",
    stock: 7,
  },

  {
    name: "Babolat Jet Mach 3",
    slug: "babolat-jet-mach-3",
    sku: "FTW-BABOLAT-006",
    brand: "Babolat",
    category: "footwear",
    subcategory: "tennis-shoes",
    variant: "speed",
    price: 155,
    image: "/products/footwear/jetmach3.jpeg",
    description: "Ultra-light shoes built for speed.",
    stock: 9,
  },

  {
    name: "Head Sprint Pro",
    slug: "head-sprint-pro",
    sku: "FTW-HEAD-007",
    brand: "Head",
    category: "footwear",
    subcategory: "tennis-shoes",
    variant: "lightweight",
    price: 148,
    image: "/products/footwear/sprintpro.jpeg",
    description: "Lightweight performance court shoes.",
    stock: 13,
  },

  // =========================
  // GEAR
  // =========================
  {
    name: "Wilson Super Tour Bag",
    slug: "wilson-super-tour-bag",
    sku: "GER-WILSON-001",
    brand: "Wilson",
    category: "gear",
    subcategory: "bags",
    variant: "red",
    price: 120,
    image: "/products/gear/supertourbag.webp",
    description: "Professional-level racket bag.",
    stock: 10,
  },

  {
    name: "Yonex Pro Backpack",
    slug: "yonex-pro-backpack",
    sku: "GER-YONEX-002",
    brand: "Yonex",
    category: "gear",
    subcategory: "bags",
    variant: "black",
    price: 85,
    image: "/products/gear/probackpack.webp",
    description: "Compact tennis backpack for daily use.",
    stock: 12,
  },

  {
    name: "Babolat RPM Blast Strings",
    slug: "babolat-rpm-blast",
    sku: "GER-BABOLAT-003",
    brand: "Babolat",
    category: "gear",
    subcategory: "strings",
    variant: "16g",
    price: 18,
    image: "/products/gear/rpmblast.webp",
    description: "Popular polyester strings for spin players.",
    stock: 30,
  },

  {
    name: "Head Xtreme Soft Overgrip",
    slug: "head-xtreme-soft-overgrip",
    sku: "GER-HEAD-004",
    brand: "Head",
    category: "gear",
    subcategory: "grips",
    variant: "white",
    price: 9,
    image: "/products/gear/overgrip.jpg",
    description: "Comfortable overgrip with excellent tackiness.",
    stock: 40,
  },

  {
    name: "Nike Wristbands",
    slug: "nike-wristbands",
    sku: "GER-NIKE-005",
    brand: "Nike",
    category: "gear",
    subcategory: "accessories",
    variant: "black",
    price: 15,
    image: "/products/gear/wristbands.webp",
    description: "Sweat-absorbing wristbands for matches.",
    stock: 25,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

seed();
