"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Calendar,
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

/* ---------- UI Primitives ---------- */

const Card = ({ children, className = "", onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition hover:shadow-lg ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-6 pb-3">{children}</div>
);

const CardTitle = ({ children }) => (
  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
    {children}
  </h3>
);

const CardContent = ({ children }) => (
  <div className="p-6 pt-0">{children}</div>
);

const Button = ({ children, onClick, variant = "default" }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-xl text-sm font-medium transition
      ${
        variant === "outline"
          ? "border border-slate-200 dark:border-slate-700"
          : "bg-violet-600 text-white hover:bg-violet-700"
      }`}
  >
    {children}
  </button>
);

/* ---------- Main Dashboard ---------- */

export default function DashboardPage() {
  const [darkMode, setDarkMode] = useState(false);

  const [notices, setNotices] = useState([]);
  const [noticeCount, setNoticeCount] = useState(0);
  const [loadingNotices, setLoadingNotices] = useState(true);

  /* 🔹 Fetch dashboard notices */
  useEffect(() => {
    const fetchDashboardNotices = async () => {
      try {
        const res = await fetch("/api/dashboard/notices");
        const data = await res.json();

        setNotices(data.notices || []);
        setNoticeCount(data.total || 0);
      } catch (err) {
        console.error("Failed to load dashboard notices", err);
      } finally {
        setLoadingNotices(false);
      }
    };

    fetchDashboardNotices();
  }, []);

  const toggleTheme = () => {
    setDarkMode((d) => !d);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={`min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors ${
        darkMode ? "dark" : ""
      }`}
    >
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-3">
          <button onClick={toggleTheme}>
            {darkMode ? <Sun /> : <Moon />}
          </button>
          <Bell />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 space-y-8">
        {/* Quick cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Notices</CardTitle>
              <p className="text-sm text-slate-500">
                {noticeCount} total notices
              </p>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Events</CardTitle>
              <p className="text-sm text-slate-500">Coming soon</p>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>PYQs</CardTitle>
              <p className="text-sm text-slate-500">Available resources</p>
            </CardHeader>
          </Card>
        </div>

        {/* Latest notices */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Latest Notices</CardTitle>
          </CardHeader>

          <CardContent>
            {loadingNotices && (
              <p className="text-sm text-slate-500">Loading notices...</p>
            )}

            {!loadingNotices && notices.length === 0 && (
              <p className="text-sm text-slate-500">No notices yet</p>
            )}

            <div className="space-y-4">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="border-b pb-3 last:border-0"
                >
                  <p className="font-medium">{notice.title}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(notice.created_at).toLocaleDateString()}
                  </p>
                  <a
                    href={notice.file_url}
                    target="_blank"
                    className="text-sm text-violet-600 hover:underline"
                  >
                    View notice →
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
