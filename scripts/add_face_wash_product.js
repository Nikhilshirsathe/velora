const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Face Wash',
      description: 'Gentle face wash with Dead Sea minerals and natural extracts',
      price: 250,
      image: 'https://i.ibb.co/pvKJ45G7/Whats-App-Image-2025-09-15-at-1-58-24-PM.jpg',
      category: 'personal care',
      stock: 100,
      packSize: '100 ML',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'फेस वॉश',
      description: 'सामग्री:\nडेड सी मिनरल्स, सैंडलवुड, विच हेज़ल, लेमन, रोज वॉटर, कुकंबर।\n\nलाभ:\nत्वचा को मुलायम बनाता है।\nवातावरणीय प्रदूषण के प्रभाव को कम करता है।\nत्वचा की कोशिकाओं को सुधारकर त्वचा को फर्म बनाता है।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Face Wash',
      description: 'Ingredients:\nDead Sea Minerals, Sandalwood, Witch Hazel, Lemon, Rose Water, Cucumber.\n\nBenefits:\nSoftens the skin.\nReduces effects of environmental pollution.\nImproves skin cells, making skin firm.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'फेस वॉश',
      description: 'साहित्य:\nडेड सी मिनरल्स, सँडलवुड, विच हॅझेल, लिंबू, रोज वॉटर, काकडी।\n\nफायदे:\nत्वचेला मऊ बनवते.\nपर्यावरणीय प्रदूषणाचे परिणाम कमी करते.\nत्वचेच्या पेशींमध्ये सुधारणा करून त्वचा फर्म बनवते.'
    }
  });

  console.log('Face wash product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });