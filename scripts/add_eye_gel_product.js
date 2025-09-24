const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Eye Gel',
      description: 'Anti-puffiness eye gel with Dead Sea minerals and natural extracts',
      price: 200,
      image: 'https://i.ibb.co/Ggn56y3/Whats-App-Image-2025-09-15-at-1-58-23-PM-2.jpg',
      category: 'personal care',
      stock: 20,
      packSize: '20 ML',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'आई जेल',
      description: 'सामग्री:\nडेड सी मिनरल्स, ग्रीन टी, विच हेज़ल, एलोवेरा।\n\nलाभ:\nआंखों के आसपास सूजन को कम करने में मदद करता है।\nरक्त परिसंचरण में सुधार करके सूजन दूर करता है।\nत्वचा को कसता है और आंखों के आसपास हाइपरपिग्मेंटेशन को कम करता है।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Eye Gel',
      description: 'Ingredients:\nDead Sea Minerals, Green Tea, Witch Hazel, Aloe Vera.\n\nBenefits:\nHelps reduce puffiness around the eyes.\nImproves blood circulation to reduce swelling.\nFirms the skin and reduces hyperpigmentation around the eyes.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'आय जेल',
      description: 'साहित्य:\nडेड सी मिनरल्स, ग्रीन टी, विच हॅझेल, अॅलोव्हेरा।\n\nफायदे:\nडोळ्यांच्या आसपास सूज कमी करण्यात मदत करते.\nरक्तसंचार सुधारून सूज कमी करते.\nत्वचा घट्ट करते आणि डोळ्यांच्या आजूबाजूच्या हायपरपिग्मेंटेशन कमी करते.'
    }
  });

  console.log('Eye gel product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });