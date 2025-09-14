import { useRouter } from 'next/router'

type Locale = 'en' | 'hi' | 'mr'

type Dict = Record<string, Record<Locale, string>>

const dict: Dict = {
  allProducts: {
    en: 'All Products',
    hi: 'सभी उत्पाद',
    mr: 'सर्व उत्पाद',
  },
  addToCart: {
    en: 'Add to Cart',
    hi: 'कार्ट में जोड़ें',
    mr: 'कार्टमध्ये जोडा',
  },
  outOfStock: {
    en: 'Out of Stock',
    hi: 'स्टॉक खत्म',
    mr: 'स्टॉक संपला',
  },
  noProducts: {
    en: 'No products found.',
    hi: 'कोई उत्पाद नहीं मिला।',
    mr: 'उत्पाद आढळले नाहीत.',
  },
  qty: {
    en: 'Qty',
    hi: 'मात्रा',
    mr: 'प्रमाण',
  },
  price: {
    en: 'Price',
    hi: 'कीमत',
    mr: 'किंमत',
  },
}

export function useT() {
  const { locale } = useRouter()
  const l = (locale as Locale) || 'en'
  return (key: keyof typeof dict) => dict[key][l]
}
