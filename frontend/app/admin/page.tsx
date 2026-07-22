"use client";

import React, { useState } from "react";

const mockProducts = [
  { id: 1, name: "Premium Silk Kurta", price: 1999, stock: 45, category: "Men", status: "active" },
  { id: 2, name: "Floral Maxi Dress", price: 2499, stock: 23, category: "Women", status: "active" },
  { id: 3, name: "Denim Jacket", price: 3499, stock: 5, category: "Men", status: "low" },
  { id: 4, name: "Designer Lehenga", price: 6999, stock: 12, category: "Women", status: "active" },
  { id: 5, name: "Cotton T-Shirt", price: 699, stock: 0, category: "Men", status: "out" },
];

const mockOrders = [
  { id: "LUXE847291", customer: "Priya Sharma", amount: 4499, status: "shipped", date: "2026-07-20" },
  { id: "LUXE847150", customer: "Rahul Mehta", amount: 2698, status: "delivered", date: "2026-07-15" },
  { id: "LUXE846900", customer: "Anita Kumar", amount: 1999, status: "processing", date: "2026-07-10" },
  { id: "LUXE846800", customer: "Vikram Singh", amount: 7999, status: "pending", date: "2026-07-09" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const stats = [
    { label: "Total Revenue", value: "₹2,45,000", change: "+12%", icon: "💰", color: "from-green-400 to-emerald-500" },
    { label: "Total Orders", value: "156", change: "+8%", icon: "📦", color: "from-blue-400 to-indigo-500" },
    { label: "Products", value: "89", change: "+3", icon: "👕", color: "from-purple-400 to-pink-500" },
    { label: "Customers", value: "1,234", change: "+24", icon: "👥", color: "from-orange-400 to-red-500" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <button className="btn-outline !py-2 !px-4 text-sm">Export</button>
          <button className="btn-primary !py-2 !px-4 text-sm">+ Add Product</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-8 max-w-lg">
        {["dashboard", "products", "orders", "customers"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === tab ? "bg-white shadow-sm text-[#e94560]" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      {activeTab === "dashboard" && (
        <div className="animate-fadeInUp">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl mb-3`}>
                  {stat.icon}
                </div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-green-500 text-sm font-medium">{stat.change} this month</p>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-3 font-medium">Order ID</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 font-mono text-sm">{order.id}</td>
                      <td className="py-3">{order.customer}</td>
                      <td className="py-3 font-semibold">₹{order.amount.toLocaleString()}</td>
                      <td className="py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          order.status === "delivered" ? "bg-green-100 text-green-700" :
                          order.status === "shipped" ? "bg-blue-100 text-blue-700" :
                          order.status === "processing" ? "bg-purple-100 text-purple-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-gray-500 text-sm">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Products */}
      {activeTab === "products" && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-fadeInUp">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">Stock</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockProducts.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-3 font-medium">{p.name}</td>
                    <td className="py-3 text-gray-500">{p.category}</td>
                    <td className="py-3 font-semibold">₹{p.price.toLocaleString()}</td>
                    <td className="py-3">{p.stock}</td>
                    <td className="py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        p.status === "active" ? "bg-green-100 text-green-700" :
                        p.status === "low" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {p.status === "out" ? "Out of Stock" : p.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button className="text-blue-500 hover:text-blue-700 text-sm">Edit</button>
                        <button className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-fadeInUp">
          <h3 className="font-bold text-lg mb-4">All Orders</h3>
          <div className="space-y-3">
            {mockOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e94560] to-[#d4af37] flex items-center justify-center text-white font-bold text-sm">
                    {order.customer[0]}
                  </div>
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-gray-500">#{order.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{order.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <select className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:border-[#e94560] outline-none">
                  <option value="pending" selected={order.status === "pending"}>Pending</option>
                  <option value="processing" selected={order.status === "processing"}>Processing</option>
                  <option value="shipped" selected={order.status === "shipped"}>Shipped</option>
                  <option value="delivered" selected={order.status === "delivered"}>Delivered</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Customers */}
      {activeTab === "customers" && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-fadeInUp">
          <h3 className="font-bold text-lg mb-4">All Customers</h3>
          <p className="text-gray-500">Customer management coming soon...</p>
        </div>
      )}
    </div>
  );
}
