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
  image_local?: string // optional override: public/products/<slug>.jpg (see README)
  stocks: number
  sub_category?: string
  sub_category_id?: number
  category?: string
  category_slug?: string
  slug: string
}

// Two image sources, chosen per product for accuracy:
// 1) TheMealDB ingredient photos — clean, white-background, exact match.
// 2) LoremFlickr single-keyword — for tropical produce/fish MealDB lacks.
const meal = (name: string, suffix = '') =>
  `https://www.themealdb.com/images/ingredients/${encodeURIComponent(name)}${suffix}.png`

const flickr = (keyword: string, lock: number, size = 400) =>
  `https://loremflickr.com/${size}/${size}/${keyword}?lock=${lock}`

// Resolve a seed's image spec ("meal:Tomatoes" or "flickr:mango") to 3 sizes.
function images(spec: string, lock: number) {
  const [src, key] = spec.split(':')
  if (src === 'meal') {
    return { sm: meal(key, '-Small'), md: meal(key, '-Medium'), lg: meal(key) }
  }
  return { sm: flickr(key, lock, 200), md: flickr(key, lock, 400), lg: flickr(key, lock, 800) }
}

// Back-compat helper for orders/vendors below.
const pic = (keyword: string, lock: number, size = 400) => flickr(keyword, lock, size)

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

// Curated catalog. `img` is "meal:<TheMealDB ingredient>" (exact, clean) or
// "flickr:<keyword>" for tropical produce/fish TheMealDB doesn't have.
interface Seed { name: string; img: string; price: number; discount?: number; stocks?: number; cat: string; sub: string }

const catalog: Seed[] = [
  // Vegetables
  { name: 'Pechay (Pak Choi)', img: 'flickr:pak-choi', price: 45, cat: 'vegetables', sub: 'Leafy Greens' },
  { name: 'Kamatis (Tomato)', img: 'meal:Tomatoes', price: 60, discount: 10, cat: 'vegetables', sub: 'Vegetables' },
  { name: 'Talong (Eggplant)', img: 'meal:Aubergine', price: 55, cat: 'vegetables', sub: 'Vegetables' },
  { name: 'Sibuyas (Onion)', img: 'meal:Onion', price: 120, discount: 15, cat: 'vegetables', sub: 'Root Crops' },
  { name: 'Bawang (Garlic)', img: 'meal:Garlic', price: 140, cat: 'vegetables', sub: 'Root Crops' },
  { name: 'Karot (Carrots)', img: 'meal:Carrots', price: 80, cat: 'vegetables', sub: 'Root Crops' },
  { name: 'Pipino (Cucumber)', img: 'meal:Cucumber', price: 50, cat: 'vegetables', sub: 'Vegetables' },
  { name: 'Repolyo (Cabbage)', img: 'meal:Cabbage', price: 65, discount: 20, cat: 'vegetables', sub: 'Leafy Greens' },
  { name: 'Kalabasa (Squash)', img: 'meal:Pumpkin', price: 40, cat: 'vegetables', sub: 'Vegetables' },
  { name: 'Patatas (Potato)', img: 'meal:Potatoes', price: 90, cat: 'vegetables', sub: 'Root Crops' },
  { name: 'Ampalaya (Bitter Gourd)', img: 'flickr:bitter-melon', price: 70, cat: 'vegetables', sub: 'Vegetables' },
  { name: 'Okra', img: 'flickr:okra', price: 35, cat: 'vegetables', sub: 'Vegetables' },
  // Fruits
  { name: 'Mangga Carabao (Mango)', img: 'flickr:mango', price: 150, discount: 10, cat: 'fruits', sub: 'Tropical' },
  { name: 'Saging Lakatan (Banana)', img: 'meal:Banana', price: 70, cat: 'fruits', sub: 'Tropical' },
  { name: 'Papaya', img: 'flickr:papaya', price: 55, cat: 'fruits', sub: 'Tropical' },
  { name: 'Pinya (Pineapple)', img: 'flickr:pineapple', price: 80, discount: 15, cat: 'fruits', sub: 'Tropical' },
  { name: 'Bayabas (Guava)', img: 'flickr:guava', price: 60, cat: 'fruits', sub: 'Tropical' },
  { name: 'Pakwan (Watermelon)', img: 'flickr:watermelon', price: 95, cat: 'fruits', sub: 'Tropical' },
  { name: 'Ponkan (Orange)', img: 'meal:Orange', price: 110, cat: 'fruits', sub: 'Citrus' },
  { name: 'Kalamansi (Lime)', img: 'meal:Lime', price: 50, discount: 10, cat: 'fruits', sub: 'Citrus' },
  // Meat
  { name: 'Liempo (Pork Belly)', img: 'meal:Pork', price: 320, discount: 10, cat: 'meat', sub: 'Pork' },
  { name: 'Baboy Giniling (Ground Pork)', img: 'meal:Minced Pork', price: 280, cat: 'meat', sub: 'Pork' },
  { name: 'Pork Spareribs', img: 'flickr:pork-ribs', price: 300, cat: 'meat', sub: 'Pork' },
  { name: 'Manok (Whole Chicken)', img: 'meal:Chicken', price: 200, discount: 15, cat: 'meat', sub: 'Chicken' },
  { name: 'Chicken Breast', img: 'meal:Chicken Breast', price: 180, cat: 'meat', sub: 'Chicken' },
  // Seafood
  { name: 'Bangus (Milkfish)', img: 'flickr:milkfish', price: 220, discount: 10, cat: 'seafood', sub: 'Fish' },
  { name: 'Tilapia', img: 'flickr:tilapia', price: 140, cat: 'seafood', sub: 'Fish' },
  { name: 'Galunggong', img: 'flickr:mackerel', price: 160, cat: 'seafood', sub: 'Fish' },
  { name: 'Hipon (Shrimp)', img: 'meal:Prawns', price: 380, discount: 20, cat: 'seafood', sub: 'Shellfish' },
  { name: 'Pusit (Squid)', img: 'meal:Squid', price: 290, cat: 'seafood', sub: 'Shellfish' },
  { name: 'Tahong (Mussels)', img: 'meal:Mussels', price: 120, cat: 'seafood', sub: 'Shellfish' },
  // Rice & Grains
  { name: 'Bigas Sinandomeng (Rice 5kg)', img: 'meal:Rice', price: 320, cat: 'rice-grains', sub: 'Rice' },
  { name: 'Bigas Dinorado (Rice 5kg)', img: 'meal:Rice', price: 350, discount: 10, cat: 'rice-grains', sub: 'Rice' },
  { name: 'Malagkit (Glutinous Rice 1kg)', img: 'flickr:glutinous-rice', price: 85, cat: 'rice-grains', sub: 'Rice' },
  // Basics
  { name: 'Itlog (Eggs, tray)', img: 'meal:Eggs', price: 230, discount: 5, cat: 'basics', sub: 'Eggs & Dairy' },
  { name: 'Gatas (Fresh Milk 1L)', img: 'meal:Milk', price: 95, cat: 'basics', sub: 'Eggs & Dairy' }
]

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const mockProducts: Product[] = catalog.map((s, i) => {
  const discount = s.discount ?? 0
  const stocks = s.stocks ?? (i % 9 === 0 ? 0 : 20 + ((i * 7) % 60))
  const img = images(s.img, i + 1)
  const slug = slugify(s.name)
  return {
    id: i + 1,
    vendor_id: (i % 4) + 1,
    name: s.name,
    desc: `Fresh ${s.name.replace(/\s*\(.*\)/, '')} sourced daily from local Panabo farmers and vendors.`,
    discount,
    price: discount > 0 ? Math.round(s.price - (discount / 100) * s.price) : s.price,
    not_discouted_price: s.price,
    image_md: img.md,
    image_sm: img.sm,
    image_lg: img.lg,
    // Local override: drop public/products/<slug>.jpg to control this photo.
    // Only enabled for the harder-to-match (flickr) items; falls back to remote
    // automatically when the file isn't present.
    image_local: s.img.startsWith('flickr:') ? `/products/${slug}.jpg` : undefined,
    stocks,
    sub_category: s.sub,
    sub_category_id: 100 + i,
    category: s.cat.replace('-', ' '),
    category_slug: s.cat,
    slug
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
      { name: 'Pechay (Pak Choi)', quantity: 2, price: 45, image: flickr('pak-choi', 1, 200) },
      { name: 'Kamatis (Tomato)', quantity: 3, price: 54, image: meal('Tomatoes', '-Small') }
    ]
  },
  {
    id: 1002, reference: 'PMK-1002', date: '2026-06-17', status: 'Processing', vendor: 'Bay Seafoods', delivery_charge: 65,
    items: [
      { name: 'Bangus (Milkfish)', quantity: 1, price: 198, image: flickr('milkfish', 26, 200) },
      { name: 'Hipon (Shrimp)', quantity: 2, price: 304, image: meal('Prawns', '-Small') }
    ]
  },
  {
    id: 1003, reference: 'PMK-1003', date: '2026-06-18', status: 'Pending', vendor: 'Mindanao Meats', delivery_charge: 65,
    items: [{ name: 'Liempo (Pork Belly)', quantity: 2, price: 288, image: meal('Pork', '-Small') }]
  }
]

export const mockVendors = [
  { id: 1, company_name: 'Panabo Fresh Co.', slug: 'panabo-fresh', avatar: pic('vegetable-market', 101), address: 'Panabo City', building_photo: pic('grocery-store', 201, 800) },
  { id: 2, company_name: 'Davao Harvest', slug: 'davao-harvest', avatar: pic('fruit-market', 102), address: 'Panabo City', building_photo: pic('farmers-market', 202, 800) },
  { id: 3, company_name: 'Bay Seafoods', slug: 'bay-seafoods', avatar: pic('fish-market', 103), address: 'Panabo City', building_photo: pic('seafood-market', 203, 800) },
  { id: 4, company_name: 'Mindanao Meats', slug: 'mindanao-meats', avatar: pic('butcher', 104), address: 'Panabo City', building_photo: pic('butcher-shop', 204, 800) }
]
