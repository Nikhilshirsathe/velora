const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Immunity Booster Syrup',
      description: 'Immunity booster and liver protection syrup',
      price: 200,
      image: 'https://i.ibb.co/whdP4L0X/Whats-App-Image-2025-09-14-at-6-35-58-PM-1.jpg',
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
      name: 'इम्युनिटी बूस्टर सिरप',
      description: 'सामग्री:\nसारिवा, नीम, त्रिफला, त्रिकाटु, कुटकी, कालमेघ, तुलसी, गिलोय, नींबू, अनानास, व्हीटग्रास, पपीता।\n\nलाभ:\nरोग प्रतिरोधक शक्ति बढ़ाने में मदद करता है।\nविभिन्न रोगों पर प्रभावी।\nअद्वितीय हेपेटोप्रोटेक्टिव (लिवर की सुरक्षा) कार्य।\n\nसेवन विधि:\nबच्चे: 5 एमएल दिन में 3 बार\nवयस्क: 10 एमएल दिन में 3 बार'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Immunity Booster Syrup',
      description: 'Ingredients:\nSariva, Neem, Triphala, Trikatu, Kutki, Kalmegh, Tulsi, Giloy, Lemon, Pineapple, Wheatgrass, Papaya.\n\nBenefits:\nHelps boost immunity.\nEffective against various diseases.\nUnique hepatoprotective (liver protection) action.\n\nUsage:\nChildren: 5 ML three times a day\nAdults: 10 ML three times a day'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'इम्युनिटी बूस्टर सिरप',
      description: 'साहित्य:\nसारिवा, नीम, त्रिफळा, त्रिकटु, कुटकी, काळमेघ, तुलसी, गिलोय, लिंबू, अननस, व्हीटग्रास, पपई।\n\nफायदे:\nरोगप्रतिकारक शक्ती वाढविण्यास मदत करते.\nविविध आजारांवर प्रभावी.\nअद्वितीय हेपेटोप्रोटेक्टिव (लिवर सुरक्षा) कार्य।\n\nसेवन पद्धत:\nमुले: 5 एमएल, दिवसात 3 वेळा\nप्रौढ: 10 एमएल, दिवसात 3 वेळा'
    }
  });

  console.log('Immunity booster syrup product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });