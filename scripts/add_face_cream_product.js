const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Anti-Aging Face Cream',
      description: 'Premium face cream with Dead Sea minerals for anti-aging',
      price: 275,
      image: 'https://i.ibb.co/v4VxJM3L/Whats-App-Image-2025-09-15-at-1-58-30-PM-1.jpg',
      category: 'personal care',
      stock: 50,
      packSize: '50 GM',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'एंटी-एजिंग फेस क्रीम',
      description: 'सामग्री:\nडेड सी मिनरल्स, जिनसिंग, बादाम तेल, एवोकाडो तेल, आर्गन तेल।\n\nलाभ:\nमहीना रेखाओं और झुर्रियों को कम करता है।\nकाले धब्बे और दोषों को हल्का करता है।\nसूर्य की हानिकारक किरणों से त्वचा की सुरक्षा करता है।\nत्वचा को पोषण देकर चमकदार बनाता है।\nत्वचा कोशिकाओं के पुनर्जनन में मदद करता है।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Anti-Aging Face Cream',
      description: 'Ingredients:\nDead Sea Minerals, Ginseng, Almond Oil, Avocado Oil, Argan Oil.\n\nBenefits:\nReduces fine lines and wrinkles.\nLightens dark spots and blemishes.\nProtects skin from sun damage.\nNourishes skin for a radiant glow.\nSupports skin cell regeneration.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'अँटी-एजिंग फेस क्रीम',
      description: 'साहित्य:\nडेड सी मिनरल्स, जिनसिंग, बदाम तेल, अवोकाडो तेल, आर्गन तेल।\n\nफायदे:\nमहीन रेषा आणि सुरकुत्या कमी करते.\nकाळे डाग आणि दोष हलके करते.\nसूर्याच्या हानिकारक किरणांपासून त्वचेचे रक्षण करते.\nत्वचेला पोषण देऊन चमकदार बनवते.\nत्वचा पेशींना पुनर्जननास मदत करते.'
    }
  });

  console.log('Anti-aging face cream product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });