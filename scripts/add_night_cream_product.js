const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Night Cream',
      description: 'Rejuvenating night cream with Dead Sea minerals and nourishing oils',
      price: 150,
      image: 'https://i.ibb.co/My5KvwgR/Whats-App-Image-2025-09-15-at-1-58-28-PM-2.jpg',
      category: 'personal care',
      stock: 60,
      packSize: '60 GM',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'नाइट क्रीम',
      description: 'सामग्री:\nडेड सी मिनरल्स, एवोकाडो तेल, जोजोबा तेल, गेहूं के बीज का तेल।\n\nलाभ:\nत्वचा का टोन और बनावट सही रखने में मदद करता है।\nत्वचा के दाग़, काले धब्बे और हाइपरपिगमेंटेशन को कम करता है।\nत्वचा को कोमल बनाता है और कसाव देकर बुढ़ापे के लक्षण कम करता है।\nत्वचा को चमकदार और ताजगीपूर्ण बनाता है।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Night Cream',
      description: 'Ingredients:\nDead Sea Minerals, Avocado Oil, Jojoba Oil, Wheat Germ Oil.\n\nBenefits:\nHelps maintain skin tone and texture.\nReduces blemishes, dark spots, and hyperpigmentation.\nSoftens the skin and firms it to reduce signs of aging.\nMakes skin radiant and glowing.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'नाइट क्रीम',
      description: 'साहित्य:\nडेड सी मिनरल्स, अवोकाडो तेल, जोजोबा तेल, गहूच्या बीजाचे तेल।\n\nफायदे:\nत्वचेचा टोन आणि बनावट योग्य राखण्यात मदत करते.\nडाग, काळे डाग आणि हायपरपिग्मेंटेशन कमी करते.\nत्वचा मऊ करते, कसाव देते आणि वृद्धत्वाची लक्षणे कमी करते.\nत्वचेला चमकदार आणि ताजेतवाने बनवते.'
    }
  });

  console.log('Night cream product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });