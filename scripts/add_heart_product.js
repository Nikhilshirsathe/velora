const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Heart Care Tablets',
      description: 'Heart tonic and cardiovascular health tablets',
      price: 500,
      image: 'https://i.ibb.co/TBzb4Lcq/Whats-App-Image-2025-09-14-at-6-51-16-PM.jpg',
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
      name: 'हार्ट केयर टैबलेट्स',
      description: 'सामग्री:\nहृदयार्णव रस, चिंतामणि रस, अर्जुन, गुग्गुल, रसोन, तगर, जटामांसी, जहरमोहरा, अकिक पिश्टी, सेलेनियम, कोएंजाइम Q10\n\nलाभ:\nहृदय टॉनिक है एवं हृदय को मज़बूती प्रदान करता है।\nसीआर, कोलेस्ट्रॉल और ट्राईग्लिसराइड फैट कम करता है।\nशरीर को ऊर्जा और स्थिरता प्रदान करता है।\nउच्च रक्तचाप और तनाव को कम कर शांत निद्रा में मदद करता है।\nहृदयरोग होने का खतरा कम करता है।\n\nसेवन विधि:\n1 टैबलेट रोजाना खाने के बाद, दिन में 2 से 3 बार।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Heart Care Tablets',
      description: 'Ingredients:\nHridayarnav Ras, Chintamani Ras, Arjuna, Guggul, Rasona, Tagar, Jatamansi, Jahar Mohra, Akik Pishti, Selenium, Coenzyme Q10\n\nBenefits:\nActs as a heart tonic and strengthens the heart.\nReduces serum cholesterol and triglyceride fats.\nProvides energy and stability.\nHelps reduce high blood pressure and stress, promoting sound sleep.\nLowers the risk of heart disease.\n\nDosage:\n1 tablet after meals, 2 to 3 times daily.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'हार्ट केअर गोळ्या',
      description: 'साहित्य:\nहृदयार्णव रस, चिंतामणी रस, अर्जुन, गुग्गुळ, रसोन, तगर, जटामांसी, जहरमोहरा, अकिक पिष्टी, सेलेनियम, कोएन्झाइम Q10\n\nफायदे:\nहृदय टॉनिक म्हणून कार्य करते व हृदय मजबूत करते.\nसिरम कोलेस्टेरॉल व ट्रायग्लिसराईड फॅट कमी करते.\nऊर्जा व स्थैर्य प्रदान करते.\nउच्च रक्तदाब व ताण कमी करून शांत झोपेस मदत करते.\nहृदयरोगाचा धोका कमी करते.\n\nसेवन पद्धत:\n१ गोळी जेवल्यानंतर, दिवसातून २ ते ३ वेळा.'
    }
  });

  console.log('Heart care product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });