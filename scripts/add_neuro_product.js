const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Neuro Care Tablets',
      description: 'Neuro-muscular disorder treatment tablets',
      price: 600,
      image: 'https://i.ibb.co/XrjCxPXF/Whats-App-Image-2025-09-14-at-6-18-16-PM-1.jpg',
      category: 'healthcare',
      stock: 30,
      packSize: '30 Tablets',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'न्यूरो केयर टैबलेट्स',
      description: 'सामग्री:\nमहावातविध्वंस रस, बृहतृवातचिंतामणि रस, समीरपान्नग रस, एकांगवीर रस, गुग्गुल, शल्लकी, रास्ना, चोपचिनी, हड़जोड़\n\nलाभ:\nसीएनएस के न्यूरो-मांसपेशी विकारों में उपयोगी।\nहेमिप्लिजिया (पक्षाघात) और नसों की चोट में प्रभावी।\nचेहरे के पक्षाघात में सहायक।\nप्रभावित क्षेत्रों में रक्त प्रवाह को नियमित करता है, अॅनोक्सिया को नियंत्रित करता है और मस्तिष्क-संबंधी नसों को उत्तेजित करता है।\nनसों और रक्त वाहिकाओं को पोषण प्रदान करता है।\nऑस्टियोआर्थ्राइटिस और संधिशोथ में उपयोगी।\n\nसेवन विधि:\n1 टैबलेट रोजाना खाने से पहले, दिन में 2 से 3 बार।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Neuro Care Tablets',
      description: 'Ingredients:\nMahavatvidhwans Ras, Brihat Vat Chintamani Ras, Sameer Pannag Ras, Ekangveer Ras, Guggul, Shallaki, Rasna, Chopchini, Hadjod\n\nBenefits:\nUseful in CNS neuro-muscular disorders.\nEffective in hemiplegia (paralysis) and nerve injuries.\nHelps in facial paralysis.\nRegulates blood supply to affected areas, controls anoxia, and stimulates brain-related nerves.\nProvides nourishment to nerves and blood vessels.\nBeneficial in osteoarthritis and arthritis.\n\nDosage:\n1 tablet before meals, 2 to 3 times daily.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'न्यूरो केअर गोळ्या',
      description: 'साहित्य:\nमहावातविध्वंस रस, बृहत्वातचिंतामणी रस, समीरपान्नग रस, एकांगवीर रस, गुग्गुळ, शल्लकी, रास्ना, चोपचिनी, हडजोड\n\nफायदे:\nसीएनएसच्या न्यूरो-स्नायू विकारांमध्ये उपयुक्त.\nहेमिप्लिजिया (पक्षाघात) व मज्जातंतूच्या दुखापतीमध्ये प्रभावी.\nचेहऱ्याच्या पक्षाघातामध्ये मदत करते.\nप्रभावित भागामध्ये रक्तपुरवठा नियमित करते, अॅनॉक्सिया नियंत्रित करते आणि मेंदू-संबंधित मज्जातंतूंना उत्तेजित करते.\nमज्जातंतू व रक्तवाहिन्यांना पोषण देते.\nऑस्टिओआर्थ्रायटिस व संधिवातामध्ये उपयुक्त.\n\nसेवन पद्धत:\n१ गोळी जेवणाआधी, दिवसातून २ ते ३ वेळा.'
    }
  });

  console.log('Neuro care product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });