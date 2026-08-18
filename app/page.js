'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { airlines, ticketTypes } from '../lib/airlines'
import { products } from '../lib/products'
import { getDeepLink } from '../lib/affiliate'

const AirlineLogo = ({ id }) => {
  const logos = {
    ryanair: (
      <svg viewBox="0 0 120 60" className="h-10 w-auto" fill="none">
        <path d="M10,40 L25,25 L40,40 L55,30 L70,40" stroke="#073590" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M70,38 L110,30" stroke="#073590" strokeWidth="3" strokeLinecap="round" />
        <path d="M75,36 L85,44" stroke="#F1C933" strokeWidth="3" strokeLinecap="round" />
        <text x="60" y="56" textAnchor="middle" fill="#073590" fontSize="16" fontWeight="bold" fontFamily="Arial, sans-serif">RYANAIR</text>
      </svg>
    ),
    wizzair: (
      <svg viewBox="0 0 120 60" className="h-10 w-auto" fill="none">
        <text x="60" y="40" textAnchor="middle" fill="#5E2E91" fontSize="22" fontWeight="bold" fontFamily="Arial, sans-serif">wizz air</text>
        <path d="M25,48 Q40,42 60,48 T95,48" stroke="#5E2E91" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    ),
    easyjet: (
      <svg viewBox="0 0 120 60" className="h-10 w-auto" fill="none">
        <text x="60" y="42" textAnchor="middle" fill="#F36B20" fontSize="24" fontWeight="bold" fontFamily="Arial, sans-serif">easyJet</text>
        <circle cx="112" cy="35" r="5" fill="#F36B20" />
      </svg>
    ),
    britishairways: (
      <svg viewBox="0 0 120 70" className="h-10 w-auto" fill="none">
        <path d="M10,20 L120,20" stroke="#C8102E" strokeWidth="4" />
        <path d="M10,32 L120,32" stroke="#001F5C" strokeWidth="8" />
        <path d="M10,44 L120,44" stroke="#C8102E" strokeWidth="4" />
        <text x="60" y="62" textAnchor="middle" fill="#001F5C" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="1">BRITISH AIRWAYS</text>
      </svg>
    ),
    airfrance: (
      <svg viewBox="0 0 120 70" className="h-10 w-auto" fill="none">
        <path d="M10,25 Q30,20 50,25 T90,25" stroke="#EF3340" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M10,32 Q30,27 50,32 T90,32" stroke="#002157" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M10,39 Q30,34 50,39 T90,39" stroke="#EF3340" strokeWidth="3" fill="none" strokeLinecap="round" />
        <text x="60" y="60" textAnchor="middle" fill="#002157" fontSize="18" fontWeight="bold" fontFamily="Arial, sans-serif">Air France</text>
      </svg>
    ),
    klm: (
      <svg viewBox="0 0 120 70" className="h-10 w-auto" fill="none">
        <path d="M60,10 L65,20 L75,20 L67,28 L70,38 L60,32 L50,38 L53,28 L45,20 L55,20 Z" fill="#00A1DE" stroke="#00A1DE" strokeWidth="1" />
        <text x="60" y="60" textAnchor="middle" fill="#00A1DE" fontSize="22" fontWeight="bold" fontFamily="Arial, sans-serif">KLM</text>
      </svg>
    )
  }

  return logos[id] || null
}

