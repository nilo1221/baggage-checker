export default function Home() {
  return (
    <div className="min-h-screen bg-white">
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
    </div>
  )
}
