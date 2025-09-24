const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Herbal Toothpaste',
      description: 'Natural toothpaste with coral calcium for complete dental care',
      price: 150,
      image: 'https://i.ibb.co/wZ84h63X/Whats-App-Image-2025-09-15-at-8-15-03-PM.jpg',
      category: 'personal care',
      stock: 125,
      packSize: '125 GM',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'हर्बल टूथपेस्ट',
      description: 'सामग्री:\nकोरल कैल्शियम, आर्जिनिन, सफेद हल्दी, ब्रोमेलिन, ईरिमदादी तेल।\n\nलाभ:\nदांतों से जुड़ी समस्याओं जैसे प्लाक, दांतों का मैल, दांतों की सड़न आदि से लड़ने में मदद करता है।\nपायरिया, मसूड़ों की सूजन, खून बहना, और दर्द को कम करने में मददगार।\nनैचरल कैल्शियम दांत के बाहरी हिस्से की सुरक्षा करता है।\nप्लांट एंजाइम के ब्लीचिंग प्रभाव से दांत सफेद और स्वस्थ बने रहते हैं।\nदांतों की झनझनाहट को रोकता है।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Herbal Toothpaste',
      description: 'Ingredients:\nCoral Calcium, Arginine, White Turmeric, Bromelain, Erimadadi Oil.\n\nBenefits:\nHelps combat dental issues like plaque, stains, and tooth decay.\nSupports in reducing pyorrhea, gum swelling, bleeding, and pain.\nNatural calcium protects the enamel of teeth.\nPlant enzyme bleaching effect maintains white teeth.\nPrevents tooth sensitivity.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'हर्बल टूथपेस्ट',
      description: 'साहित्य:\nकोरल कॅल्शियम, आर्जिनिन, पांढरी हळद, ब्रोमेलिन, ईरिमदादी तेल।\n\nफायदे:\nदातांशी संबंधित समस्या जसे की प्लॅक, दातांची माळ, दात सडणे यांच्याशी लढण्यात मदत करते.\nपायरिया, मसूड्यांची सूज, रक्तस्त्राव आणि वेदना कमी करण्यात मदत करते.\nनैचरल कॅल्शियम दातांच्या बाह्य संरचनेचे रक्षण करतो.\nप्लांट एंजाइमच्या ब्लीचिंग प्रभावामुळे दात पांढरे आणि निरोगी राहतात.\nदातांचे संवेदनशीलपण कमी करते.'
    }
  });

  console.log('Herbal toothpaste product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });