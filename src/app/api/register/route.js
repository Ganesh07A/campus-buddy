import bcrypt from "bcrypt";
import { supabase } from "@/lib/supabase";
export async function POST(req) {
  try {
        const body = await req.json();
        const { name, email, password } = body;

        //validate input
        if (!name || !email || !password) {
            return Response.json(
                {
                error: "All fields are required !",
                },
                { status: 400 }
            );
        }

        // check if user already exists
        const { data: existingUser } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();


        if (existingUser) {
            return Response.json(
                {
                    error: "User already exists with this email !",
                },
                { status: 400}
            )
        }

    // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // insert user into database
        // 4. Insert into Supabase
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password: hashedPassword,
        },
      ])
      .select();

       if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

        return Response.json({
        message: "User is registerd Sucessfully !",
        user: data[0],
        });
    } catch (error) {
        return Response.json(
        {
            error: error.message,
        },
        { status: 500 }
        );
    }
}
