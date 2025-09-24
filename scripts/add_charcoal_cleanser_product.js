const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Charcoal Cleanser',
      description: 'Deep detox charcoal cleanser for pollution damage and acne control',
      price: 180,
      image: 'https://i.ibb.co/xKmBk4sV/Whats-App-Image-2025-09-15-at-8-16-02-PM.jpg',
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
      name: 'चारकोल क्लींजर',
      description: 'सामग्री:\nअॅक्टीवेटेड चारकोल, शहतूत, सी बकथॉर्न, सेब, व्हेटिव्हर, मुलैठी।\n\nलाभ:\nप्रदूषण के कारण होने वाली अशुद्धियों और त्वचा क्षति को खत्म करने में मदद करता है।\nत्वचा को एक समान रंग प्रदान करता है।\nचारकोल पाउडर विषाक्त पदार्थों, अशुद्धियों, बैक्टीरिया और गंदगी को अवशोषित करता है और मुँहासों से लड़ने में मदद करता है।\nविशेष रूप से सख्त त्वचा के लिए डिजाइन किया गया है।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Charcoal Cleanser',
      description: 'Ingredients:\nActivated Charcoal, Mulberry, Sea Buckthorn, Apple, Vetiver, Licorice.\n\nBenefits:\nHelps eliminate impurities and damage caused by pollution.\nProvides an even skin tone.\nCharcoal powder absorbs toxins, impurities, bacteria, and dirt, helping fight acne.\nSpecially designed for tough skin.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'चारकोल क्लींझर',
      description: 'साहित्य:\nअॅक्टिव्हेटेड चारकोल, शहतूत, सी बकथॉर्न, सफरचंद, व्हेटिव्हर, मुलैठी।\n\nफायदे:\nप्रदूषणामुळे होणाऱ्या अशुद्धी आणि त्वचेच्या नुकसानाला दूर करण्यात मदत करते.\nत्वचेला समान रंग प्रदान करते.\nचारकोल पावडर विषारी पदार्थ, अशुद्धी, बॅक्टीरिया आणि घाण शोषतो आणि मुरुमांशी लढण्यात मदत करतो.\nविशेषतः सख्त त्वचेसाठी डिझाइन केलेले.'
    }
  });

  console.log('Charcoal cleanser product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });