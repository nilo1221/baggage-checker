'use client'

import Link from 'next/link'
import { getDeepLink } from '../../lib/affiliate'
import Button from '../../components/Button'
import { QuestionIcon, ArrowLeftIcon, ArrowRightIcon } from '../../components/Icons'

const faqs = [
  {
    question: "What is the difference between Ryanair Standard and Priority?",
    answer: "Ryanair Standard allows one small personal bag (40x20x25cm) that must fit under the seat. Priority boarding allows one small bag plus one cabin bag (55x40x20cm) that goes in the overhead locker."
  },
  {
    question: "Can I use Flight Knight backpacks on other airlines?",
    answer: "Yes! Flight Knight backpacks are designed to fit multiple airline policies. Check the specific dimensions for your airline, but most models are compatible with 35+ airlines worldwide."
  },
  {
    question: "What is Wizz Air Basic baggage allowance?",
    answer: "Wizz Air Basic includes one small personal bag (40x30x20cm) that must fit under the seat. For larger bags, you need WIZZ Go or WIZZ Plus fares."
  },
  {
    question: "Are Flight Knight bags durable?",
    answer: "Flight Knight bags are made from high-quality materials with durable zippers and reinforced stitching. They come with a 5-year warranty when registered."
  },
  {
    question: "Do Flight Knight backpacks have laptop compartments?",
    answer: "Yes, most Flight Knight backpacks include dedicated laptop compartments, making them perfect for business travelers and digital nomads."
  },
  {
    question: "What if my airline changes their baggage policy?",
    answer: "Airline policies can change. Always verify the current baggage allowance on your airline's website before traveling. Flight Knight bags are designed to be versatile for multiple scenarios."
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Button href="/" variant="ghost" className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800">
            <ArrowLeftIcon className="w-4 h-4" /> Back to Checker
          </Button>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-2 mb-2">
              <QuestionIcon className="w-9 h-9 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">
                Frequently Asked Questions
              </h1>
            </div>
            <p className="text-gray-600 mb-8">
              Common questions about airline baggage policies and Flight Knight products
            </p>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-2">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-4">
                Check your airline's official website for the most up-to-date baggage policies.
              </p>
              <Button
                href={getDeepLink('/')}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <span>Browse Flight Knight Products</span>
                <ArrowRightIcon className="w-4 h-4" />
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
