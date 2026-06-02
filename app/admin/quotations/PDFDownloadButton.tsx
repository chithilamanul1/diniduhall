'use client'

import React from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { QuotationPDF, QuotationItem } from './QuotationPDF'
import { DownloadIcon } from 'lucide-react'

interface PDFDownloadButtonProps {
  clientName: string
  eventDate: string
  items: QuotationItem[]
  letterContent: string
  logoUrl: string
}

export default function PDFDownloadButton({ clientName, eventDate, items, letterContent, logoUrl }: PDFDownloadButtonProps) {
  return (
    <PDFDownloadLink
      document={<QuotationPDF clientName={clientName} eventDate={eventDate} items={items} letterContent={letterContent} logoUrl={logoUrl} />}
      fileName={`Quotation_${clientName.replace(/\s+/g, '_') || 'Draft'}.pdf`}
      className="w-full block py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-semibold transition-all"
    >
      {/* @ts-ignore */}
      {({ loading }: any) => (loading ? 'Preparing document...' : <span className="flex items-center justify-center gap-2"><DownloadIcon size={18}/> Download PDF</span>)}
    </PDFDownloadLink>
  )
}
