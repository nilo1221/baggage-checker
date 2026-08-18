'use client'

import { useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { divIcon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const priceIcon = (price) =>
  divIcon({
    className: 'custom-price-marker',
    html: `<div class="flex items-center justify-center px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-lg border border-white/50 whitespace-nowrap">${price}</div>`,
    iconSize: [60, 24],
    iconAnchor: [30, 12]
  })

export default function DestinationsMap({ destinations, getHotelLink }) {
  const center = useMemo(() => {
    if (!destinations.length) return [48.8566, 2.3522]
    const lat = destinations.reduce((s, d) => s + d.lat, 0) / destinations.length
    const lng = destinations.reduce((s, d) => s + d.lng, 0) / destinations.length
    return [lat, lng]
  }, [destinations])

  const extractPrice = (tagline) => {
    const match = tagline.match(/€\d+/)
    return match ? match[0] : ''
  }

  return (
    <MapContainer
      center={center}
      zoom={4}
      minZoom={3}
      scrollWheelZoom={true}
      className="h-full w-full rounded-2xl z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {destinations.map((dest) => (
        <Marker
          key={dest.id}
          position={[dest.lat, dest.lng]}
          icon={priceIcon(extractPrice(dest.tagline))}
        >
          <Popup>
            <div className="text-gray-900 min-w-[180px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{dest.emoji}</span>
                <h3 className="font-bold text-lg">{dest.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-1">{dest.country}</p>
              <p className="text-sm font-semibold text-blue-600 mb-2">{dest.tagline}</p>
              <a
                href={getHotelLink(dest.name)}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="inline-block w-full text-center bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Find hotels in {dest.name}
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
