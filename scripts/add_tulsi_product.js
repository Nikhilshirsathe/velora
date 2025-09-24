const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Tulsi Drops',
      description: 'Five varieties of tulsi extract for immunity and health',
      price: 250,
      image: 'https://i.ibb.co/W4B9mmxL/Whats-App-Image-2025-09-14-at-6-35-59-PM-2.jpg',
      category: 'healthcare',
      stock: 30,
      packSize: '30 ML',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'तुलसी ड्रॉप्स',
      description: 'सामग्री:\nबबुई तुलसी, द्रुद्रिहा तुलसी, राम तुलसी, श्याम तुलसी, वन तुलसी।\n\nलाभ:\nरोग प्रतिकारक क्षमता बढ़ाने में मदद करता है।\nतुलसी में एंटीऑक्सीडेंट गुण होते हैं और यह एंटीमाइक्रोबियल गुणों से परिपूर्ण है।\nतुलसी को सर्वश्रेष्ठ एडेप्टोजेन माना जाता है।\nरक्त शुद्धिकरण में सहायक।\nपाचन स्वास्थ्य में सुधार करता है।\nस्वस्थ त्वचा और जोड़ों के स्वास्थ्य के लिए लाभदायक।\nसर्दी, खाँसी, जुकाम और श्वसन संबंधी रोगों में सहायक।\nलिवर और हृदय स्वास्थ्य के लिए उपयुक्त।\n\nसेवन विधि:\n2-3 बूंदें पानी, चाय या जूस में मिलाकर लें।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Tulsi Drops',
      description: 'Ingredients:\nBabui Tulsi, Drudriha Tulsi, Ram Tulsi, Shyam Tulsi, Van Tulsi.\n\nBenefits:\nHelps boost immunity.\nRich in antioxidant and antimicrobial properties.\nConsidered a top adaptogen.\nAids in blood purification.\nImproves digestive health.\nBeneficial for healthy skin and joint health.\nSupports relief from cold, cough, flu, and respiratory disorders.\nSuitable for liver and heart health.\n\nUsage:\nTake 2–3 drops with water, tea, or juice.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'तुलसी ड्रॉप्स',
      description: 'साहित्य:\nबबुई तुलसी, द्रुद्रिहा तुलसी, राम तुलसी, श्याम तुलसी, वन तुलसी।\n\nफायदे:\nरोगप्रतिकारक क्षमता वाढविण्यास मदत करते.\nतुलसीत अँटीऑक्सिडंट आणि अँटीमायक्रोबियल गुण असतात.\nतुलसीला सर्वोत्तम अडेप्टोजेन मानले जाते.\nरक्त शुद्धीकरणास मदत करते.\nपचनक्रिया सुधारते.\nनिरोगी त्वचा आणि सांध्यांच्या स्वास्थ्यासाठी लाभदायक.\nसर्दी, खोकला, जुकाम आणि श्वसन रोगांमध्ये उपयुक्त.\nयकृत आणि हृदय स्वास्थ्यासाठी योग्य.\n\nसेवन पद्धत:\n2–3 थेंब पाणी, चहा किंवा रसामध्ये मिसळून घ्या।'
    }
  });

  console.log('Tulsi drops product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });