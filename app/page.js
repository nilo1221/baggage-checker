import { airlines } from '../lib/airlines'

const AirlineLogo = ({ id }) => {
  const logos = {
    ryanair: (
      <svg viewBox="0 0 120 60" className="h-10 w-auto" fill="none">
        <path d="M10,40 L25,25 L40,40 L55,30 L70,40" stroke="#073590" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M70,38 L110,30" stroke="#073590" strokeWidth="3" strokeLinecap="round" />
        <path d="M75,36 L85,44" stroke="#F1C933" strokeWidth="3" strokeLinecap="round" />
        <text x="60" y="56" textAnchor="middle" fill="#073590" fontSize="16" fontWeight="bold" fontFamily="Arial, sans-serif">RYANAIR</text>
      </svg>
    ),
    wizzair: (
      <svg viewBox="0 0 120 60" className="h-10 w-auto" fill="none">
        <text x="60" y="40" textAnchor="middle" fill="#5E2E91" fontSize="22" fontWeight="bold" fontFamily="Arial, sans-serif">wizz air</text>
        <path d="M25,48 Q40,42 60,48 T95,48" stroke="#5E2E91" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    ),
    easyjet: (
      <svg viewBox="0 0 120 60" className="h-10 w-auto" fill="none">
        <text x="60" y="42" textAnchor="middle" fill="#F36B20" fontSize="24" fontWeight="bold" fontFamily="Arial, sans-serif">easyJet</text>
        <circle cx="112" cy="35" r="5" fill="#F36B20" />
      </svg>
    ),
    britishairways: (
      <svg viewBox="0 0 120 70" className="h-10 w-auto" fill="none">
        <path d="M10,20 L120,20" stroke="#C8102E" strokeWidth="4" />
        <path d="M10,32 L120,32" stroke="#001F5C" strokeWidth="8" />
        <path d="M10,44 L120,44" stroke="#C8102E" strokeWidth="4" />
        <text x="60" y="62" textAnchor="middle" fill="#001F5C" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="1">BRITISH AIRWAYS</text>
      </svg>
    ),
    airfrance: (
      <svg viewBox="0 0 120 70" className="h-10 w-auto" fill="none">
        <path d="M10,25 Q30,20 50,25 T90,25" stroke="#EF3340" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M10,32 Q30,27 50,32 T90,32" stroke="#002157" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M10,39 Q30,34 50,39 T90,39" stroke="#EF3340" strokeWidth="3" fill="none" strokeLinecap="round" />
        <text x="60" y="60" textAnchor="middle" fill="#002157" fontSize="18" fontWeight="bold" fontFamily="Arial, sans-serif">Air France</text>
      </svg>
    ),
    klm: (
      <svg viewBox="0 0 120 70" className="h-10 w-auto" fill="none">
        <path d="M60,10 L65,20 L75,20 L67,28 L70,38 L60,32 L50,38 L53,28 L45,20 L55,20 Z" fill="#00A1DE" stroke="#00A1DE" strokeWidth="1" />
        <text x="60" y="60" textAnchor="middle" fill="#00A1DE" fontSize="22" fontWeight="bold" fontFamily="Arial, sans-serif">KLM</text>
      </svg>
    )
  }

  return logos[id] || null
}

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
                className="flex flex-col items-center justify-center flex-shrink-0 mx-5 px-10 py-6 rounded-2xl bg-white/95 backdrop-blur-md border border-white/30 shadow-2xl min-w-[220px] h-32 transform transition-all duration-300 hover:-translate-y-2 hover:bg-white group"
              >
                <AirlineLogo id={air.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
