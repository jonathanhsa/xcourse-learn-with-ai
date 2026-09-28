<p align="center">
  <img src=".github/banner.jpg" alt="XCourse Banner" width="100%" />
</p>

<h1 align="center">XCourse — Learn Smarter with AI</h1>

<p align="center">
  <strong>🚀 An AI-powered learning platform that revolutionizes how students study, discover materials, and interact with intelligent tutoring agents.</strong>
</p>

<p align="center">
  <a href="#features"><img src="https://img.shields.io/badge/✨_Features-8_Core_Modules-7c3aed?style=for-the-badge" alt="Features" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/Stack-Laravel_13_+_React_19-0ea5e9?style=for-the-badge" alt="Tech Stack" /></a>
  <a href="#getting-started"><img src="https://img.shields.io/badge/Quick_Start-5_Min_Setup-10b981?style=for-the-badge" alt="Quick Start" /></a>
  <a href="https://github.com/jonathanhsa/xcourse-learn-with-ai/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-f59e0b?style=for-the-badge" alt="License" /></a>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#demo">Demo</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## 🎯 Overview

**XCourse** is a modern, full-stack web application designed to transform the student learning experience through the power of AI. Built with cutting-edge technologies, XCourse combines an intelligent AI tutoring agent powered by **Google Gemini**, a comprehensive academic material repository sourced from **OpenAlex**, and a beautifully crafted dashboard — all wrapped in a premium, responsive UI with smooth animations.

> **Built for learners, powered by AI, designed for the future.**

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🤖 AI Tutoring Agent
- Conversational AI powered by **Google Gemini 1.5 Flash**
- Multi-session chat with persistent history
- Context-aware responses tailored to your learning needs
- File attachment support for document analysis
- Smooth message animations with real-time streaming feel

</td>
<td width="50%">

### 📚 Material Repository
- Search millions of academic papers via **OpenAlex API**
- Filter by subject, year, and relevance
- Instant access to open-access research
- Beautifully presented card-based UI with pagination
- Smart debounced search for optimal performance

</td>
</tr>
<tr>
<td width="50%">

### 📊 Smart Dashboard
- At-a-glance metrics: active courses, study time, achievements
- Animated stat cards with hover micro-interactions
- Progress tracking with weekly goals
- Clean, modern design with dark mode support

</td>
<td width="50%">

### 🎓 Personalized Onboarding
- Multi-step onboarding flow for new users
- Captures major, learning preferences & study goals
- Personalizes the AI experience from day one
- Beautiful animated step transitions

</td>
</tr>
<tr>
<td width="50%">

### 🔐 Advanced Authentication
- Email/password with **Laravel Fortify**
- **Google OAuth** social login via Laravel Socialite
- **Passkey/WebAuthn** support for passwordless auth
- **Two-Factor Authentication** (TOTP + Recovery Codes)
- Email verification flow

</td>
<td width="50%">

### 🎨 Premium UI/UX
- Built with **shadcn/ui** + **Radix UI** primitives
- Powered by **Anime.js** & **Motion** for fluid animations
- Dark/Light mode with system preference detection
- Fully responsive across all screen sizes
- Glassmorphism, gradients & micro-interactions

</td>
</tr>
</table>

---

## 🖥️ Demo

| Landing Page | AI Chat Agent |
|:---:|:---:|
| Beautiful animated landing with typewriter effects | Multi-session AI conversations with Gemini |

| Dashboard | Material Repository |
|:---:|:---:|
| Real-time stats with hover animations | Search millions of academic papers |

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **PHP** | 8.3+ | Runtime |
| **Laravel** | 13.x | Web Framework |
| **Inertia.js** | 3.0 | SPA Bridge (Server-driven) |
| **Laravel Fortify** | 1.37+ | Authentication Backend |
| **Laravel Socialite** | 5.31+ | OAuth (Google Login) |
| **Laravel Passkeys** | 0.2+ | WebAuthn/Passkeys |
| **SQLite** | — | Database (default) |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React** | 19.x | UI Library |
| **TypeScript** | 5.7+ | Type Safety |
| **Tailwind CSS** | 4.x | Utility-first Styling |
| **Vite** | 8.x | Build Tool & Dev Server |
| **shadcn/ui** | 4.21+ | Component Library |
| **Radix UI** | latest | Accessible Primitives |
| **Anime.js** | 4.5+ | Animations Engine |
| **Motion** | 13.x | React Animation Library |
| **Lucide React** | latest | Icon System |

### AI & APIs
| Technology | Purpose |
|---|---|
| **Google Gemini 1.5 Flash** | AI Tutoring Agent |
| **OpenAlex API** | Academic Paper Search |

### Dev Tools
| Tool | Purpose |
|---|---|
| **Pest** | PHP Testing |
| **PHPStan / Larastan** | Static Analysis |
| **Laravel Pint** | Code Formatting |
| **React Compiler (Babel)** | Auto-optimization |
| **Vite Plus** | Enhanced Vite DX |
| **Wayfinder** | Type-safe Routing |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (Browser)                      │
│  ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐ │
│  │ React   │  │ shadcn/  │  │ Anime.js │  │ Inertia.js   │ │
│  │ 19 + TS │  │ ui       │  │ + Motion │  │ Client       │ │
│  └────┬────┘  └─────┬────┘  └─────┬────┘  └──────┬───────┘ │
│       └─────────────┼────────────┘               │          │
│                     └────────────────────────────┘          │
└─────────────────────────────┬───────────────────────────────┘
                              │ Inertia Protocol (XHR)
┌─────────────────────────────┴───────────────────────────────┐
│                     Server (Laravel 13)                      │
│  ┌───────────┐  ┌──────────┐  ┌──────────┐  ┌───────────┐  │
│  │ Fortify   │  │ Socialite│  │ Inertia  │  │ Passkeys  │  │
│  │ Auth      │  │ (Google) │  │ Server   │  │ WebAuthn  │  │
│  └───────────┘  └──────────┘  └──────────┘  └───────────┘  │
│  ┌──────────────────────┐  ┌────────────────────────────┐   │
│  │ AiAgentController    │  │ OnboardingController       │   │
│  │ → Gemini API Proxy   │  │ → User Personalization     │   │
│  └──────────┬───────────┘  └────────────────────────────┘   │
│             │                                                │
│  ┌──────────┴───────────┐  ┌────────────────────────────┐   │
│  │ Google Gemini API    │  │ SQLite Database             │   │
│  │ (External)           │  │ (Users, Sessions, Cache)    │   │
│  └──────────────────────┘  └────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **PHP** ≥ 8.3
- **Composer** ≥ 2.x
- **Node.js** ≥ 20.x
- **npm** or **pnpm**

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/jonathanhsa/xcourse-learn-with-ai.git
cd xcourse-learn-with-ai
```

**2. Install dependencies**
```bash
composer install
npm install
```

**3. Environment setup**
```bash
cp .env.example .env
php artisan key:generate
```

**4. Configure your `.env`**
```env
# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
```

**5. Database setup**
```bash
touch database/database.sqlite
php artisan migrate
```

**6. Start development server**
```bash
composer dev
```

This starts **three concurrent processes**:
| Process | URL | Description |
|---|---|---|
| 🌐 Laravel Server | `http://localhost:8000` | PHP application server |
| ⚡ Vite Dev Server | `http://localhost:5173` | HMR & asset compilation |
| 📨 Queue Worker | — | Background job processing |

---

## 📁 Project Structure

```
xcourse-learn-with-ai/
├── app/
│   ├── Http/Controllers/
│   │   ├── Auth/
│   │   │   └── GoogleAuthController.php    # Google OAuth flow
│   │   ├── AiAgentController.php           # Gemini AI proxy
│   │   └── OnboardingController.php        # User onboarding
│   └── Models/
│       └── User.php                        # User model with OAuth
├── resources/js/
│   ├── components/
│   │   ├── ui/                             # shadcn/ui components
│   │   ├── VirtualKeyboard.tsx             # Custom keyboard
│   │   ├── app-sidebar.tsx                 # Navigation sidebar
│   │   └── ...                             # 28+ components
│   ├── pages/
│   │   ├── welcome.tsx                     # Landing page
│   │   ├── dashboard.tsx                   # Dashboard
│   │   ├── ai-agents.tsx                   # AI Chat interface
│   │   ├── material-repository.tsx         # Paper search
│   │   ├── auth/                           # Auth pages (7 pages)
│   │   ├── onboarding/                     # Onboarding flow
│   │   └── settings/                       # User settings
│   ├── lib/
│   │   └── anime.ts                        # Animation utilities
│   └── hooks/
│       └── use-anime.ts                    # Animation hooks
├── routes/
│   ├── web.php                             # Web routes
│   └── settings.php                        # Settings routes
├── database/migrations/                    # 7 migration files
├── config/
│   └── services.php                        # API configs
└── ...
```

---

## ⚙️ Environment Variables

| Variable | Required | Description |
|---|:---:|---|
| `APP_KEY` | ✅ | Laravel encryption key (auto-generated) |
| `GEMINI_API_KEY` | ✅ | Google Gemini API key for AI features |
| `GOOGLE_CLIENT_ID` | ❌ | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | ❌ | Google OAuth client secret |
| `GOOGLE_REDIRECT_URI` | ❌ | OAuth callback URL |
| `DB_CONNECTION` | ❌ | Database driver (default: `sqlite`) |

---

## 🧪 Testing & Quality

```bash
# Run all tests
php artisan test

# Run full CI checks (lint + types + tests)
composer ci:check

# Code formatting
composer lint

# Static analysis
composer types:check

# Frontend type checking
npm run types:check

# Frontend linting
npm run check
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Usage |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation |
| `style:` | Code style (formatting) |
| `refactor:` | Code refactoring |
| `test:` | Adding tests |
| `chore:` | Maintenance tasks |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Jonathan**
- GitHub: [@jonathanhsa](https://github.com/jonathanhsa)

---

<p align="center">
  <a href="https://github.com/jonathanhsa/xcourse-learn-with-ai">
    <img src="https://img.shields.io/badge/⭐_Star_this_repo-if_you_found_it_helpful!-yellow?style=for-the-badge" alt="Star" />
  </a>
</p>
