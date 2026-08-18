'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const AFFILIATE_LINK = 'https://flightknight.pxf.io/c/7316518/3849106/46776'

const getDeepLink = (path) => {
  return `${AFFILIATE_LINK}?u=${encodeURIComponent(`https://flightknight.com${path}`)}`
}

const products = [
  {
    id: 'fk-40x20x25-backpack',
    name: '40x20x25cm Underseat Backpack',
    tagline: 'Free underseat bag',
    price: '£24.99',
    emoji: '🎒',
    category: 'Backpacks',
    airlines: ['Ryanair'],
    path: '/collections/backpacks'
  },
  {
    id: 'fk-40x30x20-backpack',
    name: '40x30x20cm Cabin Backpack',
    tagline: 'Fits Wizz Air Basic',
    price: '£24.99',
    emoji: '🎒',
    category: 'Backpacks',
    airlines: ['Wizz Air'],
    path: '/collections/backpacks'
  },
  {
    id: 'fk-55x40x20-cabin',
    name: '55x40x20cm Cabin Case',
    tagline: 'Ryanair / Wizz Air overhead',
    price: '£49.99',
    emoji: '🧳',
    category: 'Cabin Cases',
    airlines: ['Ryanair', 'Wizz Air', 'easyJet', 'TUI'],
    path: '/collections/cabin-cases'
  },
  {
    id: 'fk-56x45x25-cabin',
    name: '56x45x25cm Cabin Case',
    tagline: 'BA / easyJet max size',
    price: '£59.99',
    emoji: '🧳',
    category: 'Cabin Cases',
    airlines: ['British Airways', 'easyJet', 'Jet2'],
    path: '/collections/cabin-cases'
  },
  {
    id: 'fk-55x35x25-cabin',
    name: '55x35x25cm Cabin Case',
    tagline: 'Air France / KLM fit',
    price: '£54.99',
    emoji: '🧳',
    category: 'Cabin Cases',
    airlines: ['Air France', 'KLM'],
    path: '/collections/cabin-cases'
  },
  {
    id: 'fk-45x36x20-cabin',
    name: '45x36x20cm Cabin Case',
    tagline: 'easyJet free overhead',
    price: '£49.99',
    emoji: '🧳',
    category: 'Cabin Cases',
    airlines: ['easyJet'],
    path: '/collections/cabin-cases'
  },
  {
    id: 'fk-checked-large',
    name: 'Large Checked Suitcase',
    tagline: 'For longer trips',
    price: '£69.99',
    emoji: '🧳',
    category: 'Checked Cases',
    airlines: ['All airlines'],
    path: '/collections/checked-cases'
  },
  {
    id: 'fk-suitcase-set',
    name: 'Cabin + Checked Set',
    tagline: 'Best value bundle',
    price: '£129.99',
    emoji: '🏷️',
    category: 'Suitcase Sets',
    airlines: ['All airlines'],
    path: '/collections/suitcase-sets'
  }
]

const categories = ['All', 'Backpacks', 'Cabin Cases', 'Checked Cases', 'Suitcase Sets']

export default function ShopPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.push('/')}
            className="mb-6 flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold"
          >
            <span>←</span>
            <span>Back to Checker</span>
          </button>

          <div className="text-center mb-8">
            <span className="text-5xl mb-4 block">🛍️</span>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Flight Knight Shop
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hand-picked luggage and backpacks sized for your airline. Click any product to buy on Flight Knight.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <a
                key={product.id}
                href={getDeepLink(product.path)}
                target="_blank"
                rel="sponsored"
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow group"
              >
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl h-48 flex items-center justify-center mb-4 text-6xl group-hover:scale-105 transition-transform">
                  {product.emoji}
                </div>
                <div className="text-sm text-blue-600 font-medium mb-1">
                  {product.category}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {product.tagline}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.airlines.map((airline) => (
                    <span
                      key={airline}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                    >
                      {airline}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    {product.price}
                  </span>
                  <span className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
                    Buy on Flight Knight →
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-xl p-4 shadow-md">
              <span className="text-2xl mb-2 block">🚚</span>
              <h4 className="font-semibold text-gray-800">Free Same Day Dispatch</h4>
              <p className="text-sm text-gray-500">On orders placed before 3pm</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <span className="text-2xl mb-2 block">💰</span>
              <h4 className="font-semibold text-gray-800">Stock Up & Save</h4>
              <p className="text-sm text-gray-500">10% off 2+ items, 15% off 3+</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <span className="text-2xl mb-2 block">💳</span>
              <h4 className="font-semibold text-gray-800">Buy Now, Pay Later</h4>
              <p className="text-sm text-gray-500">Klarna available at checkout</p>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Affiliate links — You support us at no extra cost when you buy through these links.
          </p>
        </div>
      </div>
    </div>
  )
}
