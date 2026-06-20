"use client";
import React, { useEffect, useState } from 'react';
import { 
  TbBox, 
  TbCategory, 
  TbCurrencyNaira, 
  TbShoppingCart, 
  TbTrendingUp, 
  TbTrendingDown,
  TbArrowNarrowRight
} from 'react-icons/tb';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [pRes, cRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ]);
        const products = await pRes.json();
        const categories = await cRes.json();
        
        setStats({
          products: products.length || 0,
          categories: categories.length || 0,
          orders: 12, // Placeholder
          revenue: 145200 // Placeholder in kobo
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    { name: 'Total Products', value: stats.products, icon: TbBox, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+12%', up: true },
    { name: 'Categories', value: stats.categories, icon: TbCategory, color: 'text-purple-600', bg: 'bg-purple-50', trend: '+2', up: true },
    { name: 'Pending Orders', value: stats.orders, icon: TbShoppingCart, color: 'text-orange-600', bg: 'bg-orange-50', trend: '-5%', up: false },
    { name: 'Total Revenue', value: (stats.revenue / 100).toFixed(2), icon: TbCurrencyNaira, color: 'text-green-600', bg: 'bg-green-50', trend: '+18%', up: true, prefix: '₦' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 font-medium">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
            Last update: Today at 2:30 PM
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
                <stat.icon className="text-2xl" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                {stat.up ? <TbTrendingUp /> : <TbTrendingDown />}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">{stat.name}</p>
              <h3 className="text-2xl font-extrabold text-gray-900">
                {stat.prefix}{stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions / Recent activity placeholder */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Overview</h3>
            <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
              View Analytics <TbArrowNarrowRight />
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50/50 p-6 m-6 rounded-2xl border-2 border-dashed border-gray-200">
             <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">Revenue Chart Placeholder</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <Link href="/admin/products/add" className="flex items-center justify-between w-full p-4 bg-blue-50 text-blue-700 rounded-2xl font-bold hover:bg-blue-100 transition-colors">
              Add New Product <TbArrowNarrowRight />
            </Link>
            <Link href="/admin/categories/add" className="flex items-center justify-between w-full p-4 bg-purple-50 text-purple-700 rounded-2xl font-bold hover:bg-purple-100 transition-colors">
              Create Category <TbArrowNarrowRight />
            </Link>
            <button className="flex items-center justify-between w-full p-4 bg-slate-50 text-slate-700 rounded-2xl font-bold hover:bg-slate-100 transition-colors">
              Manage Orders <TbArrowNarrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
