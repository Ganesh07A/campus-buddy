import { createClient } from "@supabase/supabase-js";

// ⚠️ ONLY use this in Server Routes (API). Never expose to client.
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);