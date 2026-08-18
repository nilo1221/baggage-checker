'use client'

import Button from '../../components/Button'
import { AirplaneIcon, TicketIcon, BackpackIcon, CartIcon, CheckIcon, ArrowLeftIcon, ArrowRightIcon, ClipboardIcon } from '../../components/Icons'

const stepIcons = {
  1: AirplaneIcon,
  2: TicketIcon,
  3: BackpackIcon,
  4: CartIcon
}

const steps = [
  {
    number: 1,
    title: "Select Your Airline",
    description: "Choose between Ryanair or Wizz Air - the two most popular budget airlines in Europe."
  },
  {
    number: 2,
    title: "Choose Your Ticket Type",
    description: "Select the type of ticket you have - Standard, Priority, or Flexi for Ryanair; Basic, WIZZ Go, or WIZZ Plus for Wizz Air."
  },
  {
    number: 3,
    title: "Get Your Recommendation",
    description: "We'll show you the perfect Flight Knight backpack that meets your airline's baggage requirements."
  },
  {
    number: 4,
    title: "Shop on Flight Knight",
    description: "Click the affiliate link to purchase your recommended backpack directly from Flight Knight."
  }
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Button href="/" variant="ghost" className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800">
            <ArrowLeftIcon className="w-4 h-4" /> Back to Checker
          </Button>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-2 mb-2">
              <ClipboardIcon className="w-9 h-9 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">
                How It Works
              </h1>
            </div>
            <p className="text-gray-600 mb-8">
              Find the perfect baggage for your flight in 4 simple steps
            </p>

            <div className="space-y-8">
              {steps.map((step) => (
                <div key={step.number} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {(() => {
                        const IconComponent = stepIcons[step.number]
                        return <IconComponent className="w-6 h-6 text-blue-600" />
                      })()}
                      <h3 className="text-xl font-semibold text-gray-800">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-2">
                Why Use Our Checker?
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-emerald-500" /> Save time - no need to search multiple airline websites</li>
                <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-emerald-500" /> Avoid fees - get the right size the first time</li>
                <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-emerald-500" /> Quality products - Flight Knight bags are durable and affordable</li>
                <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-emerald-500" /> Support us - using our affiliate links helps keep this service free</li>
              </ul>
            </div>

            <div className="mt-8 text-center">
              <Button href="/" className="inline-flex items-center gap-2 text-lg">
                Start Checking Now <ArrowRightIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Powered by Flight Knight - Quality travel luggage at affordable prices</p>
          </div>
        </div>
      </div>
    </div>
  )
}
