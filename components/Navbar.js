'use client'

import { useRouter } from 'next/navigation'
import { Plane, Menu } from 'lucide-react'

export default function Navbar() {
  const router = useRouter()

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push('/')}
          >
            <Plane className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Baggage Checker
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </a>
            <a 
              href="/how-it-works"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              How It Works
            </a>
            <a 
              href="/faq"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              FAQ
            </a>
          </div>

          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
