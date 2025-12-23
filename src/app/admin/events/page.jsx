"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Calendar, Clock, MapPin, Type } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AddEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to Fetch events!");
      }
      alert("Event created successfully! ");
      router.push("/dashboard"); // redirect to dashboard
    } catch (err) {
      alert("ERROR!", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="text-violet-600" />
            Add New Event
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Input */}
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <div className="relative">
                <Type className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Annual Tech Fest"
                  className="pl-9"
                  required
                  onChange={handleChange}
                />
                <Label htmlFor="description" className="mt-2">Description</Label>
                <Type className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="description"
                  name="description"
                  placeholder="Write something about the event"
                  className="pl-9 mt-2"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Date & Time Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    className="pl-9"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Location Input */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g. Auditorium Hall A"
                  className="pl-9"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700"
              disabled={loading}
            >
              {loading ? "Creating..." : "Publish Event"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
