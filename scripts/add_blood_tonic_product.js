const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Blood Tonic Syrup',
      description: 'Blood building and anemia relief syrup',
      price: 200,
      image: 'https://i.ibb.co/rRvd6Q5T/Whats-App-Image-2025-09-14-at-6-35-58-PM-2.jpg',
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
      name: 'ब्लड टॉनिक सिरप',
      description: 'सामग्री:\nताप्यादी लोह, नवायस लोह, स्वर्णमाक्षिक भस्म, दाडिम, पुनार्नावादी मंडूर, कसीस भस्म, पंचकोल, पुनर्नवा, द्राक्षा, कुटकी।\n\nलाभ:\nरक्त बढ़ाता है और एनीमिया को कम करने में मदद करता है।\nशरीर के pH स्तर को बनाए रखता है।\nलाल रक्त कोशिकाओं को बढ़ाता है।\nहृदय के अच्छे कार्य को बढ़ावा देता है।\nकोलेस्ट्रोल के प्रबंधन में मदद करता है।\nपोषक तत्वों और एंटीऑक्सिडेंट्स से भरपूर।\n\nसेवन विधि:\nबच्चे: 5 एमएल दिन में 3 बार\nवयस्क: 10 एमएल दिन में 3 बार'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Blood Tonic Syrup',
      description: 'Ingredients:\nTapyadi Loha, Navayas Loha, Swarnamakshik Bhasma, Pomegranate (Dadim), Punarnavadi Mandur, Kasis Bhasma, Panchkol, Punarnava, Draksha, Kutki.\n\nBenefits:\nIncreases blood and helps reduce anemia.\nMaintains body pH levels.\nIncreases red blood cells.\nPromotes healthy heart function.\nHelps manage cholesterol.\nRich in nutrients and antioxidants.\n\nUsage:\nChildren: 5 ML three times a day\nAdults: 10 ML three times a day'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'ब्लड टॉनिक सिरप',
      description: 'साहित्य:\nताप्यादी लोह, नवायस लोह, स्वर्णमाक्षिक भस्म, दाडिम, पुनार्नावादी मंडूर, कसीस भस्म, पंचकोल, पुनर्नवा, द्राक्षा, कुटकी।\n\nफायदे:\nरक्त वाढवते आणि अॅनिमियाला कमी करण्यास मदत करते.\nशरीराच्या pH पातळी राखते.\nलाल रक्त पेशी वाढवते.\nहृदयाच्या कार्यास उत्तेजन देते.\nकोलेस्ट्रॉल व्यवस्थापनास मदत करते.\nपोषक तत्वे आणि अँटीऑक्सिडंट्सने समृद्ध.\n\nसेवन पद्धत:\nमुले: 5 एमएल, दिवसात 3 वेळा\nप्रौढ: 10 एमएल, दिवसात 3 वेळा'
    }
  });

  console.log('Blood tonic syrup product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });