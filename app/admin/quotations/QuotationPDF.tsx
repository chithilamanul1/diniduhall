'use client'

import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer'

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#333333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#D4AF37', // Gold color
    paddingBottom: 20,
  },
  logo: {
    width: 150,
    objectFit: 'contain',
  },
  companyInfo: {
    textAlign: 'right',
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  letterSection: {
    marginBottom: 30,
    lineHeight: 1.5,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 30,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f9fafb',
    padding: 8,
    fontWeight: 'bold',
  },
  tableColHeaderDesc: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f9fafb',
    padding: 8,
    fontWeight: 'bold',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 8,
  },
  tableColDesc: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 8,
  },
  totalRow: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
  },
  totalLabel: {
    width: '75%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 8,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
  },
})

export type QuotationItem = {
  description: string
  quantity: number
  price: number
}

interface QuotationPDFProps {
  clientName: string
  eventDate: string
  letterContent: string
  items: QuotationItem[]
  logoUrl?: string
}

export const QuotationPDF = ({ clientName, eventDate, letterContent, items, logoUrl }: QuotationPDFProps) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header / Letterhead */}
        <View style={styles.header}>
          <View>
            {logoUrl ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={logoUrl} style={styles.logo} />
            ) : (
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#D4AF37' }}>DINIDU GARDENS</Text>
            )}
          </View>
          <View style={styles.companyInfo}>
            <Text>Dinidu Gardens & Caterers</Text>
            <Text>24 Kotugoda Rd, Seeduwa 11410</Text>
            <Text>Sri Lanka</Text>
            <Text>077 770 2044 | info@dinidugardens.lk</Text>
          </View>
        </View>

        {/* Title & Info */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.title}>Quotation</Text>
          <Text style={{ marginBottom: 4 }}><Text style={{ fontWeight: 'bold' }}>Date:</Text> {new Date().toLocaleDateString()}</Text>
          <Text style={{ marginBottom: 4 }}><Text style={{ fontWeight: 'bold' }}>Prepared For:</Text> {clientName}</Text>
          <Text><Text style={{ fontWeight: 'bold' }}>Event Date:</Text> {eventDate}</Text>
        </View>

        {/* AI Generated Letter Content */}
        {letterContent && (
          <View style={styles.letterSection}>
            <Text>{letterContent}</Text>
          </View>
        )}

        {/* Items Table */}
        {items.length > 0 && (
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeaderDesc}><Text>Description</Text></View>
              <View style={styles.tableColHeader}><Text>Quantity</Text></View>
              <View style={styles.tableColHeader}><Text>Amount (LKR)</Text></View>
            </View>
            
            {items.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableColDesc}><Text>{item.description}</Text></View>
                <View style={styles.tableCol}><Text>{item.quantity}</Text></View>
                <View style={styles.tableCol}><Text>{(item.price * item.quantity).toLocaleString()}</Text></View>
              </View>
            ))}

            <View style={styles.totalRow}>
              <View style={styles.totalLabel}><Text>Total</Text></View>
              <View style={styles.tableCol}><Text style={{ fontWeight: 'bold' }}>LKR {total.toLocaleString()}</Text></View>
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Thank you for choosing Dinidu Gardens. This quotation is valid for 30 days.</Text>
        </View>
      </Page>
    </Document>
  )
}
