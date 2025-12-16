"use client";

import { useRouter } from "next/navigation";
import {
  Calendar,
  FileText,
  BookOpen,
  Plus,
  ArrowRight,
} from "lucide-react";

/* --- Reusable Card --- */
const StatCard = ({ title, count, icon: Icon, gradient, onClick }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer rounded-3xl p-6 text-white shadow-xl transition-all duration-300 hover:scale-[1.03] ${gradient}`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-90">{title}</p>
        <h2 className="text-4xl font-bold mt-2">{count}</h2>
      </div>
      <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
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

  // TEMP values — will connect to DB later
  const stats = {
    events: 5,
    notices: 12,
    pyqs: 34,
  };

  return (
    <div className="space-y-10">
      
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Welcome Admin 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage campus data from one place.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Events"
          count={stats.events}
          icon={Calendar}
          gradient="bg-gradient-to-br from-violet-600 to-indigo-600"
          onClick={() => router.push("/admin/events")}
        />
        <StatCard
          title="Total Notices"
          count={stats.notices}
          icon={FileText}
          gradient="bg-gradient-to-br from-pink-600 to-rose-600"
          onClick={() => router.push("/admin/notices")}
        />
        <StatCard
          title="Total PYQs"
          count={stats.pyqs}
          icon={BookOpen}
          gradient="bg-gradient-to-br from-emerald-600 to-teal-600"
          onClick={() => router.push("/admin/pyqs")}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            title="Add New Event"
            description="Create and publish a campus event."
            icon={Plus}
            onClick={() => router.push("/admin/events")}
          />
          <ActionCard
            title="Upload Notice"
            description="Upload official notice PDF or image."
            icon={FileText}
            onClick={() => router.push("/admin/notices")}
          />
          <ActionCard
            title="Upload PYQ"
            description="Upload previous year question papers."
            icon={BookOpen}
            onClick={() => router.push("/admin/pyqs")}
          />
        </div>
      </div>

      {/* Recent Activity (optional preview) */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Recent Activity
        </h2>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span>📢 Notice uploaded: Exam Schedule</span>
              <span className="text-slate-400">2 hrs ago</span>
            </li>
            <li className="flex justify-between">
              <span>📅 Event added: Tech Symposium</span>
              <span className="text-slate-400">1 day ago</span>
            </li>
            <li className="flex justify-between">
              <span>📚 PYQ uploaded: OS 2023</span>
              <span className="text-slate-400">2 days ago</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}
