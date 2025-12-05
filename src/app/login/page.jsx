"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      const res = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-white">
      <Card className="w-full max-w-md shadow-xl border border-gray-200">
        
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Welcome Back 👋
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            Sign in to access CampusBuddy
          </p>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-md border border-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="you@college.edu"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700"
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex justify-between text-xs">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="scale-90" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a href="#" className="text-sky-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <a href="/register" className="text-sky-600 hover:text-sky-700 font-medium">
              Register
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
