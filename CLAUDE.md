# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.2 application with TypeScript, React 19, and Tailwind CSS v4, using the App Router structure.

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
- `app/layout.tsx` - Root layout with Geist font configuration
- `app/page.tsx` - Home page component
- `app/globals.css` - Global styles with Tailwind CSS

### Key Technologies
- **Framework**: Next.js 15 with App Router and Turbopack
- **Styling**: Tailwind CSS v4 with PostCSS
- **TypeScript**: Strict mode enabled with path alias `@/*` for root imports
- **Linting**: ESLint with Next.js recommended rules (core-web-vitals)

### TypeScript Configuration
- Target ES2017 with strict mode
- Module resolution: bundler
- Path alias configured: `@/*` maps to project root