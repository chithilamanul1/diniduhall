import "./globals.css"
import React from "react"
import { Providers } from "@/components/Providers"
import { LayoutShell } from "@/components/LayoutShell"

export const metadata = {
  metadataBase: new URL("https://diniduhall.vercel.app"),
  title: {
    default: "Dinidu Gardens | Best Banquet Halls in Sri Lanka | Seeduwa",
    template: "%s | Dinidu Gardens - Premier Event Venue"
  },
  description:
    "Dinidu Gardens is the premier banquet hall and wedding venue in Seeduwa, Sri Lanka. Elegant facilities for weddings, corporate events, and fine dining at our Road House Restaurant.",
  keywords: [
    "banquet halls sri lanka",
    "wedding venues sri lanka",
    "reception halls seeduwa",
    "best banquet hall in seeduwa",
    "wedding reception halls sri lanka",
    "event venues sri lanka",
    "Dinidu Gardens",
    "Road House Restaurant",
    "catering services sri lanka",
  ],
  authors: [{ name: "Dinidu Gardens" }, { name: "Chithila Manul", url: "https://seranex.org" }],
  creator: "Chithila Manul",
  publisher: "Seranex Lanka",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
    telephone: false,
  },
  openGraph: {
    title: "Dinidu Gardens | Premier Banquet Halls & Wedding Venues Sri Lanka",
    description:
      "Celebrate your life's most meaningful moments at Dinidu Gardens, Seeduwa. The perfect venue for weddings and corporate events.",
    url: "https://dinidugardens.lk",
    siteName: "Dinidu Gardens",
    images: [
      {
        url: "/images/business/sssss.webp",
        width: 1200,
        height: 630,
        alt: "Dinidu Gardens Banquet Hall",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dinidu Gardens | Top Banquet Halls Sri Lanka",
    description: "Elegant event spaces and exceptional dining in Seeduwa, Sri Lanka.",
    images: ["/images/business/sssss.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen bg-cream font-body">
        <Providers>
          <LayoutShell>{children}</LayoutShell>
        </Providers>
      </body>
    </html>
  )
}
