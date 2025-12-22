import { supabase } from "@/lib/supabase";
import {supabaseAdmin} from "@/lib/supabase-admin";
import { cookies } from "next/headers";
import { jwtVerify} from "jose"

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);

// for public events listing
export async function GET(req) {
    try  {
        const { data, error} = await supabase
        .from('events')
        .select("*")
        .order("date", { ascending : true})

        if(error) throw error;
        return Response.json(data, {status: 200})
    }catch(err) {
        return Response.json(
            {error: err.message},
            { status: 500 }
        )
    }
}

// for admin only 
export async function POST(req) {
    try {
        // --- 1. SECURITY CHECK START ---
        const cookieStore = await cookies();
        const token  = cookieStore.get("session_token")?.value;

        if(!token) {
            return Response.json({ error: "Unauthorized access"},{ status: 401});
        }

        try {
            await jwtVerify(token, SECRET);
            // (Optional: In the future, check if payload.role === 'admin')
        }catch(err) {
            return Response.json({ error: "Invalid or expired token"},{ status: 401});
        }

        const body = await req.json()
        const { title, description, date, time, location, } = body;

        if(!title || !description || !date || !time || !location) {
            return Response.json(
                {error: "All fields are required!"},
                { status: 400 }
            )
        }

        // insert into db
        const { data, error } = await supabaseAdmin
        .from("events")
        .insert([{ title, description, date, time, location}])
        .select();

        if(error) throw error;
        return Response.json(
            {message: "Event created sucessfully!", event: data[0]},
            { status: 201 }
        )

    }catch(err) {
        return Response.json(
            { error: err.message},
            { status: 500 }
        )
    }
}