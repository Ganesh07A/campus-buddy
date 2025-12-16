"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Calendar,
  Users,
  Bell,
  Search,
  Menu,
  GraduationCap,
  FileText,
  Clock,
  LogOut,
  Moon,
  Sun,
  LayoutDashboard,
} from "lucide-react";

/* ---------- Reusable UI Primitives ---------- */

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-200 hover:shadow-lg ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 pb-3 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3
    className={`font-semibold leading-none tracking-tight text-slate-900 dark:text-slate-100 ${className}`}
  >
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
}) => {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]";
  const variants = {
    default:
      "bg-violet-600 text-white hover:bg-violet-700 shadow-md shadow-violet-200 dark:shadow-none",
    outline:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800",
    ghost:
      "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
  };
  const sizes = {
    default: "h-11 px-4",
    sm: "h-9 px-3 text-xs",
    icon: "h-10 w-10",
  };
  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 ${className}`}
  >
    {children}
  </span>
);

const Avatar = ({ src, alt, className = "" }) => (
  <div
    className={`relative h-10 w-10 overflow-hidden rounded-full border-2 border-white dark:border-slate-800 shadow-sm ${className}`}
  >
    <img src={src} alt={alt} className="h-full w-full object-cover" />
  </div>
);

/* ---------- Mock Data (later replace with Supabase) ---------- */

const student = {
  name: "John Doe",
  year: "3rd year",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
};

const events = [
  {
    id: 1,
    title: "Tech Symposium 2024",
    date: "Mar 15",
    time: "10:00 AM",
    location: "Main Auditorium",
  },
  {
    id: 2,
    title: "Cultural Night",
    date: "Mar 20",
    time: "06:00 PM",
    location: "Open Air Theatre",
  },
  {
    id: 3,
    title: "AI & ML Workshop",
    date: "Mar 25",
    time: "02:00 PM",
    location: "Lab 402",
  },
];

const notices = [
  {
    id: 1,
    title: "Prelim payment due",
    summary: "Complete the payment by 5th Oct to avoid penalties.",
  },
  {
    id: 2,
    title: "Exam schedule released",
    summary: "End semester exams start from 15th Nov. Check the PDF.",
  },
];

const pyqs = [
  { id: 1, code: "CS301", name: "Data Structures", year: "2023" },
  { id: 2, code: "CS302", name: "Algorithms", year: "2023" },
  { id: 3, code: "CS303", name: "Operating Systems", year: "2022" },
];

/* ---------- Main Dashboard Component ---------- */

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setDarkMode((d) => !d);
    document.documentElement.classList.toggle("dark");
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "events", label: "Events", icon: Calendar },
    { id: "pyqs", label: "PYQs", icon: BookOpen },
    { id: "notices", label: "Notices", icon: FileText },
  ];

  return (
    <div
      className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-4  left-4 z-40 w-65 rounded-3xl
          bg-gradient-to-b from-violet-600 to-purple-600
          text-white shadow-2xl shadow-violet-200/60
          flex flex-col py-6 px-4
          transform transition-transform duration-300 ease-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-[120%]"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-3 mb-8">
          <div className="h-10 w-10 rounded-2xl bg-white/20 flex items-center justify-center">
            <GraduationCap size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold leading-tight">
              CampusBuddy
            </span>
            <span className="text-xs text-violet-100">
              Student Dashboard
            </span>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-2 mt-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-white text-violet-700 shadow-lg shadow-violet-300"
                      : "text-violet-100/90 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom user + logout */}
        <div className="mt-4 px-2 space-y-3">
          <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-3 py-2">
            <Avatar src={student.avatar} alt={student.name} className="h-9 w-9" />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">{student.name}</p>
              <p className="text-[11px] text-violet-100/80 truncate">
                {student.year}
              </p>
            </div>
          </div>

          <button className="w-full flex items-center gap-2 px-4 py-2 rounded-2xl text-sm text-red-100 hover:bg-red-500/20 hover:text-white transition-colors">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:pl-80 px-4 lg:px-8 py-4 lg:py-6">
        {/* Top bar */}
        <header className="flex items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
            >
              <Menu size={20} />
            </button>

            {/* Search */}
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search in CampusConnect..."
                className="h-10 w-64 rounded-full border border-slate-200 bg-white px-9 text-sm outline-none focus:ring-2 focus:ring-violet-500 dark:bg-slate-900 dark:border-slate-700"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-white dark:bg-slate-900 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? (
                <Sun size={18} className="text-amber-400" />
              ) : (
                <Moon size={18} />
              )}
            </button>
            <button className="relative p-2.5 rounded-full bg-white dark:bg-slate-900 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Bell size={18} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
            </button>
            <Avatar src={student.avatar} alt={student.name} className="hidden md:block" />
          </div>
        </header>

        {/* Route content */}
        <div className="max-w-6xl mx-auto space-y-8">
          {activeTab === "dashboard" && (
            <DashboardHome
              setActiveTab={setActiveTab}
              events={events}
              notices={notices}
              pyqs={pyqs}
            />
          )}
          {activeTab === "events" && <EventsPage events={events} />}
          {activeTab === "pyqs" && <PyqPage pyqs={pyqs} />}
          {activeTab === "notices" && <NoticesPage notices={notices} />}
        </div>
      </main>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

/* ---------- Sub Pages ---------- */

function DashboardHome({ setActiveTab, events, notices, pyqs }) {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      {/* Banner with 3D illustration placeholder */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg p-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="relative z-10 max-w-xl space-y-3">
          <p className="text-sm text-violet-100">{today}</p>
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome back, John!
          </h1>
          <p className="text-sm md:text-base text-violet-100 max-w-md">
            Always stay updated in your student portal. Check events, notices,
            and previous year questions in one place.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              className="text-black font-semibold  bg-teal-700 hover:bg-white/90"
              onClick={() => setActiveTab("events")}
            >
              View upcoming events
            </Button>
            <Button variant="outline" onClick={() => setActiveTab("notices")}>
              Open notice board
            </Button>
          </div>
        </div>

        {/* Right illustration side */}
        <div className="mt-6 md:mt-0 md:ml-6 relative">
          {/* Glow blobs */}
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-purple-400/40 blur-3xl" />
          <div className="absolute -top-6 right-4 h-28 w-28 rounded-full bg-violet-300/40 blur-2xl" />
          {/* 3D Illustration image placeholder */}
          <div className="relative h-40 w-40 md:h-48 md:w-48 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center overflow-hidden shadow-xl">
            {/* Put your own 3D model image in public/dashboard-3d.png */}
            <img
              src="/dashboard_3d.png"
              alt="3D student"
              className="h-full w-full object-cover "
            />
          </div>
        </div>
      </div>

      {/* Top row: Events / PYQs / Notices quick cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          className="hover:scale-[1.02]"
          onClick={() => setActiveTab("events")}
        >
          <CardHeader className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-violet-100 flex items-center justify-center">
              <Calendar className="text-violet-600" size={20} />
            </div>
            <div>
              <CardTitle>Upcoming Events</CardTitle>
              <p className="text-xs text-slate-500 mt-1">
                {events.length} events this month
              </p>
            </div>
          </CardHeader>
        </Card>

        <Card
          className="hover:scale-[1.02]"
          onClick={() => setActiveTab("pyqs")}
        >
          <CardHeader className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-indigo-100 flex items-center justify-center">
              <BookOpen className="text-indigo-600" size={20} />
            </div>
            <div>
              <CardTitle>PYQs & Resources</CardTitle>
              <p className="text-xs text-slate-500 mt-1">
                {pyqs.length}+ papers available
              </p>
            </div>
          </CardHeader>
        </Card>

        <Card
          className="hover:scale-[1.02]"
          onClick={() => setActiveTab("notices")}
        >
          <CardHeader className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-pink-100 flex items-center justify-center">
              <FileText className="text-pink-600" size={20} />
            </div>
            <div>
              <CardTitle>Notices</CardTitle>
              <p className="text-xs text-slate-500 mt-1">
                {notices.length} new announcements
              </p>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Bottom section: Events & Notices side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events list */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Upcoming events</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setActiveTab("events")}>
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 dark:border-slate-800 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-violet-100 flex flex-col items-center justify-center text-[11px] font-semibold text-violet-700">
                      <span>{event.date.split(" ")[0]}</span>
                      <span>{event.date.split(" ")[1]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{event.title}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <Clock size={12} />
                        {event.time} • {event.location}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notice board */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Daily notice</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => setActiveTab("notices")}
            >
              See all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              {notices.map((notice) => (
                <div key={notice.id} className="border-b border-slate-100 dark:border-slate-800 pb-3 last:border-0 last:pb-0">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {notice.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {notice.summary}
                  </p>
                  <button className="mt-1 text-xs text-violet-600 hover:underline">
                    More
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function EventsPage({ events }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">All events</h2>
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>{event.title}</CardTitle>
              <p className="text-xs text-slate-500 mt-1">
                {event.date} • {event.time} • {event.location}
              </p>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

function PyqPage({ pyqs }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Previous year questions</h2>
      {pyqs.map((p) => (
        <Card key={p.id}>
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>{p.name}</CardTitle>
              <p className="text-xs text-slate-500 mt-1">
                {p.code} • {p.year}
              </p>
            </div>
            <Button size="sm" variant="outline">
              Download
            </Button>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

function NoticesPage({ notices }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Notice board</h2>
      {notices.map((n) => (
        <Card key={n.id}>
          <CardHeader>
            <CardTitle>{n.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {n.summary}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
