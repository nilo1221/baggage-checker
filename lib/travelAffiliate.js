// Replace with your real hotel affiliate link base.
// You can use Booking.com, Hotels.com, Travelpayouts, or any travel affiliate program.
// Example Booking.com: https://www.booking.com/searchresults.html?aid=YOUR_AID&ss=

export const HOTEL_AFFILIATE_BASE = 'https://www.booking.com/searchresults.html?aid=YOUR_AID&ss='

export const getHotelLink = (city) => {
  return `${HOTEL_AFFILIATE_BASE}${encodeURIComponent(city)}`
}
