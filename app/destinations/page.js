'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { destinations } from '../../lib/destinations'
import { getHotelLink } from '../../lib/travelAffiliate'
import Button from '../../components/Button'
import { MapIcon, ArrowLeftIcon, StarIcon } from '../../components/Icons'

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

export default function DestinationsPage() {
  const [selectedStars, setSelectedStars] = useState([])
  const [minRating, setMinRating] = useState(0)
  const [selectedAmenities, setSelectedAmenities] = useState([])

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

  const filtered = useMemo(() => {
    return destinations.filter((dest) => {
      if (selectedStars.length && !selectedStars.includes(dest.stars)) return false
      if (dest.rating < minRating) return false
      if (selectedAmenities.length && !selectedAmenities.every((a) => dest.amenities.includes(a))) return false
      return true
    })
  }, [selectedStars, minRating, selectedAmenities])

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
              Choose a destination and book your stay through our travel partners — at no extra cost to you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
