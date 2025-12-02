import { supabase } from "@/lib/supabase";

export async function POST(req) {
    const body = await req.json();
    const { data, error} = await supabase
    .from("users")
    .insert(body);

    if(error) {
        return Response.json({ error: error.message }, { status: 400 });

    }
    return Response.json({ message: "Inserted!", data });
}