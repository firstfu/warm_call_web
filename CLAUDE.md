# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WarmCall (暖心來電) - A warm and comforting companion app landing page with user data collection and analytics. This is a Next.js 15.5.2 application with TypeScript, React 19, and Tailwind CSS v4, using the App Router structure. The application presents a service that provides emotional support through warm phone calls.

## Essential Commands

```bash
# Development
npm run dev       # Start development server with Turbopack at http://localhost:3000

# Build & Production
npm run build     # Build production-ready application with Turbopack
npm run start     # Start production server

# Code Quality
npm run lint      # Run ESLint for code linting

# Testing utilities (development only)
node test-google-sheets.js  # Test Google Sheets connection
node test-analytics.js      # Test analytics tracking functionality
```

## Architecture

### Core Features Implementation

#### User Data Collection System
- **WaitlistModal Component** (`app/components/WaitlistModal.tsx`): Modal form that appears when users click download buttons
  - All fields are optional (name, email, phone, interest reason, newsletter subscription)
  - Tracks three action types: `click` (initial), `submit` (with data), `skip` (without data)
  - Graceful handling of all close methods (submit, skip button, backdrop click, X button)

#### Analytics & Tracking
- **API Route** (`app/api/track-download/route.ts`): Handles download tracking and analytics
  - Records all user interactions to Google Sheets "Downloads" worksheet
  - Automatically calculates and updates analytics to "Analytics" worksheet
  - Creates Analytics sheet automatically if it doesn't exist
  - Tracks conversion funnel: total clicks → form views → submissions

#### Google Sheets Integration
- Uses Google Service Account authentication
- Two worksheets structure:
  1. **Downloads**: Raw data (timestamp, platform, action, user data, device info)
  2. **Analytics**: Auto-calculated metrics (conversion rates, platform distribution, data quality metrics)
- Environment variables required:
  - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
  - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
  - `GOOGLE_SHEET_ID`
  - `GOOGLE_SHEET_NAME` (default: "Downloads")

### Next.js App Router Structure
- `/app` directory contains the application routes and layouts
- `app/layout.tsx` - Root layout with Geist font configuration
- `app/page.tsx` - Main landing page with integrated WaitlistModal
- `app/api/track-download/route.ts` - API endpoint for tracking and analytics
- `app/components/WaitlistModal.tsx` - User data collection modal component
- `app/globals.css` - Global styles with Tailwind CSS v4 and custom CSS variables

### Landing Page Features
- Intersection Observer for scroll animations
- Multiple sections: Hero, Problem Statement, Features, How It Works, Use Cases, Testimonials, CTA, Footer
- Download buttons trigger WaitlistModal instead of direct downloads (app not yet released)
- Success/skip feedback messages after modal interaction
- Responsive design with mobile-first approach
- Chinese language content

### Styling System
- **Tailwind CSS v4** with PostCSS configuration
- Custom color scheme in `globals.css`:
  - Warm colors: `--warm-100` through `--warm-600` (orange tones)
  - Purple colors: `--purple-100` through `--purple-600`
  - Dark mode support via `prefers-color-scheme`
- Inline theme configuration using `@theme inline` directive
- Custom animations for modals and feedback messages

### Analytics Metrics Tracked
- Total clicks (總點擊次數)
- Action breakdown: click, submit, skip
- Conversion rates (submission rate, skip rate)
- Data quality metrics (email collection rate, phone collection rate)
- Platform distribution (iOS vs Android)
- Newsletter subscription rate
- All metrics update automatically after each user action

### API Response Structure
```typescript
// Request
{
  platform: 'ios' | 'android',
  action: 'click' | 'submit' | 'skip',
  userData?: {
    name?: string,
    email?: string,
    phone?: string,
    interest?: string,
    newsletter?: boolean
  }
}

// Response
{
  success: boolean,
  message: string,
  data: {
    platform: string,
    action: string,
    timestamp: string,
    deviceType: string,
    hasUserData: boolean
  }
}
```

### Key Dependencies
- **Framework**: Next.js 15.5.2 with App Router and Turbopack
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS v4 with PostCSS
- **Analytics**: Google Sheets API via googleapis and google-auth-library
- **TypeScript**: Strict mode enabled with ES2017 target
- **Fonts**: Geist Sans & Geist Mono from Google Fonts

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

## Important Implementation Notes

### Modal Behavior
- Modal opens on any download button click
- Always tracks the initial click immediately
- User can submit with partial or no data
- All close methods are tracked differently for analytics
- Shows different success messages based on user action

### Analytics Updates
- Analytics are recalculated on every new tracking event
- Analytics sheet is created automatically if missing
- Handles errors gracefully (logs but doesn't break tracking)
- All calculations are done server-side for accuracy

### Security Considerations
- Service account credentials must be kept in `.env.local`
- Never commit credentials to version control
- All user data is optional to respect privacy
- IP addresses are collected but can be disabled if needed