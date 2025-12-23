import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin"; // Use Admin Client
import { cookies } from "next/headers";
import { jwtVerify } from "jose"; 

export async function GET() { 
    try {
        const { data, error} = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { ascending : false})

    if(error) {
        return Response.json(
            {error: "Failed to fetch notices" },
            {status: 500}
        )
    } 
    return Response.json(data, { status: 200});

        
    } catch(error) {
        return Response.json(
            {error: error.message},
            { status: 500 }
        )
    }
    
}

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function POST(req) {
  try {
    // --- 1. SECURITY CHECK START ---
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    if (!token) {
      return Response.json({ error: "Unauthorized access" }, { status: 401 });
    }

    try {
      // Verify the custom JWT
      await jwtVerify(token, SECRET);
      // (Optional: In the future, check if payload.role === 'admin')
    } catch (err) {
      return Response.json({ error: "Invalid or expired token" }, { status: 401 });
    }
    // --- SECURITY CHECK END ---

    const formData = await req.formData();
    const title = formData.get("title");
    const file = formData.get("file");

    if (!title || !file) {
      return Response.json({ error: "Title and file are required" }, { status: 400 });
    }

    // 2. Upload file (Using Admin Client to bypass RLS)
    const filePath = `files/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("notices")
      .upload(filePath, file);

    if (uploadError) {
      return Response.json({ error: uploadError.message }, { status: 500 });
    }

    // 3. Get public URL
    const { data: publicUrlData } = supabaseAdmin.storage
      .from("notices")
      .getPublicUrl(filePath);

    const file_url = publicUrlData.publicUrl;

    // 4. Insert record into database
    const { error: insertError } = await supabaseAdmin
      .from("notices")
      .insert({ title, file_url });

    if (insertError) {
      return Response.json({ error: insertError.message }, { status: 500 });
    }

    return Response.json(
      { message: "Notice uploaded successfully", title, file_url },
      { status: 200 }
    );

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}