"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Registration failed");
        setLoading(false);
        return;
      }

      setSuccess("Registered successfully! Redirecting...");
      setTimeout(() => router.push("/login"), 1500);

    } catch (err) {
      setError("Network error");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <Card className="w-full max-w-md shadow-lg border rounded-xl">
        
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Create an account
          </CardTitle>
          <p className="text-sm text-center text-muted-foreground">
            Join CampusBuddy today 🚀
          </p>
        </CardHeader>

        <CardContent>
          
          {error && (
            <div className="mb-4 text-sm bg-red-100 text-red-700 border border-red-300 rounded p-2">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 text-sm bg-green-100 text-green-700 border border-green-300 rounded p-2">
              {success}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* Full Name */}
            <div className="space-y-1">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Ganesh Suvarnakar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@college.edu"
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

            {/* Submit button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white"
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-sky-600 hover:underline font-medium">
              Sign in
            </a>
          </p>

        </CardContent>
      </Card>
    </div>
  );
}
