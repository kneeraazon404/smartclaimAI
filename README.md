# SmartClaimAI

SmartClaimAI is an intelligent platform designed for medical professionals to instantly evaluate wound care checklists against the latest clinical standards and CMS Medicare LCD guidelines for coverage of Cellular and Tissue-Based Products (CTPs) and Skin Substitutes.

## Key Features

- **Instant AI Analysis:** Leverages natural language processing and OpenAI models to instantly analyze clinical notes and input data.
- **CMS Compliance Checking:** Automatically flags discrepancies according to CMS Medicare LCD Novitas guidelines.
- **Actionable Feedback:** Provides detailed clinical reasoning and precise highlighting to explain decisions.
- **Secure Architecture:** Built with Next.js, Auth.js (NextAuth), Prisma, and a Supabase backend to keep all evaluation data secure.
- **Dark Mode Support:** Fully responsive modern UI optimized for all devices, tailored for long-term usage with built-in dark mode support.

## Tech Stack

- **Frontend / Framework:** [Next.js](https://nextjs.org) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) & Framer Motion for animations
- **Authentication:** [Auth.js (NextAuth)](https://authjs.dev)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database Provider:** [Supabase](https://supabase.com/) (PostgreSQL)
- **AI Integration:** [OpenAI API](https://openai.com/)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd smartclaimai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` or `.env` file containing:
   ```env
   DATABASE_URL="postgresql://<user>:<password>@<host>/<db>"
   AUTH_SECRET="your-generated-secret"
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   OPENAI_API_KEY="your-openai-key"
   ```

4. **Initialize Database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Deployment

The platform is optimized for deployment on [Vercel](https://vercel.com).
Ensure to configure the same environment variables within the Vercel dashboard prior to deployment.
