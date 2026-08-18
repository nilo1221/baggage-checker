import './globals.css'

export const metadata = {
  title: 'Baggage Checker - Ryanair & Wizz Air',
  description: 'Find the perfect Flight Knight baggage for your Ryanair or Wizz Air flight',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
