const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Acne Control Cream',
      description: 'Anti-acne cream with Dead Sea minerals and natural oils',
      price: 180,
      image: 'https://i.ibb.co/XkpvhD8L/Whats-App-Image-2025-09-15-at-1-58-27-PM.jpg',
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
      name: 'एक्ने कंट्रोल क्रीम',
      description: 'सामग्री:\nडेड सी मिनरल्स, एलोवेरा, नीम, हल्दी, टी ट्री तेल, क्लोव तेल, रोजमेरी तेल।\n\nलाभ:\nत्वचा से अतिरिक्त तेल के स्राव को कम करता है।\nफोड़े और फुंसियों को कम करने में मदद करता है।\nफोड़े और फुंसियों के कारण होने वाले दागों को कम करता है।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Acne Control Cream',
      description: 'Ingredients:\nDead Sea Minerals, Aloe Vera, Neem, Turmeric, Tea Tree Oil, Clove Oil, Rosemary Oil.\n\nBenefits:\nHelps reduce excess oil secretion from the skin.\nAssists in reducing pimples and acne.\nReduces marks caused by pimples and acne.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'एक्ने कंट्रोल क्रीम',
      description: 'साहित्य:\nडेड सी मिनरल्स, अॅलोव्हेरा, नीम, हळद, टी ट्री तेल, क्लोव तेल, रोजमेरी तेल।\n\nफायदे:\nत्वचेवरील अतिरिक्त तेलाचे स्त्राव कमी करण्यात मदत करते.\nफोडे आणि फुंस्यांची संख्या कमी करण्यात मदत करते.\nफोडे आणि फुंस्यांमुळे होणारे डाग कमी करते.'
    }
  });

  console.log('Acne control cream product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });