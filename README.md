# CoachingApp

A comprehensive platform connecting coaches and athletes for personalized training, workout management, and progress tracking.

## 🚀 Quick Start

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 🛠 Tech Stack

- **Frontend:** Next.js 15 with TypeScript
- **Styling:** TailwindCSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Payments:** Stripe (Subscriptions + Connect)
- **File Storage:** Supabase Storage

## 📊 Database Schema

### Core Tables
- `profiles` - User information and roles
- `organizations` - Coach branding and settings
- `coach_athletes` - Coach-athlete relationships
- `workouts` - Workout templates and assignments
- `exercises` - Individual exercises within workouts
- `exercise_logs` - Athlete performance tracking
- `messages` - Coach-athlete communication
- `file_uploads` - .FIT files, videos, images

## 🏗 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx        # Landing page
│   ├── about/          # About page
│   ├── pricing/        # Pricing page
│   └── globals.css     # Global styles
├── lib/                # Utility functions
│   └── supabase.ts     # Supabase client
└── types/              # TypeScript definitions
    └── supabase.ts     # Database types
```

## 🎨 Features

### For Coaches
- ✅ Create custom workout programs
- ✅ Manage athlete roster
- ✅ Track athlete progress
- ✅ Custom branding (Pro plan)
- ✅ Collect payments via Stripe Connect
- ✅ Messaging system

### For Athletes
- ✅ View assigned workouts
- ✅ Upload .FIT files and progress photos
- ✅ Communicate with coaches
- ✅ Pay coaches securely
- ✅ Track workout history

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## 🚀 Deployment

The app is designed to deploy easily on Vercel with Supabase as the backend.

1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy!

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | Yes |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ for the fitness community
# CoachingHub
