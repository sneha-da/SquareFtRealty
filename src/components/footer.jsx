"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--figma-dark)] text-white">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        {/* Main Footer Content */}
        <div className="py-16 border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
                <div className="overflow-hidden" style={{ height: '60px', display: 'flex', alignItems: 'center', lineHeight: 0 }}>
                  <Image
                    src="/adrig logo 12335.png"
                    alt="SquareFt Realty Logo"
                    width={200}
                    height={80}
                    className="object-contain object-center"
                    style={{ 
                      objectFit: 'contain', 
                      maxHeight: '60px',
                      height: 'auto',
                      display: 'block',
                      width: 'auto'
                    }}
                  />
                </div>
              </Link>
              <p className="text-[15px] leading-relaxed text-white/80 mb-6 max-w-md">
                Your trusted real estate partner. We help you find your dream home, sell your property, 
                and make informed real estate decisions with expert guidance.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-white/80">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+1234567890" className="text-[15px] hover:text-white transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:info@squareftrealty.com" className="text-[15px] hover:text-white transition-colors">
                    info@squareftrealty.com
                  </a>
                </div>
                <div className="flex items-start gap-3 text-white/80">
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span className="text-[15px]">
                    123 Real Estate Avenue,<br />
                    City, State 12345
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="pt-0">
              <h3 className="text-[18px] font-semibold mb-6">Quick Links</h3>
              <nav className="flex flex-col gap-3">
                <Link href="/" className="text-[15px] text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
                <Link href="/properties" className="text-[15px] text-white/80 hover:text-white transition-colors">
                  Properties
                </Link>
                <Link href="/services" className="text-[15px] text-white/80 hover:text-white transition-colors">
                  Services
                </Link>
                <Link href="/about" className="text-[15px] text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
                <Link href="/contact" className="text-[15px] text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </nav>
            </div>

            {/* Services */}
            <div className="pt-0">
              <h3 className="text-[18px] font-semibold mb-6">Services</h3>
              <nav className="flex flex-col gap-3">
                <Link href="/services#buying" className="text-[15px] text-white/80 hover:text-white transition-colors">
                  Buying
                </Link>
                <Link href="/services#selling" className="text-[15px] text-white/80 hover:text-white transition-colors">
                  Selling
                </Link>
                <Link href="/services#renting" className="text-[15px] text-white/80 hover:text-white transition-colors">
                  Renting
                </Link>
                <Link href="/services#consultation" className="text-[15px] text-white/80 hover:text-white transition-colors">
                  Consultation
                </Link>
                <Link href="/quote" className="text-[15px] text-white/80 hover:text-white transition-colors">
                  Get a Quote
                </Link>
              </nav>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-[18px] font-semibold mb-6">Stay Updated</h3>
              <p className="text-[15px] text-white/80 mb-4">
                Subscribe to our newsletter for the latest property listings and real estate insights.
              </p>
              <form className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors text-[15px]"
                />
                <button
                  type="submit"
                  className="bg-[var(--figma-orange)] text-[var(--figma-dark)] hover:opacity-90 transition-opacity px-6 py-3 rounded-lg font-semibold text-[15px]"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-[14px] text-white/60">
            <p>© 2025 SquareFt Realty. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
          
          {/* Social Media */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

