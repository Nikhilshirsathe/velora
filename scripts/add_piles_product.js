const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Piles Care Tablets',
      description: 'Hemorrhoids treatment and digestive health tablets',
      price: 500,
      image: 'https://i.ibb.co/0ym5ZQB5/Whats-App-Image-2025-09-14-at-6-55-19-PM.jpg',
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
      name: 'पाइल्स केयर टैबलेट्स',
      description: 'सामग्री:\nअर्शोघ्ना वटी, अर्शकुठार रस, कांकायन वटी, ताप्यादि लोह, बोलबद्ध रस, नागकेशर, लाजाळू, दारूहळद, सुरन, अमलतास\n\nलाभ:\nबवासीर के मूल कारण जैसे अपचन और कब्ज में सुधार करता है।\nपाचन व यकृत टॉनिक के रूप में उपयोगी।\nरक्तस्त्राव और बिना रक्तस्त्राव वाली बवासीर, दर्द, सूजन, खुजली, मलाशय के भारीपन आदि में लाभकारी।\n\nसेवन विधि:\n1 टैबलेट रोजाना खाने से पहले, दिन में 2 से 3 बार।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Piles Care Tablets',
      description: 'Ingredients:\nArshoghna Vati, Arshkuthar Ras, Kankayan Vati, Tapyadi Loha, Bolbaddh Ras, Nagkeshar, Lajalu, Daruharidra, Suran, Amaltas\n\nBenefits:\nHelps treat root causes of piles such as indigestion and constipation.\nActs as a digestive and liver tonic.\nEffective in both bleeding and non-bleeding piles; relieves pain, swelling, itching, and heaviness in rectum.\n\nDosage:\n1 tablet before meals, 2 to 3 times daily.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'पाइल्स केअर गोळ्या',
      description: 'साहित्य:\nअर्शोघ्ना वटी, अर्शकुठार रस, कांकायन वटी, ताप्यादि लोह, बोलबद्ध रस, नागकेशर, लाजाळू, दारूहळद, सुरण, अमलतास\n\nफायदे:\nबवासीरच्या मूळ कारणांवर (अपचन व बद्धकोष्ठता) नियंत्रण ठेवतो.\nपचन व यकृत टॉनिक म्हणून उपयुक्त.\nरक्तस्राव व न-रक्तस्राव बवासीरमध्ये, वेदना, सूज, खाज, गुदद्वारातील जडपणा यामध्ये अत्यंत लाभदायक.\n\nसेवन पद्धत:\n१ गोळी जेवणाआधी, दिवसातून २ ते ३ वेळा.'
    }
  });

  console.log('Piles care product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });