const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Clay Cleanser',
      description: 'Deep cleansing clay cleanser with Dead Sea minerals and Multani Mitti',
      price: 160,
      image: 'https://i.ibb.co/hx2hQ9Hc/Whats-App-Image-2025-09-15-at-8-15-47-PM.jpg',
      category: 'personal care',
      stock: 100,
      packSize: '100 ML',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'क्ले क्लींजर',
      description: 'सामग्री:\nडेड सी मिनरल्स, मुल्तानी मिट्टी, जूनिपरबेरी।\n\nलाभ:\nत्वचा से धूल, तेल और प्रदूषण को हटाने में मदद करता है।\nत्वचा को कोमल, नरम और चमकदार बनाता है।\nकठोर रसायनों से त्वचा की कोशिकाओं की सुरक्षा करता है।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Clay Cleanser',
      description: 'Ingredients:\nDead Sea Minerals, Multani Mitti (Fuller\'s Earth), Juniper Berry.\n\nBenefits:\nHelps remove dust, oil, and pollution from the skin.\nMakes skin soft, smooth, and radiant.\nProtects skin cells from harsh chemicals.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'क्ले क्लींझर',
      description: 'साहित्य:\nडेड सी मिनरल्स, मुल्तानी मिटी, जूनिपरबेरी।\n\nफायदे:\nत्वचेमधून धूळ, तेल आणि प्रदूषण काढण्यात मदत करते.\nत्वचा मऊ, कोमल आणि चमकदार बनवते.\nकठोर रसायनांपासून त्वचेच्या पेशींना संरक्षण देते.'
    }
  });

  console.log('Clay cleanser product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });