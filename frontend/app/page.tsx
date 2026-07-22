"use client";

import React from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

const featuredProducts = [
  {
    _id: "1",
    name: "Premium Silk Kurta",
    price: 2999,
    salePrice: 1999,
    images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500"],
    category: "men",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy Blue", "Maroon"],
  },
  {
    _id: "2",
    name: "Floral Maxi Dress",
    price: 3499,
    salePrice: 2499,
    images: ["https://images.unsplash.com/photo-1572804013309-59a88a7e9b60?w=500"],
    category: "women",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Pink", "White"],
  },
  {
    _id: "3",
    name: "Denim Jacket Classic",
    price: 4999,
    salePrice: 3499,
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"],
    category: "men",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Blue", "Black"],
  },
  {
    _id: "4",
    name: "Designer Lehenga Set",
    price: 8999,
    salePrice: 6999,
    images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500"],
    category: "women",
    sizes: ["S", "M", "L"],
    colors: ["Red", "Gold"],
  },
  {
    _id: "5",
    name: "Casual Cotton T-Shirt",
    price: 999,
    salePrice: 699,
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"],
    category: "men",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Gray"],
  },
  {
    _id: "6",
    name: "Anarkali Suit Collection",
    price: 5999,
    salePrice: 4499,
    images: ["https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500"],
    category: "women",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Green", "Purple"],
  },
  {
    _id: "7",
    name: "Kids Party Wear",
    price: 1999,
    salePrice: 1499,
    images: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500"],
    category: "kids",
    sizes: ["XS", "S", "M"],
    colors: ["Yellow", "Blue"],
  },
  {
    _id: "8",
    name: "Formal Blazer Set",
    price: 7999,
    salePrice: 5999,
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"],
    category: "men",
    sizes: ["M", "L", "XL"],
    colors: ["Charcoal", "Navy"],
  },
];

const categories = [
  {
    name: "Men",
    image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600",
    count: "200+ Styles",
  },
  {
    name: "Women",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600",
    count: "350+ Styles",
  },
  {
    name: "Kids",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600",
    count: "150+ Styles",
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?w=600",
    count: "100+ Items",
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center md:text-left">
          <div className="max-w-2xl">
            <p className="text-[#e94560] font-semibold tracking-widest text-sm mb-4 animate-fadeInUp">
              ✨ NEW SEASON COLLECTION 2026
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
              Redefine Your
              <span className="gradient-text block">Style Story</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-8 animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
              Discover handpicked fashion that speaks your language. Premium quality, stunning designs, unbeatable prices.
            </p>
            <div className="flex flex-wrap gap-4 animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
              <Link href="/products" className="btn-primary text-lg">
                Shop Now →
              </Link>
              <Link href="/products?category=sale" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-black text-lg">
                View Sale
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Shop by Category</h2>
          <p className="text-gray-500 text-lg">Find what suits you best</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.name}
              href={`/products?category=${cat.name.toLowerCase()}`}
              className="group relative rounded-2xl overflow-hidden card-hover img-zoom aspect-[3/4]"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-xl font-bold">{cat.name}</h3>
                <p className="text-white/70 text-sm">{cat.count}</p>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#e94560] rounded-2xl transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">Trending Now 🔥</h2>
              <p className="text-gray-500">Most loved styles this season</p>
            </div>
            <Link href="/products" className="btn-outline hidden md:block">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920"
              alt="Sale Banner"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/90 to-transparent flex items-center">
              <div className="p-12 max-w-lg">
                <span className="badge-sale mb-4 inline-block">MEGA SALE</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Up to 60% OFF
                </h2>
                <p className="text-white/70 text-lg mb-6">
                  On selected styles. Use code <span className="text-[#d4af37] font-bold">LUXE60</span>
                </p>
                <Link href="/products?category=sale" className="btn-primary">
                  Grab the Deal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-[#1a1a2e]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "🚚", title: "Free Shipping", desc: "On orders above ₹999" },
              { icon: "↩️", title: "Easy Returns", desc: "7-day return policy" },
              { icon: "🔒", title: "Secure Payment", desc: "Paytm QR - 100% safe" },
              { icon: "💎", title: "Premium Quality", desc: "Handpicked fabrics" },
            ].map((feat) => (
              <div key={feat.title} className="text-center">
                <div className="text-4xl mb-3">{feat.icon}</div>
                <h4 className="text-white font-bold mb-1">{feat.title}</h4>
                <p className="text-white/50 text-sm">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">What Our Customers Say</h2>
          <p className="text-gray-500">Real reviews from real people</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Priya S.", text: "Amazing quality! The silk kurta I ordered was exactly as shown. Will definitely order again.", rating: 5 },
            { name: "Rahul M.", text: "Fast delivery and great packaging. The denim jacket fits perfectly. Love this store!", rating: 5 },
            { name: "Anita K.", text: "Paytm payment was so easy. Got my lehenga for my sister's wedding. Everyone loved it!", rating: 5 },
          ].map((review) => (
            <div key={review.name} className="bg-white rounded-2xl p-8 shadow-lg card-hover border border-gray-100">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-[#d4af37]">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e94560] to-[#d4af37] flex items-center justify-center text-white font-bold">
                  {review.name[0]}
                </div>
                <span className="font-semibold">{review.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
