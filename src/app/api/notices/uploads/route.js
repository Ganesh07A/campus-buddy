import { supabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const file = formData.get("file");

    if (!title || !file) {
      return Response.json(
        { error: "Title and file are required" },
        { status: 400 }
      );
    }

    // 1. Upload file into Supabase Storage
    const filePath = `files/${Date.now()}-${file.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("notices")
      .upload(filePath, file);

    if (uploadError) {
      return Response.json({ error: uploadError.message }, { status: 500 });
    }

    // 2. Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("notices")
      .getPublicUrl(filePath);

    const file_url = publicUrlData.publicUrl;

    // 3. Insert record into database
    const { error: insertError } = await supabase
      .from("notices")
      .insert({
        title,
        file_url,
      });

    if (insertError) {
      return Response.json({ error: insertError.message }, { status: 500 });
    }

    return Response.json(
      {
        message: "Notice uploaded successfully",
        title,
        file_url,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
