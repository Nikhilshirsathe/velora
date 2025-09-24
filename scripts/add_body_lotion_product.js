const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Body Lotion',
      description: 'Nourishing body lotion with Dead Sea minerals and natural oils',
      price: 275,
      image: 'https://i.ibb.co/1GWvCDh4/Whats-App-Image-2025-09-15-at-1-58-23-PM.jpg',
      category: 'personal care',
      stock: 250,
      packSize: '250 ML',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'बॉडी लोशन',
      description: 'सामग्री:\nडेड सी मिनरल्स, कोको बटर, शिया बटर, बादाम, ऑलिव, जोजोबा, सूरजमुखी फूल।\n\nलाभ:\nबुढ़ापे के लक्षणों को कम करता है।\nत्वचा को पोषण देकर मुलायम बनाता है।\nसूर्य की हानिकारक किरणों से त्वचा की सुरक्षा करता है।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Body Lotion',
      description: 'Ingredients:\nDead Sea Minerals, Cocoa Butter, Shea Butter, Almond, Olive, Jojoba, Sunflower.\n\nBenefits:\nReduces signs of aging.\nNourishes and softens the skin.\nProtects the skin from harmful sun rays.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'बॉडी लोशन',
      description: 'साहित्य:\nडेड सी मिनरल्स, कोको बटर, शिया बटर, बदाम, ऑलिव्ह, जोजोबा, सूर्यफूल।\n\nफायदे:\nवृद्धत्वाची लक्षणे कमी करते.\nत्वचेला पोषण देऊन मऊ बनवते.\nसूर्याच्या हानिकारक किरणांपासून त्वचेचे रक्षण करते.'
    }
  });

  console.log('Body lotion product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });