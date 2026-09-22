# xcourse — Learning that adapts to you

<p align="center">
  <strong>The trusted AI learning platform for students.</strong><br>
  xcourse evolves your course materials into content you'll actually like to learn from.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-12.x-FF2D20?style=flat-square&logo=laravel&logoColor=white" alt="Laravel 12" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Inertia.js-3.0-9553E9?style=flat-square&logo=inertia&logoColor=white" alt="Inertia.js" />
</p>

---

## ✨ Overview

**xcourse** is a modern, high-performance web platform designed to personalize and elevate the learning experience. Built with Laravel 12, Inertia.js, React 19, and Tailwind CSS v4, xcourse combines powerful backend capabilities with an ultra-responsive, minimalist aesthetic.

### Key Highlights
- 🧠 **Adaptive Learning Engine**: Transforms static course syllabi and lecture slides into engaging, interactive modules.
- 🎨 **Apple-Inspired Design**: Fluid glassmorphism navigation, refined typography, and smooth micro-interactions.
- ⚡ **Full-Stack Type Safety**: Seamless route generation and prop validation powered by Laravel Wayfinder and TypeScript.
- 🔐 **Robust Authentication**: Powered by Laravel Fortify with session authentication and passkey readiness.

---

## 🛠 Tech Stack

- **Backend**: [Laravel 12](https://laravel.com), PHP 8.3+, Laravel Fortify, Laravel Wayfinder
- **Frontend**: [React 19](https://react.dev), [Inertia.js 3.0](https://inertiajs.com), [TypeScript](https://www.typescriptlang.org/)
- **Styling & UI**: [Tailwind CSS v4](https://tailwindcss.com), Radix UI Primitives, Lucide Icons, Motion
- **Build System**: Vite 8 with `vite-plus` and React Compiler
- **Testing & Quality**: Pest PHP 5, Laravel Pint, Larastan / PHPStan

---

## 🚀 Getting Started

### Prerequisites
- PHP 8.3 or higher
- Composer
- Node.js 20+ and npm / pnpm
- SQLite, MySQL, or PostgreSQL

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jonathanhsa/xcourse-learn-with-ai.git
   cd xcourse-learn-with-ai
   ```

2. **Install backend dependencies**:
   ```bash
   composer install
   ```

3. **Install frontend dependencies**:
   ```bash
   npm install
   ```

4. **Environment Setup**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Run Migrations**:
   ```bash
   php artisan migrate
   ```

6. **Start Development Servers**:
   ```bash
   # Run Vite and Laravel concurrently
   composer run dev
   ```
   Or run them in separate terminals:
   ```bash
   php artisan serve
   npm run dev
   ```

   Open [http://localhost:8000](http://localhost:8000) in your browser.

---

## 🧪 Testing & Code Quality

```bash
# Run PHP unit and feature tests
composer test

# Format PHP code with Laravel Pint
composer run lint

# Check TypeScript types
npm run types:check

# Vite linter check
npm run check
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

