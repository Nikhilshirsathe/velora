const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Joint Care Tablets',
      description: 'Herbal tablets with Guggul, Shallaki, Rasna, Ashwagandha, Hadjod & Zinc for joint and bone health.',
      price: 500,
      image: 'https://i.ibb.co/RppTq3h5/Whats-App-Image-2025-09-14-at-6-02-01-PM.jpg',
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
      name: 'जोड़ों की देखभाल की गोलियां',
      description: 'गुग्गुल । शल्लकी । रास्ना । चोपचिनी । हड़जोड़ । अश्वगंधा । पिप्पली। जिंक\n\nलाभ:\nहड्डिया, मांसपेशिया, कार्टिलेज, लिगामेन्टस एवं संधियों को मजबुती प्रदान करने मे मदद करता है।\nसंधिवात, आमवात, वातरक्त जैसे बिमारीयों मे दर्द, सूजन कम करने मे मदद करता है।\nसंधियों एवं हड्डियों कि क्षीण होने वाली अवस्था को कम करने का काम करता है।\n\nसेवनविधी: 1 Tablet रोजाना खाने से पहले 2 से 3 बार।'
    }
  });

  console.log('Healthcare product added with translations:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });