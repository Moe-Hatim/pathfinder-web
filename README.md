# PathFinder Web

PathFinder is a student career-direction product that:

- supports account signup/login with secure cookie sessions
- stores assessment data in Postgres for persistent user history
- generates explainable path recommendations with confidence scores
- provides a 30/60/90-day roadmap with weekly tasks
- includes a progress dashboard for weekly execution

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Postgres (`pg`)

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create an environment file:

```bash
cp .env.example .env.local
```

3. Set a strong session secret in `.env.local`:

```env
SESSION_SECRET=replace-with-a-long-random-secret
POSTGRES_URL=postgres://user:password@host:5432/dbname
```

4. Configure password reset email delivery in `.env.local` (pick one method):

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
EMAIL_FROM=PathFinder <no-reply@yourdomain.com>

# Option A: Resend
RESEND_API_KEY=your_resend_api_key

# Option B: SMTP
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

5. Start the app:

```bash
npm run dev
```

## Core Routes

- `/` landing page
- `/auth/signup` account creation
- `/auth/login` account login
- `/home` account home page (post-login/post-signup)
- `/assessment` secure assessment form
- `/results` personalized recommendation + roadmap
- `/dashboard` weekly progress tracking
- `/paths` static overview of path options

## Security Notes

- Assessment data is **not** sent via URL query params.
- Authentication uses a signed, HTTP-only cookie session.
- Assessment records persist in Postgres.
- For production, always set a strong `SESSION_SECRET`.
- Set `POSTGRES_URL` in your hosting environment (for Vercel, connect a Postgres integration).
- Password reset emails require either `RESEND_API_KEY` or SMTP variables.

## Quality Checks

```bash
npm run lint
npm run build
```
