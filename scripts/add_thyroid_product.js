const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Thyroid Care Tablets',
      description: 'Thyroid hormone regulation and balance tablets',
      price: 500,
      image: 'https://i.ibb.co/B5MTLPCD/Whats-App-Image-2025-09-14-at-6-53-20-PM.jpg',
      category: 'healthcare',
      stock: 30,
      packSize: '30 Tablets',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'थायरॉइड केयर टैबलेट्स',
      description: 'सामग्री:\nसूतशेखर रस, कांचनार गुग्गुल, पुनर्नवा, चिरायता, उशीर, ब्राह्मी\n\nलाभ:\nथायरॉइड ग्रंथि से थायरॉइड हार्मोन सही मात्रा में बनने में मदद करता है।\nथायरॉइड असंतुलन के लक्षण जैसे चिड़चिड़ापन, अरुचि, निरुत्साह को कम करता है।\nथायरॉइड हार्मोन की कमी से बढ़े वजन को कम करने में सहायक।\n\nसेवन विधि:\n1 टैबलेट रोजाना खाने के बाद, दिन में 2 से 3 बार।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Thyroid Care Tablets',
      description: 'Ingredients:\nSootshekhar Ras, Kanchnar Guggul, Punarnava, Chirayata, Ushir, Brahmi\n\nBenefits:\nHelps regulate the thyroid gland to produce hormones in proper amounts.\nReduces thyroid imbalance symptoms such as irritability, loss of appetite, and fatigue.\nAids in weight reduction caused by thyroid hormone deficiency.\n\nDosage:\n1 tablet after meals, 2 to 3 times daily.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'थायरॉईड केअर गोळ्या',
      description: 'साहित्य:\nसूतशेखर रस, कांचनार गुग्गुळ, पुनर्नवा, चिरायता, उशीर, ब्राह्मी\n\nफायदे:\nथायरॉईड ग्रंथीमधून थायरॉईड हार्मोन योग्य प्रमाणात तयार होण्यास मदत करते.\nथायरॉईड असंतुलनाची लक्षणे जसे चिडचिड, भूक न लागणे, उत्साह कमी होणे कमी करण्यास मदत करते.\nथायरॉईड हार्मोनच्या कमतरतेमुळे वाढलेले वजन कमी करण्यास सहाय्य करते.\n\nसेवन पद्धत:\n१ गोळी जेवल्यानंतर, दिवसातून २ ते ३ वेळा.'
    }
  });

  console.log('Thyroid care product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });