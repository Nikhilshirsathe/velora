const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Detox Care Tablets',
      description: 'Complete detoxification and digestive health tablets',
      price: 1000,
      image: 'https://i.ibb.co/wZ9y0zS6/Whats-App-Image-2025-09-14-at-6-54-49-PM.jpg',
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
      name: 'डिटॉक्स केयर टैबलेट्स',
      description: 'सामग्री:\nशंखवटी, मुक्ता पिष्टी, प्रवालपंचामृत, सूतशेखर, हिंग्वाष्टक, अविपत्तिकर, आरग्वध, सोनामुखी, सौंफ\n\nलाभ:\nविषैले तत्व शरीर से बाहर निकालने में मदद करता है।\nपूर्ण डिटॉक्सिफिकेशन में सहायक।\nआंत प्रणाली पर सौम्य प्रभाव डालता है और एसिडिटी, अपच, अरुचि एवं कब्ज में लाभदायक।\nपाचन एंजाइम के निर्माण में मदद करता है।\n\nसेवन विधि:\n1 टैबलेट रोजाना खाने से पहले, दिन में 2 से 3 बार।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Detox Care Tablets',
      description: 'Ingredients:\nShankh Vati, Mukta Pishti, Praval Panchamrit, Sutshekhar, Hingwashtak, Avipattikar, Aragvadha, Sonamukhi, Saunf\n\nBenefits:\nHelps eliminate toxic elements from the body.\nSupports complete detoxification.\nGentle on the intestinal system; beneficial in acidity, indigestion, loss of appetite, and constipation.\nPromotes the natural production of digestive enzymes.\n\nDosage:\n1 tablet before meals, 2 to 3 times daily.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'डिटॉक्स केअर गोळ्या',
      description: 'साहित्य:\nशंखवटी, मुक्ता पिष्टी, प्रवाळपंचामृत, सूतशेखर, हिंग्वाष्टक, अविपत्तिकर, आरग्वध, सोनामुखी, बडीशेप\n\nफायदे:\nशरीरातील विषारी घटक बाहेर टाकण्यास मदत करते.\nपूर्ण डिटॉक्सिफिकेशनमध्ये सहाय्यकारी.\nआतड्यांवर सौम्य परिणाम करतो व अॅसिडिटी, अपचन, अरुची व बद्धकोष्ठता कमी करण्यास मदत करतो.\nपचन एन्झाईम निर्मितीस प्रोत्साहन देतो.\n\nसेवन पद्धत:\n१ गोळी जेवणाआधी, दिवसातून २ ते ३ वेळा.'
    }
  });

  console.log('Detox care product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });