"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  Bell,
  Search,
  Menu,
  FileText,
  Clock,
  BookOpen,
  GraduationCap,
  LogOut,
  Moon,
  Sun,
  LayoutDashboard,
} from "lucide-react";

//
// --- BASIC UI COMPONENTS (KEEP THESE) ---
//

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children }) => <div className="p-6">{children}</div>;
const CardTitle = ({ children }) => (
  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
    {children}
  </h3>
);
const CardContent = ({ children }) => <div className="px-6 pb-6">{children}</div>;

const Button = ({ children, onClick, variant = "default" }) => {
  const base =
    "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors px-4 py-2";

  const styles = {
    default: "bg-violet-600 text-white hover:bg-violet-700",
    outline:
      "border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800",
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
};

//
// MOCK DATA (TEMP) — will connect to Supabase later
//

const student = {
  name: "John Doe",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
};

const notices = [
  { title: "Exam schedule released", date: "2 days ago" },
  { title: "Fee payment reminder", date: "5 days ago" },
];

const events = [
  { title: "Freshers Event", date: "March 15", time: "10:00 AM" },
  { title: "Cultural Night", date: "March 20", time: "06:00 PM" },
];

const councilMembers = [
  { name: "Sarah Smith", role: "President" },
  { name: "Mike Johnson", role: "Vice President" },
];

const pyqs = [
  { code: "CS301", year: "2023", name: "Data Structures" },
  { code: "CS302", year: "2022", name: "Algorithms" },
];

//
// MAIN DASHBOARD COMPONENT
//

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors ${
        darkMode ? "dark" : ""
      }`}
    >
      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-violet-700 text-white p-6 transform transition
        ${menuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex items-center gap-3 mb-8">
          <GraduationCap className="text-white" />
          <span className="text-xl font-bold">CampusConnect</span>
        </div>

        <nav className="space-y-3">
          <SidebarItem
            id="dashboard"
            label="Dashboard"
            icon={LayoutDashboard}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <SidebarItem
            id="events"
            label="Events"
            icon={Calendar}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <SidebarItem
            id="notices"
            label="Notices"
            icon={Bell}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <SidebarItem
            id="council"
            label="Council"
            icon={Users}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <SidebarItem
            id="pyqs"
            label="PYQ"
            icon={BookOpen}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button className="flex items-center gap-2 text-sm text-red-200 hover:text-white">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* TOP BAR */}
      <header className="lg:ml-64 flex items-center justify-between p-4">
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu />
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              document.documentElement.classList.toggle("dark");
            }}
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
          <img
            src={student.avatar}
            className="w-8 h-8 rounded-full"
            alt="avatar"
          />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="lg:ml-64 p-6">
        {activeTab === "dashboard" && <DashboardPage />}
        {activeTab === "events" && <EventsPage />}
        {activeTab === "notices" && <NoticesPage />}
        {activeTab === "council" && <CouncilPage />}
        {activeTab === "pyqs" && <PyqPage />}
      </main>
    </div>
  );
}

//
// SIDEBAR ITEM
//

function SidebarItem({ id, label, icon: Icon, activeTab, setActiveTab }) {
  const active = activeTab === id;
  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm ${
        active
          ? "bg-white text-violet-700"
          : "text-violet-100 hover:bg-violet-600"
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}

//
// PAGES
//

function DashboardPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome back!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Quick access to campus features.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function EventsPage() {
  return (
    <div className="space-y-4">
      {events.map((e, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>{e.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {e.date} • {e.time}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function NoticesPage() {
  return (
    <div className="space-y-4">
      {notices.map((n, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>{n.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{n.date}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function CouncilPage() {
  return (
    <div className="space-y-4">
      {councilMembers.map((m, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>{m.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{m.role}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function PyqPage() {
  return (
    <div className="space-y-4">
      {pyqs.map((p, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>{p.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {p.code} • {p.year}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
