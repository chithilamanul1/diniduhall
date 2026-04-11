import React from 'react'
import Link from 'next/link'
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
} from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="mb-6">
              <img
                src="/images/dinidu-gardens-logo.png"
                alt="Dinidu Gardens"
                className="h-20 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="font-body text-sm text-neutral-400 mb-6 leading-relaxed max-w-xs">
              A premier venue in Seeduwa offering elegant banquet facilities and
              exceptional dining experiences at our Road House Restaurant.
            </p>
            <div className="flex flex-col space-y-2">
              <Link
                href="/banquet-hall"
                className="text-gold font-body font-semibold text-sm hover:underline"
              >
                Banquet Hall
              </Link>
              <Link
                href="/restaurant"
                className="text-[#007bff] font-body font-semibold text-sm hover:underline"
              >
                Road House Restaurant
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 font-body text-sm">
              <li>
                <Link
                  href="/"
                  className="text-neutral-400 hover:text-gold transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/banquet-hall"
                  className="text-neutral-400 hover:text-gold transition-colors"
                >
                  Banquet Hall
                </Link>
              </li>
              <li>
                <Link
                  href="/catering"
                  className="text-neutral-400 hover:text-gold transition-colors"
                >
                  Catering Services
                </Link>
              </li>
              <li>
                <Link
                  href="/restaurant"
                  className="text-neutral-400 hover:text-blue transition-colors"
                >
                  Road House Restaurant
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-neutral-400 hover:text-gold transition-colors"
                >
                  Events Calendar
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-neutral-400 hover:text-gold transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="text-neutral-400 hover:text-gold transition-colors"
                >
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4 text-white">
              Contact Us
            </h3>
            <ul className="space-y-3 font-body text-sm">
              <li className="flex items-start space-x-3">
                <MapPinIcon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-neutral-400">
                  24 Kotugoda Rd, Seeduwa 11410, Sri Lanka
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <PhoneIcon className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-neutral-400">077 732 8155</span>
              </li>
              <li className="flex items-center space-x-3">
                <MailIcon className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-neutral-400">info@dinidugardens.lk</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="text-neutral-400 hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-neutral-500 order-2 md:order-1">
            © {new Date().getFullYear()} Dinidu Gardens. All rights reserved.
          </p>
          <p className="font-body text-sm text-neutral-500 order-1 md:order-2">
            Made with brilliance by <a href="https://seranex.org" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors duration-300 font-semibold">Chithila Manul</a> from <a href="https://seranex.org" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors duration-300 font-semibold">Seranex Lanka</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
