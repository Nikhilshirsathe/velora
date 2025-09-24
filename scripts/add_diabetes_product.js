const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Diabetes Care Tablets',
      description: 'Blood sugar control and diabetes management tablets',
      price: 1000,
      image: 'https://i.ibb.co/S4J5mBfq/Whats-App-Image-2025-09-14-at-6-52-31-PM.jpg',
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
      name: 'डायबिटीज़ केयर टैबलेट्स',
      description: 'सामग्री:\nवसंत कुसुमाकर रस, चंद्रप्रभा वटी, बनाबा, मामेजावो, मेथी, जामुन, विजयसार, करेला, गार्सीनिया, गुडमार, तमालपत्र, क्रोमियम\n\nलाभ:\nपैनक्रियाज़ और इंसुलिन की कार्यक्षमता बढ़ाने में मदद करता है।\nरक्त शर्करा के स्तर को नियंत्रित रखने में सहायक।\nडायबिटीज़ के लक्षण जैसे अधिक भूख-प्यास लगना, बार-बार मूत्र आना, झुनझुनी इत्यादि को कम करता है।\nडायबिटीज़ की जटिलताओं जैसे किडनी व आँखों को होने वाले नुकसान से बचाव में सहायक।\n\nसेवन विधि:\n1 टैबलेट रोजाना खाने से पहले, दिन में 2 से 3 बार।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Diabetes Care Tablets',
      description: 'Ingredients:\nVasant Kusumakar Ras, Chandraprabha Vati, Banaba, Mamejava, Fenugreek, Jamun, Vijaysar, Bitter Gourd, Garcinia, Gudmar, Bay Leaf, Chromium\n\nBenefits:\nEnhances the efficiency of pancreas and insulin.\nHelps maintain normal blood sugar levels.\nReduces diabetic symptoms like excessive hunger, thirst, frequent urination, and tingling sensation.\nSupports in preventing diabetes complications such as kidney and eye damage.\n\nDosage:\n1 tablet before meals, 2 to 3 times daily.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'डायबिटीज केअर गोळ्या',
      description: 'साहित्य:\nवसंत कुसुमाकर रस, चंद्रप्रभा वटी, बनाबा, मामेजावो, मेथी, जांभुळ, विजयसार, कारले, गार्सिनिया, गुडमार, तमालपत्र, क्रोमियम\n\nफायदे:\nस्वादुपिंड (पॅनक्रियाज) व इन्सुलिनची कार्यक्षमता वाढविण्यास मदत करते.\nरक्तातील साखरेचे प्रमाण नियंत्रित ठेवण्यास सहाय्य करते.\nमधुमेहाची लक्षणे जसे जास्त भूक-प्यास, वारंवार लघवी होणे, मुंग्या येणे कमी करण्यास मदत करते.\nमधुमेहाच्या गुंतागुंती जसे किडनी व डोळ्यांवरील परिणाम टाळण्यास सहाय्य करते.\n\nसेवन पद्धत:\n१ गोळी जेवणाआधी, दिवसातून २ ते ३ वेळा.'
    }
  });

  console.log('Diabetes care product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });