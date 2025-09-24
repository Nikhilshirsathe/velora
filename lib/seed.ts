import { prisma } from './prisma'

export async function seedProducts() {
  const products = [
    {
      name: "Sample Product ₹1",
      description: "A sample product for testing purposes",
      price: 1,
      category: "healthcare",
      stock: 100,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae"
    },
    {
      name: "Hand Sanitizer",
      description: "70% alcohol-based hand sanitizer for effective germ protection",
      price: 45,
      category: "healthcare",
      stock: 50,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae"
    },
    {
      name: "Face Mask Pack",
      description: "Pack of 50 disposable face masks",
      price: 299,
      category: "healthcare",
      stock: 30,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae"
    },
    {
      name: "Vitamin C Tablets",
      description: "Immune support vitamin C supplement",
      price: 199,
      category: "healthcare",
      stock: 25,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae"
    },
    {
      name: "Shampoo",
      description: "Nourishing shampoo for all hair types",
      price: 149,
      category: "personal-care",
      stock: 40,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883"
    },
    {
      name: "Body Lotion",
      description: "Moisturizing body lotion with natural ingredients",
      price: 179,
      category: "personal-care",
      stock: 35,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883"
    },
    {
      name: "Toothpaste",
      description: "Fluoride toothpaste for cavity protection",
      price: 89,
      category: "personal-care",
      stock: 60,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883"
    },
    {
      name: "Face Wash",
      description: "Gentle face wash for daily cleansing",
      price: 129,
      category: "personal-care",
      stock: 45,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883"
    }
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: product
    })
  }

  console.log('Products seeded successfully!')
}