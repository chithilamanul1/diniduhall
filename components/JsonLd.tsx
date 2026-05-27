import React from 'react'

export const JsonLd = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    name: 'Dinidu Gardens Banquet Hall',
    description:
      'Premier banquet hall and wedding venue in Seeduwa, Sri Lanka. Elegant facilities for weddings, corporate events, and celebrations.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Seeduwa',
      addressLocality: 'Seeduwa',
      addressRegion: 'Western Province',
      postalCode: '11410',
      addressCountry: 'LK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '7.1234', // Approximate, user should update
      longitude: '79.8901', // Approximate, user should update
    },
    url: 'https://dinidugardens.lk',
    telephone: '+94771234567', // Placeholder
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '22:00',
      },
    ],
    image: [
      'https://dinidugardens.lk/images/og-image.jpg',
    ],
    priceRange: '$$$',
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Free Parking',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Air Conditioning',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Outdoor Space',
        value: true,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
