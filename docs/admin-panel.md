# Admin Panel

The admin panel allows authorized staff to manage campus data.

## Current Status
- **Backend Logic:** ✅ Ready
  - Secure API routes created for Events, Notices, and PYQs.
  - Role-based access control (RBAC) enforced via `supabase-admin` client.
- **Frontend UI:** 🚧 In Development (Next Step)

## Planned Features (Control Center)
- **Event Creator:** Form to schedule events (Title, Date, Time).
- **Notice Board:** Drag-and-drop zone for PDF/Image uploads.
- **PYQ Manager:** Interface to tag and upload question papers.

## Security Architecture
- **Service Role Access:** The admin panel uses a privileged Supabase client to bypass RLS for uploads.
- **Middleware Protection:** All `/admin` routes are protected; unauthenticated users are redirected to login.