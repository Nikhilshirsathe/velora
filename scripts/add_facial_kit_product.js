const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Facial Kit',
      description: 'Complete 6-step facial kit with Dead Sea minerals and natural extracts',
      price: 1200,
      image: 'https://i.ibb.co/xtSYYSrb/Whats-App-Image-2025-09-15-at-1-58-23-PM-1.jpg',
      category: 'personal care',
      stock: 260,
      packSize: '260 G',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'फेशियल किट',
      description: 'सामग्री:\nडेड सी मिनरल्स, सनफ्लावर तेल, कोकोआ बटर, प्रूनस आर्मेनियाका तेल, अखरोट के छिलके का पाउडर, शिया बटर, सी बक्थार्न एक्सट्रेक्ट, पपाया एक्सट्रेक्ट, टमाटर एक्सट्रेक्ट, एलोवेरा एक्सट्रेक्ट, कुकंबर एक्सट्रेक्ट।\n\nलाभ:\nफेशियल क्लिनजर: त्वचा से सभी अशुद्धियों को साफ करता है और नमी बनाए रखता है।\nफेशियल स्क्रब: गंदगी, मृत त्वचा, ब्लैकहेड्स और व्हाइटहेड्स को निकालकर त्वचा को स्वस्थ और उज्ज्वल बनाता है।\nफेशियल क्रीम: विटामिन्स और मिनरल्स से भरपूर, त्वचा को तरोताजा और चमकदार बनाता है; रक्त परिसंचरण को उत्तेजित करता है, रोम को कसता है।\nफेशियल जेल: त्वचा की कोशिकाओं को पुनर्जीवित करता है, चमकदार और गोरी त्वचा के लिए।\nफेशियल पैक: ब्राइटनिंग और व्हाइटनिंग पैक, त्वचा की बनावट में सुधार करता है और चमक बढ़ाता है।\nफेशियल सीरम: कोलेजन बढ़ाने में मदद करता है, त्वचा को कसता है और टोन सुधारता है।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Facial Kit',
      description: 'Ingredients:\nDead Sea Minerals, Sunflower Oil, Cocoa Butter, Prunus Armeniaca Oil, Walnut Shell Powder, Shea Butter, Sea Buckthorn Extract, Papaya Extract, Tomato Extract, Aloe Vera Extract, Cucumber Extract.\n\nBenefits:\nFacial Cleanser: Cleanses impurities and maintains skin moisture.\nFacial Scrub: Removes dirt, dead skin, blackheads, and whiteheads for healthy, glowing skin.\nFacial Cream: Rich in vitamins and minerals; refreshes and brightens skin, stimulates blood circulation, firms pores.\nFacial Gel: Revitalizes skin cells, making skin radiant and fair.\nFacial Pack: Brightening and whitening pack; improves texture and glow.\nFacial Serum: Boosts collagen, firms skin, and improves skin tone.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'फेशियल किट',
      description: 'साहित्य:\nडेड सी मिनरल्स, सूर्यफुल तेल, कोकोआ बटर, प्रूनस आर्मेनियाका तेल, अक्रोडाच्या सोल पावडर, शिया बटर, सी बकथॉर्न एक्सट्रॅक्ट, पपाया एक्सट्रॅक्ट, टोमॅटो एक्सट्रॅक्ट, अॅलोव्हेरा एक्सट्रॅक्ट, काकडी एक्सट्रॅक्ट।\n\nफायदे:\nफेशियल क्लिनझर: त्वचेवरील सर्व अशुद्धी साफ करतो आणि त्वचेची आर्द्रता राखतो.\nफेशियल स्क्रब: घाण, मृत त्वचा, ब्लॅकहेड्स आणि व्हाइटहेड्स काढून त्वचा स्वस्थ आणि उजळ बनवतो.\nफेशियल क्रीम: व्हिटॅमिन्स आणि मिनरल्सने समृद्ध; त्वचा ताजेतवाने आणि चमकदार बनवतो; रक्तसंचार उत्तेजित करतो, रोम कोंड घट्ट करतो.\nफेशियल जेल: त्वचेच्या पेशींना पुनर्जीवित करतो, त्वचा उजळसर आणि गोरी बनवतो.\nफेशियल पॅक: ब्राइटनिंग आणि व्हाइटनिंग पॅक, त्वचेची बनावट सुधारतो आणि चमक वाढवतो.\nफेशियल सीरम: कोलेजन वाढविण्यात मदत करतो, त्वचा घट्ट करतो आणि त्वचेचा टोन सुधारतो.'
    }
  });

  console.log('Facial kit product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });