import dotenv from "dotenv";
dotenv.config({
  path: ".env.local",
});
import { Product } from "../models/Product";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

const products = [
  {
    name: "Yonex VCORE 100L",

    price: 180,

    image: "/vcore.webp",

    description: "Lightweight racket designed for control and spin.",
  },

  {
    name: "Wilson Blade 98",

    price: 220,

    image: "/blade.webp",

    description: "Popular racket for advanced players.",
  },

  {
    name: "Babolat Pure Aero",

    price: 210,

    image: "/pureaero.webp",

    description: "Spin-friendly racket used by Nadal.",
  },

  {
    name: "Head Speed",

    price: 250,

    image: "/speed.webp",

    description:
      "Perfect for all-court players looking for a good balance between power and control.",
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products seeded");

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

seed();
