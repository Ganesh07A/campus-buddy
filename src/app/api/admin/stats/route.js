import { supabase } from "@/lib/supabase"; // Public client is fine for counts

export const dynamic = 'force-dynamic'; // Ensure it fetches fresh data

export async function GET() {
  try {
    // Run all 3 queries in parallel for speed
    const [events, notices, pyqs] = await Promise.all([
      supabase.from("events").select("*", { count: "exact", head: true }),
      supabase.from("notices").select("*", { count: "exact", head: true }),
      supabase.from("pyqs").select("*", { count: "exact", head: true }),
    ]);

    return Response.json({
      events: events.count || 0,
      notices: notices.count || 0,
      pyqs: pyqs.count || 0,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}