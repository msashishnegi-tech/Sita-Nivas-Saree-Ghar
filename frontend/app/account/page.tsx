"use client";

import React, { useState } from "react";

const mockOrders = [
  {
    id: "LUXE847291",
    date: "2026-07-20",
    status: "shipped",
    total: 4499,
    items: [{ name: "Designer Lehenga Set", qty: 1, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100" }],
    tracking: "DTDC1234567890",
  },
  {
    id: "LUXE847150",
    date: "2026-07-15",
    status: "delivered",
    total: 2698,
    items: [{ name: "Premium Silk Kurta", qty: 2, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=100" }],
    tracking: "BLD9876543210",
  },
  {
    id: "LUXE846900",
    date: "2026-07-10",
    status: "processing",
    total: 1999,
    items: [{ name: "Casual Cotton T-Shirt", qty: 1, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100" }],
    tracking: null,
  },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">My Account</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-8 max-w-md">
        {["orders", "profile", "addresses"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === tab
                ? "bg-white shadow-sm text-[#e94560]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="space-y-4 animate-fadeInUp">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order #{order.id}</p>
                  <p className="font-semibold text-lg">₹{order.total.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="flex gap-3 mb-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tracking */}
              {order.tracking && (
                <div className="bg-blue-50 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Tracking ID</p>
                    <p className="font-mono text-sm">{order.tracking}</p>
                  </div>
                  <button className="btn-outline !py-2 !px-4 text-sm">Track</button>
                </div>
              )}

              {/* Order Progress */}
              <div className="mt-4 flex items-center gap-2">
                {["confirmed", "processing", "shipped", "delivered"].map((s, i) => {
                  const statusOrder = ["pending", "confirmed", "processing", "shipped", "delivered"];
                  const currentIdx = statusOrder.indexOf(order.status);
                  const isActive = i <= currentIdx - 1;
                  return (
                    <React.Fragment key={s}>
                      <div className={`w-3 h-3 rounded-full ${isActive ? "bg-[#e94560]" : "bg-gray-200"}`} />
                      {i < 3 && (
                        <div className={`flex-1 h-0.5 ${isActive ? "bg-[#e94560]" : "bg-gray-200"}`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="flex justify-between mt-1">
                {["Confirmed", "Processing", "Shipped", "Delivered"].map((s) => (
                  <span key={s} className="text-xs text-gray-400">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-2xl animate-fadeInUp">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#e94560] to-[#d4af37] flex items-center justify-center text-white text-3xl font-bold">
              U
            </div>
            <div>
              <h3 className="text-xl font-bold">User Name</h3>
              <p className="text-gray-500">user@email.com</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" defaultValue="User Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#e94560] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" defaultValue="+91 98765 43210" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#e94560] outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" defaultValue="user@email.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#e94560] outline-none" />
            </div>
          </div>
          <button className="btn-primary mt-6">Save Changes</button>
        </div>
      )}

      {/* Addresses Tab */}
      {activeTab === "addresses" && (
        <div className="animate-fadeInUp">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Saved Addresses</h3>
              <button className="btn-outline !py-2 !px-4 text-sm">+ Add New</button>
            </div>
            <div className="border border-gray-200 rounded-xl p-4 hover:border-[#e94560] transition-colors">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">Home</p>
                  <p className="text-gray-500 text-sm mt-1">123, Street Name, Area</p>
                  <p className="text-gray-500 text-sm">City, State - 400001</p>
                  <p className="text-gray-500 text-sm">Phone: +91 98765 43210</p>
                </div>
                <span className="text-xs bg-[#e94560] text-white px-2 py-1 rounded-full h-fit">Default</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
