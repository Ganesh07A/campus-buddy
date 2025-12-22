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

## Folder Structure
src/
 ├── app/
 │   ├── api/
 │   │   ├── events/       # GET (Public), POST (Admin)
 │   │   ├── notices/      # GET (Public)
 │   │   ├── pyqs/         # GET (Public), POST (Admin)
 │   │   └── login/        # Custom Auth Logic
 │   ├── admin/            # Admin Control Center (Protected)
 │   ├── dashboard/        # Student View (Connected to DB)
 ├── lib/
 │   ├── supabase.js       # Public Client
 │   └── supabase-admin.js # Admin Client (Privileged)
 └── middleware.js         # Route Protection

## Project Status
- ✅ Student Dashboard (Read Operations) Complete
- ✅ Database Schema (Events, Notices, PYQs) Live
- ✅ Backend Security (Admin vs Public) Implemented
- 🚧 Admin Control Center UI (In Progress)