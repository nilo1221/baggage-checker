'use client'

import dynamic from 'next/dynamic'
import { destinations } from '../../lib/destinations'
import { getHotelLink } from '../../lib/travelAffiliate'
import Button from '../../components/Button'
import { MapIcon, ArrowLeftIcon } from '../../components/Icons'

const DestinationsMap = dynamic(() => import('../../components/DestinationsMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-800/50 animate-pulse rounded-2xl" />
})

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <Button href="/" variant="ghost" className="mb-6 inline-flex items-center gap-2 text-blue-300 hover:text-white">
            <ArrowLeftIcon className="w-4 h-4" /> Back to Home
          </Button>

          <div className="text-center mb-10">
            <MapIcon className="w-16 h-16 mx-auto mb-4 text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Find hotels for your trip
            </h1>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Choose a destination and book your stay through our travel partners — at no extra cost to you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[70vh]">
            <div className="overflow-y-auto pr-2 space-y-4 h-full pb-4">
              {destinations.map((dest) => (
                <a
                  key={dest.id}
                  href={getHotelLink(dest.name)}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="group flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:-translate-y-1 transition-all shadow-lg"
                >
                  <MapIcon className="w-10 h-10 shrink-0 text-blue-400" />
                  <div className="flex-grow">
                    <h2 className="text-xl font-bold group-hover:text-blue-300 transition-colors">{dest.name}</h2>
                    <p className="text-blue-200 text-sm">{dest.country}</p>
                    <p className="text-white font-semibold text-sm mt-1">{dest.tagline}</p>
                  </div>
                  <span className="shrink-0 text-blue-300 group-hover:underline text-sm whitespace-nowrap">Find hotels</span>
                </a>
              ))}
            </div>
            <div className="h-full min-h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-800/30">
              <DestinationsMap destinations={destinations} getHotelLink={getHotelLink} />
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
