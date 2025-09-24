const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Shaving Cream',
      description: 'Natural shaving cream with Dead Sea minerals for smooth shave',
      price: 200,
      image: 'https://i.ibb.co/WNnzCfpG/Whats-App-Image-2025-09-15-at-1-58-24-PM-1.jpg',
      category: 'personal care',
      stock: 100,
      packSize: '100 GM',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'शेविंग क्रीम',
      description: 'सामग्री:\nडेड सी मिनरल्स, हल्दी, बेसिल, नीम, एलोवेरा।\n\nलाभ:\nसाफ, स्मूद और मुलायम शेव देता है।\nत्वचा से बाल निकालकर शेव के जरिए त्वचा को मुलायम बनाता है।\nहाइड्रेशन प्रदान करके त्वचा को पोषण देता है।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Shaving Cream',
      description: 'Ingredients:\nDead Sea Minerals, Turmeric, Basil, Neem, Aloe Vera.\n\nBenefits:\nProvides a clean, smooth, and soft shave.\nRemoves hair and softens skin through shaving.\nHydrates and nourishes the skin.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'शेविंग क्रीम',
      description: 'साहित्य:\nडेड सी मिनरल्स, हळद, बेसिल, नीम, अॅलोव्हेरा।\n\nफायदे:\nस्वच्छ, स्मूथ आणि मऊ शेव देते.\nत्वचेवरील केस काढून शेविंगमुळे त्वचा मऊ बनवते.\nहायड्रेशन करून त्वचेला पोषण देते.'
    }
  });

  console.log('Shaving cream product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });