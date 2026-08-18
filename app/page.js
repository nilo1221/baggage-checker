import { airlines } from '../lib/airlines'

const AirlineLogo = ({ code }) => (
  <svg width="56" height="56" viewBox="0 0 56 56" className="mb-3">
    <circle cx="28" cy="28" r="28" fill="white" fillOpacity="0.15" />
    <circle cx="28" cy="28" r="25" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
    <text
      x="28"
      y="34"
      textAnchor="middle"
      fill="white"
      fontSize="18"
      fontWeight="bold"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      {code}
    </text>
  </svg>
)

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src="/hero-airplane.jpg"
          alt="Airplane taking off"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-blue-900/80"></div>
        <div className="relative z-10 text-center px-6">
          <span className="text-7xl mb-6 block">✈️</span>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
            Baggage Checker
          </h1>
          <p className="text-2xl md:text-3xl text-blue-100 max-w-3xl mx-auto mb-10">
            Find the perfect Flight Knight luggage for your flight in seconds
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
              <span>✓</span>
              <span>6 Airlines</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
              <span>✓</span>
              <span>Instant Results</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
              <span>✓</span>
              <span>Free to Use</span>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
        <div className="text-center mb-10">
          <p className="text-sm text-blue-300 uppercase tracking-widest mb-2">Official Partners</p>
          <h2 className="text-3xl font-bold text-white">Trusted by 6 major airlines</h2>
        </div>
        <div className="relative carousel-fade">
          <div className="animate-marquee">
            {[...airlines, ...airlines, ...airlines].map((air, index) => (
              <div
                key={`${air.id}-${index}`}
                className="flex-shrink-0 mx-5 px-8 py-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl min-w-[220px] text-center transform transition-all duration-300 hover:-translate-y-2 hover:bg-white/20 group"
              >
                <div className="flex justify-center">
                  <AirlineLogo code={air.code} />
                </div>
                <div className="text-white font-bold text-lg">{air.name}</div>
                <div className="text-blue-200 text-sm mt-1">{air.country}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
