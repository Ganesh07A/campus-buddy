"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  BookOpen,
  LogOut,
  Moon,
  Sun,
  ShieldCheck,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Events", path: "/admin/events", icon: Calendar },
    { name: "Notices", path: "/admin/notices", icon: FileText },
    { name: "PYQs", path: "/admin/pyqs", icon: BookOpen },
  ];

  return (
    <div className={`min-h-screen flex bg-slate-50 dark:bg-slate-950 ${dark ? "dark" : ""}`}>
      
      {/* Sidebar */}
      <aside className="w-64 m-4 rounded-3xl bg-gradient-to-b from-violet-600 to-purple-700 text-white shadow-2xl p-6 flex flex-col">
        
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
            <ShieldCheck />
          </div>
          <div>
            <h2 className="font-bold text-lg">Admin Panel</h2>
            <p className="text-xs text-violet-200">CampusConnect</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${
                    active
                      ? "bg-white text-violet-700 shadow-lg"
                      : "text-violet-100 hover:bg-white/10"
                  }`}
              >
                <Icon size={18} />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={() => router.push("/login")}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-200 hover:bg-red-500/20 hover:text-white transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Section */}
      <section className="flex-1 flex flex-col p-6">
        
        {/* Topbar */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Admin Control Center
          </h1>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white dark:bg-slate-900 shadow hover:scale-105 transition"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {children}
        </main>
      </section>
    </div>
  );
}
