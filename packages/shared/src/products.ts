import type { Product } from "./types.js";

const timestamp = "2026-06-23T00:00:00.000Z";

export const PRODUCTS: Product[] = [
  {
    id: "jibs-kitten-chicken",
    name: "Kitten Chicken Starter Kibble",
    category: "food",
    description: "Small-bite chicken formula for growing kittens with balanced protein and DHA.",
    price: 485,
    compareAtPrice: 540,
    rating: 4.9,
    stock: 36,
    badge: "Kitten pick",
    color: "#ef8065",
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: "jibs-indoor-salmon",
    name: "Indoor Salmon Hairball Care",
    category: "food",
    description: "Salmon-forward dry food with fiber support for indoor adult cats.",
    price: 650,
    rating: 4.8,
    stock: 42,
    badge: "Best seller",
    color: "#2d7f82",
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: "jibs-tuna-flakes",
    name: "Tuna Flakes Wet Food Pack",
    category: "food",
    description: "Hydrating tuna flakes in broth, bundled in six single-serve pouches.",
    price: 390,
    rating: 4.7,
    stock: 55,
    color: "#6aa7a5",
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: "jibs-freeze-chicken",
    name: "Freeze-Dried Chicken Treats",
    category: "treats",
    description: "Single-ingredient crunchy rewards for training, toppers, and picky eaters.",
    price: 245,
    rating: 4.9,
    stock: 60,
    badge: "Pure protein",
    color: "#f1a55d",
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: "jibs-catnip-bites",
    name: "Catnip Crunch Bites",
    category: "treats",
    description: "Oven-baked nibbles with catnip and parsley for playful snack breaks.",
    price: 180,
    rating: 4.6,
    stock: 74,
    color: "#86a65b",
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: "jibs-clumping-litter",
    name: "Low-Dust Clumping Litter",
    category: "litter",
    description: "Fast-clumping bentonite blend made for tidy boxes and easy scooping.",
    price: 420,
    compareAtPrice: 465,
    rating: 4.8,
    stock: 29,
    badge: "Low dust",
    color: "#bdb5aa",
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: "jibs-tofu-litter",
    name: "Tofu Litter Green Tea",
    category: "litter",
    description: "Lightweight plant-based pellets with gentle green tea odor control.",
    price: 510,
    rating: 4.7,
    stock: 31,
    color: "#98b66e",
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: "jibs-feather-wand",
    name: "Feather Chase Wand",
    category: "toys",
    description: "Flexible wand toy with replaceable feather teaser for daily enrichment.",
    price: 215,
    rating: 4.5,
    stock: 48,
    color: "#d96f6f",
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: "jibs-puzzle-mouse",
    name: "Puzzle Mouse Treat Toy",
    category: "toys",
    description: "Rolling treat puzzle that rewards curious paws and slower snacking.",
    price: 360,
    rating: 4.6,
    stock: 24,
    color: "#82b4cf",
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: "jibs-shed-brush",
    name: "Gentle Shed Brush",
    category: "grooming",
    description: "Soft-pin brush for daily coat care, detangling, and less sofa fur.",
    price: 295,
    rating: 4.7,
    stock: 39,
    color: "#d7a06d",
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: "jibs-window-bed",
    name: "Sunny Window Perch",
    category: "beds",
    description: "Mounted lounge perch with a washable cushion for afternoon naps.",
    price: 1195,
    compareAtPrice: 1350,
    rating: 4.8,
    stock: 12,
    badge: "Cozy deal",
    color: "#5d9b9b",
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    id: "jibs-urinary-support",
    name: "Urinary Support Drops",
    category: "health",
    description: "Daily supplement drops formulated for hydration and urinary wellness support.",
    price: 525,
    rating: 4.4,
    stock: 18,
    color: "#6e7fa6",
    createdAt: timestamp,
    updatedAt: timestamp
  }
];
