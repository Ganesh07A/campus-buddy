"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner"; // Optional: If you installed sonner, or remove this

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      // ✅ CHANGED: Pointing to the new auth API we discussed
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      toast.success("Welcome back!");

      // ✅ NEW: Smart Redirect Logic
      // If the email contains "admin", go to the Admin Panel
      // Otherwise, go to the Student Dashboard
      if (data.role === 'admin') {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }

      
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
      setLoading(false);
    }
      
    }
    
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-950">
      <Card className="w-full max-w-md shadow-2xl border-0 ring-1 ring-slate-200 dark:ring-slate-800">
        
        <CardHeader className="space-y-1">
          <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/20">
            {/* Simple logo icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          </div>
          <CardTitle className="text-2xl font-bold text-center tracking-tight">
            Welcome Back
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            Sign in to access your CampusBuddy portal
          </p>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"/>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="student@syp.edu"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pr-16"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 hover:text-violet-600 transition-colors px-2 py-1"
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs pt-1">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
                <Label htmlFor="remember" className="font-normal cursor-pointer">Remember me</Label>
              </div>
              <a href="#" className="text-violet-600 hover:text-violet-700 font-medium hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-violet-600 hover:bg-violet-700 text-white font-bold shadow-md shadow-violet-500/20 transition-all active:scale-[0.98]"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                  Signing in...
                </div>
              ) : "Sign In"}
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Don’t have an account?{" "}
            <a href="/register" className="text-violet-600 hover:text-violet-700 font-bold hover:underline">
              Create Account
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}