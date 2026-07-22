"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Confirmation
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shippingCharges = totalPrice >= 999 ? 0 : 99;
  const finalTotal = totalPrice + shippingCharges;

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handlePlaceOrder = () => {
    // In real app, this would call the backend API
    setOrderPlaced(true);
    setStep(3);
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3">No items to checkout</h2>
          <Link href="/products" className="btn-primary mt-4">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-12">
        {[
          { num: 1, label: "Address" },
          { num: 2, label: "Payment" },
          { num: 3, label: "Confirmation" },
        ].map((s, i) => (
          <React.Fragment key={s.num}>
            <div className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s.num
                    ? "bg-[#e94560] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > s.num ? "✓" : s.num}
              </div>
              <span className={`font-medium ${step >= s.num ? "text-gray-900" : "text-gray-400"}`}>
                {s.label}
              </span>
            </div>
            {i < 2 && (
              <div className={`w-16 h-0.5 mx-4 ${step > s.num ? "bg-[#e94560]" : "bg-gray-200"}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Address */}
          {step === 1 && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 animate-fadeInUp">
              <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#e94560] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#e94560] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#e94560] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                    placeholder="House no, Street, Area"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#e94560] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                    placeholder="Mumbai"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#e94560] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                    placeholder="Maharashtra"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#e94560] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                    placeholder="400001"
                  />
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                className="btn-primary mt-8 w-full !py-4 text-lg"
              >
                Continue to Payment →
              </button>
            </div>
          )}

          {/* Step 2: Payment with Paytm QR */}
          {step === 2 && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 animate-fadeInUp">
              <h2 className="text-2xl font-bold mb-6">Payment via Paytm QR</h2>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border border-blue-100">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-sm">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">P</span>
                    </div>
                    <span className="font-bold text-lg text-blue-700">Paytm</span>
                  </div>
                </div>

                {/* QR Code Placeholder */}
                <div className="bg-white rounded-2xl p-6 inline-block shadow-lg mb-6">
                  <div className="w-64 h-64 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <div className="text-6xl mb-3">📱</div>
                      <p className="text-gray-500 text-sm font-medium">Your Paytm QR Code</p>
                      <p className="text-gray-400 text-xs mt-1">Will appear here</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-left max-w-sm mx-auto">
                  <div className="bg-white rounded-xl p-4 flex items-center gap-3">
                    <span className="text-2xl">1️⃣</span>
                    <p className="text-sm text-gray-700">Open Paytm app on your phone</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 flex items-center gap-3">
                    <span className="text-2xl">2️⃣</span>
                    <p className="text-sm text-gray-700">Tap &ldquo;Scan & Pay&rdquo; option</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 flex items-center gap-3">
                    <span className="text-2xl">3️⃣</span>
                    <p className="text-sm text-gray-700">Scan the QR code above</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 flex items-center gap-3">
                    <span className="text-2xl">4️⃣</span>
                    <p className="text-sm text-gray-700">Enter amount: <span className="font-bold text-[#e94560]">₹{finalTotal.toLocaleString()}</span></p>
                  </div>
                  <div className="bg-white rounded-xl p-4 flex items-center gap-3">
                    <span className="text-2xl">5️⃣</span>
                    <p className="text-sm text-gray-700">Complete payment & click confirm below</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="btn-outline flex-1"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="btn-primary flex-1 !bg-gradient-to-r !from-green-500 !to-emerald-600"
                  >
                    ✓ I&apos;ve Paid - Confirm Order
                  </button>
                </div>
              </div>

              <p className="text-center text-gray-400 text-sm mt-4">
                🔒 Your payment is 100% secure via Paytm UPI
              </p>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center animate-fadeInUp">
              <div className="text-8xl mb-6 animate-float">🎉</div>
              <h2 className="text-3xl font-bold mb-3">Order Placed Successfully!</h2>
              <p className="text-gray-500 text-lg mb-2">
                Order ID: <span className="font-mono font-bold text-[#e94560]">#LUXE{Date.now().toString().slice(-6)}</span>
              </p>
              <p className="text-gray-500 mb-8">
                We&apos;ll send you tracking details once your order is shipped.
              </p>
              <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto mb-8">
                <h4 className="font-semibold mb-3">What&apos;s Next?</h4>
                <div className="space-y-3 text-left text-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">✓</span>
                    <span>Order confirmed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-xs">2</span>
                    <span className="text-gray-500">Processing (1-2 days)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-xs">3</span>
                    <span className="text-gray-500">Shipped (3-5 days)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-xs">4</span>
                    <span className="text-gray-500">Delivered to your doorstep</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Link href="/account" className="btn-outline">
                  Track Order
                </Link>
                <Link href="/products" className="btn-primary">
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-xl font-bold mb-4">Your Order</h3>
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item._id}-${item.size}`} className="flex gap-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity} | Size: {item.size}</p>
                  </div>
                  <p className="text-sm font-semibold">
                    ₹{((item.salePrice || item.price) * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className={shippingCharges === 0 ? "text-green-600 font-semibold" : ""}>
                  {shippingCharges === 0 ? "FREE" : `₹${shippingCharges}`}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
