'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { getDeepLink } from '../../lib/affiliate'
import { products, categories } from '../../lib/products'
import { airlines } from '../../lib/airlines'

export default function ShopPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('All')

  const airlineColor = useMemo(() => {
    const map = {}
    airlines.forEach((a) => {
      map[a.name] = a.color
    })
    return map
  }, [])

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.push('/')}
            className="mb-6 flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
          >
            <span>←</span>
            <span>Back to Checker</span>
          </button>

          <div className="text-center mb-10">
            <span className="text-5xl mb-4 block">🛍️</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
              Flight Knight Shop
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hand-picked luggage and backpacks sized for your airline. Every bag is tested against major airline rules.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
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
                rel="sponsored noopener noreferrer"
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                <div className="relative h-52 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  {product.badge && (
                    <span className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-bold rounded-full shadow-sm border border-blue-100">
                      {product.badge}
                    </span>
                  )}
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                    {product.emoji}
                  </span>
                </div>

                <div className="p-6">
                  <div className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">
                    {product.category}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {product.tagline}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-mono font-bold text-gray-800">
                      {product.dimensions}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {product.airlines.map((airline) => (
                      <span
                        key={airline}
                        className={`text-xs px-2 py-1 rounded-full font-medium text-white ${airlineColor[airline] || 'bg-gray-500'}`}
                      >
                        {airline}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900">
                      {product.price}
                    </span>
                    <span className="text-sm font-semibold text-blue-600 group-hover:underline">
                      Buy on Flight Knight →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
              <span className="text-2xl mb-2 block">🚚</span>
              <h4 className="font-semibold text-gray-800">Free Same Day Dispatch</h4>
              <p className="text-sm text-gray-500">On orders placed before 3pm</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
              <span className="text-2xl mb-2 block">💰</span>
              <h4 className="font-semibold text-gray-800">Stock Up & Save</h4>
              <p className="text-sm text-gray-500">10% off 2+ items, 15% off 3+</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
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
