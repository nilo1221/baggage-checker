'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { destinations } from '../../lib/destinations'
import { getHotelLink } from '../../lib/travelAffiliate'

const DestinationsMap = dynamic(() => import('../../components/DestinationsMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-800/50 animate-pulse rounded-2xl" />
})

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="mb-6 inline-flex items-center space-x-2 text-blue-300 hover:text-white font-semibold transition-colors"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>

          <div className="text-center mb-10">
            <span className="text-5xl mb-4 block">🗺️</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Travel & Hotels
            </h1>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Find top destinations and book hotels through our travel partners. More cities coming soon.
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
                  <div className="text-4xl shrink-0">{dest.emoji}</div>
                  <div className="flex-grow">
                    <h2 className="text-xl font-bold group-hover:text-blue-300 transition-colors">{dest.name}</h2>
                    <p className="text-blue-200 text-sm">{dest.country}</p>
                    <p className="text-white font-semibold text-sm mt-1">{dest.tagline}</p>
                  </div>
                  <span className="shrink-0 text-blue-300 group-hover:underline text-sm">Search →</span>
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
