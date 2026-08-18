import './globals.css'
import Script from 'next/script'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Pack & Fly - Airline Cabin Bag Finder',
  description: 'Find the perfect Flight Knight luggage for your flight. Compare airline baggage rules in seconds.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Script
          src="https://www.anrdoezrs.net/am/101863603/include/allCj/impressions/page/am.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
