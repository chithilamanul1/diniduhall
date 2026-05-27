import { ImageResponse } from 'next/og'
import { promises as fs } from 'fs'
import path from 'path'

export const runtime = 'nodejs'

export const alt = 'Dinidu Gardens'
export const size = { width: 192, height: 192 }
export const contentType = 'image/png'

export default async function Icon() {
  const imagePath = path.join(process.cwd(), 'app', 'logo-source.jpg');
  const buffer = await fs.readFile(imagePath);
  const base64Image = buffer.toString('base64');
  const src = `data:image/jpeg;base64,${base64Image}`;

  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <img src={src} width="192" height="192" style={{ objectFit: 'cover' }} />
      </div>
    ),
    { ...size }
  )
}
