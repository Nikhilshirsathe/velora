const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Hair Strengthening Shampoo',
      description: 'Strengthening shampoo with Dead Sea minerals and keratin for healthy hair',
      price: 375,
      image: 'https://i.ibb.co/QFsS456Q/Whats-App-Image-2025-09-15-at-8-25-28-PM.jpg',
      category: 'personal care',
      stock: 500,
      packSize: '500 ML',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'हेयर स्ट्रेंथनिंग शैम्पू',
      description: 'सामग्री:\nडेड सी मिनरल्स, सोया प्रोटीन, केराटिन।\n\nलाभ:\nबालों में सुधार करता है और उन्हें साफ, चमकदार बनाता है।\nबालों की उलझन कम करके उन्हें कोमल, मुलायम और चमकदार बनाता है।\nबालों की जड़ों को मजबूत करके उनका झड़ना रोकता है।\nप्राकृतिक रूप से बालों का झड़ना रोकता है और उन्हें मजबूती देता है।\nबालों की जड़ों की पुनर्निर्माण करके उन्हें स्वस्थ बनाता है।\nयूवी किरणों से बालों की सुरक्षा करता है।\nबालों को मजबूत बनाता है।\nबालों के टूटने और उलझनों को कम करके पोषण प्रदान करता है।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Hair Strengthening Shampoo',
      description: 'Ingredients:\nDead Sea Minerals, Soy Protein, Keratin.\n\nBenefits:\nImproves hair, making it clean and shiny.\nReduces tangles, leaving hair soft, smooth, and shiny.\nStrengthens hair roots to prevent hair fall.\nNaturally prevents hair fall and strengthens hair.\nReconstructs hair roots to make them healthy.\nProtects hair from UV rays.\nStrengthens hair.\nReduces hair breakage and tangling while nourishing hair.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'हेयर स्ट्रेंथनिंग शॅम्पू',
      description: 'साहित्य:\nडेड सी मिनरल्स, सोया प्रोटीन, केराटिन।\n\nफायदे:\nकेस सुधारतो आणि त्यांना स्वच्छ, चमकदार बनवतो.\nकेसांची उलथापालथ कमी करून त्यांना कोमल, मऊ आणि चमकदार बनवतो.\nकेसांच्या मुळांना मजबूत करून केस गळणे रोखतो.\nनैसर्गिकरीत्या केस गळणे रोखतो आणि त्यांना मजबूती देतो.\nकेसांच्या मुळांची पुनर्निर्मिती करून त्यांना निरोगी बनवतो.\nकेसांना यूव्ही किरणांपासून संरक्षण देतो.\nकेसांना मजबूत बनवतो.\nकेस तुटणे आणि उलथापालथ कमी करून त्यांना पोषण देतो.'
    }
  });

  console.log('Hair strengthening shampoo product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });