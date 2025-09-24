const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Moisturizing Cream',
      description: 'Nourishing moisturizer with bioactive minerals for all skin types',
      price: 40,
      image: 'https://i.ibb.co/Rp9jfFYb/Whats-App-Image-2025-09-15-at-8-14-50-PM.jpg',
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
      name: 'मॉइस्चराइजिंग क्रीम',
      description: 'सामग्री:\nबायोएक्टिव सी मिनरल्स, एलोवेरा।\n\nलाभ:\nसामान्य से रूखी त्वचा तक सभी के लिए उपयुक्त।\nत्वचा को पोषण देकर नरम और मुलायम बनाता है।\nबायोएक्टिव सी मिनरल्स कोलेजन और इलास्टिन निर्माण में मदद करते हैं।\nत्वचा को लवचिकता और कसावट देते हैं, बुढ़ापे के लक्षण कम करते हैं।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Moisturizing Cream',
      description: 'Ingredients:\nBioactive C Minerals, Aloe Vera.\n\nBenefits:\nSuitable for all skin types, from normal to dry.\nNourishes skin, making it soft and smooth.\nBioactive C Minerals help in collagen and elastin production.\nProvides elasticity and firmness, reducing signs of aging.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'मॉइस्चरायझिंग क्रीम',
      description: 'साहित्य:\nबायोएक्टिव्ह सी मिनरल्स, अॅलोव्हेरा।\n\nफायदे:\nसामान्य ते कोरडी त्वचेसाठी सर्वांसाठी योग्य.\nत्वचेला पोषण देऊन मऊ आणि कोमल बनवते.\nबायोएक्टिव्ह सी मिनरल्स कोलेजन आणि इलास्टिन निर्मितीत मदत करतात.\nत्वचेला लवचिकता आणि कसाव देतात, वृद्धत्वाची लक्षणे कमी करतात.'
    }
  });

  console.log('Moisturizing cream product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });