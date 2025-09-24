const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: 'Sunscreen Cream',
      description: 'Natural sunscreen with UV protection and skin brightening',
      price: 250,
      image: 'https://i.ibb.co/7t9SHwzv/Whats-App-Image-2025-09-15-at-1-58-30-PM.jpg',
      category: 'personal care',
      stock: 60,
      packSize: '60 GM',
    },
  });

  // Add Hindi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'hi',
      name: 'सनस्क्रीन क्रीम',
      description: 'सामग्री:\nसफेद हल्दी, समुद्री खनिज, कैलेंडुला।\n\nलाभ:\nत्वचा पर एक सुरक्षात्मक स्तर बनाकर सूर्य की हानिकारक किरणों से बचाता है।\nमेलेनिन उत्पादन को रोककर त्वचा में निखार लाता है।\nUV-A और UV-B किरणों से सुरक्षा प्रदान करता है।\nत्वचा में नमी बनाए रखता है, एंटीऑक्सिडेंट और एंटी-इंफ्लामेटोरी गुणों से भरपूर।\nरैशेज़ और जलन में मदद करता है।\nसूरज की किरणों से होने वाले धब्बों और पिगमेंटेशन को कम करने में सहायक।'
    }
  });

  // Add English translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'en',
      name: 'Sunscreen Cream',
      description: 'Ingredients:\nWhite Turmeric, Sea Minerals, Calendula.\n\nBenefits:\nForms a protective layer on the skin to prevent damage from harmful sun rays.\nInhibits melanin production, bringing radiance to the skin.\nProtects against UV-A and UV-B rays.\nMaintains skin moisture; rich in antioxidants and anti-inflammatory properties.\nHelps with rashes and skin irritation.\nReduces sun-induced dark spots and pigmentation.'
    }
  });

  // Add Marathi translation
  await prisma.productTranslation.create({
    data: {
      productId: product.id,
      locale: 'mr',
      name: 'सनस्क्रीन क्रीम',
      description: 'साहित्य:\nपांढरी हळद, समुद्री खनिज, केलेंडुला।\n\nफायदे:\nत्वचेवर सुरक्षात्मक थर तयार करून सूर्याच्या हानिकारक किरणांपासून संरक्षण करते.\nमेलेनिन उत्पादन कमी करून त्वचेला उजळसरपणा देते.\nUV-A आणि UV-B किरणांपासून संरक्षण करते.\nत्वचेची आर्द्रता राखते; अँटीऑक्सिडंट्स आणि अँटी-इंफ्लॅमेटरी गुणधर्मांनी समृद्ध.\nरॅशेस आणि जळजळीसाठी उपयुक्त.\nसूर्यप्रकाशामुळे होणारे डार्क स्पॉट आणि पिग्मेंटेशन कमी करण्यात मदत करते.'
    }
  });

  console.log('Sunscreen cream product added:', product.id);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });