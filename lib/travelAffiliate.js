// Hotel affiliate links via Booking.com through CJ Affiliate.
// When CJ approves Booking.com Italy (4347401), replace this base URL
// with your personal affiliate link or add the ?aid= parameter.
// Example with aid: https://www.booking.com/searchresults.html?aid=YOUR_AID&ss=

export const HOTEL_AFFILIATE_BASE = 'https://www.booking.com/searchresults.html?ss='
export const BOOKING_BASE = 'https://www.booking.com/searchresults.html'

export const getHotelLink = (city) => {
  return `${HOTEL_AFFILIATE_BASE}${encodeURIComponent(city)}`
}

// Build a Booking.com search URL with filters.
// facility codes from Booking.com: parking=2, pool=433, garden=14, terrace=15, spa=107, pet=4
// property type ht_id: hotel=204, bnb=216, resort=226, aparthotel=224
export const getBookingSearchUrl = ({
  location,
  checkin = '',
  checkout = '',
  adults = 2,
  rooms = 1,
  propertyType = '',
  amenities = [],
  sortBy = 'popularity',
}) => {
  const params = new URLSearchParams()
  params.set('ss', location)
  params.set('selected_currency', 'EUR')
  params.set('lang', 'en-us')
  if (checkin) params.set('checkin', checkin)
  if (checkout) params.set('checkout', checkout)
  params.set('group_adults', String(adults))
  params.set('no_rooms', String(rooms))
  if (sortBy) params.set('sr_order', sortBy)

  const nflt = []
  if (propertyType) nflt.push(`ht_id=${propertyType}`)
  amenities.forEach((code) => nflt.push(`hotelfacility=${code}`))
  if (nflt.length) params.set('nflt', nflt.join(';'))

  return `${BOOKING_BASE}?${params.toString()}`
}
