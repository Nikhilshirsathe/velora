const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Hair Removal Cream',
      description: 'Gentle hair removal cream with Dead Sea minerals for smooth skin',
      price: 160,
      image: 'https://i.ibb.co/C5dqcHpK/Whats-App-Image-2025-09-15-at-8-30-30-PM.jpg',
      category: 'personal care',
      stock: 50,
      packSize: '50 GM',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'हेयर रिमूवल क्रीम',
      description: 'सामग्री:\nडेड सी मिनरल्स, रोज़, कोरफड, शीया बटर\n\nलाभ:\nकम से कम जलन में छोटे-छोटे बाल हटाने में मदद करता है।\nकम जलन और रेशमी एहसास के साथ त्वचा को नमी भी देता है।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Hair Removal Cream',
      description: 'Ingredients:\nDead Sea Minerals, Rose, Corfud, Shea Butter\n\nBenefits:\nHelps remove even the tiniest hairs with minimal irritation.\nProvides moisture to the skin while giving a silky, smooth feel with reduced irritation.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'हेयर रिमूवल क्रीम',
      description: 'साहित्य:\nडेड सी मिनरल्स, गुलाब, कोरफड, शीया बटर\n\nफायदे:\nकम जळजळीत लघु केस काढण्यात मदत करते.\nकमी जळजळ आणि रेशमी अनुभवासह त्वचेला आर्द्रता देते.'
    }
  });

  console.log('Hair removal cream product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });