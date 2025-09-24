const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Cough Relief Syrup',
      description: 'Respiratory health and cough relief syrup',
      price: 200,
      image: 'https://i.ibb.co/LdZxmbpB/Whats-App-Image-2025-09-14-at-6-35-57-PM.jpg',
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
      name: 'कफ रिलीफ सिरप',
      description: 'सामग्री:\nश्वासकुठार रस, लक्ष्मीविलास रस, बालाचतुर्भद्र रस, तुलसी, यष्टिमधु, नवसागर, वसा, भारंगी, कंटकारी।\n\nलाभ:\nसंक्रमण से लड़ने के लिए रोग प्रतिरोधक शक्ति बढ़ाता है।\nविभिन्न श्वसन संक्रमणों से सुरक्षित रखता है।\nसभी प्रकार की खांसी में प्रभावी, जैसे सूखी और गीली खांसी।\n\nसेवन विधि:\nबच्चे: 5 एमएल दिन में 3 बार\nवयस्क: 10 एमएल दिन में 3 बार'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Cough Relief Syrup',
      description: 'Ingredients:\nShwasakuthar Ras, Lakshmivilas Ras, Balachaturbhadra Ras, Tulsi, Yashtimadhu, Navasagar, Vasa, Bharangi, Kantakari.\n\nBenefits:\nBuilds immunity to fight infections.\nProtects against various respiratory infections.\nHighly effective for all types of cough, including dry and wet cough.\n\nUsage:\nChildren: 5 ML three times a day\nAdults: 10 ML three times a day'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'कफ रिलीफ सिरप',
      description: 'साहित्य:\nश्वासकुठार रस, लक्ष्मीविलास रस, बालाचतुरभद्र रस, तुलसी, यष्टिमधु, नवसागर, वसा, भारंगी, कंटकारी।\n\nफायदे:\nसंसर्गांशी लढण्यासाठी रोगप्रतिकारक शक्ती वाढवते.\nविविध श्वसन संक्रमणांपासून सुरक्षित ठेवते.\nसर्व प्रकारच्या खोकल्यावर प्रभावी, जसे की कोरडा आणि ओला खोकला।\n\nसेवन पद्धत:\nमुले: 5 एमएल, दिवसात 3 वेळा\nप्रौढ: 10 एमएल, दिवसात 3 वेळा'
    }
  });

  console.log('Cough relief syrup product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });