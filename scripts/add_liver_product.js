const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Liver Care Tablets',
      description: 'Liver function enhancement and detoxification tablets',
      price: 1000,
      image: 'https://i.ibb.co/TDy3NgpJ/Whats-App-Image-2025-09-14-at-6-23-08-PM.jpg',
      category: 'healthcare',
      stock: 60,
      packSize: '60 Tablets',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'लिवर केयर टैबलेट्स',
      description: 'सामग्री:\nताप्यादी लोह, नवायस लोह, आरोग्यवर्धिनी रस, कुटकी, कालमेघ, अमलतास, रेवंडचिनी, पुनर्नवा, रोहितक, शरपुंखा, मकोय, चिरायता, भुईआमला, लेसिथिन\n\nलाभ:\nलिवर कार्य को बढ़ाता है एवं पाचन व डिटॉक्सिफिकेशन में सहायक।\nलिवर एंजाइम्स के प्राकृतिक निर्माण में मदद करता है।\nलिवर, प्लीहा आदि अवयवों को मजबूती प्रदान करता है।\nवायरल एवं बैक्टीरियल संक्रमण से लिवर की रक्षा करता है।\n\nसेवन विधि:\n1 टैबलेट रोजाना खाने से पहले, दिन में 2 से 3 बार।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Liver Care Tablets',
      description: 'Ingredients:\nTapyadi Loh, Navayasa Loh, Arogyavardhini Ras, Kutki, Kalmegh, Amaltas, Revandchini, Punarnava, Rohitak, Sharpunkha, Makoy, Chirayata, Bhumyamalaki, Lecithin\n\nBenefits:\nEnhances liver function and supports digestion and detoxification.\nHelps in the natural production of liver enzymes.\nStrengthens the liver, spleen, and related organs.\nProtects the liver from viral and bacterial infections.\n\nDosage:\n1 tablet before meals, 2 to 3 times daily.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'लिव्हर केअर गोळ्या',
      description: 'साहित्य:\nताप्यादी लोह, नवायस लोह, आरोग्यवर्धिनी रस, कुटकी, कालमेघ, अमलतास, रेवंडचिनी, पुनर्नवा, रोहितक, शरपुंखा, मकोय, चिरायता, भुईआवळा, लेसिथिन\n\nफायदे:\nयकृताचे कार्य सुधारते व पचन व डिटॉक्सिफिकेशनमध्ये मदत करते.\nयकृत एंझाईम्सच्या नैसर्गिक निर्मितीत सहाय्य करते.\nयकृत, प्लीहा व इतर अवयवांना मजबुती देते.\nव्हायरल व बॅक्टेरियल इन्फेक्शनपासून यकृताचे संरक्षण करते.\n\nसेवन पद्धत:\n१ गोळी जेवणाआधी, दिवसातून २ ते ३ वेळा.'
    }
  });

  console.log('Liver care product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });