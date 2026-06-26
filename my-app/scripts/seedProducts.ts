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
    name: "Prince Phantom 100X",
    slug: "prince-phantom-100x",
    sku: "RKT-PRINCE-007",
    brand: "Prince",
    category: "rackets",
    subcategory: "feel",
    variant: "100x",
    price: 215,
    image: "/products/rackets/phantom100x.webp",
    description: "Classic flexible frame with exceptional touch.",
    stock: 7,
  },

  {
    name: "Dunlop SX 300",
    slug: "dunlop-sx-300",
    sku: "RKT-DUNLOP-008",
    brand: "Dunlop",
    category: "rackets",
    subcategory: "spin",
    variant: "300",
    price: 205,
    image: "/products/rackets/sx300.webp",
    description: "Spin-enhancing racket with explosive response.",
    stock: 13,
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
    image: "/products/apparel/uniqlo-tee.webp",
    description: "Affordable breathable performance shirt.",
    stock: 25,
  },

  {
    name: "New Balance Court Skirt",
    slug: "new-balance-court-skirt",
    sku: "APP-NB-007",
    brand: "New Balance",
    category: "apparel",
    subcategory: "bottoms",
    variant: "white",
    price: 55,
    image: "/products/apparel/nb-skirt.avif",
    description: "Flexible tennis skirt with inner shorts.",
    stock: 12,
  },

  {
    name: "Under Armour Compression Top",
    slug: "ua-compression-top",
    sku: "APP-UA-008",
    brand: "Under Armour",
    category: "apparel",
    subcategory: "compression",
    variant: "black",
    price: 50,
    image: "/products/apparel/ua-compression.webp",
    description: "Compression layer for intense training sessions.",
    stock: 16,
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
    name: "Adidas Barricade",
    slug: "adidas-barricade",
    sku: "FTW-ADIDAS-002",
    brand: "Adidas",
    category: "footwear",
    subcategory: "tennis-shoes",
    variant: "durability",
    price: 150,
    image: "/products/footwear/barricade.webp",
    description: "Durable shoes built for baseline players.",
    stock: 8,
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
    name: "New Balance CT Rally",
    slug: "new-balance-ct-rally",
    sku: "FTW-NB-004",
    brand: "New Balance",
    category: "footwear",
    subcategory: "tennis-shoes",
    variant: "wide-fit",
    price: 135,
    image: "/products/footwear/ctrally.webp",
    description: "Comfort-focused shoes for long matches.",
    stock: 11,
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
    image: "/products/footwear/jetmach3.webp",
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
    image: "/products/footwear/sprintpro.webp",
    description: "Lightweight performance court shoes.",
    stock: 13,
  },

  {
    name: "Yonex Power Cushion Eclipsion",
    slug: "yonex-power-cushion-eclipsion",
    sku: "FTW-YONEX-008",
    brand: "Yonex",
    category: "footwear",
    subcategory: "tennis-shoes",
    variant: "power-cushion",
    price: 165,
    image: "/products/footwear/eclipsion.webp",
    description: "Premium cushioning and court stability.",
    stock: 6,
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

  {
    name: "Adidas Tennis Cap",
    slug: "adidas-tennis-cap",
    sku: "GER-ADIDAS-006",
    brand: "Adidas",
    category: "gear",
    subcategory: "accessories",
    variant: "white",
    price: 28,
    image: "/products/gear/tenniscap.webp",
    description: "Lightweight cap for sunny court sessions.",
    stock: 18,
  },

  {
    name: "Tourna Ballport",
    slug: "tourna-ballport",
    sku: "GER-TOURNA-007",
    brand: "Tourna",
    category: "gear",
    subcategory: "training",
    variant: "75-ball",
    price: 70,
    image: "/products/gear/ballport.webp",
    description: "Portable tennis ball basket for training.",
    stock: 5,
  },

  {
    name: "Luxilon ALU Power",
    slug: "luxilon-alu-power",
    sku: "GER-LUXILON-008",
    brand: "Luxilon",
    category: "gear",
    subcategory: "strings",
    variant: "125",
    price: 20,
    image: "/products/gear/alupower.webp",
    description: "Professional-grade control string.",
    stock: 22,
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
