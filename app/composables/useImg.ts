// Image error fallback. If a local override image (public/products/<slug>.jpg)
// isn't present, the <img> 404s and we swap to the remote fallback once.
export function useImg() {
  const onError = (e: Event, fallback?: string) => {
    const el = e.target as HTMLImageElement
    if (fallback && !el.dataset.fellback && el.src !== fallback) {
      el.dataset.fellback = '1'
      el.src = fallback
    }
  }
  return { onError }
}
