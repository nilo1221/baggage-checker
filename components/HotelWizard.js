'use client'

import { useState } from 'react'
import { getBookingSearchUrl } from '../lib/travelAffiliate'

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

  const openBooking = () => {
    const url = getBookingSearchUrl({
      location: answers.location,
      propertyType: answers.propertyType,
      amenities: answers.amenities,
      sortBy: 'price',
    })
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const next = () => setStep((s) => s + 1)
  const back = () => setStep((s) => Math.max(s - 1, 0))
  const restart = () => {
    setAnswers({ location: '', vibe: '', distance: 'any', budget: '', propertyType: '', amenities: [] })
    setStep(0)
  }

  const totalSteps = 7

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <p className="text-blue-200 mb-4">
              Ciao! Sono il tuo assistente per trovare il soggiorno perfetto. Ti farò qualche domanda e poi ti mostrerò le migliori opzioni su Booking.com.
            </p>
            <button onClick={next} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
              Inizia
            </button>
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
              <button onClick={next} disabled={!answers.location.trim()} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors">
                Avanti
              </button>
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
            <button onClick={back} className="text-sm text-blue-300 hover:text-white">Indietro</button>
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
            <button onClick={back} className="text-sm text-blue-300 hover:text-white">Indietro</button>
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
              <button onClick={back} className="text-sm text-blue-300 hover:text-white py-2">Indietro</button>
              <button onClick={next} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
                Avanti
              </button>
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
            <button onClick={back} className="text-sm text-blue-300 hover:text-white">Indietro</button>
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
              <button onClick={back} className="text-sm text-blue-300 hover:text-white py-2">Indietro</button>
              <button onClick={next} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
                Vedi risultati
              </button>
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
            <button onClick={openBooking} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors mb-2">
              Prenota su Booking.com
            </button>
            <button onClick={restart} className="w-full py-2 text-sm text-blue-300 hover:text-white">
              Ricomincia
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white">
          AI
        </div>
        <div>
          <h2 className="font-bold text-lg">Travel Assistant</h2>
          <p className="text-xs text-blue-200">Step {Math.min(step + 1, totalSteps)} di {totalSteps}</p>
        </div>
      </div>
      <div className="min-h-[140px]">{renderStep()}</div>
    </div>
  )
}
