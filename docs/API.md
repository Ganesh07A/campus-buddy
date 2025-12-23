# API Documentation

## POST /api/notices/upload
Uploads a notice file and stores metadata.

Request:
- title: string
- file: PDF or Image

Response:
200 OK
{
  message: "Notice uploaded successfully"
}

---

## GET /api/notices
Fetches all notices for students and admins.

Response:
200 OK
[
  {
    id,
    title,
    file_url,
    created_at
  }
]

## Authentication
All `POST` requests require a secure HTTP-Only Cookie: `session_token`.

---

## POST /api/notices/uploads
Uploads a notice PDF/Image and metadata.

Access: Admin Only (Verified via JWT)

Body: FormData (title, file)

# 📅 Events
## GET /api/events

Fetches upcoming campus events, sorted by nearest date.

Access: Public

Response:

1. JSON

[
  {
    "id": 1,
    "title": "Hackathon 2024",
    "date": "2024-12-25",
    "time": "10:00 AM",
    "location": "Main Hall"
  }
]

## POST /api/events
Creates a new event.

Access: Admin Only

Body: { "title": "...", "date": "...", "time": "...", "location": "..." }

# 📚 PYQs (Previous Year Questions)

## GET /api/pyqs
Fetches question papers sorted by newest year first.

Access: Public

Response:

JSON

[
  {
    "id": 1,
    "subject_name": "Data Structures",
    "course_code": "CS301",
    "year": "2023",
    "file_url": "..."
  }
]

## POST /api/pyqs
Adds a new PYQ entry.

Access: Admin Only

## Body:

- file: PDF File

- subject_name: String (e.g. "Data Structures")

- course_code: String (e.g. "CS301")

- year: String (Exam Year, e.g. "2023")

- branch: String (e.g. "CSE", "AIML")

- academic_year: String (e.g. "2nd Year", "3rd Year")