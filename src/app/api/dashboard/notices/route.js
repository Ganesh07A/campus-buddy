import { supabase } from "@/lib/supabase";
export async function GET() {
    try {
        const { count } = await supabase
        .from("notices")
        .select("*", { count:"exact", head: true})

        // notices 
        const { data, error } = await supabase
        .from("notices")
        .select("id, title, created_at, file_url")
        .order("created_at", { ascending: false})
        
        if(error) { 
            return Response.json({ error: error.message}, {status: 500})
        }

        return Response.json(
            {
                total: count,
                notices: data

            }
        )
    } catch(err) {
        return Response.json({ error: err.message},{ status: 500})
    }
}