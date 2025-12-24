"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  FileText,
  BookOpen,
  Plus,
  ArrowRight,
  BarChart3,
  Loader2
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from "recharts";

/* --- Components --- */
const StatCard = ({ title, count, icon: Icon, gradient, onClick }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer rounded-3xl p-6 text-white shadow-xl transition-all duration-300 hover:scale-[1.03] ${gradient}`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-90 font-medium">{title}</p>
        <h2 className="text-4xl font-bold mt-2">{count}</h2>
      </div>
      <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
        <Icon size={24} />
      </div>
    </div>
  </div>
);

const ActionCard = ({ title, description, icon: Icon, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 group"
  >
    <div className="flex items-start justify-between">
      <div>
        <h3 className="font-bold text-lg text-slate-900 dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {description}
        </p>
      </div>
      <div className="h-10 w-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center group-hover:scale-110 transition">
        <Icon className="text-violet-600 dark:text-violet-400" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm text-violet-600 dark:text-violet-400 font-medium">
      Open
      <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition" />
    </div>
  </div>
);

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ events: 0, notices: 0, pyqs: 0 });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        if (res.ok) setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  // Data for the Chart
  const chartData = [
    { name: "Events", count: stats.events, color: "#8b5cf6" }, // Violet
    { name: "Notices", count: stats.notices, color: "#db2777" }, // Pink
    { name: "PYQs", count: stats.pyqs, color: "#059669" }, // Emerald
  ];

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Welcome back! Here is what's happening on campus.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Events"
          count={loading ? "..." : stats.events}
          icon={Calendar}
          gradient="bg-gradient-to-br from-violet-600 to-indigo-600"
          onClick={() => router.push("/admin/events")}
        />
        <StatCard
          title="Total Notices"
          count={loading ? "..." : stats.notices}
          icon={FileText}
          gradient="bg-gradient-to-br from-pink-600 to-rose-600"
          onClick={() => router.push("/admin/notices")}
        />
        <StatCard
          title="Total PYQs"
          count={loading ? "..." : stats.pyqs}
          icon={BookOpen}
          gradient="bg-gradient-to-br from-emerald-600 to-teal-600"
          onClick={() => router.push("/admin/pyqs")}
        />
      </div>

      {/* Analytics Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Quick Actions (Takes up 1 column on large screens) */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Plus className="h-5 w-5 text-violet-600" />
            Quick Actions
          </h2>
          <div className="grid gap-4">
            <ActionCard
              title="Add New Event"
              description="Schedule a campus event."
              icon={Calendar}
              onClick={() => router.push("/admin/events")}
            />
            <ActionCard
              title="Upload Notice"
              description="Post official announcements."
              icon={FileText}
              onClick={() => router.push("/admin/notices/create")}
            />
            <ActionCard
              title="Upload PYQ"
              description="Add exam resources."
              icon={BookOpen}
              onClick={() => router.push("/admin/pyqs")}
            />
          </div>
        </div>

        {/* Right: Chart (Takes up 2 columns) */}
        <div className="lg:col-span-2">
           <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-violet-600" />
            Content Analytics
          </h2>
          
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm h-[400px]">
            {loading ? (
               <div className="h-full flex items-center justify-center text-slate-400">
                 <Loader2 className="animate-spin mr-2" /> Loading Data...
               </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#94a3b8" 
                    fontSize={14} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={14} 
                    tickLine={false} 
                    axisLine={false} 
                    allowDecimals={false}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={60}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}