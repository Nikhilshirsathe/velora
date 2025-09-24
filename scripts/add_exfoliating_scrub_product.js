const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Exfoliating Scrub',
      description: 'Dead skin removal scrub with Dead Sea minerals and natural extracts',
      price: 180,
      image: 'https://i.ibb.co/vyMhBB2/Whats-App-Image-2025-09-15-at-8-16-16-PM.jpg',
      category: 'personal care',
      stock: 100,
      packSize: '100 GM',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'एक्सफोलिएटिंग स्क्रब',
      description: 'सामग्री:\nडेड सी मिनरल्स, ब्लू टैन्सी ऑयल, गोजीबेरी।\n\nलाभ:\nमृत त्वचा को हटाने में मदद करता है और स्किन पोर्स को साफ करता है।\nपर्यावरण और UV किरणों से त्वचा की रक्षा करता है।\nत्वचा की टोन को निखारता है और हाइपरपिगमेंटेशन को कम करता है।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Exfoliating Scrub',
      description: 'Ingredients:\nDead Sea Minerals, Blue Tansy Oil, Goji Berry.\n\nBenefits:\nHelps remove dead skin and unclog pores.\nProtects skin from environmental damage and UV rays.\nImproves skin tone and reduces hyperpigmentation.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'एक्सफोलिएटिंग स्क्रब',
      description: 'साहित्य:\nडेड सी मिनरल्स, ब्लू टॅन्सी ऑइल, गोजीबेरी।\n\nफायदे:\nमृत त्वचा काढण्यात मदत करते आणि त्वचेचे पोर्स स्वच्छ करतो.\nपर्यावरणीय हानी आणि UV किरणांपासून त्वचेचे संरक्षण करतो.\nत्वचेचा रंग सुधारतो आणि हायपरपिगमेंटेशन कमी करतो.'
    }
  });

  console.log('Exfoliating scrub product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });