# System Architecture

# CampusBuddy

CampusBuddy is a modern college portal designed to centralize
academic communication between administration and students.

## High-Level Architecture
- **Client:** Next.js (App Router) for Frontend UI
- **Server:** Next.js API Routes (Backend logic)
- **Database:** Supabase (PostgreSQL) with Row Level Security (RLS)
- **File Storage:** Supabase Storage (Buckets for Notices/PYQs)
- **Authentication:** Custom JWT-based Auth (Bcrypt + Jose)

## Key Architectural Decisions
1. **Dual Supabase Clients:**
   - `src/lib/supabase.js`: Uses **Anon Key**. Safe for client-side (Dashboard) read operations.
   - `src/lib/supabase-admin.js`: Uses **Service Role Key**. Restricted to Server API routes for Admin writes (bypassing RLS).
   
2. **Parallel Data Fetching:**
   - The Student Dashboard fetches Notices, Events, and PYQs simultaneously using `Promise.all()` to minimize load times.

```markdown

## Folder Structure
src/
 ├── app/
 │   ├── api/
 │   │   ├── chat/         # 🤖 AI Logic (Gemini + RAG)
 │   │   ├── events/       # Events API
 │   │   ├── notices/      # Notices API
 │   │   ├── pyqs/         # PYQs API
 │   │   └── login/        # Auth API
 │   ├── admin/            # Admin Control Center
 │   │   ├── events/       # Event Manager
 │   │   ├── notices/      # Notice Manager
 │   │   └── pyqs/         # PYQ Manager
 │   ├── dashboard/        # Student View
 │   │   └── page.jsx      # Includes <Chatbot />
 ├── components/
 │   └── Chatbot.jsx       # Floating AI Chat Interface
 ├── lib/
 │   ├── supabase.js       # Public Client
 │   └── supabase-admin.js # Admin Client
 └── middleware.js         # Route Protection

## Project Status
- ✅ Student Dashboard (Read Ops)
- ✅ Admin Event Management
- ✅ Admin Notice Uploads
- ✅ Admin PYQ Management (with Branch/Year filtering)
- ✅ AI Chatbot Integration