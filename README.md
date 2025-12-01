# Personal Portfolio v2

A modern, responsive personal portfolio website built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, **DaisyUI**, and **GSAP**. This project showcases my skills, projects, and professional background with smooth animations and a beautiful UI.

![Portfolio Preview](/public/screenshot.png) 


## 🚀 Features

*   **Modern Tech Stack:** Built with the latest Next.js 16 App Router and React 19.
*   **Beautiful UI:** Styled with Tailwind CSS v4 and DaisyUI 5 for a clean, consistent look.
*   **Advanced Animations:** Immersive animations using GSAP (GreenSock Animation Platform), including ScrollTrigger and TextPlugin effects.
*   **Responsive Design:** Fully optimized for mobile, tablet, and desktop devices.
*   **Dark/Light Mode:** Integrated theme toggler for better user experience.
*   **Working Contact Form:** Fully functional contact form powered by **Nodemailer** and Next.js Server Actions.
*   **Interactive Elements:** Typewriter effects, particle backgrounds, and hover interactions.

## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
*   **Animation:** [GSAP](https://gsap.com/)
*   **Icons:** FontAwesome (via CDN/Classes)
*   **Email:** Nodemailer

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

### 📧 Environment Setup (Contact Form)

To make the contact form work, you need to configure your SMTP settings.

1.  Create a `.env` file in the root directory.
2.  Add the following environment variables (example for Gmail):

    ```env
    SMTP_HOST=smtp.example.com
    SMTP_PORT=587
    SMTP_USER=your-email@example.com
    SMTP_PASS=your-app-password
    SMTP_SECURE=false
    ```

    > **Note:** If using Gmail, you must enable 2-Step Verification and generate an **App Password** to use as `SMTP_PASS`.

### ▶️ Running the Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📂 Project Structure

```
├── app/
│   ├── components/    # React components (Hero, About, Projects, etc.)
│   ├── actions.ts     # Server Actions (Email sending logic)
│   ├── globals.css    # Global styles
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Main landing page
├── public/            # Static assets (images, CV, icons)
├── .env.local         # Environment variables (ignored by git)
└── package.json       # Dependencies and scripts
```

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  **Important:** Add your Environment Variables (`SMTP_HOST`, `SMTP_USER`, etc.) in the Vercel project settings.
4.  Deploy!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).