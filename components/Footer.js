import Link from 'next/link'

const footerLinks = {
  shop: [
    { href: '/shop', label: 'Shop' },
    { href: '/shop', label: 'Cabin Cases' },
    { href: '/shop', label: 'Backpacks' },
    { href: '/shop', label: 'Suitcase Sets' }
  ],
  company: [
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/faq', label: 'FAQ' }
  ],
  legal: [
    { href: 'https://flightknight.com/pages/affiliates', label: 'Affiliate Program' },
    { href: 'https://flightknight.com/pages/privacy-policy-1', label: 'Privacy Policy' }
  ]
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">✈️</span>
              <span className="text-xl font-bold text-white">
                Pack & Fly
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              Find the perfect Flight Knight luggage for your next flight. Fast, free, and airline-compliant.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
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
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link) => (
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
            <ul className="space-y-2 text-sm">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p> 2024 Pack & Fly. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Powered by Flight Knight — Affiliate links used throughout the site.
          </p>
        </div>
      </div>
    </footer>
  )
}
