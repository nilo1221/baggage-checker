// Hotel affiliate links via Booking.com through CJ Affiliate.
// When CJ approves Booking.com Italy (4347401), replace this base URL
// with your personal affiliate link or add the ?aid= parameter.
// Example with aid: https://www.booking.com/searchresults.html?aid=YOUR_AID&ss=

export const HOTEL_AFFILIATE_BASE = 'https://www.booking.com/searchresults.html?ss='

export const getHotelLink = (city) => {
  return `${HOTEL_AFFILIATE_BASE}${encodeURIComponent(city)}`
}
