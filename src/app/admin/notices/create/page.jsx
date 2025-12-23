"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Upload, Loader2, CheckCircle } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function UploadNoticePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // State for Form
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      alert("Please select a file and enter a title.");
      return;
    }

    setLoading(true);

    try {
      // 1. Create FormData (Required for file uploads)
      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", file);

      // 2. Send to our Unified API
      const res = await fetch("/api/notices", {
        method: "POST",
        body: formData, // No JSON.stringify for files!
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Upload failed");

      alert("✅ Notice Published Successfully!");
      router.push("/dashboard"); // Or back to admin list

    } catch (error) {
      console.error(error);
      alert("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <FileText className="text-violet-600" />
            Upload New Notice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title Input */}
            <div className="space-y-2">
              <Label htmlFor="title">Notice Title</Label>
              <Input
                id="title"
                placeholder="e.g. End Semester Exam Schedule"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* File Input (Drag & Drop Style) */}
            <div className="space-y-2">
              <Label htmlFor="file">Attach Document (PDF/Image)</Label>
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 transition-colors cursor-pointer relative">
                
                <input 
                  type="file" 
                  id="file" 
                  accept=".pdf,.png,.jpg,.jpeg"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  required
                />
                
                <div className="bg-violet-100 p-3 rounded-full mb-3">
                  <Upload className="text-violet-600 h-6 w-6" />
                </div>
                
                {file ? (
                  <div className="flex items-center gap-2 text-violet-700 font-medium">
                    <CheckCircle className="h-4 w-4" />
                    {file.name}
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      PDF, PNG, JPG up to 10MB
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 h-11"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Publish Notice"
              )}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}