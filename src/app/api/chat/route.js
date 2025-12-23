import { google } from "@ai-sdk/google";
import { generateText } from "ai"; // Changed from streamText
import { supabase } from "@/lib/supabase";

export const maxDuration = 30;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    // 1. Fetch Context
    const { data: events } = await supabase
      .from("events")
      .select("title, date, description,  time, location")
      .order("date", { ascending: true })
      .limit(5);

    const { data: notices } = await supabase
      .from("notices")
      .select("title, summary, created_at")
      .order("created_at", { ascending: false })
      .limit(5);

    // 2. Build Context
    const contextBlock = `
      REAL-TIME DATABASE DATA:
      [Events]: ${events?.map(e => `${e.title} ${e.date}, at ${e.time} (${e.location})`).join(", ") || "None"}
      [Notices]: ${notices?.map(n => `${n.title}`).join(", ") || "None"}
    `;

    // 3. Generate Response (No Streaming)
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      system: `You are CampusBuddy. Answer based on this data: ${contextBlock}
      RULES:
      1. If user asks for the events, give only title, date, time , location.
      2. DO NOT use ** in between the response.
      3.If user asks for more information about the events, answer from description of events description from the database.
      `,

      messages,
    });

    // 4. Return simple JSON
    return Response.json({ role: "assistant", content: text });

  } catch (error) {
    console.error("Chat Error:", error);
    return Response.json({ error: "Failed to generate response" }, { status: 500 });
  }
}