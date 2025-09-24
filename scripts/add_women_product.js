const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Women Care Tablets',
      description: 'Hormonal balance and reproductive health tablets for women',
      price: 500,
      image: 'https://i.ibb.co/NnbqGqgd/Whats-App-Image-2025-09-14-at-6-56-28-PM.jpg',
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
      name: 'वुमेन केयर टैबलेट्स',
      description: 'सामग्री:\nप्रदररिपु रस, प्रताप लंकेश्वर रस, पुष्पधन्वा रस, कांचनार गुग्गुल, मेदापाचक वटी, शिवलिंगी, पुत्रजीवक, कपास बीज, वंशलोचन, अशोक, शतावरी, यशद भस्म\n\nलाभ:\nHPO Axis को नियंत्रित करके एस्ट्रोजन और प्रोजेस्टेरोन जैसे हार्मोन संतुलन में सहायक।\nPCOS और गर्भाशय फाइब्रॉएड में उपयोगी।\nमासिक धर्म की समस्याओं जैसे अमेनोरिया, मेट्रोरहाजिया, ल्यूकोरिया में मदद करता है।\nरजोनिवृत्ति (PMS) के लक्षण जैसे हॉट फ्लैश, जलन आदि को नियंत्रित करता है।\nप्राथमिक और द्वितीयक बांझपन में सहायक।\nतनाव कम करके ऊर्जा और जीवनशक्ति को बढ़ाता है।\n\nसेवन विधि:\n1 टैबलेट रोजाना खाने से पहले, दिन में 2 से 3 बार।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Women Care Tablets',
      description: 'Ingredients:\nPradar Ripu Ras, Pratap Lankeshwar Ras, Pushpadhanva Ras, Kanchanar Guggul, Medapachak Vati, Shivalingi, Putrajeevak, Cotton Seeds, Vanshlochan, Ashoka, Shatavari, Yashad Bhasma\n\nBenefits:\nHelps regulate hormonal balance (estrogen & progesterone) by supporting HPO Axis.\nUseful in PCOS and uterine fibroids.\nSupports menstrual health: effective in amenorrhea, metrorrhagia, leucorrhea.\nManages post-menopausal (PMS) symptoms such as hot flashes and burning sensation.\nBeneficial in primary and secondary infertility.\nReduces stress and enhances energy levels.\n\nDosage:\n1 tablet before meals, 2 to 3 times daily.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'वुमेन केअर गोळ्या',
      description: 'साहित्य:\nप्रदररिपु रस, प्रताप लंकेश्वर रस, पुष्पधन्वा रस, कांचनार गुग्गुळ, मेदापाचक वटी, शिवलिंगी, पुत्रजीवक, कपाशी बी, वंशलोचन, अशोक, शतावरी, यशद भस्म\n\nफायदे:\nHPO अक्ष संतुलित करून इस्ट्रोजेन व प्रोजेस्टेरोन हार्मोन्सचे नियमन करण्यात मदत करते.\nPCOS व गर्भाशयातील फाइब्रॉईडमध्ये उपयुक्त.\nमासिक पाळीतील अडचणींमध्ये (अमेनोरिया, मेट्रोरॅजिया, ल्यूकोरिया) उपयोगी.\nरजोनिवृत्तीनंतरचे लक्षणे (PMS) जसे हॉट फ्लॅश, जळजळ कमी करण्यात मदत करते.\nप्राथमिक व दुय्यम वंध्यत्वात सहाय्यकारी.\nतणाव कमी करून ऊर्जा पातळी वाढवते.\n\nसेवन पद्धत:\n१ गोळी जेवणाआधी, दिवसातून २ ते ३ वेळा.'
    }
  });

  console.log('Women care product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });