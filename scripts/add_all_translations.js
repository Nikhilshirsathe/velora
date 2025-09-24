const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.findFirst({
    where: { category: 'healthcare' }
  });

  if (!product) {
    console.log('No healthcare product found');
    return;
  }

  // Add English translation
  await prisma.productTranslation.upsert({
    where: {
      productId_locale: {
        productId: product.id,
        locale: 'en'
      }
    },
    update: {
      name: 'Joint Care Tablets',
      description: 'Contains: Guggul, Shallaki, Rasna, Chopchini, Hadjod, Ashwagandha, Pippali, Zinc\n\nBenefits:\nHelps strengthen bones, muscles, cartilage, ligaments and joints.\nHelps reduce pain and swelling in diseases like arthritis, rheumatoid arthritis.\nHelps reduce the deteriorating condition of joints and bones.\n\nDosage: 1 Tablet daily before meals 2 to 3 times.'
    },
    create: {
      productId: product.id,
      locale: 'en',
      name: 'Joint Care Tablets',
      description: 'Contains: Guggul, Shallaki, Rasna, Chopchini, Hadjod, Ashwagandha, Pippali, Zinc\n\nBenefits:\nHelps strengthen bones, muscles, cartilage, ligaments and joints.\nHelps reduce pain and swelling in diseases like arthritis, rheumatoid arthritis.\nHelps reduce the deteriorating condition of joints and bones.\n\nDosage: 1 Tablet daily before meals 2 to 3 times.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.upsert({
    where: {
      productId_locale: {
        productId: product.id,
        locale: 'mr'
      }
    },
    update: {
      name: 'सांधे काळजी गोळ्या',
      description: 'घटक: गुग्गुळ, शल्लकी, रास्ना, चोपचिनी, हडजोड, अश्वगंधा, पिप्पली, झिंक\n\nफायदे:\nहाडे, स्नायू, कार्टिलेज, लिगामेंट्स आणि सांधे मजबूत करण्यास मदत करते.\nसंधिवात, आमवात यासारख्या आजारांमध्ये वेदना, सूज कमी करण्यास मदत करते.\nसांधे आणि हाडांची क्षीण होणारी स्थिती कमी करण्याचे काम करते.\n\nसेवन पद्धती: दररोज जेवणापूर्वी 1 गोळी 2 ते 3 वेळा.'
    },
    create: {
      productId: product.id,
      locale: 'mr',
      name: 'सांधे काळजी गोळ्या',
      description: 'घटक: गुग्गुळ, शल्लकी, रास्ना, चोपचिनी, हडजोड, अश्वगंधा, पिप्पली, झिंक\n\nफायदे:\nहाडे, स्नायू, कार्टिलेज, लिगामेंट्स आणि सांधे मजबूत करण्यास मदत करते.\nसंधिवात, आमवात यासारख्या आजारांमध्ये वेदना, सूज कमी करण्यास मदत करते.\nसांधे आणि हाडांची क्षीण होणारी स्थिती कमी करण्याचे काम करते.\n\nसेवन पद्धती: दररोज जेवणापूर्वी 1 गोळी 2 ते 3 वेळा.'
    }
  });

  console.log('All translations added for product:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });