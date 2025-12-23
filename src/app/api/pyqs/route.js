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
    // ... (Keep existing Auth Checks) ...
    // --- Security Check ---
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;
    if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });
    try { await jwtVerify(token, SECRET); } 
    catch (err) { return Response.json({ error: "Invalid Token" }, { status: 401 }); }
    // ----------------------

    const data = await req.formData();
    const file = data.get("file");
    const subject_name = data.get("subject_name");
    const course_code = data.get("course_code");
    const exam_year = data.get("year"); // This is "2023", "2022" (Calendar Year)
    
    // ✅ NEW FIELDS
    const branch = data.get("branch");       // e.g. "CSE"
    const academic_year = data.get("academic_year"); // e.g. "3rd Year"

    if (!file || !subject_name || !branch || !academic_year) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Upload File (Keep existing logic)
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `pyqs/${fileName}`;
    
    const { error: uploadError } = await supabaseAdmin.storage
      .from("pyqs")
      .upload(filePath, file);

    if (uploadError) throw new Error("Upload failed: " + uploadError.message);

    const { data: publicUrlData } = supabaseAdmin.storage
      .from("pyqs")
      .getPublicUrl(filePath);

    // 2. Insert into DB with NEW Fields
    const { data: dbData, error: insertError } = await supabaseAdmin
      .from("pyqs")
      .insert([{ 
        subject_name, 
        course_code, 
        year: exam_year, 
        file_url: publicUrlData.publicUrl,
        branch,           // ✅ Saved
        academic_year     // ✅ Saved
      }])
      .select();

    if (insertError) throw new Error("DB Insert failed: " + insertError.message);

    return Response.json({ message: "PYQ Uploaded", pyq: dbData[0] }, { status: 201 });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}