const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Day Cream',
      description: 'Protective day cream with Dead Sea minerals and natural oils',
      price: 150,
      image: 'https://i.ibb.co/BVypc7vr/Whats-App-Image-2025-09-15-at-1-58-28-PM-1.jpg',
      category: 'personal care',
      stock: 60,
      packSize: '60 GM',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'डे क्रीम',
      description: 'सामग्री:\nडेड सी मिनरल्स, बादाम तेल, मुसब्बर वेरा।\n\nलाभ:\nदिन में हानिकारक UV किरणों, प्रदूषण और पर्यावरणीय तनाव से त्वचा की सुरक्षा और समर्थन करता है।\nत्वचा को कोमल बनाता है, रंगत समान करता है और बनावट सुधारता है।\nत्वचा को मजबूत बनाता है और चमक प्रदान करता है।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Day Cream',
      description: 'Ingredients:\nDead Sea Minerals, Almond Oil, Musabbar Vera.\n\nBenefits:\nDesigned to protect and support the skin from harmful UV rays, pollution, and environmental stress during the day.\nSoftens the skin, evens skin tone, and improves texture.\nStrengthens the skin while providing radiance.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'डे क्रीम',
      description: 'साहित्य:\nडेड सी मिनरल्स, बदाम तेल, मुसब्बर वेरा।\n\nफायदे:\nदिवसा हानिकारक UV किरणे, प्रदूषण आणि पर्यावरणीय ताणापासून त्वचेचे संरक्षण आणि समर्थन करते.\nत्वचा मऊ करते, रंगत समान करते आणि बनावट सुधारते.\nत्वचेचा बळकटपणा वाढवते आणि चमक प्रदान करते.'
    }
  });

  console.log('Day cream product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });