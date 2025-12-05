import { cookies } from "next/headers";

export async function POST(req) {
    try {
        const cookieStore = await cookies();
        cookieStore.set({
            name: "session_token",
            value: "",
            maxAge: 0,
            path: "/"
        })

        return Response.json(
            { message: "Logged Out Sucessfully!"},
            { status: 200}
        )
    }catch(error) {
        return Response.json(
            {error: "Failed to logout. Please try again."},
            { status: 500 }
        )
    }
}