const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Herbal Soap',
      description: 'Nourishing herbal soap with natural extracts for all skin types',
      price: 225,
      image: 'https://i.ibb.co/FZNgfs1/Whats-App-Image-2025-09-15-at-8-15-17-PM.jpg',
      category: 'personal care',
      stock: 75,
      packSize: '75 GM X 3',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'हर्बल साबुन',
      description: 'सामग्री:\nसफेद हल्दी, बांस एक्स्ट्रॅक्ट, कैक्टस, शिया बटर।\n\nलाभ:\nसामान्य और रूखी त्वचा दोनों के लिए उपयुक्त।\nगहराई से पोषण देता है और त्वचा को कोमल बनाता है।\nत्वचा की मरम्मत और मॉइस्चराइजिंग करता है।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Herbal Soap',
      description: 'Ingredients:\nWhite Turmeric, Bamboo Extract, Cactus, Shea Butter.\n\nBenefits:\nSuitable for normal and dry skin.\nProvides deep nourishment and softens the skin.\nRepairs and moisturizes the skin.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'हर्बल साबण',
      description: 'साहित्य:\nपांढरी हळद, बॅम्बू एक्स्ट्रॅक्ट, कॅक्टस, शिया बटर।\n\nफायदे:\nसामान्य आणि कोरडी त्वचेसाठी योग्य.\nखोलवर पोषण देते आणि त्वचा मऊ करते.\nत्वचेची दुरुस्ती करते आणि मॉइस्चराइजिंग करते.'
    }
  });

  console.log('Herbal soap product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });