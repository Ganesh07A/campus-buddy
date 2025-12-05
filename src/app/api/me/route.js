import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET)    ;

export async function GET() {
    try { 
        // 1. Get cookies
        const cookiesStore = await cookies();
        const token = cookiesStore.get("session_token")?.value;
        if(!token) {
            return Response.json(
                {message: "User not logged in!"},
                {status: 401}

            ) 
        }

        // 2. Verify token
        const { payload } = await jwtVerify(token, SECRET);

        // 3. Fetch user from database
        const { data: user, error} = await supabase
        .from("users")
        .select("*")
        .eq("id", payload.id)
        .single();


        if(!user) {
            return Response.json(
                {error: "User not found!"},
                {status: 404}
            )
        }

        return Response.json({ user }, { status: 200 })
    }catch(error) {
        return response.json(
            {error: "Invalid or expired session. Please log in again."},
            {status: 500}
        )
    }
}