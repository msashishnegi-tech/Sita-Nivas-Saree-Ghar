"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const shippingCharges = totalPrice >= 999 ? 0 : 99;
  const finalTotal = totalPrice + shippingCharges;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold mb-3">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven&apos;t added anything yet</p>
          <Link href="/products" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item._id}-${item.size}`}
              className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 card-hover"
            >
              <div className="w-24 h-32 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-500 text-sm">
                      Size: {item.size} {item.color && `| Color: ${item.color}`}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id, item.size)}
                    className="text-gray-400 hover:text-[#e94560] transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex items-end justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#e94560] hover:text-[#e94560]"
                    >
                      −
                    </button>
                    <span className="font-semibold text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#e94560] hover:text-[#e94560]"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      ₹{((item.salePrice || item.price) * item.quantity).toLocaleString()}
                    </p>
                    {item.salePrice && (
                      <p className="text-gray-400 line-through text-sm">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shippingCharges === 0 ? "text-green-600 font-semibold" : ""}>
                  {shippingCharges === 0 ? "FREE" : `₹${shippingCharges}`}
                </span>
              </div>
              {shippingCharges > 0 && (
                <p className="text-xs text-[#e94560]">
                  Add ₹{(999 - totalPrice).toLocaleString()} more for free shipping!
                </p>
              )}
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="btn-primary w-full text-center block !py-4 text-lg"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/products"
              className="block text-center mt-4 text-gray-500 hover:text-[#e94560] transition-colors"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
