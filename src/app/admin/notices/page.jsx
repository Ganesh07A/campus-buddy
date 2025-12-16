"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FileText, Plus } from "lucide-react";

export default function NoticesPage() {
  const router = useRouter();

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch notices on page load
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch("/api/notices");
        const data = await res.json();
        setNotices(data);
      } catch (error) {
        console.error("Failed to fetch notices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Notices</h1>
        <button
          onClick={() => router.push("/admin/notices/create")}
          className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-xl hover:bg-violet-700 transition"
        >
          <Plus size={18} />
          Create Notice
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-slate-500">Loading notices...</p>
      )}

      {/* Empty State */}
      {!loading && notices.length === 0 && (
        <p className="text-slate-500">No notices uploaded yet.</p>
      )}

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading &&
          notices.map((notice) => (
            <div
              key={notice.id}
              className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <FileText className="text-violet-600" />
                <h2 className="font-semibold text-lg">
                  {notice.title}
                </h2>
              </div>

              <p className="text-xs text-slate-400 mb-3">
                Posted on:{" "}
                {new Date(notice.created_at).toLocaleDateString()}
              </p>

              <a
                href={notice.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-violet-600 hover:underline"
              >
                View File →
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}
