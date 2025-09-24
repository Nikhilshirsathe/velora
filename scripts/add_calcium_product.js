const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Calcium Tablets',
      description: 'Natural algal calcium with vitamin D3 for bone health',
      price: 360,
      image: 'https://i.ibb.co/TMBZ8zrS/Whats-App-Image-2025-09-14-at-6-35-57-PM-2.jpg',
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
      name: 'कैल्शियम टैबलेट्स',
      description: 'सामग्री:\nअल्गाल कैल्शियम, विटामिन D3, मैग्नीशियम, झिंक, हाडजोड़, लक्शा।\n\nलाभ:\nप्राकृतिक और जैवउपलब्ध कैल्शियम का केंद्रित स्रोत, हड्डियों को मजबूत बनाने में मदद करता है।\nमैग्नीशियम सामान्य हड्डियों के रखरखाव में योगदान देता है।\nकमजोर हड्डियों और संयोजी ऊतकों (स्नायुबंधन) की मरम्मत में सहायक।\n\nसेवन विधि:\n1 टैबलेट रोजाना 2–3 बार।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Calcium Tablets',
      description: 'Ingredients:\nAlgal Calcium, Vitamin D3, Magnesium, Zinc, Hadjod, Laksha.\n\nBenefits:\nOne of nature\'s most concentrated and bioavailable sources of calcium; helps strengthen bones.\nMagnesium contributes to the maintenance of normal bones.\nSupports repair of weak bones and connective tissues (ligaments).\n\nUsage:\n1 Tablet daily, 2–3 times.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'कॅल्शियम टॅबलेट्स',
      description: 'साहित्य:\nअल्गाल कॅल्शियम, विटॅमिन D3, मॅग्नेशियम, झिंक, हाडजोड, लक्शा।\n\nफायदे:\nनैसर्गिक आणि जैवउपलब्ध कॅल्शियमचा केंद्रित स्रोत, हाडे मजबूत करण्यास मदत करते.\nमॅग्नेशियम सामान्य हाडांच्या देखभालीस हातभार लावते.\nकमकुवत हाडे आणि संयोजी ऊतकांची (स्नायूं) दुरुस्ती समर्थन करते.\n\nसेवन पद्धत:\n1 टॅबलेट रोज 2–3 वेळा।'
    }
  });

  console.log('Calcium tablets product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });