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

const img = (seed: string) => `https://picsum.photos/seed/${seed}/400/400`

export const mockMenus = [
  {
    id: 1,
    name: 'Fresh Market',
    slug: 'fresh-market',
    product_categories: [
      {
        id: 11,
        name: 'Vegetables',
        slug: 'vegetables',
        product_sub_categories: [
          { id: 111, name: 'Leafy Greens', slug: 'leafy-greens' },
          { id: 112, name: 'Root Crops', slug: 'root-crops' }
        ]
      },
      {
        id: 12,
        name: 'Fruits',
        slug: 'fruits',
        product_sub_categories: [
          { id: 121, name: 'Tropical', slug: 'tropical' },
          { id: 122, name: 'Berries', slug: 'berries' }
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
        id: 21,
        name: 'Meat',
        slug: 'meat',
        product_sub_categories: [
          { id: 211, name: 'Pork', slug: 'pork' },
          { id: 212, name: 'Chicken', slug: 'chicken' }
        ]
      },
      {
        id: 22,
        name: 'Seafood',
        slug: 'seafood',
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
        id: 31,
        name: 'Rice & Grains',
        slug: 'rice-grains',
        product_sub_categories: [{ id: 311, name: 'Rice', slug: 'rice' }]
      }
    ]
  }
]

const names = [
  'Pechay Tagalog', 'Kamatis', 'Talong', 'Saging Lakatan', 'Mangga Carabao',
  'Bangus', 'Tilapia', 'Liempo', 'Manok Bisaya', 'Bigas Sinandomeng',
  'Sibuyas', 'Bawang', 'Karot', 'Pipino', 'Repolyo', 'Kalabasa',
  'Hipon', 'Pusit', 'Baboy Giniling', 'Itlog'
]
const cats = ['vegetables', 'fruits', 'meat', 'seafood', 'rice-grains']

export const mockProducts: Product[] = names.map((name, i) => {
  const base = 40 + ((i * 37) % 260)
  const discount = i % 4 === 0 ? 10 + (i % 3) * 5 : 0
  return {
    id: i + 1,
    vendor_id: (i % 4) + 1,
    name,
    desc: `Fresh ${name} sourced from local Panabo farmers and vendors.`,
    discount,
    price: discount > 0 ? Math.round(base - (discount / 100) * base) : base,
    not_discouted_price: base,
    image_md: img('prod' + i),
    image_sm: img('prod' + i),
    image_lg: img('prod' + i),
    stocks: i % 7 === 0 ? 0 : 25 + i,
    sub_category: 'General',
    sub_category_id: 100 + i,
    category: cats[i % cats.length].replace('-', ' '),
    category_slug: cats[i % cats.length],
    slug: 'product-' + (i + 1)
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
      { name: 'Pechay Tagalog', quantity: 2, price: 40, image: img('prod0') },
      { name: 'Kamatis', quantity: 3, price: 77, image: img('prod1') }
    ]
  },
  {
    id: 1002, reference: 'PMK-1002', date: '2026-06-17', status: 'Processing', vendor: 'Bay Seafoods', delivery_charge: 65,
    items: [
      { name: 'Bangus', quantity: 1, price: 225, image: img('prod4') },
      { name: 'Hipon', quantity: 2, price: 188, image: img('prod16') }
    ]
  },
  {
    id: 1003, reference: 'PMK-1003', date: '2026-06-18', status: 'Pending', vendor: 'Mindanao Meats', delivery_charge: 65,
    items: [{ name: 'Liempo', quantity: 2, price: 296, image: img('prod7') }]
  }
]

export const mockVendors = [
  { id: 1, company_name: 'Panabo Fresh Co.', slug: 'panabo-fresh', avatar: img('v1'), address: 'Panabo City', building_photo: img('vb1') },
  { id: 2, company_name: 'Davao Harvest', slug: 'davao-harvest', avatar: img('v2'), address: 'Panabo City', building_photo: img('vb2') },
  { id: 3, company_name: 'Bay Seafoods', slug: 'bay-seafoods', avatar: img('v3'), address: 'Panabo City', building_photo: img('vb3') },
  { id: 4, company_name: 'Mindanao Meats', slug: 'mindanao-meats', avatar: img('v4'), address: 'Panabo City', building_photo: img('vb4') }
]
