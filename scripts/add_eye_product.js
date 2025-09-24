const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Eye Care Tablets',
      description: 'Eye health and vision support tablets',
      price: 500,
      image: 'https://i.ibb.co/S7PjTyww/Whats-App-Image-2025-09-14-at-6-55-48-PM.jpg',
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
      name: 'आई केयर टैबलेट्स',
      description: 'सामग्री:\nसंप्तामृत लोहा, सुवर्ण वसंत, चंद्रोक्या वटी, त्रिफला, गाजर, झेंडू, शिग्रु, धनयक\n\nलाभ:\nआँखों का स्वास्थ्य बनाए रखने में मदद करता है।\nनेत्र थकान से राहत देता है और आँखों की सूखापन में उपयोगी।\nसामान्य दृष्टि बनाए रखने में सहायक, क्योंकि इसमें प्राकृतिक विटामिन्स के स्रोत हैं।\nमोबाइल, टीवी और कंप्यूटर के अत्यधिक उपयोग से उत्पन्न आँखों के तनाव को कम करता है और प्रकाश-प्रेरित क्षति से बचाव करता है।\n\nसेवन विधि:\n1 टैबलेट रोजाना खाने से पहले, दिन में 2 से 3 बार।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Eye Care Tablets',
      description: 'Ingredients:\nSamptamrit Loha, Suvarna Vasant, Chandrokya Vati, Triphala, Carrot, Marigold, Shigru (Moringa), Coriander\n\nBenefits:\nSupports eye health and vision.\nRelieves eye strain and dryness.\nHelps maintain normal eyesight with natural vitamin sources.\nProtects against eye stress and light-induced damage from excessive mobile, TV, and computer use.\n\nDosage:\n1 tablet before meals, 2 to 3 times daily.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'आय केअर गोळ्या',
      description: 'साहित्य:\nसंप्तामृत लोह, सुवर्ण वसंत, चंद्रोक्या वटी, त्रिफळा, गाजर, झेंडू, शिग्रु, कोथिंबीर\n\nफायदे:\nडोळ्यांचे आरोग्य टिकवून ठेवण्यास मदत करते.\nडोळ्यांचा थकवा व कोरडेपणा कमी करण्यास उपयुक्त.\nसामान्य दृष्टी राखण्यास सहाय्यक, कारण यात नैसर्गिक जीवनसत्त्वांचे स्रोत आहेत.\nमोबाईल, टीव्ही व संगणकाच्या अतिवापरामुळे होणारा डोळ्यांचा ताण कमी करते व प्रकाशामुळे होणाऱ्या हानीपासून संरक्षण करते.\n\nसेवन पद्धत:\n१ गोळी जेवणाआधी, दिवसातून २ ते ३ वेळा.'
    }
  });

  console.log('Eye care product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });