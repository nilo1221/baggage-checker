'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function ResultContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const airline = searchParams.get('airline')
  const ticket = searchParams.get('ticket')

  const AFFILIATE_LINK = 'https://flightknight.pxf.io/c/7316518/3849106/46776'
  const TRACKING_PIXEL = 'https://imp.pxf.io/i/7316518/3849106/46776'

  const products = {
    ryanair: {
      standard: {
        name: '40x20x25cm Travel Backpack',
        description: 'Perfect for Ryanair Standard (free personal bag)',
        features: ['Fits under seat', 'Free with Standard ticket', 'Lightweight & durable'],
        price: '£24.99',
        image: '🎒'
      },
      priority: {
        name: '40x30x20cm Travel Backpack',
        description: 'Ideal for Ryanair Priority (cabin bag)',
        features: ['Overhead locker size', 'Priority boarding required', 'Laptop compartment'],
        price: '£24.99',
        image: '🎒'
      },
      flexi: {
        name: '55x40x20cm Travel Backpack',
        description: 'Maximum size for Ryanair Flexi Plus',
        features: ['Largest cabin size', 'All baggage included', 'Premium features'],
        price: '£24.99',
        image: '🎒'
      }
    },
    wizzair: {
      basic: {
        name: '40x30x20cm Travel Backpack',
        description: 'Perfect for Wizz Air Basic (free personal bag)',
        features: ['Fits under seat', 'Free with Basic ticket', 'Lightweight & durable'],
        price: '£24.99',
        image: '🎒'
      },
      wizzgo: {
        name: '55x40x20cm Travel Backpack',
        description: 'Ideal for Wizz Air WIZZ Go (cabin bag)',
        features: ['Overhead locker size', 'WIZZ Go fare required', 'Laptop compartment'],
        price: '£24.99',
        image: '🎒'
      },
      wizzplus: {
        name: '55x40x20cm Travel Backpack',
        description: 'Maximum size for Wizz Air WIZZ Plus',
        features: ['Largest cabin size', 'All baggage included', 'Premium features'],
        price: '£24.99',
        image: '🎒'
      }
    },
    easyjet: {
      standard: {
        name: '45x36x20cm Travel Backpack',
        description: 'Perfect for easyJet Standard (free cabin bag)',
        features: ['Overhead locker size', 'Free with Standard ticket', 'Laptop compartment'],
        price: '£24.99',
        image: '🎒'
      },
      flexi: {
        name: '55x40x20cm Travel Backpack',
        description: 'Maximum size for easyJet Flexi',
        features: ['Largest cabin size', 'All baggage included', 'Premium features'],
        price: '£24.99',
        image: '🎒'
      }
    },
    britishairways: {
      economy: {
        name: '55x40x20cm Travel Backpack',
        description: 'Perfect for British Airways Economy',
        features: ['Overhead locker size', 'Fits BA requirements', 'Laptop compartment'],
        price: '£24.99',
        image: '🎒'
      },
      business: {
        name: '55x40x20cm Travel Backpack',
        description: 'Premium choice for British Airways Business',
        features: ['Largest cabin size', 'Premium features', 'Business travel ready'],
        price: '£24.99',
        image: '🎒'
      }
    },
    airfrance: {
      economy: {
        name: '55x35x25cm Travel Backpack',
        description: 'Perfect for Air France Economy',
        features: ['Fits AF maximum dimensions', 'Overhead locker size', 'Laptop compartment'],
        price: '£24.99',
        image: '🎒'
      },
      business: {
        name: '55x35x25cm Travel Backpack',
        description: 'Premium choice for Air France Business',
        features: ['Fits AF maximum dimensions', 'Premium features', 'Business travel ready'],
        price: '£24.99',
        image: '🎒'
      }
    },
    klm: {
      economy: {
        name: '55x35x25cm Travel Backpack',
        description: 'Perfect for KLM Economy',
        features: ['Fits KLM maximum dimensions', 'Overhead locker size', 'Laptop compartment'],
        price: '£24.99',
        image: '🎒'
      },
      business: {
        name: '55x35x25cm Travel Backpack',
        description: 'Premium choice for KLM Business',
        features: ['Fits KLM maximum dimensions', 'Premium features', 'Business travel ready'],
        price: '£24.99',
        image: '🎒'
      }
    }
  }

  const airlineNames = {
    ryanair: 'Ryanair',
    wizzair: 'Wizz Air',
    easyjet: 'easyJet',
    britishairways: 'British Airways',
    airfrance: 'Air France',
    klm: 'KLM'
  }

  const ticketNames = {
    ryanair: {
      standard: 'Standard',
      priority: 'Priority',
      flexi: 'Flexi Plus'
    },
    wizzair: {
      basic: 'Basic',
      wizzgo: 'WIZZ Go',
      wizzplus: 'WIZZ Plus'
    },
    easyjet: {
      standard: 'Standard',
      flexi: 'Flexi'
    },
    britishairways: {
      economy: 'Economy',
      business: 'Business'
    },
    airfrance: {
      economy: 'Economy',
      business: 'Business'
    },
    klm: {
      economy: 'Economy',
      business: 'Business'
    }
  }

  if (!airline || !ticket || !products[airline] || !products[airline][ticket]) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Invalid Selection</h1>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const product = products[airline][ticket]
  const airlineName = airlineNames[airline]
  const ticketName = ticketNames[airline][ticket]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <img 
        src={TRACKING_PIXEL} 
        alt="" 
        style={{ position: 'absolute', visibility: 'hidden' }}
        height="0" 
        width="0" 
        border="0"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => router.push('/')}
            className="mb-6 flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold"
          >
            <span>←</span>
            <span>Check Another Flight</span>
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {airlineName} - {ticketName}
              </h1>
              <p className="text-gray-600">
                Recommended Flight Knight Baggage
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
              <div className="text-6xl text-center mb-4 flex justify-center">
                <span>🎒</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 text-center mb-4">
                {product.description}
              </p>
              <div className="text-center">
                <span className="text-3xl font-bold text-blue-600">
                  {product.price}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={AFFILIATE_LINK}
              target="_blank"
              rel="sponsored"
              className="block w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Shop Now on Flight Knight →
            </a>

            <p className="mt-4 text-xs text-gray-500 text-center">
              Affiliate link - You support us at no extra cost
            </p>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Powered by Flight Knight - Quality travel luggage at affordable prices</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}
