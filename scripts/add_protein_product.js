const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Protein Powder',
      description: 'Complete nutrition protein powder with vitamins and minerals',
      price: 750,
      image: 'https://i.ibb.co/VnVTcFY/Whats-App-Image-2025-09-14-at-6-35-59-PM.jpg',
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
      name: 'प्रोटीन पाउडर',
      description: 'सामग्री:\nसोया प्रोटीन आइसोलेट, पी प्रोटीन आइसोलेट, व्हे प्रोटीन आइसोलेट, मिल्क प्रोटीन, विटामिन्स, मिनरल्स, सफेद हल्दी, लैक्टोफेरिन, कोरल कैल्शियम, कोलस्ट्रम, ओमेगा-3 DHA, अश्वगंधा, ब्राह्मी, मुलेठी, शंखपुष्पी, वचा, कर्कटश्रृंगी।\n\nलाभ:\nसंतुलित मात्रा में कार्बोहाइड्रेट्स, प्रोटीन, मल्टी विटामिन्स और मल्टी मिनरल्स प्रदान करता है।\nश्वेत रक्त कोशिकाओं (WBCs) को बढ़ाकर रोग प्रतिरोधक क्षमता को मजबूत करता है।\nपोषण की कमी और जीवनशैली जन्य बीमारियों को नियंत्रित करने में सहायक।\nअश्वगंधा, ब्राह्मी, शंखपुष्पी जैसी औषधियों से युक्त, जो स्मरण शक्ति, धैर्य और मानसिक शक्ति को बढ़ाते हैं।\n\nसेवन विधि:\nरोजाना 1 चमच (10g) पाउडर दूध या पानी के साथ लें।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Protein Powder',
      description: 'Ingredients:\nSoy Protein Isolate, Pea Protein Isolate, Whey Protein Isolate, Milk Protein, Vitamins, Minerals, White Turmeric, Lactoferrin, Coral Calcium, Colostrum, Omega-3 DHA, Ashwagandha, Brahmi, Mulethi, Shankhpushpi, Vacha, Karkatshringi.\n\nBenefits:\nProvides balanced nutrition with carbohydrates, proteins, multivitamins, and multiminerals.\nEnhances immunity by increasing white blood cells (WBCs).\nHelps manage nutritional deficiencies and lifestyle-related disorders.\nEnriched with powerful Ayurvedic herbs that improve memory, concentration, and overall vitality.\n\nDosage:\nTake 1 spoon (10g) daily with water or milk.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'प्रोटीन पावडर',
      description: 'साहित्य:\nसोया प्रोटीन आयसोलेट, पी प्रोटीन आयसोलेट, व्हे प्रोटीन आयसोलेट, मिल्क प्रोटीन, व्हिटॅमिन्स, मिनरल्स, पांढरी हळद, लॅक्टोफेरिन, कोरल कॅल्शियम, कोलस्ट्रम, ओमेगा-3 DHA, अश्वगंधा, ब्राह्मी, यष्टिमधु (मुलेठी), शंखपुष्पी, वचा, कर्कटश्रृंगी।\n\nफायदे:\nकार्बोहायड्रेट्स, प्रोटीन, मल्टी व्हिटॅमिन्स व मल्टी मिनरल्स संतुलित प्रमाणात पुरवतो.\nपांढऱ्या रक्तपेशी (WBCs) वाढवून रोगप्रतिकारक शक्ती वाढवतो.\nपोषणाच्या कमतरता व जीवनशैलीजन्य आजारांवर नियंत्रण ठेवतो.\nस्मरणशक्ती, धैर्य व मानसिक सामर्थ्य वाढवणाऱ्या औषधी वनस्पतींनी समृद्ध.\n\nसेवन पद्धत:\nदररोज १ चमचा (१० ग्रॅम) दूध किंवा पाण्यात मिसळून घ्यावे.'
    }
  });

  console.log('Protein powder product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });