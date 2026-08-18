'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plane, Check, Globe } from 'lucide-react'

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
          <div className="text-center mb-8 pt-8">
            <div className="mb-4 flex justify-center">
              <Plane className="w-16 h-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 animate-gradient">
              Baggage Checker
            </h1>
            <p className="text-xl text-gray-600 max-w-lg mx-auto">
              Find the perfect Flight Knight baggage for your flight in seconds
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Check className="w-4 h-4 text-green-500" />
                <span>6 Airlines</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Check className="w-4 h-4 text-green-500" />
                <span>Instant Results</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Check className="w-4 h-4 text-green-500" />
                <span>Free to Use</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Airline Locations</h2>
            </div>
            <div className="relative bg-gradient-to-br from-blue-100 via-purple-50 to-blue-100 rounded-xl p-4 h-64 mb-4 overflow-hidden">
              {/* Europe outline SVG */}
              <svg viewBox="0 0 400 300" className="w-full h-full opacity-20">
                <path d="M50,80 Q80,60 120,70 T180,65 T240,70 T300,80 T350,90" stroke="#3b82f6" strokeWidth="2" fill="none"/>
                <path d="M60,100 Q100,90 150,95 T220,90 T280,95 T340,100" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                <path d="M70,130 Q110,120 160,125 T230,120 T290,125 T350,130" stroke="#3b82f6" strokeWidth="2" fill="none"/>
              </svg>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Country labels with better positioning */}
                  <div className="absolute text-lg font-bold text-gray-400" style={{ top: '15%', left: '15%' }}>Ireland</div>
                  <div className="absolute text-lg font-bold text-gray-400" style={{ top: '45%', left: '60%' }}>Hungary</div>
                  <div className="absolute text-lg font-bold text-gray-400" style={{ top: '35%', left: '40%' }}>UK</div>
                  <div className="absolute text-lg font-bold text-gray-400" style={{ top: '40%', left: '50%' }}>France</div>
                  <div className="absolute text-lg font-bold text-gray-400" style={{ top: '20%', left: '55%' }}>Netherlands</div>
                  
                  {/* Airline markers with pulse animation */}
                  {airlines.map((air) => (
                    <div
                      key={air.id}
                      className="absolute group cursor-pointer"
                      style={{
                        top: `${((90 - air.lat) / 90) * 100}%`,
                        left: `${((air.lng + 180) / 360) * 100}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      {/* Pulse effect */}
                      <div className={`absolute inset-0 rounded-full ${air.color} opacity-30 animate-ping`}></div>
                      {/* Main marker */}
                      <div className={`relative w-6 h-6 rounded-full ${air.color} border-3 border-white shadow-lg transition-transform group-hover:scale-125 flex items-center justify-center`}>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {air.name} - {air.country}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {airlines.map((air) => (
                <div key={air.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className={`w-4 h-4 rounded-full ${air.color} shadow-md`}></div>
                  <div>
                    <span className="text-gray-800 font-medium text-sm">{air.name}</span>
                    <span className="text-gray-500 text-xs block">{air.country}</span>
                  </div>
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
