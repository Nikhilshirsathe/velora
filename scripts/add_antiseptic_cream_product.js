const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Antiseptic Cream',
      description: 'Healing antiseptic cream with Dead Sea minerals and natural oils',
      price: 180,
      image: 'https://i.ibb.co/VckHLBF5/Whats-App-Image-2025-09-15-at-1-58-28-PM.jpg',
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
      name: 'एंटीसेप्टिक क्रीम',
      description: 'सामग्री:\nडेड सी मिनरल्स, नीम तेल, करंज तेल।\n\nलाभ:\nत्वचा की रक्षा और देखभाल करके इसे मुलायम बनाता है।\nत्वचा को पोषण देकर विभिन्न विकारों जैसे एनजिमा डर्माटेटीया से बचाता है।\nओशनफ्रेश एंटीसेप्टिक क्रीम रूखेपन, रूखे होंठ, एडियों का फटना, कटना, जलना और छोटी जख्मों के लिए उपयुक्त।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Antiseptic Cream',
      description: 'Ingredients:\nDead Sea Minerals, Neem Oil, Karanja Oil.\n\nBenefits:\nProtects and nourishes the skin, making it soft.\nPrevents various skin disorders like Enzyme Dermatitis.\nOceanfresh Antiseptic Cream is suitable for dryness, chapped lips, cracks, cuts, burns, and minor wounds.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'अँटीसेप्टिक क्रीम',
      description: 'साहित्य:\nडेड सी मिनरल्स, नीम तेल, करंज तेल।\n\nफायदे:\nत्वचेला संरक्षण देऊन मऊ बनवते.\nत्वचेला पोषण देऊन विविध विकारांपासून जसे एनझायम डर्माटायटिसपासून संरक्षण करते.\nओशनफ्रेश अँटीसेप्टिक क्रीम त्वचेच्या कोरडेपण, कोरडे ओठ, फाटलेले कंगोरे, कट, जळजळ आणि छोटी जखमा यासाठी उपयुक्त.'
    }
  });

  console.log('Antiseptic cream product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });