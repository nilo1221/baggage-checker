import './globals.css'
import Script from 'next/script'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'https://baggage-checker-yqf9.vercel.app'
  ),
  title: {
    default: 'Pack & Fly - Airline Cabin Bag Finder',
    template: '%s | Pack & Fly',
  },
  description:
    'Find the perfect Flight Knight luggage for your flight. Compare airline baggage rules and book hotels in seconds.',
  keywords: [
    'cabin bag',
    'airline luggage',
    'Flight Knight',
    'Ryanair bag',
    'Wizz Air bag',
    'travel backpack',
    'hand luggage',
    'cabin baggage allowance',
  ],
  openGraph: {
    title: 'Pack & Fly - Airline Cabin Bag Finder',
    description:
      'Find the perfect Flight Knight luggage for your flight. Compare airline baggage rules and book hotels in seconds.',
    url: '/',
    siteName: 'Pack & Fly',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pack & Fly - Airline Cabin Bag Finder',
    description:
      'Find the perfect Flight Knight luggage for your flight. Compare airline baggage rules and book hotels in seconds.',
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8C0LLLJQQ3"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8C0LLLJQQ3');
            `,
          }}
        />
      </body>
    </html>
  )
}
