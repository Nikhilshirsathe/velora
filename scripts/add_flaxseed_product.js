const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Flaxseed Oil Softgels',
      description: 'Omega-3 rich flaxseed oil for heart and hormonal health',
      price: 360,
      image: 'https://i.ibb.co/wZDxqXRw/Whats-App-Image-2025-09-14-at-6-35-56-PM.jpg',
      category: 'healthcare',
      stock: 60,
      packSize: '60 Softgel',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'अलसी तेल सॉफ्टजेल',
      description: 'सामग्री:\nअलसी का तेल\n\nलाभ:\nओमेगा-3 (ALA) हृदय की सुरक्षा करता है और सूजन से रक्त वाहिकाओं को होने वाले नुकसान को कम करता है।\nपॉलिफेनोल्स और लिग्नान्स शक्तिशाली एंटीऑक्सिडेंट के रूप में काम करते हैं और ऑक्सीडेटिव हानि को कम करते हैं।\nलिग्नन्स रजोनिवृत्ति के बाद महिलाओं में हार्मोनल संतुलन में मदद करते हैं।\nखराब कोलेस्ट्रॉल को कम करने और वजन घटाने में मदद करता है।\nउच्च रक्तचाप कम करने में सहायक।\nपाचन सुधारता है और पोषक तत्वों के अवशोषण को बढ़ाता है।\nरजोनिवृत्ति के बाद महिलाओं के लिए फायदेमंद; ऑस्टियोपोरोसिस के जोखिम और लक्षण कम करता है।\nमासिक धर्म वाली महिलाओं में चक्र को नियमित रखता है।\nस्वस्थ बालों, त्वचा और नाखूनों के लिए उपयोगी।\n\nसेवन विधि:\n1 सॉफ्टजेल दिन में 2–3 बार'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Flaxseed Oil Softgels',
      description: 'Ingredients:\nFlaxseed Oil\n\nBenefits:\nOmega-3 (ALA) protects the heart and reduces vascular damage caused by inflammation.\nPolyphenols and lignans act as powerful antioxidants and reduce oxidative damage.\nLignans help support hormonal balance in postmenopausal women.\nHelps lower bad cholesterol and aids in weight management.\nSupports reduction of high blood pressure.\nImproves digestion and nutrient absorption.\nBeneficial for postmenopausal women; reduces osteoporosis risk and symptoms.\nHelps regulate menstrual cycles in women.\nSupports healthy hair, skin, and nails.\n\nUsage:\n1 Softgel, 2–3 times daily'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'अलसी तेल सॉफ्टजेल',
      description: 'साहित्य:\nअलसी तेल\n\nफायदे:\nओमेगा-3 (ALA) हृदयाचे रक्षण करते आणि सूजेमुळे रक्तवाहिन्यांना होणारे नुकसान कमी करते.\nपॉलीफेनोल्स आणि लिग्नान्स शक्तिशाली अँटीऑक्सिडंट म्हणून काम करतात आणि ऑक्सीडेटिव्ह हानी कमी करतात.\nलिग्नन्स रजोनिवृत्तीनंतर महिलांमध्ये हार्मोनल संतुलनासाठी उपयुक्त आहेत.\nखराब कोलेस्ट्रॉल कमी करतो आणि वजन कमी करण्यात मदत करतो.\nउच्च रक्तदाब कमी करण्यात सहायक.\nपचन सुधारतो आणि पोषक तत्वांचे शोषण वाढवतो.\nरजोनिवृत्तीनंतरच्या महिलांसाठी लाभदायक; ऑस्टियोपोरोसिसचा धोका आणि लक्षणे कमी करतो.\nमासिक पाळी नियमित ठेवण्यास मदत करतो.\nनिरोगी केस, त्वचा आणि नखांसाठी उपयुक्त.\n\nसेवन पद्धत:\n1 सॉफ्टजेल, दिवसात 2–3 वेळा'
    }
  });

  console.log('Flaxseed oil softgels product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });