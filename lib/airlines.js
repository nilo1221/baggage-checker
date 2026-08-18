export const airlines = [
  { id: 'ryanair', name: 'Ryanair', color: 'bg-blue-600', country: 'Ireland', lat: 53.4, lng: -6.3 },
  { id: 'wizzair', name: 'Wizz Air', color: 'bg-purple-600', country: 'Hungary', lat: 47.5, lng: 19.0 },
  { id: 'easyjet', name: 'easyJet', color: 'bg-orange-600', country: 'UK', lat: 51.5, lng: -0.2 },
  { id: 'britishairways', name: 'British Airways', color: 'bg-blue-800', country: 'UK', lat: 51.5, lng: 0.0 },
  { id: 'airfrance', name: 'Air France', color: 'bg-blue-500', country: 'France', lat: 48.9, lng: 2.3 },
  { id: 'klm', name: 'KLM', color: 'bg-blue-700', country: 'Netherlands', lat: 52.3, lng: 4.8 }
]

export const ticketTypes = {
  ryanair: [
    { id: 'standard', name: 'Standard', tag: 'Free Bag', description: 'Small personal bag under seat' },
    { id: 'priority', name: 'Priority', tag: 'Cabin Bag', description: 'Small bag + cabin bag' },
    { id: 'flexi', name: 'Flexi Plus', tag: 'All Included', description: 'All baggage included' }
  ],
  wizzair: [
    { id: 'basic', name: 'Basic', tag: 'Free Bag', description: 'Small personal bag under seat' },
    { id: 'wizzgo', name: 'WIZZ Go', tag: 'Cabin Bag', description: 'Small bag + cabin bag' },
    { id: 'wizzplus', name: 'WIZZ Plus', tag: 'All Included', description: 'All baggage included' }
  ],
  easyjet: [
    { id: 'standard', name: 'Standard', tag: 'Free Bag', description: 'Small bag under seat' },
    { id: 'flexi', name: 'Flexi', tag: 'Cabin Bag', description: 'Cabin bag included' }
  ],
  britishairways: [
    { id: 'economy', name: 'Economy', tag: 'Cabin Bag', description: 'Cabin bag included' },
    { id: 'business', name: 'Business', tag: 'All Included', description: 'Multiple bags included' }
  ],
  airfrance: [
    { id: 'economy', name: 'Economy', tag: 'Cabin Bag', description: 'Cabin bag included' },
    { id: 'business', name: 'Business', tag: 'All Included', description: 'Multiple bags included' }
  ],
  klm: [
    { id: 'economy', name: 'Economy', tag: 'Cabin Bag', description: 'Cabin bag included' },
    { id: 'business', name: 'Business', tag: 'All Included', description: 'Multiple bags included' }
  ]
}

export const products = {
  ryanair: {
    standard: {
      name: '40x20x25cm Travel Backpack',
      description: 'Perfect for Ryanair Standard (free personal bag)',
      features: ['Fits under seat', 'Free with Standard ticket', 'Lightweight & durable'],
      price: '£24.99',
      image: '🎒',
      category: 'backpacks'
    },
    priority: {
      name: '40x30x20cm Travel Backpack',
      description: 'Ideal for Ryanair Priority (cabin bag)',
      features: ['Overhead locker size', 'Priority boarding required', 'Laptop compartment'],
      price: '£24.99',
      image: '🎒',
      category: 'cabin-cases'
    },
    flexi: {
      name: '55x40x20cm Travel Backpack',
      description: 'Maximum size for Ryanair Flexi Plus',
      features: ['Largest cabin size', 'All baggage included', 'Premium features'],
      price: '£24.99',
      image: '🎒',
      category: 'cabin-cases'
    }
  },
  wizzair: {
    basic: {
      name: '40x30x20cm Travel Backpack',
      description: 'Perfect for Wizz Air Basic (free personal bag)',
      features: ['Fits under seat', 'Free with Basic ticket', 'Lightweight & durable'],
      price: '£24.99',
      image: '🎒',
      category: 'backpacks'
    },
    wizzgo: {
      name: '55x40x20cm Travel Backpack',
      description: 'Ideal for Wizz Air WIZZ Go (cabin bag)',
      features: ['Overhead locker size', 'WIZZ Go fare required', 'Laptop compartment'],
      price: '£24.99',
      image: '🎒',
      category: 'cabin-cases'
    },
    wizzplus: {
      name: '55x40x20cm Travel Backpack',
      description: 'Maximum size for Wizz Air WIZZ Plus',
      features: ['Largest cabin size', 'All baggage included', 'Premium features'],
      price: '£24.99',
      image: '🎒',
      category: 'cabin-cases'
    }
  },
  easyjet: {
    standard: {
      name: '45x36x20cm Travel Backpack',
      description: 'Perfect for easyJet Standard (free cabin bag)',
      features: ['Overhead locker size', 'Free with Standard ticket', 'Laptop compartment'],
      price: '£24.99',
      image: '🎒',
      category: 'cabin-cases'
    },
    flexi: {
      name: '55x40x20cm Travel Backpack',
      description: 'Maximum size for easyJet Flexi',
      features: ['Largest cabin size', 'All baggage included', 'Premium features'],
      price: '£24.99',
      image: '🎒',
      category: 'cabin-cases'
    }
  },
  britishairways: {
    economy: {
      name: '55x40x20cm Travel Backpack',
      description: 'Perfect for British Airways Economy',
      features: ['Overhead locker size', 'Fits BA requirements', 'Laptop compartment'],
      price: '£24.99',
      image: '🎒',
      category: 'cabin-cases'
    },
    business: {
      name: '55x40x20cm Travel Backpack',
      description: 'Premium choice for British Airways Business',
      features: ['Largest cabin size', 'Premium features', 'Business travel ready'],
      price: '£24.99',
      image: '🎒',
      category: 'cabin-cases'
    }
  },
  airfrance: {
    economy: {
      name: '55x35x25cm Travel Backpack',
      description: 'Perfect for Air France Economy',
      features: ['Fits AF maximum dimensions', 'Overhead locker size', 'Laptop compartment'],
      price: '£24.99',
      image: '🎒',
      category: 'cabin-cases'
    },
    business: {
      name: '55x35x25cm Travel Backpack',
      description: 'Premium choice for Air France Business',
      features: ['Fits AF maximum dimensions', 'Premium features', 'Business travel ready'],
      price: '£24.99',
      image: '🎒',
      category: 'cabin-cases'
    }
  },
  klm: {
    economy: {
      name: '55x35x25cm Travel Backpack',
      description: 'Perfect for KLM Economy',
      features: ['Fits KLM maximum dimensions', 'Overhead locker size', 'Laptop compartment'],
      price: '£24.99',
      image: '🎒',
      category: 'cabin-cases'
    },
    business: {
      name: '55x35x25cm Travel Backpack',
      description: 'Premium choice for KLM Business',
      features: ['Fits KLM maximum dimensions', 'Premium features', 'Business travel ready'],
      price: '£24.99',
      image: '🎒',
      category: 'cabin-cases'
    }
  }
}

export const airlineNames = {
  ryanair: 'Ryanair',
  wizzair: 'Wizz Air',
  easyjet: 'easyJet',
  britishairways: 'British Airways',
  airfrance: 'Air France',
  klm: 'KLM'
}

export const ticketNames = {
  ryanair: { standard: 'Standard', priority: 'Priority', flexi: 'Flexi Plus' },
  wizzair: { basic: 'Basic', wizzgo: 'WIZZ Go', wizzplus: 'WIZZ Plus' },
  easyjet: { standard: 'Standard', flexi: 'Flexi' },
  britishairways: { economy: 'Economy', business: 'Business' },
  airfrance: { economy: 'Economy', business: 'Business' },
  klm: { economy: 'Economy', business: 'Business' }
}
