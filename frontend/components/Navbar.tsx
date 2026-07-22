"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#e94560] to-[#d4af37] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className={`text-2xl font-bold tracking-tight ${scrolled ? "text-gray-900" : "text-white"}`}>
              LUXE
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {["New Arrivals", "Men", "Women", "Kids", "Sale"].map((item) => (
              <Link
                key={item}
                href={`/products?category=${item.toLowerCase().replace(" ", "-")}`}
                className={`relative text-sm font-medium tracking-wide hover:text-[#e94560] transition-colors group ${
                  scrolled ? "text-gray-700" : "text-white/90"
                }`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e94560] transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 rounded-full transition-colors ${
                scrolled ? "hover:bg-gray-100 text-gray-700" : "hover:bg-white/10 text-white"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Account */}
            <Link
              href="/account"
              className={`p-2 rounded-full transition-colors ${
                scrolled ? "hover:bg-gray-100 text-gray-700" : "hover:bg-white/10 text-white"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className={`relative p-2 rounded-full transition-colors ${
                scrolled ? "hover:bg-gray-100 text-gray-700" : "hover:bg-white/10 text-white"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#e94560] text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse-glow">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 rounded-full ${scrolled ? "text-gray-700" : "text-white"}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="mt-4 animate-fadeInUp">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for clothes, brands, styles..."
                className="w-full px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                autoFocus
              />
              <svg className="absolute right-4 top-3.5 w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fadeInUp">
            {["New Arrivals", "Men", "Women", "Kids", "Sale"].map((item) => (
              <Link
                key={item}
                href={`/products?category=${item.toLowerCase()}`}
                className="block py-3 text-white/90 hover:text-[#e94560] font-medium border-b border-white/10"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
