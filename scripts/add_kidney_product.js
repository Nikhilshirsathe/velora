const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Kidney Care Tablets',
      description: 'Kidney tonic and stone dissolution tablets',
      price: 500,
      image: 'https://i.ibb.co/8nCZy8jB/Whats-App-Image-2025-09-14-at-6-53-53-PM.jpg',
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
      name: 'किडनी केयर टैबलेट्स',
      description: 'सामग्री:\nहजरल यहुद, गोक्षुरादि गुग्गुळ, पुनर्नवा, वरूण, शैलेयम, पाषाणभेद, उशीर, ककड़ी, अपामार्ग, यवक्षार\n\nलाभ:\nकिड़नी टॉनिक के रूप में लाभदायक एवं किड़नी के कार्य में सुधार लाता है।\nकिड़नी रोगों के लक्षण जैसे सूजन, जलन आदि कम करने में सहायक।\nभेदन गुणधर्म से पथरी या मूत्राश्मरी को तोड़ने में मदद करता है।\n\nसेवन विधि:\n1 टैबलेट रोजाना खाने से पहले, दिन में 2 से 3 बार।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Kidney Care Tablets',
      description: 'Ingredients:\nHajarul Yahud, Gokshuradi Guggul, Punarnava, Varun, Shailayam, Pashanbhed, Ushir, Kakdi, Apamarg, Yavkshar\n\nBenefits:\nActs as a kidney tonic and improves kidney functions.\nHelps reduce kidney disorder symptoms such as swelling and burning sensation.\nIts lithotriptic properties assist in breaking down kidney stones (urolithiasis).\n\nDosage:\n1 tablet before meals, 2 to 3 times daily.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'किडनी केअर गोळ्या',
      description: 'साहित्य:\nहजरल यहुद, गोक्षुरादि गुग्गुळ, पुनर्नवा, वरूण, शैलेयम, पाषाणभेद, उशीर, काकडी, अपामार्ग, यवक्षार\n\nफायदे:\nकिडनी टॉनिक म्हणून उपयुक्त व किडनीच्या कार्यात सुधारणा करते.\nकिडनीच्या आजारांतील लक्षणे जसे सूज, जळजळ कमी करण्यास मदत करते.\nभेदन गुणधर्मामुळे पथरी किंवा मूत्राश्मरी तोडण्यास सहाय्य करते.\n\nसेवन पद्धत:\n१ गोळी जेवणाआधी, दिवसातून २ ते ३ वेळा.'
    }
  });

  console.log('Kidney care product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });