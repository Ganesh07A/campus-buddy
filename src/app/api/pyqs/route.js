import { supabase } from "@/lib/supabase"; // Public client
import { supabaseAdmin } from "@/lib/supabase-admin"; // Admin client
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);

// 1. GET: Fetch all PYQs
export async function GET() {
    console.log("fetch started...")
  try {
    const { data, error } = await supabase
      .from("pyqs")
      .select("*")
      .order("created_at", { ascending: false }); // Newest papers first

    if (error) {
      console.error("❌ Supabase Error:", error); // READ THIS IN YOUR TERMINAL
      return Response.json({ error: error.message }, { status: 500 });
    }

    console.log("✅ PYQs found:", data.length);
    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// 2. POST: Admin uploads a new PYQ metadata
export async function POST(req) {
  try {
    // --- Security Check ---
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

    try {
      await jwtVerify(token, SECRET);
    } catch (err) {
      return Response.json({ error: "Invalid Token" }, { status: 401 });
    }
    // ----------------------

    const body = await req.json();
    const { course_code, subject_name, year, file_url } = body;

    const { data, error } = await supabaseAdmin
      .from("pyqs")
      .insert([{ course_code, subject_name, year, file_url }])
      .select();

    if (error) throw error;

    return Response.json({ message: "PYQ added", pyq: data[0] }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}