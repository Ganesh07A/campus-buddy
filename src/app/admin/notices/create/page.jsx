"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateNoticePage() {
  const router = useRouter();

  // ---------- STATE ----------
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ---------- SUBMIT HANDLER ----------
  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ fixed

    if (!title || !file) {
      setMessage("Title and file are required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", file);

      const res = await fetch("/api/notices/uploads", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Upload failed");
      } else {
        setMessage("Notice uploaded successfully");
        setTitle("");
        setFile(null);

        // optional redirect after success
        setTimeout(() => router.push("/admin/notices"), 1200);
      }
    } catch (error) {
      setMessage(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // ---------- UI ----------
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Notice</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TITLE INPUT */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>

        {/* FILE INPUT */}
        <div>
          <label className="block text-sm font-medium">File</label>
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>

        {/* MESSAGE */}
        {message && (
          <p
            className={
              message.includes("success")
                ? "text-green-500"
                : "text-red-500"
            }
          >
            {message}
          </p>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-md text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-violet-600 hover:bg-violet-700"
          }`}
        >
          {loading ? "Uploading..." : "Upload Notice"}
        </button>
      </form>
    </div>
  );
}
