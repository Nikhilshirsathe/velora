const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Antioxidant Care Tablets',
      description: 'Complete antioxidant and immunity booster tablets',
      price: 600,
      image: 'https://i.ibb.co/jPY3sG3V/Whats-App-Image-2025-09-14-at-6-56-46-PM.jpg',
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
      name: 'एंटीऑक्सिडेंट केयर टैबलेट्स',
      description: 'सामग्री:\nनोनी, स्पिरूलिना, मोरिंगा, कर्क्युमिन, ग्रीन-टी, गेनोडर्मा, साइट्रस बायोफ्लेवोनॉइडस, अश्वगंधा, आंवला, जिनसेंग\n\nलाभ:\nएंटीऑक्सिडेंट, विटामिन, खनिज और प्रोटीन से भरपूर।\nऑक्सीडेटिव तनाव को नियंत्रित करने और मस्तिष्क कार्य पर तनाव के प्रभाव को कम करने में सहायक।\nपेशी क्षति को कम करने में मदद करता है।\nप्रतिरक्षा व चयापचय को बढ़ावा देता है।\nशारीरिक और मानसिक स्वास्थ्य को सुधारने, पुनर्स्थापित करने और दीर्घायु बनाए रखने में सहायक।\nसूजन को नियंत्रित करने, एंटीऑक्सिडेंट सुरक्षा प्रदान करने और कोशिका स्वास्थ्य बनाए रखने में मदद करता है।\nकुछ प्रकार के कैंसर के जोखिम को कम करने में सहायक।\n\nसेवन विधि:\n1 टैबलेट रोजाना खाने के बाद, दिन में 2 से 3 बार।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Antioxidant Care Tablets',
      description: 'Ingredients:\nNoni, Spirulina, Moringa, Curcumin, Green Tea, Ganoderma, Citrus Bioflavonoids, Ashwagandha, Amla, Ginseng\n\nBenefits:\nRich in antioxidants, vitamins, minerals, and proteins.\nHelps manage oxidative stress and reduces its impact on cognitive functions.\nProtects muscles from damage.\nBoosts immunity and metabolism.\nPromotes physical and mental health, supports recovery, and enhances longevity.\nRegulates inflammation, provides antioxidant protection, and maintains cellular health.\nMay help reduce the risk of certain types of cancer.\n\nDosage:\n1 tablet after meals, 2 to 3 times daily.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'अँटीऑक्सिडंट केअर गोळ्या',
      description: 'साहित्य:\nनोनी, स्पिरुलिना, मोरिंगा, कर्क्युमिन, ग्रीन-टी, गेनोडर्मा, सायट्रस बायोफ्लेव्होनॉईड्स, अश्वगंधा, आवळा, जिनसेंग\n\nफायदे:\nअँटीऑक्सिडंट, जीवनसत्त्वे, खनिजे व प्रथिनांनी समृद्ध.\nऑक्सिडेटिव्ह ताण कमी करण्यास व मेंदूच्या कार्यावर ताणाचा परिणाम कमी करण्यास मदत.\nस्नायूंचे नुकसान कमी करते.\nरोगप्रतिकारक शक्ती व चयापचय वाढवते.\nशारीरिक व मानसिक आरोग्य सुधारते, शरीर पुनर्स्थापित करते व दीर्घायुष्य राखते.\nसूज नियंत्रित करून अँटीऑक्सिडंट संरक्षण देते व पेशींचे आरोग्य टिकवते.\nकाही प्रकारच्या कॅन्सरचा धोका कमी करण्यास सहाय्यकारी.\n\nसेवन पद्धत:\n१ गोळी जेवणानंतर, दिवसातून २ ते ३ वेळा.'
    }
  });

  console.log('Antioxidant care product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });