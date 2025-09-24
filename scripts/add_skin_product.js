const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Skin Glow Tablets',
      description: 'Skin radiance and antioxidant tablets',
      price: 750,
      image: 'https://i.ibb.co/6cvyKVBq/Whats-App-Image-2025-09-14-at-6-57-05-PM.jpg',
      category: 'healthcare',
      stock: 15,
      packSize: '15 Tablets',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'स्किन ग्लो टैबलेट्स',
      description: 'सामग्री:\nग्लूटाथियोन, ग्रेपसीड एक्सट्रॅक्ट, विटामिन C और E, अल्फा लिपोइक एसिड\n\nलाभ:\nत्वचा की चमक और निखार बढ़ाने में सहायक।\nग्लूटाथियोन, ग्रेपसीड, विटामिन C, E और अल्फा लिपोइक एसिड शक्तिशाली एंटीऑक्सिडेंट लाभ प्रदान करते हैं।\nपूरी तरह से शुगर-फ्री, डायबिटिक और कैलोरी के प्रति सचेत लोगों के लिए उपयुक्त।\n\nसेवन विधि:\n1 टैबलेट रोजाना 2 बार, एक गिलास पानी के साथ।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Skin Glow Tablets',
      description: 'Ingredients:\nGlutathione, Grape Seed Extract, Vitamin C & E, Alpha Lipoic Acid\n\nBenefits:\nEnhances skin glow and radiance.\nGlutathione, grape seed, vitamin C, E, and alpha lipoic acid are known for their strong antioxidant benefits.\nCompletely sugar-free, suitable for diabetics and calorie-conscious individuals.\n\nDosage:\n1 tablet twice daily with a glass of water.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'स्किन ग्लो गोळ्या',
      description: 'साहित्य:\nग्लूटाथियोन, ग्रेपसीड एक्सट्रॅक्ट, जीवनसत्त्व C व E, अल्फा लिपोइक आम्ल\n\nफायदे:\nत्वचेचा निखार व चमक वाढविण्यास सहाय्यक.\nग्लूटाथियोन, ग्रेपसीड, जीवनसत्त्व C, E व अल्फा लिपोइक आम्ल हे शक्तिशाली अँटीऑक्सिडंट फायदे देतात.\nपूर्णपणे शुगर-फ्री, डायबेटिक व कॅलरीकडे जागरूक लोकांसाठी उपयुक्त.\n\nसेवन पद्धत:\n१ गोळी दिवसातून २ वेळा, एक ग्लास पाण्यासोबत.'
    }
  });

  console.log('Skin glow product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });