const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Vitality Care Tablets',
      description: 'Energy, stamina and vitality enhancement tablets',
      price: 750,
      image: 'https://i.ibb.co/LDZDfsJw/Whats-App-Image-2025-09-14-at-6-51-52-PM.jpg',
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
      name: 'वाइटैलिटी केयर टैबलेट्स',
      description: 'सामग्री:\nमकरध्वज, त्रिवंग रस, सालमपंजा, सफेद मुसली, काली मुसली, शिलाजीत, मख्खान, कोकिलाक्ष, अर्जेनिन\n\nलाभ:\nऊर्जा, स्थैर्यता और पौरूषत्व बढ़ाने में सहायक।\nटेस्टोस्टेरोन निर्माण में मदद करता है।\nशुक्राणु संख्या बढ़ाने में सहायक।\nशुक्राणु संबंधी रोग जैसे Oligospermia, Azoospermia, Aspermia में लाभकारी।\nवंध्यत्व में भी सहायक।\n\nसेवन विधि:\n1 टैबलेट रोजाना खाने के बाद, दिन में 2 से 3 बार।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Vitality Care Tablets',
      description: 'Ingredients:\nMakardhwaj, Trivang Ras, Salam Panja, Safed Musli, Kali Musli, Shilajit, Makhana, Kokilaksha, Arginine\n\nBenefits:\nHelps increase energy, stamina, and vitality.\nSupports testosterone production.\nAids in improving sperm count.\nBeneficial in sperm-related conditions such as Oligospermia, Azoospermia, Aspermia.\nAlso helpful in infertility.\n\nDosage:\n1 tablet after meals, 2 to 3 times daily.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'व्हाइटॅलिटी केअर गोळ्या',
      description: 'साहित्य:\nमकरध्वज, त्रिवंग रस, सालमपंजा, सफेद मुसली, काळी मुसली, शिलाजीत, मखाना, कोकिलाक्ष, अर्जेनिन\n\nफायदे:\nऊर्जा, स्थैर्य आणि पुरुषत्व वाढविण्यास मदत करते.\nटेस्टोस्टेरोन निर्मितीत सहाय्य करते.\nशुक्राणू संख्या वाढविण्यास मदत करते.\nOligospermia, Azoospermia, Aspermia सारख्या शुक्राणू संबंधित आजारांमध्ये उपयुक्त.\nवंध्यत्वामध्येही उपयुक्त.\n\nसेवन पद्धत:\n१ गोळी जेवल्यानंतर, दिवसातून २ ते ३ वेळा.'
    }
  });

  console.log('Vitality care product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });