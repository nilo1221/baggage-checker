'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [airline, setAirline] = useState('')
  const [ticketType, setTicketType] = useState('')
  const router = useRouter()

  const airlines = [
    { id: 'ryanair', name: 'Ryanair', color: 'bg-blue-600', country: 'Ireland', lat: 53.4, lng: -6.3 },
    { id: 'wizzair', name: 'Wizz Air', color: 'bg-purple-600', country: 'Hungary', lat: 47.5, lng: 19.0 },
    { id: 'easyjet', name: 'easyJet', color: 'bg-orange-600', country: 'UK', lat: 51.5, lng: -0.1 },
    { id: 'britishairways', name: 'British Airways', color: 'bg-blue-800', country: 'UK', lat: 51.5, lng: -0.1 },
    { id: 'airfrance', name: 'Air France', color: 'bg-blue-500', country: 'France', lat: 48.9, lng: 2.3 },
    { id: 'klm', name: 'KLM', color: 'bg-blue-700', country: 'Netherlands', lat: 52.3, lng: 4.8 }
  ]

  const ticketTypes = {
    ryanair: [
      { id: 'standard', name: 'Standard (Free Bag)', description: 'Small personal bag under seat' },
      { id: 'priority', name: 'Priority', description: 'Small bag + cabin bag' },
      { id: 'flexi', name: 'Flexi Plus', description: 'All baggage included' }
    ],
    wizzair: [
      { id: 'basic', name: 'Basic (Free Bag)', description: 'Small personal bag under seat' },
      { id: 'wizzgo', name: 'WIZZ Go', description: 'Small bag + cabin bag' },
      { id: 'wizzplus', name: 'WIZZ Plus', description: 'All baggage included' }
    ],
    easyjet: [
      { id: 'standard', name: 'Standard (Free Bag)', description: 'Small bag under seat' },
      { id: 'flexi', name: 'Flexi', description: 'Cabin bag included' }
    ],
    britishairways: [
      { id: 'economy', name: 'Economy', description: 'Cabin bag included' },
      { id: 'business', name: 'Business', description: 'Multiple bags included' }
    ],
    airfrance: [
      { id: 'economy', name: 'Economy', description: 'Cabin bag included' },
      { id: 'business', name: 'Business', description: 'Multiple bags included' }
    ],
    klm: [
      { id: 'economy', name: 'Economy', description: 'Cabin bag included' },
      { id: 'business', name: 'Business', description: 'Multiple bags included' }
    ]
  }

  const handleCheck = () => {
    if (airline && ticketType) {
      router.push(`/result?airline=${airline}&ticket=${ticketType}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              ✈️ Baggage Checker
            </h1>
            <p className="text-gray-600">
              Find the perfect Flight Knight baggage for your flight
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">🌍 Airline Locations</h2>
            <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-4 h-48 mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Simplified Europe map representation */}
                  <div className="absolute text-6xl" style={{ top: '20%', left: '20%' }}>🇮🇪</div>
                  <div className="absolute text-6xl" style={{ top: '40%', left: '55%' }}>🇭🇺</div>
                  <div className="absolute text-6xl" style={{ top: '30%', left: '45%' }}>🇬🇧</div>
                  <div className="absolute text-6xl" style={{ top: '35%', left: '50%' }}>🇫🇷</div>
                  <div className="absolute text-6xl" style={{ top: '25%', left: '52%' }}>🇳🇱</div>
                  
                  {/* Airline markers */}
                  {airlines.map((air) => (
                    <div
                      key={air.id}
                      className={`absolute w-4 h-4 rounded-full ${air.color} border-2 border-white shadow-lg cursor-pointer transition-transform hover:scale-125`}
                      style={{
                        top: `${((90 - air.lat) / 90) * 100}%`,
                        left: `${((air.lng + 180) / 360) * 100}%`
                      }}
                      title={`${air.name} - ${air.country}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              {airlines.map((air) => (
                <div key={air.id} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${air.color}`}></div>
                  <span className="text-gray-700">{air.name} ({air.country})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Select Your Airline
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {airlines.map((air) => (
                  <button
                    key={air.id}
                    onClick={() => {
                      setAirline(air.id)
                      setTicketType('')
                    }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      airline === air.id
                        ? `${air.color} text-white border-transparent`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold">{air.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {airline && (
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Select Your Ticket Type
                </label>
                <div className="space-y-3">
                  {ticketTypes[airline].map((ticket) => (
                    <button
                      key={ticket.id}
                      onClick={() => setTicketType(ticket.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        ticketType === ticket.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-800">{ticket.name}</div>
                      <div className="text-sm text-gray-600">{ticket.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleCheck}
              disabled={!airline || !ticketType}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                !airline || !ticketType
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
              }`}
            >
              Check Baggage Requirements
            </button>
          </div>

          <div className="mt-8 flex justify-center space-x-6 text-sm">
            <a href="/how-it-works" className="text-blue-600 hover:text-blue-800 font-semibold">
              How It Works
            </a>
            <a href="/faq" className="text-blue-600 hover:text-blue-800 font-semibold">
              FAQ
            </a>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Powered by Flight Knight - Quality travel luggage at affordable prices</p>
          </div>
        </div>
      </div>
    </div>
  )
}
