'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRightIcon, ArrowLeftIcon } from './Icons'

const vibeOptions = [
  { value: 'city', label: 'Centro città' },
  { value: 'beach', label: 'Vicino al mare' },
  { value: 'mountain', label: 'Vicino alla montagna' },
  { value: 'countryside', label: 'Campagna' },
]

const distanceOptions = [
  { value: '0.5', label: '0.5 km' },
  { value: '1', label: '1 km' },
  { value: '3', label: '3 km' },
  { value: '5', label: '5 km' },
  { value: '10', label: '10 km' },
  { value: 'any', label: 'Non importa' },
]

const propertyOptions = [
  { value: '', label: 'Non importa' },
  { value: '204', label: 'Hotel' },
  { value: '216', label: 'B&B' },
  { value: '226', label: 'Resort' },
  { value: '224', label: 'Aparthotel' },
]

const wizardAmenities = [
  { label: 'Piscina', code: '433' },
  { label: 'Parcheggio', code: '2' },
  { label: 'Terrazza', code: '15' },
  { label: 'Giardino', code: '14' },
  { label: 'Spa', code: '107' },
  { label: 'Pet-friendly', code: '4' },
]

function CompassIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M16.24 7.76l-4.24 8.48-4.24-8.48 8.48 4.24-8.48-4.24z" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

