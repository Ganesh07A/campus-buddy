# 🎓 CampusBuddy

<div align="center">

  ![CampusBuddy Banner](https://capsule-render.vercel.app/api?type=waving&color=violet&height=250&section=header&text=CampusBuddy&fontSize=90&animation=fadeIn&fontAlignY=38&desc=Your%20AI-Powered%20Digital%20Campus&descAlignY=55&descAlign=50)

  <br />

  [![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
  [![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-blue?style=for-the-badge&logo=googlebard&logoColor=white)](https://ai.google.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-Styling-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

  <br />
  
  <p align="center">
    <b>Bridging the gap between students and administration with real-time data & AI.</b>
  </p>

</div>

---

## 🚀 Overview

**CampusBuddy** is a modern, full-stack student portal designed to centralize academic life. It eliminates the chaos of scattered WhatsApp messages and physical notice boards by bringing **Notices**, **Events**, and **Exam Resources (PYQs)** into one secure, real-time dashboard.

At its core lives a smart **AI Assistant** powered by Google Gemini, capable of answering student queries instantly using RAG (Retrieval Augmented Generation) to provide context-aware answers about campus activities.

## ✨ Why CampusBuddy?

Traditional college communication is fragmented. CampusBuddy solves this by offering a unified platform where information flows seamlessly from Admins to Students.

| Feature | Description | Tech Power |
| :--- | :--- | :--- |
| **🤖 AI Chatbot** | A 24/7 assistant that answers questions like *"When is the Hackathon?"* by reading real database content. | `Google Gemini` + `RAG` |
| **📢 Digital Notice Board** | Admin-verified updates. No more fake news or missed circulars. | `Supabase Realtime` |
| **📚 Resource Hub** | Download Previous Year Questions (PYQs) filtered by Year & Branch. | `Supabase Storage` |
| **🛡️ Secure Access** | Role-Based Access Control (RBAC) ensures students see data, but only Admins can edit it. | `Middleware` + `JWT` |
| **📅 Event Tracking** | Interactive calendar for workshops, fests, and exams. | `React` + `Framer Motion` |

## 🛠️ The Tech Stack

This project is built for performance, security, and scalability.

* **Frontend:** [Next.js 15](https://nextjs.org/) (App Router, Server Actions)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/) (Animations) + [Shadcn/UI](https://ui.shadcn.com/)
* **Backend & Auth:** [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage)
* **Artificial Intelligence:** [Google Gemini API](https://ai.google.dev/) (Generative AI)
* **Notifications:** [Sonner](https://sonner.emilkowal.ski/) (Toast notifications)

## 📸 Glimpse of the App

> *Add screenshots of your Dashboard, Admin Panel, and Chatbot here to show off your UI!*

## ⚡ Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
* Node.js 18+ installed
* A Supabase Account
* A Google Cloud Account (for Gemini API)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/your-username/campus-buddy.git](https://github.com/your-username/campus-buddy.git)
    cd campus-buddy
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file in the root directory and add your secrets:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
    GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
    AUTH_SECRET=your_jwt_secret_key
    ```

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```

5.  **Launch**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Admin Access
To access the Admin Panel during development:
* **URL:** `/login`
* **Email:** `admin@syp.edu`
* **Password:** `admin123`

## 🤝 Contribution

Contributions are welcome! If you have ideas for new features (like Attendance Tracking or Faculty Portals), feel free to fork the repo and submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  Made with ❤️ by <b>[Your Name]</b>
</div>
