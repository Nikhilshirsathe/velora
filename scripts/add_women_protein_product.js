const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Women Protein Powder',
      description: 'Complete nutrition protein powder for women with hormone balance',
      price: 1000,
      image: 'https://i.ibb.co/4RGQxd05/Whats-App-Image-2025-09-14-at-6-35-59-PM-1.jpg',
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
      name: 'वुमेन प्रोटीन पाउडर',
      description: 'सामग्री:\nसोया प्रोटीन आइसोलेट, पी प्रोटीन आइसोलेट, व्हे प्रोटीन आइसोलेट, मिल्क प्रोटीन, विटामिन्स, मिनरल्स, सफेद हल्दी, लैक्टोफेरिन, कोरल कैल्शियम, कोलस्ट्रम, ओमेगा-3 DHA, बीट सत्व, शतावरी, ओट्स, शंखपुष्पी, वचा।\n\nलाभ:\nसंतुलित मात्रा में कार्बोहाइड्रेट्स, प्रोटीन, मल्टीविटामिन्स और मल्टी मिनरल्स प्रदान करता है।\nश्वेत रक्त कोशिकाओं (WBCs) को बढ़ाकर रोग प्रतिरोधक क्षमता को मजबूत करता है।\nपोषण की कमी और जीवनशैली जन्य बीमारियों को नियंत्रित करता है।\nमहिलाओं में हार्मोन (Oestrogen और Progesterone) को संतुलित रखता है, जिससे मासिक धर्म की गड़बड़ियों से बचाव होता है।\n\nसेवन विधि:\nरोजाना 1 चमच (10g) दूध या पानी के साथ लें।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Women Protein Powder',
      description: 'Ingredients:\nSoy Protein Isolate, Pea Protein Isolate, Whey Protein Isolate, Milk Protein, Vitamins, Minerals, White Turmeric, Lactoferrin, Coral Calcium, Colostrum, Omega-3 DHA, Beet Extract, Shatavari, Oats, Shankhpushpi, Vacha.\n\nBenefits:\nProvides balanced nutrition with carbohydrates, proteins, multivitamins, and multiminerals.\nBoosts immunity by enhancing white blood cells (WBCs).\nHelps manage nutritional deficiencies and lifestyle-related disorders.\nRegulates female hormones (Oestrogen & Progesterone), helping prevent menstrual disorders.\n\nDosage:\nTake 1 spoon (10g) daily with water or milk.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'वुमेन प्रोटीन पावडर',
      description: 'साहित्य:\nसोया प्रोटीन आयसोलेट, पी प्रोटीन आयसोलेट, व्हे प्रोटीन आयसोलेट, मिल्क प्रोटीन, व्हिटॅमिन्स, मिनरल्स, पांढरी हळद, लॅक्टोफेरिन, कोरल कॅल्शियम, कोलस्ट्रम, ओमेगा-3 DHA, बीट सत्व, शतावरी, ओटस्, शंखपुष्पी, वचा।\n\nफायदे:\nकार्बोहायड्रेटस्, प्रोटिन्स, मल्टी व्हिटॅमिन्स व मल्टी मिनरल्स संतुलित प्रमाणात पुरवतो।\nपांढऱ्या रक्तपेशी (WBCs) वाढवून रोगप्रतिकारक शक्ती वाढवतो।\nपोषणाच्या कमतरता व जीवनशैलीजन्य आजारांवर नियंत्रण ठेवतो।\nस्त्रियांमध्ये इस्ट्रोजेन व प्रोजेस्टेरोन हार्मोन्स संतुलित ठेवतो, ज्यामुळे मासिक पाळीतील विकारांपासून संरक्षण मिळते।\n\nसेवन पद्धत:\nदररोज १ चमचा (१० ग्रॅम) दूध किंवा पाण्यात मिसळून घ्यावे.'
    }
  });

  console.log('Women protein powder product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });