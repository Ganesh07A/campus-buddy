import { cookies } from 'next/headers';
import { SignJWT } from "jose"; 

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // ---------------------------------------------------------
    // 1. ADMIN LOGIN
    // ---------------------------------------------------------
    if (email === 'admin@syp.edu' && password === 'admin123') {
      
      // ⚠️ FIX: cookies() is async now, so we must await it
      const cookieStore = await cookies();

      cookieStore.set('admin_session', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 Day
        path: '/',
      });

      return Response.json({ success: true, role: 'admin' });
    }

    // ---------------------------------------------------------
    // 2. STUDENT LOGIN
    // ---------------------------------------------------------
    if (email && password.length >= 6) {
      
      const token = await new SignJWT({ email, role: 'student' })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("24h")
        .sign(SECRET);

      // ⚠️ FIX: await cookies() here too
      const cookieStore = await cookies();

      cookieStore.set('session_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 Day
        path: '/',
      });

      return Response.json({ success: true, role: 'student' });
    }

    return Response.json({ error: 'Invalid email or password' }, { status: 401 });

  } catch (error) {
    console.error("Login Error:", error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}