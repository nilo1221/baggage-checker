'use client'

import Link from 'next/link'
import { destinations } from '../../lib/destinations'
import { getHotelLink } from '../../lib/travelAffiliate'

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

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-4 md:p-8 shadow-2xl mb-10">
            <div className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e3a8a" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>

                <rect x="0" y="0" width="100" height="100" fill="url(#mapGradient)" rx="0" />

                <g fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.2">
                  <line x1="10" y1="20" x2="90" y2="20" />
                  <line x1="10" y1="40" x2="90" y2="40" />
                  <line x1="10" y1="60" x2="90" y2="60" />
                  <line x1="10" y1="80" x2="90" y2="80" />
                  <line x1="20" y1="10" x2="20" y2="90" />
                  <line x1="40" y1="10" x2="40" y2="90" />
                  <line x1="60" y1="10" x2="60" y2="90" />
                  <line x1="80" y1="10" x2="80" y2="90" />
                </g>

                <circle cx="50" cy="50" r="35" fill="rgba(255,255,255,0.05)" />
                <circle cx="50" cy="50" r="25" fill="rgba(255,255,255,0.05)" />

                {destinations.map((dest) => (
                  <g key={dest.id}>
                    <circle
                      cx={dest.x}
                      cy={dest.y}
                      r="2"
                      fill="#fbbf24"
                      className="animate-pulse"
                    />
                    <circle
                      cx={dest.x}
                      cy={dest.y}
                      r="4"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="0.5"
                      opacity="0.6"
                    />
                    <text
                      x={dest.x + 3}
                      y={dest.y - 3}
                      fill="white"
                      fontSize="3"
                      fontWeight="bold"
                    >
                      {dest.name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <a
                key={dest.id}
                href={getHotelLink(dest.name)}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:-translate-y-2 transition-all shadow-lg"
              >
                <div className="text-4xl mb-3">{dest.emoji}</div>
                <h2 className="text-xl font-bold mb-1 group-hover:text-blue-300 transition-colors">
                  {dest.name}
                </h2>
                <p className="text-blue-200 text-sm mb-4">{dest.country}</p>
                <p className="text-white font-semibold mb-2">{dest.tagline}</p>
                <p className="text-sm text-blue-300 group-hover:underline">
                  Search hotels →
                </p>
              </a>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Affiliate links — You support us at no extra cost when you book through these links.
          </p>
        </div>
      </div>
    </div>
  )
}