export default function Home() {
  const [airline, setAirline] = useState('')
  const [ticketType, setTicketType] = useState('')
  const [step, setStep] = useState(1)
  const router = useRouter()

  const selectedAirline = airlines.find((a) => a.id === airline)
  const tickets = airline ? ticketTypes[airline] : []

  const recommendedProducts = useMemo(() => {
    if (!selectedAirline || !ticketType) return []
    const selectedTicket = tickets.find((t) => t.id === ticketType)
    const tag = selectedTicket?.tag || ''
    const recommended = products.filter(
      (p) => p.airlines.includes(selectedAirline.name) || p.airlines.includes('All airlines')
    )
    recommended.sort((a, b) => {
      const priority = {
        'Free Bag': ['Backpacks', 'Cabin Cases', 'Checked Cases', 'Suitcase Sets'],
        'Cabin Bag': ['Cabin Cases', 'Backpacks', 'Suitcase Sets', 'Checked Cases'],
        'All Included': ['Suitcase Sets', 'Cabin Cases', 'Checked Cases', 'Backpacks']
      }
      const order = priority[tag] || priority['Cabin Bag']
      return order.indexOf(a.category) - order.indexOf(b.category)
    })
    return recommended
  }, [selectedAirline, ticketType, tickets])

  const handleAirlineSelect = (id) => {
    setAirline(id)
    setTicketType('')
    setStep(2)
  }

  const handleTicketSelect = (id) => {
    setTicketType(id)
    setStep(3)
  }

  const handleCheck = () => {
    if (airline && ticketType) {
      router.push(`/result?airline=${airline}&ticket=${ticketType}`)
    }
  }

  const reset = () => {
    setAirline('')
    setTicketType('')
    setStep(1)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src="/hero-airplane.jpg"
          alt="Airplane taking off"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-950/85 via-sky-900/70 to-sky-950/85"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sky-900/60 to-transparent"></div>
        <div className="relative z-10 text-center px-6">
          <span className="text-7xl mb-6 block">✈️</span>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
            Pack & Fly
          </h1>
          <p className="text-2xl md:text-3xl text-blue-100 max-w-3xl mx-auto mb-10">
            Find the perfect Flight Knight luggage for your flight in seconds
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
              <span>✓</span>
              <span>6 Airlines</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
              <span>✓</span>
              <span>Instant Results</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
              <span>✓</span>
              <span>Free to Use</span>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
        <div className="text-center mb-10">
          <p className="text-sm text-blue-300 uppercase tracking-widest mb-2">Official Partners</p>
          <h2 className="text-3xl font-bold text-white">Trusted by 6 major airlines</h2>
        </div>
        <div className="relative carousel-fade">
          <div className="animate-marquee">
            {[...airlines, ...airlines, ...airlines].map((air, index) => (
              <div
                key={`${air.id}-${index}`}
                className="flex flex-col items-center justify-center flex-shrink-0 mx-5 px-10 py-6 rounded-2xl bg-white/95 backdrop-blur-md border border-white/30 shadow-2xl min-w-[220px] h-32 transform transition-all duration-300 hover:-translate-y-2 hover:bg-white group"
              >
                <AirlineLogo id={air.id} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm text-blue-300 uppercase tracking-widest mb-2">Find your bag</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Baggage Finder Wizard</h2>
              <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                Select your airline and ticket type. We will find the perfect Flight Knight luggage for your trip.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="flex items-center justify-center mb-10">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                        step >= s ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'bg-white/10 text-gray-500'
                      }`}
                    >
                      {s}
                    </div>
                    {s < 3 && (
                      <div className={`w-16 h-1 ${step > s ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-white/10'}`}></div>
                    )}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div>
                  <h3 className="text-2xl font-bold text-white text-center mb-2">Select your airline</h3>
                  <p className="text-blue-200 text-center mb-8">Choose the airline you are flying with</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {airlines.map((air) => (
                      <button
                        key={air.id}
                        onClick={() => handleAirlineSelect(air.id)}
                        className={`p-6 rounded-xl border-2 text-left transition-all hover:scale-105 ${
                          airline === air.id
                            ? `${air.color} text-white border-transparent shadow-lg`
                            : 'bg-white/5 border-white/10 text-white hover:border-white/30 hover:bg-white/10'
                        }`}
                      >
                        <div className="font-bold text-xl">{air.name}</div>
                        <div className={`text-sm ${airline === air.id ? 'text-white/80' : 'text-blue-200'}`}>{air.country}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="text-2xl font-bold text-white text-center mb-2">Select your ticket type</h3>
                  <p className="text-blue-200 text-center mb-8">{selectedAirline?.name} options</p>
                  <div className="space-y-4">
                    {tickets.map((ticket) => (
                      <button
                        key={ticket.id}
                        onClick={() => handleTicketSelect(ticket.id)}
                        className={`w-full p-6 rounded-xl border-2 text-left transition-all hover:scale-[1.02] ${
                          ticketType === ticket.id
                            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400'
                            : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold text-xl text-white">{ticket.name}</div>
                            <div className="text-blue-200 text-sm mt-1">{ticket.description}</div>
                          </div>
                          <span className="px-4 py-1 bg-white/10 text-blue-100 text-sm rounded-full border border-white/10">
                            {ticket.tag}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <button onClick={reset} className="text-blue-300 hover:text-white font-medium transition-colors">
                      ← Change airline
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Recommended for your trip</h3>
                  <p className="text-blue-200 mb-2">
                    {selectedAirline?.name} — {tickets.find((t) => t.id === ticketType)?.name}
                  </p>
                  <p className="text-blue-300 text-sm mb-6">
                    Swipe or hover to pause — click any bag to buy on Flight Knight
                  </p>

                  <div className="relative carousel-fade rounded-2xl overflow-hidden mb-8 border border-white/10">
                    <div className="animate-marquee">
                      {[...recommendedProducts, ...recommendedProducts, ...recommendedProducts].map((product, index) => (
                        <a
                          key={`${product.id}-${index}`}
                          href={getDeepLink(product.path)}
                          target="_blank"
                          rel="sponsored noopener noreferrer"
                          className="flex-shrink-0 mx-3 px-5 py-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg min-w-[220px] w-[220px] text-center transform transition-all hover:-translate-y-2 hover:bg-white/20 group"
                        >
                          <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{product.emoji}</div>
                          <div className="text-white font-bold text-lg leading-tight mb-1">{product.name}</div>
                          <div className="text-blue-200 text-sm mb-2">{product.tagline}</div>
                          <div className="text-white text-xl font-bold mb-1">{product.price}</div>
                          <div className="text-xs text-blue-300">Buy on Flight Knight →</div>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={handleCheck}
                      className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
                    >
                      View Full Result
                    </button>
                    <button
                      onClick={reset}
                      className="w-full sm:w-auto px-10 py-4 border-2 border-white/20 text-white rounded-xl font-bold hover:border-white/40 transition-all"
                    >
                      Start Over
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
