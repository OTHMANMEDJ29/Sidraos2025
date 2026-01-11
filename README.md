<p align="center">
  <img src="public/logo.svg" alt="SidraOS Logo" width="80" height="80" />
</p>

<h1 align="center">SidraOS</h1>

<p align="center">
  <strong>Your Life, Orchestrated.</strong>
  <br />
  A sovereign Life Operating System for productivity, finance, and knowledge management.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#license">License</a>
</p>

---

## 🌟 Overview

**SidraOS** is a premium, all-in-one Life Operating System designed for high-end professional users. It combines three core pillars into a single, beautifully designed platform:

- **📋 Productivity** — Tasks, Calendar, Habits
- **💰 Finance** — Budgets, Transactions, Reports
- **🧠 Second Brain** — Notes, Bookmarks, Journal

Built with a **Luxury Minimalist** design philosophy and full **Arabic RTL support**, SidraOS is the digital ecosystem you deserve.

---

## ✨ Features

- 🌐 **Bilingual Support** — Full Arabic (RTL) and English (LTR) localization
- 🌙 **Dark/Light Mode** — Beautiful themes with system preference detection
- 🔐 **Secure Authentication** — Email/password and OAuth via Supabase
- 📱 **Fully Responsive** — Mobile-first design that works on all devices
- ⚡ **Fast & Modern** — Built on Next.js 15 with React Server Components
- 🎨 **Premium UI** — Glassmorphism, smooth animations, Islamic geometric patterns

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict Mode) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **UI Components** | [Shadcn/UI](https://ui.shadcn.com/) + [Lucide Icons](https://lucide.dev/) |
| **Database & Auth** | [Supabase](https://supabase.com/) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Internationalization** | [next-intl](https://next-intl-docs.vercel.app/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Payments** | [Lemon Squeezy](https://www.lemonsqueezy.com/) (MoR) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.17 or later
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- [Supabase](https://supabase.com/) account (for database & auth)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/sidraos.git
   cd sidraos
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [locale]/          # Internationalized routes
│   ├── api/               # API routes
│   └── legal/             # Legal pages (Terms, Privacy)
├── components/
│   ├── ui/                # Shadcn/UI components
│   ├── layout/            # Header, Sidebar, Footer
│   ├── landing/           # Landing page components
│   └── shared/            # Cross-feature components
├── features/              # Feature modules
│   ├── auth/              # Authentication
│   ├── finance/           # Finance tracking
│   ├── productivity/      # Tasks, habits, calendar
│   └── second-brain/      # Notes, bookmarks, journal
├── lib/                   # Utilities & configurations
├── i18n/                  # Internationalization
├── stores/                # Zustand stores
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript types
```

---

## 🌍 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy SidraOS is with [Vercel](https://vercel.com/):

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**
   - Add your `NEXT_PUBLIC_SUPABASE_URL`
   - Add your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Add your `NEXT_PUBLIC_APP_URL` (your production domain)

4. **Deploy**
   - Click "Deploy"
   - Your app will be live in minutes!

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

---

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | ✅ |
| `NEXT_PUBLIC_APP_URL` | Your app's public URL | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) | ❌ |

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |

---

## 🌐 Internationalization

SidraOS supports multiple languages with full RTL support:

- 🇸🇦 **Arabic (ar)** — Primary, Right-to-Left
- 🇺🇸 **English (en)** — Secondary, Left-to-Right

Translation files are located in `src/i18n/messages/`.

---

## 📄 License

This project is proprietary software. All rights reserved.

© 2026 SidraOS. Operated by an Auto-Entrepreneur registered in Algeria.

---

## 🤝 Support

- 📧 Email: [support@sidraos.com](mailto:support@sidraos.com)
- 🐦 Twitter: [@sidraos](https://twitter.com/sidraos)
- 💼 LinkedIn: [SidraOS](https://linkedin.com/company/sidraos)

---

<p align="center">
  Made with ❤️ for Muslims worldwide
</p>
