const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Kidney Care Syrup',
      description: 'Kidney support and stone management syrup',
      price: 200,
      image: 'https://i.ibb.co/qL48px4j/Whats-App-Image-2025-09-14-at-6-35-58-PM.jpg',
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
      name: 'किडनी केयर सिरप',
      description: 'सामग्री:\nयवक्षार, पाषाणभेद, कूलथी, गोखरू, वरूण, तृणपंचमूल, पुनर्नवा।\n\nलाभ:\nकिडनी का समर्थन करता है और कार्य क्षमता बढ़ाता है।\nकिडनी, मूत्राशय और मूत्र पथ के रोगों में सहायक।\nकिडनी की पथरी और संबंधित समस्याओं को ठीक करने में मदद करता है।\nदर्द और सूजन को नियंत्रित करने में सहायक।\n\nसेवन विधि:\nबच्चे: 5 एमएल दिन में 3 बार\nवयस्क: 10 एमएल दिन में 3 बार'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Kidney Care Syrup',
      description: 'Ingredients:\nYavkshar, Pashanbhed, Kulthi, Gokhru, Varun, Trinpanchmool, Punarnava.\n\nBenefits:\nSupports kidney function and enhances efficiency.\nHelps in treating kidney, bladder, and urinary tract disorders.\nAids in managing kidney stones and related kidney problems.\nHelps in managing pain and inflammation.\n\nUsage:\nChildren: 5 ML three times a day\nAdults: 10 ML three times a day'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'किडनी केअर सिरप',
      description: 'साहित्य:\nयवक्षार, पाषाणभेद, कूलथी, गोखरू, वरूण, तृणपंचमूल, पुनर्नवा।\n\nफायदे:\nमूत्रपिंडाचा समर्थन करते आणि कार्यक्षमता वाढवते.\nमूत्रपिंड, मूत्राशय आणि मूत्रमार्गाच्या आजारांमध्ये उपयुक्त.\nमूत्रपिंडाच्या खडकाचे आणि संबंधित समस्यांचे व्यवस्थापन करते.\nवेदना आणि सूज नियंत्रणास मदत करते.\n\nसेवन पद्धत:\nमुले: 5 एमएल, दिवसात 3 वेळा\nप्रौढ: 10 एमएल, दिवसात 3 वेळा'
    }
  });

  console.log('Kidney care syrup product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });