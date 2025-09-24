const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Hair Growth Gel',
      description: 'Nourishing hair gel with Dead Sea minerals and biotin for growth and styling',
      price: 360,
      image: 'https://i.ibb.co/RmHJ8bZ/Whats-App-Image-2025-09-15-at-8-25-45-PM.jpg',
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
      name: 'हेयर ग्रोथ जेल',
      description: 'सामग्री:\nडेड सी मिनरल्स, बायोटीन, ऑलिव तेल, विटजर्म तेल, सॉ पॉलमॅटो\n\nलाभ:\nबालों की त्वचा और बालों के फॉलिकल्स को पोषण देता है।\nबालों के विकास को बढ़ावा देता है।\nबालों में चमक लाने और स्टाइलिंग के लिए इस्तेमाल किया जाता है।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Hair Growth Gel',
      description: 'Ingredients:\nDead Sea Minerals, Biotin, Olive Oil, Wheat Germ Oil, Saw Palmetto\n\nBenefits:\nNourishes the scalp and hair follicles.\nPromotes hair growth.\nUsed to restore hair shine and for styling purposes.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'हेयर ग्रोथ जेल',
      description: 'साहित्य:\nडेड सी मिनरल्स, बायोटीन, ऑलिव तेल, व्हीट जर्म तेल, सॉ पॅल्मेटो\n\nफायदे:\nकेसांची त्वचा आणि केसांच्या फॉलिकल्सना पोषण देते.\nकेसांच्या वाढीस प्रोत्साहन देते.\nकेसांना चमक देण्यासाठी आणि स्टाईलिंगसाठी वापरले जाते.'
    }
  });

  console.log('Hair growth gel product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });