# Personal Portfolio v2 (Optimized)

A high-performance, responsive personal portfolio website built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, **DaisyUI**, and **GSAP**. This project is optimized for speed and visual clarity, featuring smooth, buttery animations across all devices.

![Portfolio Preview](/public/screenshot.png) 


## 🚀 Features

*   **Modern Tech Stack:** Built with the latest Next.js 16 App Router and React 19.
*   **Performance Optimized:** Refined for high mobile performance with reduced particle counts and optimized render loops.
*   **Sleek Animations:** Immersive GSAP effects, including 3D skill card reveals, smooth parallax, and floating interactive elements.
*   **Clear Visuals:** Enhanced hero image visibility for mobile users, ensuring a bright and professional first impression.
*   **Responsive Experience:** Intelligent device-specific logic that switches between native and smooth scrolling for the best UX.
*   **Dark/Light Mode:** Integrated theme toggler for better user experience.
*   **Working Contact Form:** Fully functional contact form powered by **Nodemailer** and Next.js Server Actions.

## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
*   **Animation:** [GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)
*   **Icons:** FontAwesome (via CDN/Classes)
*   **Email:** Nodemailer

## 🏁 Getting Started

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Doy679/Portfolio679.git
    cd Portfolio679
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

### 📧 Environment Setup (Contact Form)

To make the contact form work, you need to configure your SMTP settings.

1.  Copy the `.env.example` file to `.env.local`:
    ```bash
    cp .env.example .env.local
    ```

2.  Edit the `.env.local` file with your SMTP settings. For Gmail:
    - Enable 2-Factor Authentication
    - Generate an App Password (Google Account → Security → App passwords)
    - Replace the placeholder values with your actual credentials

    Example for Gmail:
    ```env
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=465
    SMTP_SECURE=true
    SMTP_USER=gonzalesrondether86@gmail.com
    SMTP_PASS=your-16-digit-app-password
    ```

    > **Note:** If using Gmail, you must enable 2-Step Verification and generate an **App Password** to use as `SMTP_PASS`. Do NOT use your regular Gmail password.

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