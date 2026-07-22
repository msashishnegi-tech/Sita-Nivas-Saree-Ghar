import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold">Join the LUXE Club</h3>
              <p className="text-white/60 mt-1">Get 10% off your first order + exclusive access to new drops</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-l-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none w-full md:w-72"
              />
              <button className="btn-primary rounded-l-none !rounded-r-full !py-3">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-lg mb-4">Shop</h4>
            <ul className="space-y-2">
              {["New Arrivals", "Men", "Women", "Kids", "Accessories", "Sale"].map((item) => (
                <li key={item}>
                  <Link href="/products" className="text-white/60 hover:text-[#e94560] transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Help</h4>
            <ul className="space-y-2">
              {["Track Order", "Returns", "Shipping Info", "Size Guide", "Contact Us"].map((item) => (
                <li key={item}>
                  <Link href="/account" className="text-white/60 hover:text-[#e94560] transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Careers", "Press", "Sustainability", "Stores"].map((item) => (
                <li key={item}>
                  <Link href="/" className="text-white/60 hover:text-[#e94560] transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Payment</h4>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Paytm QR</p>
                  <p className="text-white/50 text-xs">Scan & Pay</p>
                </div>
              </div>
              <p className="text-white/40 text-xs">Safe & secure payments via UPI</p>
            </div>
            <div className="flex gap-3 mt-4">
              {["Instagram", "Twitter", "Facebook"].map((social) => (
                <a key={social} href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#e94560] transition-colors">
                  <span className="text-xs">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-white/40 text-sm">© 2026 LUXE Fashion. All rights reserved.</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <Link href="/" className="text-white/40 hover:text-white/70 text-sm">Privacy</Link>
            <Link href="/" className="text-white/40 hover:text-white/70 text-sm">Terms</Link>
            <Link href="/" className="text-white/40 hover:text-white/70 text-sm">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
