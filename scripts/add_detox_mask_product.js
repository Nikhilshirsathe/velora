const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Detox Face Mask',
      description: 'Deep cleansing detox mask with activated charcoal and citrus peels',
      price: 250,
      image: 'https://i.ibb.co/hJCGwtLn/Whats-App-Image-2025-09-15-at-8-24-59-PM.jpg',
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
      name: 'डिटॉक्स फेस मास्क',
      description: 'सामग्री:\nडेड सी मिनरल्स, अॅक्टीवेटेड चारकोल, लेमन पील, ऑरेंज पील, अॅलोवेरा।\n\nलाभ:\nत्वचा से पर्यावरणीय प्रदूषण और गंदगी निकालने में मदद करता है।\nत्वचा के रोम छिद्रों को साफ करता और पोषण प्रदान करता है।\nत्वचा को कोमल और चमकदार बनाता है, जिससे त्वचा मुलायम होती है।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Detox Face Mask',
      description: 'Ingredients:\nDead Sea Minerals, Activated Charcoal, Lemon Peel, Orange Peel, Aloe Vera.\n\nBenefits:\nHelps remove environmental pollutants and dirt from the skin.\nCleanses pores and nourishes the skin.\nMakes skin soft, smooth, and radiant.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'डिटॉक्स फेस मास्क',
      description: 'साहित्य:\nडेड सी मिनरल्स, अॅक्टिव्हेटेड चारकोल, लिंबाचा साल, संत्र्याचा साल, अॅलोव्हेरा।\n\nफायदे:\nत्वचेमधून पर्यावरणीय प्रदूषण आणि घाण काढण्यात मदत करते.\nत्वचेच्या रोमछिद्रांना स्वच्छ करून पोषण देते.\nत्वचा मऊ, कोमल आणि चमकदार बनवते.'
    }
  });

  console.log('Detox face mask product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });