import "./globals.css"
import React from "react"
import { Providers } from "@/components/Providers"
import { LayoutShell } from "@/components/LayoutShell"

export const metadata = {
  metadataBase: new URL("https://dinidugardens.lk"),
  title: {
    default: "Dinidu Gardens | Best Banquet Halls & Wedding Venues in Seeduwa, Sri Lanka",
    template: "%s | Dinidu Gardens - Premier Event Venue"
  },
  description:
    "Dinidu Gardens is the premier banquet hall, wedding venue, and event space in Seeduwa, Sri Lanka. Elegant facilities for weddings, corporate events, and fine dining at our Road House Restaurant.",
  keywords: [
    "seeduwa", "reception hall sri lanka", "airport garden seeduwa", "airport villa seeduwa",
    "amora lagoon seeduwa", "aradhana reception hall in galle", "double mango villa seeduwa",
    "ganemulla reception hall", "green garden reception hall colombo", "homagama reception hall",
    "kelaniya reception hall", "kiribathgoda reception hall", "mango villa seeduwa", "nathaliya seeduwa",
    "onreech seeduwa", "ramada seeduwa", "randoni villa seeduwa", "reception hall gampaha",
    "reception hall in colombo", "reception hall in galle", "reception hall in negombo",
    "reception hall in wattala", "rooms in seeduwa", "rooms seeduwa", "royal ramesses seeduwa",
    "sanovin wellampitiya", "sasha seeduwa rooms", "seeduwa reception hall", "seeduwa royal ramesses",
    "seeduwa sri lanka", "thevni hotel padukka", "thevni padukka", "travel zone seeduwa",
    "villa aradhana seeduwa", "wattala reception hall", "wedding reception hall in colombo",
    "banquet hall sri lanka", "banquet hall seeduwa", "dinidu gardens", "dinidu hall",
    "seeduwa banquet halls", "ja-ela banquet halss", "best banquet hall in seeduwa"
  ],
  authors: [{ name: "Dinidu Gardens" }, { name: "Chithila Manul", url: "https://seranex.org" }],
  creator: "Chithila Manul",
  publisher: "Seranex Lanka",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Dinidu Gardens | Premier Banquet Halls & Wedding Venues in Sri Lanka",
    description:
      "Celebrate your life's most meaningful moments at Dinidu Gardens, Seeduwa. We offer the perfect, lush tropical venue for your dream weddings and corporate events. Explore our spaces today!",
    url: "https://dinidugardens.lk",
    siteName: "Dinidu Gardens",
    images: [
      {
        url: "https://dinidugardens.lk/images/weddings/weddings-1779990512674-143.jpeg",
        width: 1200,
        height: 630,
        alt: "Dinidu Gardens Banquet Hall - Luxury Event Venue Sri Lanka",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dinidu Gardens | Top Banquet Halls & Wedding Venues Sri Lanka",
    description: "Elegant event spaces, lush gardens, and exceptional dining at Dinidu Gardens in Seeduwa, Sri Lanka.",
    images: ["https://dinidugardens.lk/images/catering/catering-1779990512775-246.jpeg"],
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
