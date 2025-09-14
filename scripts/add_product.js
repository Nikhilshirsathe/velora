const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const nameEn = 'The Natural Solution';
  const image = 'https://cdn.builder.io/api/v1/image/assets%2F3880e7df42a1416f9d1ed52d003b6955%2F3ff4733277b94c4abbb0036fb99bceb8?format=webp&width=800';

  const product = await prisma.product.upsert({
    where: { name: nameEn },
    update: {
      price: 500,
      image,
      category: 'healthcare',
      stock: 100,
      packSize: '30 Tablets',
      description: 'Herbal tablets formulated with Guggul, Shallaki, Rasna, Ashwagandha, Hadjod & Zinc. Helps strengthen bones, muscles, joints & ligaments. Relieves pain and inflammation in arthritis and joint disorders.',
    },
    create: {
      name: nameEn,
      description: 'Herbal tablets formulated with Guggul, Shallaki, Rasna, Ashwagandha, Hadjod & Zinc. Helps strengthen bones, muscles, joints & ligaments. Relieves pain and inflammation in arthritis and joint disorders.',
      price: 500,
      image,
      category: 'healthcare',
      stock: 100,
      packSize: '30 Tablets',
    }
  });

  // Upsert translations
  const translations = [
    {
      locale: 'en',
      name: 'The Natural Solution',
      description: 'Herbal tablets formulated with Guggul, Shallaki, Rasna, Ashwagandha, Hadjod & Zinc. Helps strengthen bones, muscles, joints & ligaments. Relieves pain and inflammation in arthritis and joint disorders.'
    },
    {
      locale: 'hi',
      name: 'द नेचुरल सोल्यूशन',
      description: 'गुग्गुल, शल्लकी, रास्ना, अश्वगंधा, हड़जोड़ व जिंक से बनी हर्बल टेबलेट। हड्डियों, मांसपेशियों व जोड़ों को मजबूती देती है। संधिवात व जोड़ों के दर्द-सूजन में लाभकारी।'
    },
    {
      locale: 'mr',
      name: 'द नैचरल सोल्यूशन',
      description: 'गुग्गुळ, शल्लकी, रास्ना, अश्वगंधा, हडजोड व झिंक युक्त हर्बल टॅबलेट. हाडे, स्नायू व सांधे मजबूत करायला मदत करते. संधिवात व सांध्यातील वेदना- सूज कमी करण्यास उपयुक्त.'
    }
  ];

  for (const tr of translations) {
    await prisma.productTranslation.upsert({
      where: { productId_locale: { productId: product.id, locale: tr.locale } },
      update: { name: tr.name, description: tr.description },
      create: { productId: product.id, locale: tr.locale, name: tr.name, description: tr.description }
    });
  }

  console.log('Product created/updated:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
