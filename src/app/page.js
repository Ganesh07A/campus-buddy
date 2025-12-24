"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, Bot, Calendar, FileText, 
  ShieldCheck, Sparkles, Moon, Sun, 
  CheckCircle, Users, Zap 
} from "lucide-react";

/* --- Components --- */
const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
  >
    <div className="h-12 w-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-4 text-violet-600 dark:text-violet-400">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
  </motion.div>
);

const StepCard = ({ number, title, desc }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-lg shadow-violet-500/30">
      {number}
    </div>
    <h3 className="text-lg font-bold mb-2 dark:text-white">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 text-sm">{desc}</p>
  </div>
);

export default function LandingPage() {
  const [isDark, setIsDark] = useState(false);

  // Theme Logic
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-violet-200 dark:selection:bg-violet-900 transition-colors duration-300">
      
      {/* --- Navbar --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="h-8 w-8 bg-violet-600 rounded-lg flex items-center justify-center text-white">
              <Sparkles size={18} />
            </div>
            <span>CampusBuddy</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-yellow-400 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link href="/login">
              <button className="px-5 py-2 text-sm font-medium text-slate-600 hover:text-violet-600 dark:text-slate-300 transition-colors hidden sm:block">
                Log in
              </button>
            </Link>
            <Link href="/login">
              <button className="px-5 py-2 text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white rounded-full transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-violet-500/20">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-semibold uppercase tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse"></span>
            v2.0 is Live
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight"
          >
            Your Campus, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-500">
              Simplified.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            The all-in-one platform for students. Access notices, events, and exam resources instantly. 
            Powered by AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Link href="/dashboard">
              <button className="h-12 px-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                Enter Dashboard <ArrowRight size={18} />
              </button>
            </Link>
            <Link href="https://github.com/your-repo">
              <button className="h-12 px-8 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 font-medium transition-colors">
                View on GitHub
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- Stats Section (Social Proof) --- */}
      <section className="py-10 border-y border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Active Students", val: "500+", icon: Users },
            { label: "Resources", val: "1.2k", icon: FileText },
            { label: "Events Hosted", val: "50+", icon: Calendar },
            { label: "Uptime", val: "99.9%", icon: Zap },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-center text-violet-600 dark:text-violet-400 mb-2">
                <stat.icon size={24} />
              </div>
              <h4 className="text-2xl font-bold dark:text-white">{stat.val}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Features Grid --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Everything you need</h2>
            <p className="text-slate-500 dark:text-slate-400">All your academic essentials in one organized place.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Bot}
              title="AI Assistant"
              description="Ask questions about exams, syllabus, or events and get instant AI-powered answers."
              delay={0.1}
            />
            <FeatureCard
              icon={FileText}
              title="Digital Notice Board"
              description="Never miss an update. View official notices and circulars in real-time."
              delay={0.2}
            />
            <FeatureCard
              icon={Calendar}
              title="Event Calendar"
              description="Keep track of hackathons, workshops, and cultural fests happening on campus."
              delay={0.3}
            />
             <FeatureCard
              icon={ShieldCheck}
              title="Secure Resources"
              description="Access Previous Year Questions (PYQs) and study materials securely."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* --- How It Works Section --- */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">How it works</h2>
            <p className="text-slate-500 dark:text-slate-400">Get started in less than 2 minutes.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -z-10" />
            
            <StepCard number="1" title="Login" desc="Use your student credentials to access the secure portal." />
            <StepCard number="2" title="Dashboard" desc="View your personalized feed of events, notices, and updates." />
            <StepCard number="3" title="Explore" desc="Download PYQs, chat with AI, and stay ahead." />
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 text-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-xl mb-4 dark:text-white">
              <div className="h-8 w-8 bg-violet-600 rounded-lg flex items-center justify-center text-white">
                <Sparkles size={18} />
              </div>
              CampusBuddy
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Empowering students with real-time data, AI assistance, and digital resources.
            </p>
          </div>

          {/* <div>
            <h4 className="font-bold mb-4 dark:text-white">Product</h4>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li><Link href="/features" className="hover:text-violet-600">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-violet-600">For Colleges</Link></li>
              <li><Link href="/roadmap" className="hover:text-violet-600">Roadmap</Link></li>
            </ul>
          </div> */}

          <div>
            <h4 className="font-bold mb-4 dark:text-white">Resources</h4>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li><Link href="/docs" className="hover:text-violet-600">Documentation</Link></li>
              <li><Link href="/help" className="hover:text-violet-600">Help Center</Link></li>
              <li><Link href="/privacy" className="hover:text-violet-600">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 dark:text-white">Connect</h4>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li><Link href="https://github.com" className="hover:text-violet-600">GitHub</Link></li>
              <li><Link href="https://twitter.com" className="hover:text-violet-600">Twitter</Link></li>
              <li><Link href="https://linkedin.com" className="hover:text-violet-600">LinkedIn</Link></li>
            </ul>
          </div>

        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-100 dark:border-slate-900 text-center text-slate-400 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2025 CampusBuddy. Built for Students.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-slate-600 dark:hover:text-slate-200">Terms</Link>
            <Link href="/privacy" className="hover:text-slate-600 dark:hover:text-slate-200">Privacy</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}