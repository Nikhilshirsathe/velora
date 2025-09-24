const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Digestive Care Syrup',
      description: 'Antacid and digestive health syrup',
      price: 200,
      image: 'https://i.ibb.co/j9CvzJ4H/Whats-App-Image-2025-09-14-at-6-35-57-PM-1.jpg',
      category: 'healthcare',
      stock: 200,
      packSize: '200 ML',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'डाइजेस्टिव केयर सिरप',
      description: 'सामग्री:\nमुक्ता शुक्ति भस्म, कपर्दीक भस्म, सूतशेखर, जहर मोहरा पिष्टी, यशद भस्म, दुग्धपाषाणा, शंख भस्म।\n\nलाभ:\nअद्भुत एंटासिड, एंटी-डायरियल और एंटीस्पास्मोडिक गुणधर्म।\nभूख बढ़ाने और पाचन में सहायक।\nहाइपर एसिडिटी, गैस्ट्राइटिस और अल्सर में उपयोगी।\n\nसेवन विधि:\nबच्चे: 5 एमएल दिन में 3 बार\nवयस्क: 10 एमएल दिन में 3 बार'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Digestive Care Syrup',
      description: 'Ingredients:\nMukta Shukti Bhasma, Kapardik Bhasma, Sootshekhar, Jahar Mohra Pishti, Yashad Bhasma, Dugdha Pashana, Shankh Bhasma.\n\nBenefits:\nExcellent antacid, anti-diarrheal, and antispasmodic properties.\nActs as an appetite enhancer and aids digestion.\nUseful in hyperacidity, gastritis, and ulcers.\n\nUsage:\nChildren: 5 ML three times a day\nAdults: 10 ML three times a day'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'डाइजेस्टिव केअर सिरप',
      description: 'साहित्य:\nमुक्ता शुक्ति भस्म, कपर्दीक भस्म, सूतशेखर, जहर मोहरा पिष्टी, यशद भस्म, दुग्धपाषाणा, शंख भस्म।\n\nफायदे:\nउत्कृष्ट अँटासिड, अँटी-डायरेअल आणि अँटीस्पॅस्मोडिक गुणधर्म।\nभूक वाढविण्यास आणि पचनास मदत करते।\nहायपर अॅसिडिटी, गॅस्ट्रायटिस आणि अल्सर मध्ये उपयुक्त।\n\nसेवन पद्धत:\nमुले: 5 एमएल, दिवसात 3 वेळा\nप्रौढ: 10 एमएल, दिवसात 3 वेळा'
    }
  });

  console.log('Digestive care syrup product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });