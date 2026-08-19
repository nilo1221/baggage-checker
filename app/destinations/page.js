'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { destinations } from '../../lib/destinations'
import { getHotelLink } from '../../lib/travelAffiliate'
import Button from '../../components/Button'
import { MapIcon, ArrowLeftIcon, StarIcon } from '../../components/Icons'
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

const amenityMap = {
  WiFi: 'WiFi',
  Breakfast: 'Colazione',
  Pool: 'Piscina',
  Metro: 'Metro',
  Parking: 'Parcheggio',
  Spa: 'Spa',
}
const amenityOptions = Object.keys(amenityMap)

const sortOptions = [
  { value: 'default', label: 'Ordina per' },
  { value: 'price-asc', label: 'Prezzo: crescente' },
  { value: 'rating-desc', label: 'Punteggio: decrescente' },
  { value: 'distance-asc', label: 'Distanza: più vicino' },
  { value: 'reviews-desc', label: 'Più recensiti' },
]

export default function DestinationsPage() {
  const [sortBy, setSortBy] = useState('default')
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
            <ArrowLeftIcon className="w-4 h-4" /> Torna alla home
          </Button>

          <div className="text-center mb-8">
            <MapIcon className="w-16 h-16 mx-auto mb-4 text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Trova gli hotel per il tuo viaggio
            </h1>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Dicci di cosa hai bisogno e troveremo le migliori offerte su Booking.com, senza alcun costo aggiuntivo per te.
            </p>
          </div>

          <HotelWizard />

          <div className="mt-12 mb-6">
            <h2 className="text-2xl font-bold mb-2">Oppure esplora le nostre destinazioni curate</h2>
            <p className="text-blue-200 text-sm">Filtra e confronta le destinazioni migliori.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <p className="text-sm font-semibold text-blue-200 mb-2">Stelle</p>
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
              <p className="text-sm font-semibold text-blue-200 mb-2">Punteggio ospiti</p>
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
              <p className="text-sm font-semibold text-blue-200 mb-2">Servizi</p>
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
                    {amenityMap[amenity]}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <p className="text-sm font-semibold text-blue-200 mb-2">Ordina per</p>
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
            {filtered.length} {filtered.length === 1 ? 'destinazione trovata' : 'destinazioni trovate'}
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
                  <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-inner relative overflow-hidden">
                    <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)]" />
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
                      {dest.country} · {dest.distance} km dal centro
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                        {dest.rating}
                      </span>
                      <span className="text-sm text-blue-200">{dest.reviews.toLocaleString()} recensioni</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {dest.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="text-xs bg-white/10 px-2 py-0.5 rounded-full"
                        >
                          {amenityMap[amenity] || amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 text-right w-full sm:w-auto">
                    <p className="text-white font-bold">{dest.tagline}</p>
                    <span className="text-blue-300 group-hover:underline text-sm whitespace-nowrap">
                      Trova hotel →
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
            Link affiliati — ci sostieni senza costi aggiuntivi quando prenoti tramite questi link.
          </p>
        </div>
      </div>
    </div>
  )
}
