// Replaces the old plugins/money.js currency filter (Vue 3 has no filters).
// Usage in <script setup>: const { moneyFormat } = useMoney()
export function useMoney() {
  const moneyFormat = (value: number | string, symbol = '₱') => {
    const n = Number(value) || 0
    return symbol + n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  return { moneyFormat }
}
