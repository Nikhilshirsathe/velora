const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: '12-in-1 Hair Oil',
      description: 'Premium blend of 12 natural oils for complete hair care and nourishment',
      price: 600,
      image: 'https://i.ibb.co/DD9mxSbK/Whats-App-Image-2025-09-15-at-8-25-59-PM.jpg',
      category: 'personal care',
      stock: 200,
      packSize: '200 ML',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: '12-इन-1 हेयर ऑयल',
      description: 'सामग्री:\nविटामिन ई, बायोटिन, तिल तेल, नारियल तेल, जैतून तेल, ऑलिव तेल, अर्गन तेल, बदाम तेल, सूर्यमुखी तेल, जोजोबा तेल, एवोकाडो तेल, लसी तेल, गेहूं के बीज का तेल, रोजमेरी तेल, टी ट्री ऑइल\n\nलाभ:\n12 तरह के तेल बालों के झड़ने को रोकते हैं।\nसमय से पहले बाल सफेद होने से रोकते हैं।\nबालों को मजबूत और चमकदार बनाते हैं।\nतनाव को कम करते हैं।\nबालों की रूखापन कम करके उन्हें रेशमी बनाते हैं।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: '12-in-1 Hair Oil',
      description: 'Ingredients:\nVitamin E, Biotin, Sesame Oil, Coconut Oil, Olive Oil, Argan Oil, Almond Oil, Sunflower Oil, Jojoba Oil, Avocado Oil, Castor Oil, Wheat Germ Oil, Rosemary Oil, Tea Tree Oil\n\nBenefits:\n12 types of oils help prevent hair fall.\nPrevents premature graying of hair.\nStrengthens hair and adds shine.\nReduces stress.\nReduces dryness of hair, making it silky and smooth.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: '12-इन-1 हेयर ऑईल',
      description: 'साहित्य:\nव्हिटॅमिन ई, बायोटीन, तिळाचे तेल, नारळ तेल, ऑलिव तेल, अर्गन तेल, बदाम तेल, सूर्यफूल तेल, जोजोबा तेल, अवोकाडो तेल, राई तेल, गहू बियांचा तेल, रोजमेरी तेल, टी ट्री ऑईल\n\nफायदे:\n12 प्रकारची तेलं केस गळणे टाळतात.\nवेळेपुर्वी केस पांढरे होणे रोखतात.\nकेस मजबूत आणि चमकदार बनवतात.\nतणाव कमी करतात.\nकेसांची कोरडेपणा कमी करून त्यांना रेशमी बनवतात.'
    }
  });

  console.log('12-in-1 hair oil product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });