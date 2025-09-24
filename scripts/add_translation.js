const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Find the healthcare product
  const product = await prisma.product.findFirst({
    where: { category: 'healthcare' }
  });

  if (!product) {
    console.log('No healthcare product found');
    return;
  }

  // Add Hindi translation
  await prisma.productTranslation.upsert({
    where: {
      productId_locale: {
        productId: product.id,
        locale: 'hi'
      }
    },
    update: {
      name: 'जोड़ों की देखभाल की गोलियां',
      description: 'गुग्गुल । शल्लकी । रास्ना । चोपचिनी । हड़जोड़ । अश्वगंधा । पिप्पली। जिंक\n\nलाभ:\nहड्डिया, मांसपेशिया, कार्टिलेज, लिगामेन्टस एवं संधियों को मजबुती प्रदान करने मे मदद करता है।\nसंधिवात, आमवात, वातरक्त जैसे बिमारीयों मे दर्द, सूजन कम करने मे मदद करता है।\nसंधियों एवं हड्डियों कि क्षीण होने वाली अवस्था को कम करने का काम करता है।\n\nसेवनविधी: 1 Tablet रोजाना खाने से पहले 2 से 3 बार।'
    },
    create: {
      productId: product.id,
      locale: 'hi',
      name: 'जोड़ों की देखभाल की गोलियां',
      description: 'गुग्गुल । शल्लकी । रास्ना । चोपचिनी । हड़जोड़ । अश्वगंधा । पिप्पली। जिंक\n\nलाभ:\nहड्डिया, मांसपेशिया, कार्टिलेज, लिगामेन्टस एवं संधियों को मजबुती प्रदान करने मे मदद करता है।\nसंधिवात, आमवात, वातरक्त जैसे बिमारीयों मे दर्द, सूजन कम करने मे मदद करता है।\nसंधियों एवं हड्डियों कि क्षीण होने वाली अवस्था को कम करने का काम करता है।\n\nसेवनविधी: 1 Tablet रोजाना खाने से पहले 2 से 3 बार।'
    }
  });

  console.log('Hindi translation added for product:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });