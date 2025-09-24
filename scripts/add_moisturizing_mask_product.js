const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Moisturizing Face Mask',
      description: 'Hydrating face mask with Dead Sea minerals and natural extracts',
      price: 250,
      image: 'https://i.ibb.co/Nd90xjz8/Whats-App-Image-2025-09-15-at-8-25-13-PM.jpg',
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
      name: 'मॉइस्चराइजिंग फेस मास्क',
      description: 'सामग्री:\nडेड सी मिनरल्स, बदाम तेल, खीरा, विटामिन ई, खीरा और गुलाब तत्व।\n\nलाभ:\nत्वचा को नमी देने में मदद करता है।\nत्वचा को हल्का और चमकदार बनाता है।\nकोमल और चमकदार त्वचा प्रदान करता है।\nत्वचा और कोशिकाओं को हानिकारक रसायनों से बचाता है।\nसमान त्वचा टोन प्रदान करता है।\nत्वचा के तेल को कम करता है, जिससे मुंहासों की समस्या भी कम होती है।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Moisturizing Face Mask',
      description: 'Ingredients:\nDead Sea Minerals, Almond Oil, Cucumber, Vitamin E, Cucumber, and Rose Extract.\n\nBenefits:\nHelps to moisturize the skin.\nMakes the skin lighter and glowing.\nProvides soft and radiant skin.\nProtects skin and cells from harmful chemicals.\nPromotes an even skin tone.\nReduces skin oil, which also helps in reducing acne problems.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'मॉइस्चरायझिंग फेस मास्क',
      description: 'साहित्य:\nडेड सी मिनरल्स, बदाम तेल, काकडी, व्हिटॅमिन ई, काकडी आणि गुलाब घटक।\n\nफायदे:\nत्वचेला आर्द्रता देते.\nत्वचा हलकी आणि चमकदार बनवते.\nकोमल आणि चमकदार त्वचा प्रदान करते.\nत्वचा आणि पेशींना हानिकारक रसायनांपासून बचाव करते.\nसम त्वचा टोन देते.\nत्वचेचा तेल कमी करते, ज्यामुळे मुरुमांच्या समस्या देखील कमी होतात.'
    }
  });

  console.log('Moisturizing face mask product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });