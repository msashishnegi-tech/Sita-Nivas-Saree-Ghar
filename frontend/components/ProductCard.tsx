"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface Product {
  _id: string;
  name: string;
  price: number;
  salePrice?: number;
  images: string[];
  category?: string;
  sizes?: string[];
  colors?: string[];
}

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [liked, setLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[1] || product.sizes?.[0] || "");
  const { addToCart } = useCart();

  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      images: product.images,
      size: selectedSize,
      color: product.colors?.[0] || "",
      quantity: 1,
    });
  };

  return (
    <Link href={`/products/${product._id}`} className="group">
      <div className="card-hover rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden img-zoom">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {/* Overlay Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                liked ? "bg-[#e94560] text-white" : "bg-white/90 text-gray-700 hover:bg-[#e94560] hover:text-white"
              }`}
            >
              {liked ? "❤️" : "🤍"}
            </button>
          </div>
          {/* Sale Badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 badge-sale">
              -{discount}%
            </div>
          )}
          {/* Quick Add */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              className="w-full py-2.5 bg-white text-gray-900 rounded-full font-semibold text-sm hover:bg-[#e94560] hover:text-white transition-colors"
            >
              + Add to Cart
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-sm text-gray-800 group-hover:text-[#e94560] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-bold text-lg">
              ₹{(product.salePrice || product.price).toLocaleString()}
            </span>
            {product.salePrice && (
              <span className="text-gray-400 line-through text-sm">
                ₹{product.price.toLocaleString()}
              </span>
            )}
          </div>
          {/* Sizes */}
          {product.sizes && (
            <div className="flex gap-1.5 mt-3">
              {product.sizes.slice(0, 4).map((size) => (
                <span
                  key={size}
                  className={`text-xs px-2 py-0.5 rounded border ${
                    selectedSize === size
                      ? "border-[#e94560] text-[#e94560] bg-red-50"
                      : "border-gray-200 text-gray-500"
                  }`}
                >
                  {size}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
