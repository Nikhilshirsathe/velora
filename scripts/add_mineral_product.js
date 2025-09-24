const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Mineral Drops',
      description: 'Concentrated mineral drops with 40+ trace minerals',
      price: 1650,
      image: 'https://i.ibb.co/20ZfWx3F/Whats-App-Image-2025-09-14-at-6-36-00-PM.jpg',
      category: 'healthcare',
      stock: 60,
      packSize: '60 ml',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'मिनरल ड्रॉप्स',
      description: 'सामग्री:\nकंसन्ट्रेटेड मिनरल ड्रॉप्स – ग्रेट सॉल्ट लेक, यूटा (यूएसए)\n\nलाभ:\nइसमें मैग्नीशियम, कैल्शियम, पोटेशियम, क्लोराइड, सल्फर जैसे सूक्ष्म खनिज और 40+ माइक्रो मिनरल्स (क्रोमियम, आयोडीन, मैंगनीज, सेलेनियम, जिंक आदि) शामिल हैं।\nशरीर के संपूर्ण पोषण और खनिज संतुलन के लिए उपयुक्त।\nप्रतिरोधक क्षमता बढ़ाने, रक्त कोशिकाओं के निर्माण और चयापचय सुधारने में सहायक।\nयह प्राकृतिक और आयनयुक्त खनिजों से निर्मित है।\n\nसेवन विधि:\n1 लीटर पीने के पानी में 20–40 बूंदें मिलाएँ।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Mineral Drops',
      description: 'Ingredients:\nConcentrated Mineral Drops – Great Salt Lake, Utah (USA)\n\nBenefits:\nRich in Magnesium, Calcium, Potassium, Chloride, Sulfur, and over 40 trace minerals (Chromium, Iodine, Manganese, Selenium, Zinc, etc.).\nProvides complete mineral support and nutrition.\nHelps boost immunity, supports new blood cell formation, and improves metabolism.\nMade from natural, ionized minerals.\n\nDosage:\nAdd 20–40 drops to 1 liter of drinking water.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'मिनरल ड्रॉप्स',
      description: 'साहित्य:\nकन्सन्ट्रेटेड मिनरल ड्रॉप्स – ग्रेट सॉल्ट लेक, यूटा (यूएसए)\n\nफायदे:\nमॅग्नेशियम, कॅल्शियम, पोटॅशियम, क्लोराईड, सल्फर यांसारखे सूक्ष्म खनिज तसेच ४०+ मायक्रो मिनरल्स (क्रोमियम, आयोडीन, मॅंगनीज, सेलेनियम, झिंक इ.) यांचा समावेश.\nशरीराच्या संपूर्ण पोषणासाठी व खनिज संतुलन राखण्यासाठी उपयुक्त.\nरोगप्रतिकारशक्ती वाढविणे, नवीन रक्तपेशी निर्माण करणे व चयापचय सुधारण्यास मदत.\nहे नैसर्गिक व आयनयुक्त खनिजांपासून तयार केलेले आहे.\n\nसेवन पद्धत:\n१ लिटर पिण्याच्या पाण्यात २०–४० थेंब घालावे.'
    }
  });

  console.log('Mineral drops product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });