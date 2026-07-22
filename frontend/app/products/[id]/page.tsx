"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const productData = {
  _id: "1",
  name: "Premium Silk Kurta",
  price: 2999,
  salePrice: 1999,
  description: "Crafted from the finest silk fabric, this premium kurta features intricate embroidery and a comfortable fit. Perfect for festivals, celebrations, and special occasions. The rich texture and elegant design make it a must-have in your wardrobe.",
  images: [
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800",
  ],
  category: "men",
  sizes: ["S", "M", "L", "XL", "XXL"],
  colors: ["Navy Blue", "Maroon", "Emerald Green"],
  brand: "LUXE Premium",
  material: "Pure Silk",
  care: "Dry Clean Only",
};

export default function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const discount = Math.round(((productData.price - productData.salePrice) / productData.price) * 100);

  const handleAddToCart = () => {
    addToCart({
      _id: productData._id,
      name: productData.name,
      price: productData.price,
      salePrice: productData.salePrice,
      images: productData.images,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-[#e94560]">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[#e94560]">Products</Link>
        <span>/</span>
        <span className="text-gray-900">{productData.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 mb-4 img-zoom">
            <img
              src={productData.images[selectedImage]}
              alt={productData.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-3">
            {productData.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImage === i ? "border-[#e94560]" : "border-transparent"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="mb-2">
            <span className="text-sm text-[#e94560] font-semibold">{productData.brand}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{productData.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className={s <= 4 ? "text-[#d4af37]" : "text-gray-300"}>★</span>
              ))}
            </div>
            <span className="text-sm text-gray-500">(128 reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-bold">₹{productData.salePrice.toLocaleString()}</span>
            <span className="text-xl text-gray-400 line-through">₹{productData.price.toLocaleString()}</span>
            <span className="badge-sale text-sm">-{discount}% OFF</span>
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">{productData.description}</p>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Color: <span className="text-gray-500 font-normal">{selectedColor}</span></h3>
            <div className="flex gap-3">
              {productData.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-full border-2 text-sm transition-all ${
                    selectedColor === color
                      ? "border-[#e94560] bg-red-50 text-[#e94560] font-semibold"
                      : "border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Size</h3>
              <button className="text-sm text-[#e94560] underline">Size Guide</button>
            </div>
            <div className="flex gap-3">
              {productData.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-xl border-2 font-semibold transition-all ${
                    selectedSize === size
                      ? "border-[#e94560] bg-[#e94560] text-white"
                      : "border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#e94560]"
              >
                −
              </button>
              <span className="text-xl font-bold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#e94560]"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <button onClick={handleAddToCart} className="btn-primary flex-1 !py-4 text-lg">
              Add to Cart
            </button>
            <Link href="/checkout" className="btn-outline flex-1 text-center !py-4 text-lg">
              Buy Now
            </Link>
          </div>

          {/* Product Info */}
          <div className="border-t pt-6 space-y-3">
            {[
              { label: "Material", value: productData.material },
              { label: "Care", value: productData.care },
              { label: "Delivery", value: "3-5 business days" },
              { label: "Returns", value: "7-day easy returns" },
            ].map((info) => (
              <div key={info.label} className="flex justify-between text-sm">
                <span className="text-gray-500">{info.label}</span>
                <span className="font-medium">{info.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
