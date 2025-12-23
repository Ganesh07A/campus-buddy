# Admin Panel Documentation

The admin panel is the control center for the CampusBuddy application, allowing authorized staff to manage content dynamically.

## Current Status
- **Backend Logic:** ✅ Complete
  - Secured API routes for Events, Notices, and PYQs.
  - Role-based access control (RBAC) enforced via `supabase-admin`.
- **Frontend UI:** ✅ Complete
  - **Event Creator:** ✅ Live. Admins can create and publish events.
  - **Notice Board:** ✅ Live. Admins can upload PDFs/Images.
  - **PYQ Manager:** ✅ Live. Admins can upload question papers with classification (Branch/Year).

## Features & Routes
| Feature | Route | Status | Description |
| :--- | :--- | :--- | :--- |
| **Dashboard** | `/admin` | 🚧 | Overview stats (Total students, notices, events). |
| **Create Event** | `/admin/events` | ✅ | Form to add Title, Date, Time, Location. |
| **Upload Notice** | `/admin/notices/create` | ✅ | Drag-and-drop file upload (PDF/Img) to Supabase Storage. |
| **Upload PYQ** | `/admin/pyqs` | ✅ | Upload PDFs with metadata: Subject, Branch (CSE/AIML...), Year (1st/2nd...), Course Code. |

## Security Architecture
- **Service Role Access:** The admin panel uses a privileged Supabase client (`supabaseAdmin`) to bypass RLS for writes/uploads.
- **Middleware Protection:** All `/admin` routes are protected; unauthenticated users are redirected to `/login`.