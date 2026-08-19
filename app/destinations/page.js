'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { destinations } from '../../lib/destinations'
import { getHotelLink, getBookingSearchUrl } from '../../lib/travelAffiliate'
import Button from '../../components/Button'
import { MapIcon, ArrowLeftIcon, StarIcon, SearchIcon } from '../../components/Icons'
import HotelWizard from '../../components/HotelWizard'

const DestinationsMap = dynamic(() => import('../../components/DestinationsMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-800/50 animate-pulse rounded-2xl" />
})

const starOptions = [3, 4, 5]
const ratingOptions = [
  { label: '7+', value: 7 },
  { label: '8+', value: 8 },
  { label: '9+', value: 9 },
]
const amenityOptions = ['WiFi', 'Breakfast', 'Pool', 'Metro', 'Parking', 'Spa']
const sortOptions = [
  { value: 'default', label: 'Sort by' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'rating-desc', label: 'Rating: high to low' },
  { value: 'distance-asc', label: 'Distance: nearest first' },
  { value: 'reviews-desc', label: 'Most reviewed' },
]

const propertyTypeOptions = [
  { value: '', label: 'Any' },
  { value: '204', label: 'Hotel' },
  { value: '216', label: 'B&B' },
  { value: '226', label: 'Resort' },
  { value: '224', label: 'Aparthotel' },
]

const searchAmenityOptions = [
  { label: 'Pool', code: '433' },
  { label: 'Parking', code: '2' },
  { label: 'Terrace', code: '15' },
  { label: 'Garden', code: '14' },
  { label: 'Spa', code: '107' },
  { label: 'Pet-friendly', code: '4' },
]

