import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'Dinidu Gardens'
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1A1A1A 0%, #C5A059 100%)',
          borderRadius: '24%',
          border: '1.5px solid rgba(197, 160, 89, 0.3)',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: '#FFFFFF',
            fontWeight: 800,
            fontFamily: 'serif',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          D
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}
