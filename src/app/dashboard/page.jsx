"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, Download, LogOut, Menu, X, 
  BookOpen, Calendar, FileText, Home, 
  Filter, User, Sparkles, Moon, Sun, 
  ArrowRight, MapPin, Clock 
} from "lucide-react";
import Chatbot from "@/components/Chatbot";

/* --- 1. Sidebar Component --- */
const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: "home", label: "Overview", icon: Home },
    { id: "pyqs", label: "PYQs & Notes", icon: BookOpen },
    { id: "events", label: "Events", icon: Calendar },
    { id: "notices", label: "Notices Board", icon: FileText },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-6 flex items-center gap-2 font-bold text-xl text-slate-800 dark:text-white">
          <div className="h-8 w-8 bg-violet-600 rounded-lg flex items-center justify-center text-white">
            <Sparkles size={18} />
          </div>
          CampusBuddy
        </div>

        <nav className="mt-8 space-y-2 px-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "bg-violet-600 text-white shadow-md shadow-violet-500/20"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Profile Snippet */}
        <div className="absolute bottom-6 left-6 right-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-violet-200 flex items-center justify-center text-violet-700 font-bold">
            S
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate dark:text-white">Student User</p>
            <p className="text-xs text-slate-500 truncate">student.edu</p>
          </div>
        </div>
      </aside>
    </>
  );
};

/* --- 2. Main Dashboard Component --- */
export default function StudentDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  
  // Data State
  const [data, setData] = useState({ events: [], notices: [], pyqs: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("All");

  // Load Data & Theme
  useEffect(() => {
    // Check Theme Preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }

    async function fetchData() {
      try {
        const [eventsRes, noticesRes, pyqsRes] = await Promise.all([
          fetch("/api/events"),
          fetch("/api/notices"),
          fetch("/api/pyqs")
        ]);
        
        const events = await eventsRes.json();
        const notices = await noticesRes.json();
        const pyqs = await pyqsRes.json();
        
        setData({ 
          events: Array.isArray(events) ? events : [], 
          notices: Array.isArray(notices) ? notices : [], 
          pyqs: Array.isArray(pyqs) ? pyqs : [] 
        });
      } catch (err) {
        console.error("Error loading data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Theme Toggle Handler
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  // Filter PYQs
  const filteredPYQs = data.pyqs.filter(pyq => {
    const matchesSearch = pyq.subject_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = yearFilter === "All" || pyq.academic_year === yearFilter;
    return matchesSearch && matchesYear;
  });

  const handleLogout = () => router.push("/login");

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen p-6 md:p-10 transition-all">
        
        {/* Top Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="md:hidden p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold">{getGreeting()}, Student! 👋</h1>
              <p className="text-slate-500 text-sm hidden md:block">Let's be productive today.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-yellow-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* --- 1. OVERVIEW (HOME) --- */}
        {activeTab === "home" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* HERO SECTION */}
            <div className="relative bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-8 md:p-12 overflow-hidden text-white shadow-xl">
              <div className="relative z-10 max-w-lg">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-4 backdrop-blur-md">
                  🚀 Ready to learn?
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                  Ace your exams with <br/> CampusBuddy.
                </h2>
                <div className="flex gap-4">
                  <button onClick={() => setActiveTab('pyqs')} className="px-6 py-3 bg-white text-violet-700 font-bold rounded-full shadow-lg hover:bg-slate-100 transition-transform hover:scale-105 active:scale-95">
                    Find Resources
                  </button>
                </div>
              </div>
              {/* 3D Illustration Placeholder */}
              <div className="absolute right-0 bottom-0 w-80 md:w-96 hidden md:block translate-y-10 translate-x-10 pointer-events-none">
                <img 
                  src="https://grainy-gradients.vercel.app/noise.svg" 
                  className="absolute inset-0 opacity-20 mix-blend-overlay"
                />
                <img 
                  src="https://cdni.iconscout.com/illustration/premium/thumb/3d-boy-study-with-laptop-2995966-2509587.png" 
                  className="drop-shadow-2xl opacity-90"
                  alt="Student Illustration"
                />
              </div>
            </div>

            {/* LIVE UPDATES GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Latest Notices (Takes up 2 columns) */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <FileText className="text-pink-500" size={20} /> Latest Updates
                  </h3>
                  <button onClick={() => setActiveTab('notices')} className="text-sm text-violet-600 font-medium hover:underline">View All</button>
                </div>
                
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-2 shadow-sm">
                  {loading ? (
                    <div className="p-8 text-center text-slate-400">Loading updates...</div>
                  ) : data.notices.length === 0 ? (
                    <div className="p-8 text-center text-slate-400">No new notices.</div>
                  ) : (
                    data.notices.slice(0, 3).map((notice, i) => (
                      <div key={i} className="group flex gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b last:border-0 border-slate-100 dark:border-slate-800">
                        <div className="flex-shrink-0 w-12 h-12 bg-pink-50 dark:bg-pink-900/20 text-pink-600 rounded-xl flex items-center justify-center font-bold text-xs">
                          {new Date(notice.created_at).getDate()} <br/>
                          {new Date(notice.created_at).toLocaleString('default', { month: 'short' })}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-pink-600 transition-colors">
                            {notice.title}
                          </h4>
                          <p className="text-sm text-slate-500 line-clamp-1">{notice.summary || "Tap to view details."}</p>
                        </div>
                        <a href={notice.file_url} target="_blank" className="self-center p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-full transition-all">
                          <ArrowRight size={18} />
                        </a>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Upcoming Events (Takes up 1 column) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <h3 className="font-bold text-lg flex items-center gap-2">
                    <Calendar className="text-violet-600" size={20} /> Next Up
                  </h3>
                  <button onClick={() => setActiveTab('events')} className="text-sm text-violet-600 font-medium hover:underline">View All</button>
                </div>

                <div className="space-y-3">
                  {loading ? (
                    <div className="text-center text-slate-400 py-8">Loading...</div>
                  ) : data.events.length === 0 ? (
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center text-slate-400 text-sm">
                      No upcoming events.
                    </div>
                  ) : (
                    data.events.slice(0, 2).map((event, i) => (
                      <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-violet-500/10 to-transparent rounded-bl-full -mr-4 -mt-4"></div>
                        <p className="text-xs font-bold text-violet-600 mb-1 uppercase tracking-wide">
                          {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long' })}
                        </p>
                        <h4 className="font-bold text-lg mb-3 leading-tight">{event.title}</h4>
                        <div className="flex flex-col gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-2"><Clock size={14}/> {event.time}</span>
                          <span className="flex items-center gap-2"><MapPin size={14}/> {event.location}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* --- 2. PYQS SECTION --- */}
        {activeTab === "pyqs" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-bold mb-2">📚 Study Resources</h2>
              <p className="text-slate-500">Find question papers and notes.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search subject..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-violet-500 outline-none dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative min-w-[150px]">
                <Filter className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <select 
                  className="w-full pl-10 pr-8 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-violet-500 outline-none appearance-none cursor-pointer dark:text-white"
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                >
                  <option value="All">All Years</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPYQs.length > 0 ? (
                filteredPYQs.map((pyq) => (
                  <div key={pyq.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="h-12 w-12 bg-violet-100 dark:bg-violet-900/30 text-violet-600 rounded-xl flex items-center justify-center">
                        <FileText size={24} />
                      </div>
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full">
                        {pyq.year}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-violet-600 transition-colors">
                      {pyq.subject_name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">
                      {pyq.course_code} • {pyq.branch}
                    </p>
                    <a 
                      href={pyq.file_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-violet-600 hover:text-white transition-all"
                    >
                      <Download size={16} /> Download
                    </a>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-slate-400">
                  <p>No resources found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- 3. EVENTS TAB --- */}
        {activeTab === "events" && (
           <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h2 className="text-2xl font-bold">📅 All Events</h2>
             <div className="grid gap-4">
                {data.events.map(event => (
                  <div key={event.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                      <h3 className="font-bold text-lg">{event.title}</h3>
                      <p className="text-slate-500">{event.location} • {event.time}</p>
                    </div>
                    <div className="text-center bg-violet-50 dark:bg-violet-900/20 p-3 rounded-xl text-violet-700 dark:text-violet-300 min-w-[70px]">
                       <div className="text-xs font-bold uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
                       <div className="text-2xl font-bold">{new Date(event.date).getDate()}</div>
                    </div>
                  </div>
                ))}
             </div>
           </div>
        )}

        {/* --- 4. NOTICES TAB --- */}
        {activeTab === "notices" && (
           <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h2 className="text-2xl font-bold">📢 Notice Board</h2>
             <div className="grid gap-4">
                {data.notices.map(notice => (
                  <div key={notice.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-l-4 hover:border-l-pink-500 transition-all">
                    <div className="flex justify-between mb-2">
                       <span className="text-xs font-bold text-pink-600 bg-pink-50 dark:bg-pink-900/20 px-2 py-1 rounded-md">OFFICIAL</span>
                       <span className="text-xs text-slate-400">{new Date(notice.created_at).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{notice.title}</h3>
                    <a href={notice.file_url} target="_blank" className="text-sm text-violet-600 hover:underline flex items-center gap-1">
                      View Attachment <ArrowRight size={14} />
                    </a>
                  </div>
                ))}
             </div>
           </div>
        )}

      </main>

      {/* AI Chatbot */}
      <Chatbot />
    </div>
  );
}