export default function DestinationsPage() {
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [sortBy, setSortBy] = useState('default')
  const [selectedStars, setSelectedStars] = useState([])
  const [minRating, setMinRating] = useState(0)
  const [selectedAmenities, setSelectedAmenities] = useState([])

  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [adults, setAdults] = useState(2)
  const [rooms, setRooms] = useState(1)
  const [propertyType, setPropertyType] = useState('')
  const [selectedSearchAmenities, setSelectedSearchAmenities] = useState([])
  const [bookingSort, setBookingSort] = useState('price')

  const suggestions = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q)
    )
  }, [query])

  const openUrl = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    const url = getBookingSearchUrl({
      location: q,
      checkin,
      checkout,
      adults,
      rooms,
      propertyType,
      amenities: selectedSearchAmenities,
      sortBy: bookingSort,
    })
    openUrl(url)
    setShowSuggestions(false)
  }

  const toggleStar = (star) => {
    setSelectedStars((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
    )
  }

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    )
  }

  const toggleSearchAmenity = (code) => {
    setSelectedSearchAmenities((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    )
  }

  const filtered = useMemo(() => {
    let result = destinations.filter((dest) => {
      if (selectedStars.length && !selectedStars.includes(dest.stars)) return false
      if (dest.rating < minRating) return false
      if (selectedAmenities.length && !selectedAmenities.every((a) => dest.amenities.includes(a))) return false
      return true
    })

    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price)
    if (sortBy === 'rating-desc') result = [...result].sort((a, b) => b.rating - a.rating)
    if (sortBy === 'distance-asc') result = [...result].sort((a, b) => a.distance - b.distance)
    if (sortBy === 'reviews-desc') result = [...result].sort((a, b) => b.reviews - a.reviews)

    return result
  }, [selectedStars, minRating, selectedAmenities, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Button href="/" variant="ghost" className="mb-6 inline-flex items-center gap-2 text-blue-300 hover:text-white">
            <ArrowLeftIcon className="w-4 h-4" /> Back to Home
          </Button>

          <div className="text-center mb-8">
            <MapIcon className="w-16 h-16 mx-auto mb-4 text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Find hotels for your trip
            </h1>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Tell us what you need and we’ll find the best deals on Booking.com — at no extra cost to you.
            </p>
          </div>

          <HotelWizard />

          <form onSubmit={handleSearchSubmit} className="relative mb-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 space-y-4">
              <div className="relative">
                <div className="flex items-center gap-2 bg-slate-900/50 border border-white/10 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                  <SearchIcon className="w-5 h-5 text-blue-300 shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder="Where do you want to stay? (e.g. Veneto, Barcelona)"
                    className="bg-transparent flex-grow outline-none text-white placeholder-blue-300"
                  />
                </div>
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    {suggestions.map((dest) => (
                      <button
                        key={dest.id}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          setQuery(dest.name)
                          openUrl(getHotelLink(dest.name))
                          setShowSuggestions(false)
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center justify-between"
                      >
                        <span className="font-semibold">{dest.name}</span>
                        <span className="text-sm text-blue-200">{dest.country}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-blue-200 mb-1">Check-in</label>
                  <input
                    type="date"
                    value={checkin}
                    onChange={(e) => setCheckin(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-blue-200 mb-1">Check-out</label>
                  <input
                    type="date"
                    value={checkout}
                    onChange={(e) => setCheckout(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-blue-200 mb-1">Adults</label>
                  <input
                    type="number"
                    min={1}
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-blue-200 mb-1">Rooms</label>
                  <input
                    type="number"
                    min={1}
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-blue-200 mb-1">Property type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {propertyTypeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-slate-800 text-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-blue-200 mb-1">Sort on Booking</label>
                  <select
                    value={bookingSort}
                    onChange={(e) => setBookingSort(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="price" className="bg-slate-800 text-white">Cheapest first</option>
                    <option value="review_score" className="bg-slate-800 text-white">Best rated</option>
                    <option value="distance" className="bg-slate-800 text-white">Closest first</option>
                    <option value="popularity" className="bg-slate-800 text-white">Most popular</option>
                  </select>
                </div>

                <div className="sm:col-span-2 md:col-span-4">
                  <label className="block text-xs font-semibold text-blue-200 mb-2">Must-haves</label>
                  <div className="flex flex-wrap gap-2">
                    {searchAmenityOptions.map((a) => (
                      <button
                        key={a.code}
                        type="button"
                        onClick={() => toggleSearchAmenity(a.code)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          selectedSearchAmenities.includes(a.code)
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'bg-white/5 border-white/10 text-blue-200 hover:bg-white/10'
                        }`}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
              >
                Find the best deals on Booking.com
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <p className="text-sm font-semibold text-blue-200 mb-2">Star rating</p>
              <div className="flex flex-wrap gap-2">
                {starOptions.map((star) => (
                  <button
                    key={star}
                    onClick={() => toggleStar(star)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                      selectedStars.includes(star)
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-white/5 border-white/10 text-blue-200 hover:bg-white/10'
                    }`}
                  >
                    {star} <StarIcon className="w-3 h-3 inline -mt-0.5" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <p className="text-sm font-semibold text-blue-200 mb-2">Guest rating</p>
              <div className="flex flex-wrap gap-2">
                {ratingOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setMinRating(opt.value === minRating ? 0 : opt.value)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                      minRating === opt.value
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-white/5 border-white/10 text-blue-200 hover:bg-white/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <p className="text-sm font-semibold text-blue-200 mb-2">Amenities</p>
              <div className="flex flex-wrap gap-2">
                {amenityOptions.map((amenity) => (
                  <button
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      selectedAmenities.includes(amenity)
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-white/5 border-white/10 text-blue-200 hover:bg-white/10'
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <p className="text-sm font-semibold text-blue-200 mb-2">Sort by</p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-slate-800 text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-sm text-blue-200 mb-4">
            {filtered.length} {filtered.length === 1 ? 'destination' : 'destinations'} found
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:h-[70vh]">
            <div className="overflow-y-auto pr-2 space-y-4 h-auto lg:h-full pb-4">
              {filtered.map((dest) => (
                <a
                  key={dest.id}
                  href={getHotelLink(dest.name)}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:-translate-y-1 transition-all shadow-lg"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-inner">
                    {dest.name.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl font-bold group-hover:text-blue-300 transition-colors">{dest.name}</h2>
                      <div className="flex text-yellow-400">
                        {Array.from({ length: dest.stars }).map((_, i) => (
                          <StarIcon key={i} className="w-4 h-4" />
                        ))}
                      </div>
                    </div>

                    <p className="text-blue-200 text-sm">
                      {dest.country} · {dest.distance} km from centre
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                        {dest.rating}
                      </span>
                      <span className="text-sm text-blue-200">{dest.reviews.toLocaleString()} reviews</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {dest.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="text-xs bg-white/10 px-2 py-0.5 rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 text-right w-full sm:w-auto">
                    <p className="text-white font-bold">{dest.tagline}</p>
                    <span className="text-blue-300 group-hover:underline text-sm whitespace-nowrap">
                      Find hotels →
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <div className="h-[400px] lg:h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-800/30">
              <DestinationsMap destinations={filtered} getHotelLink={getHotelLink} />
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Affiliate links — You support us at no extra cost when you book through these links.
          </p>
        </div>
      </div>
    </div>
  )
}