export default function HotelWizard() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({
    location: '',
    vibe: '',
    distance: 'any',
    budget: '',
    propertyType: '',
    amenities: [],
  })
  const [visible, setVisible] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [step])

  const update = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const toggleAmenity = (code) => {
    setAnswers((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(code)
        ? prev.amenities.filter((c) => c !== code)
        : [...prev.amenities, code],
    }))
  }

  const goToResults = () => {
    const params = new URLSearchParams()
    if (answers.location.trim()) params.set('location', answers.location.trim())
    if (answers.vibe) params.set('vibe', answers.vibe)
    if (answers.distance && answers.distance !== 'any') params.set('distance', answers.distance)
    if (answers.budget) params.set('budget', answers.budget)
    if (answers.propertyType) params.set('propertyType', answers.propertyType)
    if (answers.amenities.length) params.set('amenities', answers.amenities.join(','))
    router.push(`/destinations?${params.toString()}`)
  }

  const next = () => setStep((s) => s + 1)
  const back = () => setStep((s) => Math.max(s - 1, 0))
  const restart = () => {
    setAnswers({ location: '', vibe: '', distance: 'any', budget: '', propertyType: '', amenities: [] })
    setStep(0)
  }

  const totalSteps = 7
  const progress = step / totalSteps

  const NextBtn = ({ onClick, disabled, label = 'Avanti' }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors inline-flex items-center gap-2"
    >
      {label} <ArrowRightIcon className="w-4 h-4" />
    </button>
  )

  const BackBtn = ({ onClick }) => (
    <button
      onClick={onClick}
      className="text-sm text-blue-300 hover:text-white py-2 inline-flex items-center gap-1 transition-colors"
    >
      <ArrowLeftIcon className="w-4 h-4" /> Indietro
    </button>
  )

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <p className="text-blue-200 mb-4">
              Ciao! Sono il tuo assistente per trovare il soggiorno perfetto. Ti farò qualche domanda e poi ti mostrerò le migliori opzioni su Booking.com.
            </p>
            <NextBtn onClick={next} label="Inizia" />
          </div>
        )
      case 1:
        return (
          <div>
            <p className="text-blue-200 mb-3">Dove vuoi andare?</p>
            <input
              type="text"
              value={answers.location}
              onChange={(e) => update('location', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && answers.location.trim() && next()}
              placeholder="es. Veneto, Barcelona, Parigi"
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-blue-300 outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <div className="flex gap-2">
              <NextBtn onClick={next} disabled={!answers.location.trim()} />
            </div>
          </div>
        )
      case 2:
        return (
          <div>
            <p className="text-blue-200 mb-3">Che atmosfera cerchi?</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {vibeOptions.map((o) => (
                <button
                  key={o.value}
                  onClick={() => { update('vibe', o.value); next() }}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                    answers.vibe === o.value
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-white/5 border-white/10 text-blue-200 hover:bg-white/10'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <BackBtn onClick={back} />
          </div>
        )
      case 3:
        return (
          <div>
            <p className="text-blue-200 mb-3">A quanti km max dal centro o dall’attrazione?</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {distanceOptions.map((o) => (
                <button
                  key={o.value}
                  onClick={() => { update('distance', o.value); next() }}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                    answers.distance === o.value
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-white/5 border-white/10 text-blue-200 hover:bg-white/10'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <BackBtn onClick={back} />
          </div>
        )
      case 4:
        return (
          <div>
            <p className="text-blue-200 mb-3">Quanto vuoi spendere al massimo a notte?</p>
            <input
              type="number"
              min={0}
              value={answers.budget}
              onChange={(e) => update('budget', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && next()}
              placeholder="€"
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-blue-300 outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <div className="flex gap-4 items-center">
              <BackBtn onClick={back} />
              <NextBtn onClick={next} />
            </div>
          </div>
        )
      case 5:
        return (
          <div>
            <p className="text-blue-200 mb-3">Che tipo di struttura preferisci?</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {propertyOptions.map((o) => (
                <button
                  key={o.value}
                  onClick={() => { update('propertyType', o.value); next() }}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                    answers.propertyType === o.value
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-white/5 border-white/10 text-blue-200 hover:bg-white/10'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <BackBtn onClick={back} />
          </div>
        )
      case 6:
        return (
          <div>
            <p className="text-blue-200 mb-3">Che servizi sono indispensabili?</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {wizardAmenities.map((a) => (
                <button
                  key={a.code}
                  onClick={() => toggleAmenity(a.code)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                    answers.amenities.includes(a.code)
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-white/5 border-white/10 text-blue-200 hover:bg-white/10'
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
            <div className="flex gap-4 items-center">
              <BackBtn onClick={back} />
              <NextBtn onClick={next} label="Vedi risultati" />
            </div>
          </div>
        )
      case 7:
        return (
          <div>
            <p className="text-blue-200 mb-3">Perfetto! Ecco il riepilogo delle tue preferenze:</p>
            <ul className="text-sm text-white space-y-1 mb-4">
              <li><strong>Dove:</strong> {answers.location}</li>
              <li><strong>Atmosfera:</strong> {vibeOptions.find((v) => v.value === answers.vibe)?.label}</li>
              <li><strong>Distanza max:</strong> {answers.distance === 'any' ? 'Non importa' : `${answers.distance} km`}</li>
              <li><strong>Budget max:</strong> {answers.budget ? `€${answers.budget}` : 'Non indicato'}</li>
              <li><strong>Struttura:</strong> {propertyOptions.find((p) => p.value === answers.propertyType)?.label || 'Non importa'}</li>
              <li>
                <strong>Servizi:</strong>{' '}
                {answers.amenities.length
                  ? answers.amenities.map((c) => wizardAmenities.find((a) => a.code === c)?.label).join(', ')
                  : 'Nessuno specifico'}
              </li>
            </ul>
            <p className="text-blue-200 mb-4">
              Secondo me queste opzioni rientrano nella tua scelta. Vuoi vederle e prenotare?
            </p>
            <button onClick={goToResults} className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-colors mb-2 inline-flex items-center justify-center gap-2">
              Vedi mete consigliate <ArrowRightIcon className="w-4 h-4" />
            </button>
            <button onClick={restart} className="w-full py-2 text-sm text-blue-300 hover:text-white transition-colors">
              Ricomincia
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6 overflow-hidden shadow-2xl">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/30">
          <CompassIcon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-grow">
          <h2 className="font-bold text-lg">Assistente di viaggio</h2>
          <p className="text-xs text-blue-200">Trova il soggiorno perfetto in 7 domande</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-blue-200 border border-white/10">
          {Math.min(step + 1, totalSteps)}/{totalSteps}
        </div>
      </div>

      <div className="w-full bg-white/10 rounded-full h-2 mb-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-indigo-400 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="flex justify-between mb-6 gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border transition-all ${
              i < step
                ? 'bg-blue-600 border-blue-500 text-white'
                : i === step
                ? 'bg-white/20 border-blue-400 text-white shadow-[0_0_12px_rgba(59,130,246,0.5)]'
                : 'bg-white/5 border-white/10 text-blue-300'
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div
        key={step}
        className={`min-h-[140px] transition-all duration-300 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        {renderStep()}
      </div>
    </div>
  )
}
