export default function TestPage() {
  return (
    <div style={{ padding: '100px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Diagnostic Route: SUCCESS</h1>
      <p>If you can see this, the Vercel router is working for sub-pages.</p>
      <p>Current Time: {new Date().toISOString()}</p>
    </div>
  )
}
