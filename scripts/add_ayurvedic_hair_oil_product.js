const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Ayurvedic Hair Oil',
      description: 'Traditional Ayurvedic hair oil with Dead Sea minerals for anti-graying and stress relief',
      price: 175,
      image: 'https://i.ibb.co/0y6DFB79/Whats-App-Image-2025-09-15-at-8-30-18-PM.jpg',
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
      name: 'आयुर्वेदिक हेयर ऑयल',
      description: 'सामग्री:\nडेड सी मिनरल्स, तिल तेल, एनक्लॅप्टोस तेल, आंवला तेल, ब्रिगराज तेल, एलोवेरा तेल\n\nलाभ:\nसमय से पहले बाल सफेद होने से रोकता है।\nस्वस्थ और चमकदार बाल प्रदान करता है।\nएलोपेसिया में मददगार।\nअनिद्रा और उच्च रक्तचाप से संबंधित तनाव को कम करता है।\nबालों की रूखापन कम करता है और उन्हें रेशमी बनाता है।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Ayurvedic Hair Oil',
      description: 'Ingredients:\nDead Sea Minerals, Sesame Oil, Enclaptos Oil, Amla Oil, Bhringraj Oil, Aloe Vera Oil\n\nBenefits:\nPrevents premature graying of hair.\nProvides healthy and shiny hair.\nHelps with alopecia.\nReduces stress related to insomnia and high blood pressure.\nReduces hair dryness and makes hair silky.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'आयुर्वेदिक हेयर ऑईल',
      description: 'साहित्य:\nडेड सी मिनरल्स, तिळाचे तेल, एनक्लॅप्टोस तेल, आवळा तेल, भृंगराज तेल, अॅलोवेरा तेल\n\nफायदे:\nवेळेपुर्वी केस पांढरे होणे रोखते.\nनिरोगी आणि चमकदार केस देतो.\nएलोपेसियामध्ये मदतगार.\nअनिद्रा आणि उच्च रक्तदाबाशी संबंधित तणाव कमी करतो.\nकेसांची कोरडेपणा कमी करून त्यांना रेशमी बनवतो.'
    }
  });

  console.log('Ayurvedic hair oil product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });