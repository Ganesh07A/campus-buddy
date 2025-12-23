"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Upload, Loader2, CheckCircle, FileText, Hash, Calendar, Layers, GitBranch } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminPYQPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    subject_name: "",
    course_code: "",
    year: "", // This is Exam Year (e.g. 2023)
    branch: "", // New
    academic_year: "" // New (e.g. 1st Year)
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a PDF file.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("subject_name", formData.subject_name);
      data.append("course_code", formData.course_code);
      data.append("year", formData.year);
      // Append New Fields
      data.append("branch", formData.branch);
      data.append("academic_year", formData.academic_year);

      const res = await fetch("/api/pyqs", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      
      if (!res.ok) throw new Error(result.error || "Upload failed");

      alert("✅ PYQ Uploaded Successfully!");
      router.push("/dashboard"); 

    } catch (error) {
      console.error(error);
      alert("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="text-violet-600" />
            Upload Question Paper
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Row 1: Branch & Academic Year (Dropdowns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Branch Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="branch">Branch</Label>
                <div className="relative">
                  <GitBranch className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <select
                    id="branch"
                    name="branch"
                    className="flex h-10 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 pl-9 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950"
                    onChange={handleChange}
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>Select Branch</option>
                    <option value="CSE">CSE (Comp Sci)</option>
                    <option value="AIML">AI & ML</option>
                    <option value="DS">Data Science</option>
                    <option value="ENTC">E&TC</option>
                    <option value="MECH">Mechanical</option>
                    <option value="CIVIL">Civil</option>
                  </select>
                </div>
              </div>

              {/* Academic Year Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="academic_year">Academic Year</Label>
                <div className="relative">
                  <Layers className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <select
                    id="academic_year"
                    name="academic_year"
                    className="flex h-10 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 pl-9 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950"
                    onChange={handleChange}
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Row 2: Subject & Course Code */}
            <div className="space-y-2">
              <Label htmlFor="subject_name">Subject Name</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="subject_name"
                  name="subject_name"
                  placeholder="e.g. Data Structures & Algorithms"
                  className="pl-9"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Row 3: Course Code & Exam Year */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="course_code">Course Code</Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="course_code"
                    name="course_code"
                    placeholder="e.g. CS301"
                    className="pl-9"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Exam Year</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    placeholder="e.g. 2023"
                    className="pl-9"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label>Attach PDF</Label>
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 transition-colors cursor-pointer relative">
                <input 
                  type="file" 
                  accept=".pdf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  required
                />
                <div className="bg-violet-100 p-3 rounded-full mb-2">
                  <Upload className="text-violet-600 h-6 w-6" />
                </div>
                {file ? (
                  <div className="flex items-center gap-2 text-violet-700 font-medium">
                    <CheckCircle className="h-4 w-4" />
                    {file.name}
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Click to upload PDF</p>
                    <p className="text-xs text-slate-500 mt-1">Max file size: 10MB</p>
                  </>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700" disabled={loading}>
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</>
              ) : "Upload PYQ"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}