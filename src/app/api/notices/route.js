import { supabase } from "@/lib/supabase";

export async function GET() { 
    try {
        const { data, error} = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { asending : false})

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