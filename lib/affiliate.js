export const AFFILIATE_LINK = 'https://flightknight.pxf.io/c/7316518/3849106/46776'
export const TRACKING_PIXEL = 'https://imp.pxf.io/i/7316518/3849106/46776'

export const getDeepLink = (path) => {
  const base = 'https://flightknight.com'
  const url = path.startsWith('http') ? path : `${base}${path}`
  return `${AFFILIATE_LINK}?u=${encodeURIComponent(url)}`
}
