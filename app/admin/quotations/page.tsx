'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { QuotationItem } from './QuotationPDF'
import { SparklesIcon, PlusIcon, TrashIcon, FileTextIcon, DownloadIcon } from 'lucide-react'

const DynamicPDFButton = dynamic(
  () => import('./PDFDownloadButton'),
  { ssr: false }
)

export default function QuotationGenerator() {
  const [clientName, setClientName] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [items, setItems] = useState<QuotationItem[]>([{ description: '', quantity: 1, price: 0 }])
  const [aiPrompt, setAiPrompt] = useState('Write a warm, welcoming quotation letter for this event.')
  const [letterContent, setLetterContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [logoUrl, setLogoUrl] = useState('')

  useEffect(() => {
    // Load the logo into a data URL so react-pdf can render it correctly
    fetch('/images/dinidu-gardens-logo.png')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch logo')
        return res.blob()
      })
      .then(blob => {
        const reader = new FileReader()
        reader.onloadend = () => setLogoUrl(reader.result as string)
        reader.readAsDataURL(blob)
      })
      .catch((err) => {
        console.error(err)
        setLogoUrl('error') // So it doesn't stay stuck loading forever
      })
  }, [])

  const handleAddItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }])
  }

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const handleItemChange = (index: number, field: keyof QuotationItem, value: any) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const generateLetter = async () => {
    setIsGenerating(true)
    try {
      const res = await fetch('/api/ai/generate-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiPrompt,
          clientName,
          eventDate,
          items
        })
      })
      
      const data = await res.json()
      
      if (data.error) {
        alert('Error: ' + data.error)
      } else {
        setLetterContent(data.text)
      }
    } catch (err) {
      alert('Failed to generate letter. Check console for details.')
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-heading text-neutral-900 tracking-wide uppercase">
          Quotation <span className="font-light italic text-gold">Generator</span>
        </h1>
        <p className="text-neutral-500 font-body mt-2">Generate professional PDF quotations and AI-powered letters.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Editor Form */}
        <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
          <div className="space-y-4">
            <h2 className="text-xl font-heading font-semibold">Client Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-neutral-600 mb-1">Client Name</label>
                <input 
                  type="text" 
                  value={clientName} 
                  onChange={e => setClientName(e.target.value)}
                  className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-gold outline-none"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-600 mb-1">Event Date</label>
                <input 
                  type="text" 
                  value={eventDate} 
                  onChange={e => setEventDate(e.target.value)}
                  className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-gold outline-none"
                  placeholder="e.g. 25th Dec 2026"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-heading font-semibold flex justify-between items-center">
              Line Items
              <button onClick={handleAddItem} className="text-sm flex items-center gap-1 text-gold hover:text-gold/80 bg-gold/10 px-3 py-1 rounded-full transition-colors">
                <PlusIcon size={16} /> Add Item
              </button>
            </h2>
            
            <div className="space-y-3">
              {items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      value={item.description} 
                      onChange={e => handleItemChange(i, 'description', e.target.value)}
                      placeholder="Item Description"
                      className="w-full p-2 border border-neutral-200 rounded-lg text-sm mb-2"
                    />
                    <div className="flex gap-3">
                      <div className="w-1/3">
                        <input 
                          type="number" 
                          value={item.quantity || ''} 
                          onChange={e => handleItemChange(i, 'quantity', parseInt(e.target.value) || 0)}
                          placeholder="Qty"
                          className="w-full p-2 border border-neutral-200 rounded-lg text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <input 
                          type="number" 
                          value={item.price || ''} 
                          onChange={e => handleItemChange(i, 'price', parseInt(e.target.value) || 0)}
                          placeholder="Unit Price (LKR)"
                          className="w-full p-2 border border-neutral-200 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleRemoveItem(i)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <TrashIcon size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI & PDF Column */}
        <div className="space-y-6">
          
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 p-6 rounded-2xl text-white shadow-xl">
            <h2 className="text-xl font-heading font-semibold mb-4 flex items-center gap-2">
              <SparklesIcon className="text-gold" /> AI Letter Generator
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Additional Instructions</label>
                <input 
                  type="text" 
                  value={aiPrompt} 
                  onChange={e => setAiPrompt(e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:border-gold outline-none text-sm"
                />
              </div>
              <button 
                onClick={generateLetter}
                disabled={isGenerating}
                className="w-full py-3 bg-gold hover:bg-gold/90 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isGenerating ? 'Generating...' : 'Generate Letter'}
              </button>
              
              <div>
                <label className="block text-sm text-neutral-400 mb-1 mt-4">Letter Content</label>
                <textarea 
                  value={letterContent} 
                  onChange={e => setLetterContent(e.target.value)}
                  rows={6}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:border-gold outline-none text-sm resize-none"
                  placeholder="AI will write the letter here. You can manually edit it."
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col items-center justify-center text-center h-48 space-y-4">
            <FileTextIcon size={48} className="text-neutral-300" />
            <div>
              <h3 className="font-semibold text-neutral-900">Ready to Export</h3>
              <p className="text-sm text-neutral-500 mb-4">Generate your professional PDF</p>
            </div>
            
            {/* The PDFDownloadLink is dynamically imported to prevent SSR errors */}
            <div className="w-full">
               {logoUrl ? (
                 <DynamicPDFButton 
                   clientName={clientName} 
                   eventDate={eventDate} 
                   items={items} 
                   letterContent={letterContent} 
                   logoUrl={logoUrl === 'error' ? '' : logoUrl} 
                 />
               ) : (
                 <button disabled className="w-full py-3 bg-neutral-200 text-neutral-400 rounded-xl font-semibold">Preparing Document...</button>
               )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
