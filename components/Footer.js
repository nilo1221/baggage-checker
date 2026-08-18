import Link from 'next/link'
import { AirplaneIcon, CheckIcon, MapIcon, SuitcaseIcon } from './Icons'

const footerLinks = {
  shop: [
    { href: '/shop', label: 'All Products' },
    { href: '/shop?category=Backpacks', label: 'Backpacks' },
    { href: '/shop?category=Cabin+Cases', label: 'Cabin Cases' },
    { href: '/shop?category=Suitcase+Sets', label: 'Suitcase Sets' }
  ],
  explore: [
    { href: '/destinations', label: 'Destinations' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/faq', label: 'FAQ' }
  ],
  legal: [
    { href: 'https://flightknight.com/pages/affiliates', label: 'Affiliate Program', external: true },
    { href: 'https://flightknight.com/pages/privacy-policy-1', label: 'Privacy Policy', external: true }
  ]
}

export default function Footer() {
  return (
    <footer className="bg-slate-950/80 backdrop-blur-xl border-t border-white/10 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <AirplaneIcon className="w-7 h-7 text-blue-400" />
              <span className="text-xl font-bold text-white">
                Pack & Fly
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm mb-6">
              Find the perfect Flight Knight luggage for your next flight. Fast, free, and airline-compliant.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                <CheckIcon className="w-3 h-3 text-emerald-400" /> Airline Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                <CheckIcon className="w-3 h-3 text-emerald-400" /> Free Comparison
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                <CheckIcon className="w-3 h-3 text-emerald-400" /> Affiliate Deals
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <p className="text-sm text-gray-500 text-center lg:text-left">
              {new Date().getFullYear()} Pack & Fly. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 text-center">
              Powered by Flight Knight — Affiliate links used throughout the site.
            </p>
            <div className="flex justify-center lg:justify-end items-center space-x-4 text-sm text-gray-500">
              <span className="inline-flex items-center gap-1.5">
                <MapIcon className="w-4 h-4" /> OpenStreetMap
              </span>
              <span className="inline-flex items-center gap-1.5">
                <SuitcaseIcon className="w-4 h-4" /> Flight Knight
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
