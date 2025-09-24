const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Men Protein Powder',
      description: 'Complete nutrition protein powder for men with stamina enhancement',
      price: 1000,
      image: 'https://i.ibb.co/hF9NWHjp/Whats-App-Image-2025-09-14-at-6-36-00-PM-1.jpg',
      category: 'healthcare',
      stock: 250,
      packSize: '250g',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'मेन प्रोटीन पाउडर',
      description: 'सामग्री:\nसोया प्रोटीन आयसोलेट, पी प्रोटीन आयसोलेट, व्हे प्रोटीन आयसोलेट, मिल्क प्रोटीन, विटामिन्स, मिनरल्स, सफेद हल्दी, लैक्टोफेरिन, कोरल कैल्शियम, कोलस्ट्रम, ओमेगा 3 (DHA), अश्वगंधा, सफेद मुसली, मुलेठी।\n\nलाभ:\nसभी पोषक तत्व जैसे कार्बोहाइड्रेट, प्रोटीन, मल्टीविटामिन्स और मिनरल्स संतुलित मात्रा में प्रदान करता है।\nसफेद रक्त कणिकाओं (WBC) को बढ़ाकर रोग प्रतिरोधक शक्ति बढ़ाने में मदद करता है।\nपोषण और जीवनशैली से जुड़ी बीमारियों पर नियंत्रण रखता है।\nशारीरिक वृद्धि और स्टैमिना बढ़ाने में सहायक।\n\nसेवन विधि:\nरोजाना एक चमच (लगभग 10 ग्राम) पानी या दूध के साथ लें।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Men Protein Powder',
      description: 'Ingredients:\nSoy Protein Isolate, Pea Protein Isolate, Whey Protein Isolate, Milk Protein, Vitamins, Minerals, White Turmeric, Lactoferrin, Coral Calcium, Colostrum, Omega-3 (DHA), Ashwagandha, Safed Musli, Mulethi.\n\nBenefits:\nProvides all essential nutrients like carbohydrates, proteins, multivitamins, and minerals in a balanced quantity.\nHelps increase white blood cells (WBC) and boosts immunity.\nControls nutrition- and lifestyle-related disorders.\nSupports physical growth and enhances stamina.\n\nUsage:\nTake one spoon (about 10 grams) daily with water or milk to maintain health.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'मेन प्रोटीन पावडर',
      description: 'साहित्य:\nसोया प्रोटीन आयसोलेट, पी प्रोटीन आयसोलेट, व्हे प्रोटीन आयसोलेट, मिल्क प्रोटीन, व्हिटॅमिन्स, मिनरल्स, पांढरी हळद, लॅक्टोफेरिन, कोरल कॅल्शियम, कॉलस्ट्रम, ओमेगा 3 (DHA), अश्वगंधा, पांढरी मुसली, मुलेठी।\n\nफायदे:\nसर्व जीवनसत्त्वे जसे की कार्बोहायड्रेट, प्रोटीन, मल्टीव्हिटॅमिन्स आणि मिनरल्स संतुलित प्रमाणात पुरवते.\nपांढऱ्या रक्त पेशीं (WBC) वाढवून रोगप्रतिकारक शक्ती सुधारते.\nपोषण आणि जीवनशैली संबंधित आजारांवर नियंत्रण ठेवते.\nशारीरिक वाढ आणि स्टॅमिना वाढविण्यास मदत करते.\n\nसेवन पद्धत:\nदररोज एक चमच (सुमारे 10 ग्रॅम) पाणी किंवा दूधासह घ्या.'
    }
  });

  console.log('Men protein powder product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });