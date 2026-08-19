export default function sitemap() {
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://baggage-checker-yqf9.vercel.app'

  const routes = [
    { path: '', priority: 1, changeFrequency: 'daily' },
    { path: '/shop', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/destinations', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/how-it-works', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/result', priority: 0.5, changeFrequency: 'monthly' },
  ]

  const lastModified = new Date().toISOString()

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
