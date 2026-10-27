# ProfileGlow: Dating Profile Optimizer

ProfileGlow is a fullstack Next.js web application that enhances dating profiles using Google Gemini multimodal vision and language models. Users upload their dating profile photos, paste their bio, select their target app (Tinder, Bumble, Hinge), and enter their age, location, and dating goals. The app generates an instant multimodal makeover report and provides an interactive AI coaching chat unlocked via Razorpay.

---

## Features

- **Neobrutalist Visual Identity:** High-contrast borders, bold typography, retro pills, and playful interactive badges.
- **Multimodal AI Analysis (Gemini 2.0 Flash):**
  - Overall profile score (1–10) and sub-scores for originality, visual impact, vibe, and conversation hooks.
  - Photo ranking, lead photo selection, and framing/lighting feedback.
  - 3 tailored bio rewrites (Witty, Authentic, Bold) with one-click clipboard copying.
  - Hinge/Bumble prompt answer rewrites and 5 tailored icebreaker lines.
  - Red-flag audit identifying left-swipe triggers and cliché patterns.
- **Interactive AI Coaching Chat:** Multi-turn coaching assistant grounded in the user's specific photos and report details.
- **Razorpay Integration:** Gated paywall unlocking the AI chat for ₹349 ($4 USD equivalent) via standard Razorpay modal checkout and HMAC-SHA256 signature verification.
- **Firebase Authentication & Storage:** Email/password and Google OAuth, plus direct photo uploads to Cloud Storage.

---

## Project Structure

```text
profileglow-app/
├── app/
│   ├── layout.tsx                     # Global layout & auth provider
│   ├── page.tsx                       # Landing page
│   ├── login/page.tsx                 # Login page
│   ├── signup/page.tsx                # Signup page
│   ├── dashboard/page.tsx             # Photo upload & profile input form
│   ├── report/[id]/page.tsx           # Interactive makeover report & coaching chat
│   └── api/
│       ├── analyze/route.ts           # Gemini multimodal analysis endpoint
│       ├── chat/route.ts              # Conversational coaching endpoint
│       ├── payment/order/route.ts     # Razorpay order creation
│       ├── payment/verify/route.ts    # Razorpay signature verification
│       └── reports/[id]/route.ts      # Report retrieval
├── components/
│   ├── landing/                       # Hero, Ticker, HowItWorks, FeaturesGrid, Comparison, Pricing, FAQ
│   ├── auth/                          # AuthCard
│   ├── dashboard/                     # PhotoUploader, ProfileDetailsForm
│   ├── report/                        # ScoreOverview, PhotoRankings, BioVariations, PromptRewrites, OpenersList, RedFlagAudit
│   ├── chat/                          # ChatPanel, MessageBubble, SuggestionChips, PaywallModal
│   └── ui/                            # Neobrutalist Button, Badge, Card, Input
├── lib/
│   ├── firebase/client.ts             # Firebase Web SDK client
│   ├── firebase/admin.ts              # Firebase Admin SDK server
│   ├── gemini.ts                      # Gemini 2.0 Flash configuration & prompt
│   ├── razorpay.ts                    # Razorpay client & signature helper
│   ├── schemas.ts                     # Zod input & Gemini response schemas
│   ├── store.ts                       # In-memory development store & cache
│   └── types.ts                       # TypeScript definitions
├── .env.local.example                 # Environment variables template
├── tailwind.config.js                 # Neobrutalist design tokens
├── tsconfig.json
└── package.json
```

---

## Quick Start

### 1. Run Development Server

```bash
cd profileglow-app
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Environment Variables (`.env.local`)

Copy `.env.local.example` to `.env.local` and add your keys:

- `GEMINI_API_KEY`: Get a free key at [Google AI Studio](https://aistudio.google.com/)
- `NEXT_PUBLIC_FIREBASE_*`: Firebase project credentials for Authentication & Cloud Storage
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET`: Razorpay API test keys

*(Note: The app includes full development fallbacks, allowing you to test report generation, photo analysis, and payment unlocks immediately even before adding cloud credentials.)*

---

## Verification & Build

```bash
# Verify TypeScript types
npm run type-check

# Run production build
npm run build

# Start production server
npm run start
```
