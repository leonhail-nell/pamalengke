// Mock data used while the backend at app.pamalengke.ph is offline.
// Shapes mirror what the old Vuex actions produced after mapping the API.

export interface Product {
  id: number
  vendor_id: number
  name: string
  desc: string
  discount: number
  price: number
  not_discouted_price: number
  image_md: string
  image_sm: string
  image_lg: string
  stocks: number
  sub_category?: string
  sub_category_id?: number
  category?: string
  category_slug?: string
  slug: string
}

// Keyword-matched stock photo (LoremFlickr). `lock` keeps the same image
// for a product across reloads, so e.g. a mango always shows a mango.
const pic = (keyword: string, lock: number, size = 400) =>
  `https://loremflickr.com/${size}/${size}/${keyword}?lock=${lock}`

export const mockMenus = [
  {
    id: 1,
    name: 'Fresh Market',
    slug: 'fresh-market',
    product_categories: [
      {
        id: 11, name: 'Vegetables', slug: 'vegetables',
        product_sub_categories: [
          { id: 111, name: 'Leafy Greens', slug: 'leafy-greens' },
          { id: 112, name: 'Root Crops', slug: 'root-crops' }
        ]
      },
      {
        id: 12, name: 'Fruits', slug: 'fruits',
        product_sub_categories: [
          { id: 121, name: 'Tropical', slug: 'tropical' },
          { id: 122, name: 'Citrus', slug: 'citrus' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Meat & Seafood',
    slug: 'meat-seafood',
    product_categories: [
      {
        id: 21, name: 'Meat', slug: 'meat',
        product_sub_categories: [
          { id: 211, name: 'Pork', slug: 'pork' },
          { id: 212, name: 'Chicken', slug: 'chicken' }
        ]
      },
      {
        id: 22, name: 'Seafood', slug: 'seafood',
        product_sub_categories: [
          { id: 221, name: 'Fish', slug: 'fish' },
          { id: 222, name: 'Shellfish', slug: 'shellfish' }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Pantry',
    slug: 'pantry',
    product_categories: [
      {
        id: 31, name: 'Rice & Grains', slug: 'rice-grains',
        product_sub_categories: [{ id: 311, name: 'Rice', slug: 'rice' }]
      },
      {
        id: 32, name: 'Basics', slug: 'basics',
        product_sub_categories: [{ id: 321, name: 'Eggs & Dairy', slug: 'eggs-dairy' }]
      }
    ]
  }
]

// Curated catalog: Filipino market name + matching photo keyword + realistic ₱ price.
interface Seed { name: string; kw: string; price: number; discount?: number; stocks?: number; cat: string; sub: string }

const catalog: Seed[] = [
  // Vegetables
  { name: 'Pechay Tagalog', kw: 'bok-choy', price: 45, cat: 'vegetables', sub: 'Leafy Greens' },
  { name: 'Kamatis (Tomato)', kw: 'tomato', price: 60, discount: 10, cat: 'vegetables', sub: 'Vegetables' },
  { name: 'Talong (Eggplant)', kw: 'eggplant', price: 55, cat: 'vegetables', sub: 'Vegetables' },
  { name: 'Sibuyas (Red Onion)', kw: 'onion', price: 120, discount: 15, cat: 'vegetables', sub: 'Root Crops' },
  { name: 'Bawang (Garlic)', kw: 'garlic', price: 140, cat: 'vegetables', sub: 'Root Crops' },
  { name: 'Karot (Carrot)', kw: 'carrot', price: 80, cat: 'vegetables', sub: 'Root Crops' },
  { name: 'Pipino (Cucumber)', kw: 'cucumber', price: 50, cat: 'vegetables', sub: 'Vegetables' },
  { name: 'Repolyo (Cabbage)', kw: 'cabbage', price: 65, discount: 20, cat: 'vegetables', sub: 'Leafy Greens' },
  { name: 'Kalabasa (Squash)', kw: 'squash,pumpkin', price: 40, cat: 'vegetables', sub: 'Vegetables' },
  { name: 'Patatas (Potato)', kw: 'potato', price: 90, cat: 'vegetables', sub: 'Root Crops' },
  { name: 'Ampalaya (Bitter Gourd)', kw: 'bitter-gourd', price: 70, cat: 'vegetables', sub: 'Vegetables' },
  { name: 'Okra', kw: 'okra', price: 35, cat: 'vegetables', sub: 'Vegetables' },
  // Fruits
  { name: 'Mangga Carabao (Mango)', kw: 'mango', price: 150, discount: 10, cat: 'fruits', sub: 'Tropical' },
  { name: 'Saging Lakatan (Banana)', kw: 'banana', price: 70, cat: 'fruits', sub: 'Tropical' },
  { name: 'Papaya', kw: 'papaya', price: 55, cat: 'fruits', sub: 'Tropical' },
  { name: 'Pinya (Pineapple)', kw: 'pineapple', price: 80, discount: 15, cat: 'fruits', sub: 'Tropical' },
  { name: 'Bayabas (Guava)', kw: 'guava', price: 60, cat: 'fruits', sub: 'Tropical' },
  { name: 'Pakwan (Watermelon)', kw: 'watermelon', price: 95, cat: 'fruits', sub: 'Tropical' },
  { name: 'Ponkan (Orange)', kw: 'orange,citrus', price: 110, cat: 'fruits', sub: 'Citrus' },
  { name: 'Kalamansi', kw: 'calamansi,lime', price: 50, discount: 10, cat: 'fruits', sub: 'Citrus' },
  // Meat
  { name: 'Liempo (Pork Belly)', kw: 'pork-belly', price: 320, discount: 10, cat: 'meat', sub: 'Pork' },
  { name: 'Baboy Giniling (Ground Pork)', kw: 'ground-pork,minced-meat', price: 280, cat: 'meat', sub: 'Pork' },
  { name: 'Pork Spareribs', kw: 'pork-ribs', price: 300, cat: 'meat', sub: 'Pork' },
  { name: 'Manok (Whole Chicken)', kw: 'chicken,poultry', price: 200, discount: 15, cat: 'meat', sub: 'Chicken' },
  { name: 'Chicken Wings', kw: 'chicken-wings', price: 180, cat: 'meat', sub: 'Chicken' },
  // Seafood
  { name: 'Bangus (Milkfish)', kw: 'fish,milkfish', price: 220, discount: 10, cat: 'seafood', sub: 'Fish' },
  { name: 'Tilapia', kw: 'tilapia,fish', price: 140, cat: 'seafood', sub: 'Fish' },
  { name: 'Galunggong', kw: 'mackerel,fish', price: 160, cat: 'seafood', sub: 'Fish' },
  { name: 'Hipon (Shrimp)', kw: 'shrimp,prawn', price: 380, discount: 20, cat: 'seafood', sub: 'Shellfish' },
  { name: 'Pusit (Squid)', kw: 'squid', price: 290, cat: 'seafood', sub: 'Shellfish' },
  { name: 'Tahong (Mussels)', kw: 'mussels', price: 120, cat: 'seafood', sub: 'Shellfish' },
  // Rice & Grains
  { name: 'Bigas Sinandomeng (Rice 5kg)', kw: 'rice,grain', price: 320, cat: 'rice-grains', sub: 'Rice' },
  { name: 'Bigas Dinorado (Rice 5kg)', kw: 'rice-bag', price: 350, discount: 10, cat: 'rice-grains', sub: 'Rice' },
  { name: 'Malagkit (Glutinous Rice 1kg)', kw: 'glutinous-rice', price: 85, cat: 'rice-grains', sub: 'Rice' },
  // Basics
  { name: 'Itlog (Eggs, tray)', kw: 'eggs', price: 230, discount: 5, cat: 'basics', sub: 'Eggs & Dairy' },
  { name: 'Gatas (Fresh Milk 1L)', kw: 'milk', price: 95, cat: 'basics', sub: 'Eggs & Dairy' }
]

export const mockProducts: Product[] = catalog.map((s, i) => {
  const discount = s.discount ?? 0
  const stocks = s.stocks ?? (i % 9 === 0 ? 0 : 20 + ((i * 7) % 60))
  return {
    id: i + 1,
    vendor_id: (i % 4) + 1,
    name: s.name,
    desc: `Fresh ${s.name.replace(/\s*\(.*\)/, '')} sourced daily from local Panabo farmers and vendors.`,
    discount,
    price: discount > 0 ? Math.round(s.price - (discount / 100) * s.price) : s.price,
    not_discouted_price: s.price,
    image_md: pic(s.kw, i + 1, 400),
    image_sm: pic(s.kw, i + 1, 200),
    image_lg: pic(s.kw, i + 1, 800),
    stocks,
    sub_category: s.sub,
    sub_category_id: 100 + i,
    category: s.cat.replace('-', ' '),
    category_slug: s.cat,
    slug: s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }
})

export const mockPromos: Product[] = mockProducts
  .filter((p) => p.discount > 0)
  .map((p) => ({ ...p, desc: 'HOT PROMO — ' + p.desc }))

export interface Order {
  id: number
  reference: string
  date: string
  status: 'Pending' | 'Processing' | 'Delivered' | 'Cancelled'
  vendor: string
  items: { name: string; quantity: number; price: number; image: string }[]
  delivery_charge: number
}

export const mockOrders: Order[] = [
  {
    id: 1001, reference: 'PMK-1001', date: '2026-06-15', status: 'Delivered', vendor: 'Panabo Fresh Co.', delivery_charge: 65,
    items: [
      { name: 'Pechay Tagalog', quantity: 2, price: 45, image: pic('bok-choy', 1, 200) },
      { name: 'Kamatis (Tomato)', quantity: 3, price: 54, image: pic('tomato', 2, 200) }
    ]
  },
  {
    id: 1002, reference: 'PMK-1002', date: '2026-06-17', status: 'Processing', vendor: 'Bay Seafoods', delivery_charge: 65,
    items: [
      { name: 'Bangus (Milkfish)', quantity: 1, price: 198, image: pic('fish,milkfish', 26, 200) },
      { name: 'Hipon (Shrimp)', quantity: 2, price: 304, image: pic('shrimp,prawn', 29, 200) }
    ]
  },
  {
    id: 1003, reference: 'PMK-1003', date: '2026-06-18', status: 'Pending', vendor: 'Mindanao Meats', delivery_charge: 65,
    items: [{ name: 'Liempo (Pork Belly)', quantity: 2, price: 288, image: pic('pork-belly', 21, 200) }]
  }
]

export const mockVendors = [
  { id: 1, company_name: 'Panabo Fresh Co.', slug: 'panabo-fresh', avatar: pic('vegetable-market', 101), address: 'Panabo City', building_photo: pic('grocery-store', 201, 800) },
  { id: 2, company_name: 'Davao Harvest', slug: 'davao-harvest', avatar: pic('fruit-market', 102), address: 'Panabo City', building_photo: pic('farmers-market', 202, 800) },
  { id: 3, company_name: 'Bay Seafoods', slug: 'bay-seafoods', avatar: pic('fish-market', 103), address: 'Panabo City', building_photo: pic('seafood-market', 203, 800) },
  { id: 4, company_name: 'Mindanao Meats', slug: 'mindanao-meats', avatar: pic('butcher', 104), address: 'Panabo City', building_photo: pic('butcher-shop', 204, 800) }
]
