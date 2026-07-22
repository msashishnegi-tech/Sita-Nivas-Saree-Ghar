"use client";

import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";

const allProducts = [
  { _id: "1", name: "Premium Silk Kurta", price: 2999, salePrice: 1999, images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500"], category: "men", sizes: ["S", "M", "L", "XL"], colors: ["Navy Blue", "Maroon"] },
  { _id: "2", name: "Floral Maxi Dress", price: 3499, salePrice: 2499, images: ["https://images.unsplash.com/photo-1572804013309-59a88a7e9b60?w=500"], category: "women", sizes: ["XS", "S", "M", "L"], colors: ["Pink", "White"] },
  { _id: "3", name: "Denim Jacket Classic", price: 4999, salePrice: 3499, images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"], category: "men", sizes: ["M", "L", "XL", "XXL"], colors: ["Blue", "Black"] },
  { _id: "4", name: "Designer Lehenga Set", price: 8999, salePrice: 6999, images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500"], category: "women", sizes: ["S", "M", "L"], colors: ["Red", "Gold"] },
  { _id: "5", name: "Casual Cotton T-Shirt", price: 999, salePrice: 699, images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"], category: "men", sizes: ["S", "M", "L", "XL", "XXL"], colors: ["White", "Black", "Gray"] },
  { _id: "6", name: "Anarkali Suit Collection", price: 5999, salePrice: 4499, images: ["https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500"], category: "women", sizes: ["S", "M", "L", "XL"], colors: ["Green", "Purple"] },
  { _id: "7", name: "Kids Party Wear", price: 1999, salePrice: 1499, images: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500"], category: "kids", sizes: ["XS", "S", "M"], colors: ["Yellow", "Blue"] },
  { _id: "8", name: "Formal Blazer Set", price: 7999, salePrice: 5999, images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"], category: "men", sizes: ["M", "L", "XL"], colors: ["Charcoal", "Navy"] },
  { _id: "9", name: "Saree - Banarasi Silk", price: 12999, salePrice: 9999, images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500"], category: "women", sizes: ["Free Size"], colors: ["Red", "Blue", "Green"] },
  { _id: "10", name: "Leather Belt Premium", price: 1499, salePrice: 999, images: ["https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?w=500"], category: "accessories", sizes: ["S", "M", "L"], colors: ["Brown", "Black"] },
  { _id: "11", name: "Kids Casual Set", price: 1299, salePrice: 899, images: ["https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=500"], category: "kids", sizes: ["XS", "S", "M", "L"], colors: ["Blue", "Red"] },
  { _id: "12", name: "Sunglasses Aviator", price: 2499, salePrice: 1799, images: ["https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?w=500"], category: "accessories", sizes: ["Free Size"], colors: ["Gold", "Silver"] },
];

export default function ProductsPage() {
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = allProducts.filter((p) => {
    if (category !== "all" && p.category !== category) return false;
    if (priceRange === "under1000" && p.price >= 1000) return false;
    if (priceRange === "1000to3000" && (p.price < 1000 || p.price > 3000)) return false;
    if (priceRange === "3000to5000" && (p.price < 3000 || p.price > 5000)) return false;
    if (priceRange === "above5000" && p.price < 5000) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return (a.salePrice || a.price) - (b.salePrice || b.price);
    if (sortBy === "price-high") return (b.salePrice || b.price) - (a.salePrice || a.price);
    if (sortBy === "discount") {
      const discA = a.salePrice ? (a.price - a.salePrice) / a.price : 0;
      const discB = b.salePrice ? (b.price - b.salePrice) / b.price : 0;
      return discB - discA;
    }
    return 0;
  });

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            {category === "all" ? "All Products" : category.charAt(0).toUpperCase() + category.slice(1)}
          </h1>
          <p className="text-gray-500 mt-1">{sorted.length} products found</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="md:hidden btn-outline !py-2 !px-4 text-sm"
          >
            Filters ☰
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#e94560] outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className={`${filtersOpen ? "block" : "hidden"} md:block w-64 flex-shrink-0`}>
          <div className="sticky top-24 space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold mb-3">Category</h3>
              <div className="space-y-2">
                {[
                  { key: "all", label: "All" },
                  { key: "men", label: "Men" },
                  { key: "women", label: "Women" },
                  { key: "kids", label: "Kids" },
                  { key: "accessories", label: "Accessories" },
                ].map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setCategory(cat.key)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      category === cat.key
                        ? "bg-[#e94560] text-white font-semibold"
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold mb-3">Price Range</h3>
              <div className="space-y-2">
                {[
                  { key: "all", label: "All Prices" },
                  { key: "under1000", label: "Under ₹1,000" },
                  { key: "1000to3000", label: "₹1,000 - ₹3,000" },
                  { key: "3000to5000", label: "₹3,000 - ₹5,000" },
                  { key: "above5000", label: "Above ₹5,000" },
                ].map((range) => (
                  <button
                    key={range.key}
                    onClick={() => setPriceRange(range.key)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      priceRange === range.key
                        ? "bg-[#e94560] text-white font-semibold"
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {sorted.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </div>
          {sorted.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">No products found</h3>
              <p className="text-gray-500">Try changing your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
