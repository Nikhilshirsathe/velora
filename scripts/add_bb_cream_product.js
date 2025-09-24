const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'BB Cream',
      description: 'Beauty balm cream with Dead Sea minerals for radiant skin',
      price: 175,
      image: 'https://i.ibb.co/ns1g7KyT/Whats-App-Image-2025-09-15-at-1-58-26-PM.jpg',
      category: 'personal care',
      stock: 20,
      packSize: '20 GM',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'बीबी क्रीम',
      description: 'सामग्री:\nडेड सी मिनरल्स, पीच, केसर, विटामिन-ई।\n\nलाभ:\nहल्के मेकअप की तरह काम करता है और त्वचा को चमकदार बनाता है।\nत्वचा के दाग़ कम करता है और रंग सुधारता है।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'BB Cream',
      description: 'Ingredients:\nDead Sea Minerals, Peach, Saffron, Vitamin-E.\n\nBenefits:\nWorks like a light makeup and makes skin radiant.\nReduces skin spots and improves skin tone.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'बीबी क्रीम',
      description: 'साहित्य:\nडेड सी मिनरल्स, पीच, केशर, व्हिटॅमिन-ई।\n\nफायदे:\nहलक्या मेकअपसारखे काम करते आणि त्वचा चमकदार बनवते.\nत्वचेवरील डाग कमी करते आणि त्वचेचा रंग सुधारतो.'
    }
  });

  console.log('BB cream product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });