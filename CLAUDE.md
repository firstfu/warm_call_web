# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WarmCall (暖心來電) - A warm and comforting companion app landing page. This is a Next.js 15.5.2 application with TypeScript, React 19, and Tailwind CSS v4, using the App Router structure. The application presents a service that provides emotional support through warm phone calls.

## Essential Commands

```bash
# Development
npm run dev       # Start development server with Turbopack at http://localhost:3000

# Build & Production
npm run build     # Build production-ready application with Turbopack
npm run start     # Start production server

# Code Quality
npm run lint      # Run ESLint for code linting
```

## Architecture

### Next.js App Router Structure
- `/app` directory contains the application routes and layouts
- `app/layout.tsx` - Root layout with Geist font configuration (Geist Sans & Geist Mono)
- `app/page.tsx` - Main landing page with 'use client' directive for client-side interactivity
- `app/globals.css` - Global styles with Tailwind CSS v4 and custom CSS variables

### Current Implementation Details
- **Landing Page** (`app/page.tsx`): Client-side component with:
  - Intersection Observer for scroll animations
  - Multiple sections: Hero, Problem Statement, Features, How It Works, Use Cases, Testimonials, CTA, Footer
  - Custom warm color palette (warm-100 to warm-600) and purple palette
  - Responsive design with mobile-first approach
  - Chinese language content focused on emotional support service

### Styling System
- **Tailwind CSS v4** with PostCSS configuration
- Custom color scheme defined in `globals.css`:
  - Warm colors: `--warm-100` through `--warm-600` (orange tones)
  - Purple colors: `--purple-100` through `--purple-600`
  - Dark mode support via `prefers-color-scheme`
- Inline theme configuration using `@theme inline` directive
- Custom animations and transitions for enhanced UX

### Key Technologies
- **Framework**: Next.js 15.5.2 with App Router and Turbopack
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS v4 with PostCSS and custom theme
- **TypeScript**: Strict mode enabled with ES2017 target
- **Fonts**: Google Fonts (Geist Sans & Geist Mono)
- **Linting**: ESLint 9 with Next.js core-web-vitals configuration

### TypeScript Configuration
- Target: ES2017
- Module resolution: bundler
- Strict mode: enabled
- Path alias: `@/*` maps to project root
- Includes: TypeScript files and Next.js type definitions

### ESLint Configuration
- Uses `@eslint/eslintrc` for flat config compatibility
- Extends: `next/core-web-vitals` and `next/typescript`
- Ignores: `node_modules`, `.next`, `out`, `build`, `next-env.d.ts`