'use client'

import { useState, useEffect, useMemo } from 'react'
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

const amenityMap = {
  WiFi: 'WiFi',
  Breakfast: 'Colazione',
  Pool: 'Piscina',
  Metro: 'Metro',
  Parking: 'Parcheggio',
  Spa: 'Spa',
}

const codeToAmenity = {
  '433': 'Pool',
  '2': 'Parking',
  '15': 'Terrace',
  '14': 'Garden',
  '107': 'Spa',
  '4': 'Pet-friendly',
}

const vibeOptions = [
  { value: 'city', label: 'Centro città' },
  { value: 'beach', label: 'Vicino al mare' },
  { value: 'mountain', label: 'Vicino alla montagna' },
  { value: 'countryside', label: 'Campagna' },
]

const vibeLabels = {
  city: 'in centro città',
  beach: 'vicino al mare',
  mountain: 'in montagna',
  countryside: 'in campagna',
}

function DestinationCard({ dest, badge }) {
  return (
    <a
      key={dest.id}
      href={getHotelLink(dest.name)}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className="group relative flex flex-col gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:-translate-y-1 transition-all shadow-lg overflow-hidden"
    >
      {badge && (
        <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-blue-600/80 text-white backdrop-blur-sm">
          {badge}
        </span>
      )}
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl font-bold text-white shadow-inner">
        {dest.name.slice(0, 2).toUpperCase()}
      </div>
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-lg font-bold group-hover:text-blue-300 transition-colors">{dest.name}</h3>
          <div className="flex text-yellow-400">
            {Array.from({ length: dest.stars }).map((_, i) => (
              <StarIcon key={i} className="w-3 h-3" />
            ))}
          </div>
        </div>
        <p className="text-blue-200 text-xs mb-1">{dest.country} · {dest.distance} km dal centro</p>
        <p className="text-blue-200/80 text-xs line-clamp-2">{dest.description}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">{dest.rating}</span>
          <span className="text-xs text-blue-200">{dest.reviews.toLocaleString()} recensioni</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {dest.amenities.map((amenity) => (
            <span key={amenity} className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full">
              {amenityMap[amenity] || amenity}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-white font-bold text-sm">{dest.tagline}</p>
          <span className="text-blue-300 group-hover:underline text-xs whitespace-nowrap">Trova hotel →</span>
        </div>
      </div>
    </a>
  )
}

export default function DestinationsPage() {
  const [params, setParams] = useState(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const search = new URLSearchParams(window.location.search)
    setParams({
      location: search.get('location') || '',
      vibe: search.get('vibe') || '',
      distance: search.get('distance') || 'any',
      budget: search.get('budget') || '',
      propertyType: search.get('propertyType') || '',
      amenities: search.get('amenities')?.split(',').filter(Boolean) || [],
    })
  }, [])

  const { suggested, alternatives, featured, whyText, hasQuery } = useMemo(() => {
    if (!params) return { suggested: [], alternatives: [], featured: [], whyText: '', hasQuery: false }
    const hasQuery = !!(params.vibe || params.budget || params.amenities.length || params.location)

    const q = params.location.trim().toLowerCase()
    const nameMatches = q
      ? destinations.filter(
          (d) =>
            d.name.toLowerCase().includes(q) ||
            d.country.toLowerCase().includes(q) ||
            q.includes(d.name.toLowerCase())
        )
      : []

    let filtered = [...destinations]
    if (params.vibe) filtered = filtered.filter((d) => d.vibe === params.vibe)
    if (params.budget) filtered = filtered.filter((d) => d.price <= Number(params.budget))
    if (params.amenities.length) {
      const wanted = params.amenities.map((c) => codeToAmenity[c]).filter(Boolean)
      if (wanted.length) filtered = filtered.filter((d) => wanted.every((a) => d.amenities.includes(a)))
    }

    const suggested = nameMatches.length || filtered.length
      ? [...new Map([...nameMatches, ...filtered].map((d) => [d.id, d])).values()]
      : destinations

    const budgetNumber = params.budget ? Number(params.budget) : Infinity
    const alternatives = destinations
      .filter((d) => !suggested.some((s) => s.id === d.id))
      .filter((d) => d.price < budgetNumber)
      .filter((d) => (params.vibe ? d.vibe === params.vibe : true))
      .sort((a, b) => a.price - b.price)
      .slice(0, 3)

    const featured = destinations
      .filter((d) => !suggested.some((s) => s.id === d.id) && !alternatives.some((a) => a.id === d.id))
      .sort((a, b) => a.price - b.price)
      .slice(0, 3)

    let whyText = ''
    if (params.vibe) whyText += `Hai cercato una meta ${vibeLabels[params.vibe]}. `
    if (params.budget) whyText += `Budget fino a €${params.budget}. `
    if (params.amenities.length) {
      const labels = params.amenities.map((c) => amenityMap[codeToAmenity[c]] || codeToAmenity[c]).filter(Boolean)
      whyText += `Servizi richiesti: ${labels.join(', ')}. `
    }
    if (params.location) whyText += `Hai indicato “${params.location}”. `
    whyText += 'Ecco le mete che meglio rientrano nel tuo profilo.'

    return { suggested, alternatives, featured, whyText, hasQuery }
  }, [params])

  const mapDestinations = suggested.length ? suggested : destinations

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
              Risponde alle domande dell’assistente e scopri le mete che si adattano a te.
            </p>
          </div>

          <HotelWizard />

          {hasQuery && (
            <div className="mt-10 mb-6 bg-blue-900/20 border border-blue-500/30 rounded-2xl p-5">
              <h2 className="text-xl font-bold mb-2">Perché ti consigliamo queste</h2>
              <p className="text-blue-200 text-sm">{whyText}</p>
            </div>
          )}

          <div className="mt-10 mb-4">
            <h2 className="text-2xl font-bold mb-2">{hasQuery ? 'Mete consigliate' : 'Destinazioni in evidenza'}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:h-[70vh]">
            <div className="overflow-y-auto pr-2 space-y-4 h-auto lg:h-full pb-4">
              {suggested.map((dest) => (
                <DestinationCard key={dest.id} dest={dest} badge={hasQuery ? 'Consigliata' : undefined} />
              ))}
              {!suggested.length && (
                <p className="text-blue-200">Nessuna meta corrisponde esattamente ai criteri. Prova a allargare il budget o i servizi.</p>
              )}
            </div>

            <div className="h-[400px] lg:h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-800/30">
              <DestinationsMap destinations={mapDestinations} getHotelLink={getHotelLink} />
            </div>
          </div>

          {hasQuery && alternatives.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Ti potrebbe interessare anche…</h2>
              <p className="text-blue-200 text-sm mb-4">Mete simili ma più economiche rispetto alle tue preferenze.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {alternatives.map((dest) => (
                  <DestinationCard key={dest.id} dest={dest} badge="Più economica" />
                ))}
              </div>
            </div>
          )}

          {featured.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Offerte in evidenza</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {featured.map((dest) => (
                  <DestinationCard key={dest.id} dest={dest} badge="Offerta" />
                ))}
              </div>
            </div>
          )}

          <p className="mt-12 text-center text-sm text-gray-400">
            Link affiliati — ci sostieni senza costi aggiuntivi quando prenoti tramite questi link.
          </p>
        </div>
      </div>
    </div>
  )
}
