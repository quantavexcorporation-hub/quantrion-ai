# Quantrion — Supabase Authentication Setup

Production auth for Quantrion uses **real Supabase Auth** with HTTP-only cookies (via `@supabase/ssr`). Tokens are **not** stored in `localStorage`.

---

## 1. Create a Supabase project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard) and create a project.
2. Copy from **Project Settings → API**:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

> Never expose the `service_role` key in the browser or commit it to git.

---

## 2. Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Set at minimum:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
```

Restart the dev server after changing env vars.

---

## 3. Run database SQL

In **Supabase → SQL Editor**, run the full script:

```
supabase/auth_schema.sql
```

This creates:

| Object | Purpose |
|--------|---------|
| `public.users` | Profile table (`id`, `email`, `name`, `role`, `plan`, `created_at`) |
| RLS policies | Users read/update own row; admins read all |
| `handle_new_user` trigger | Auto-insert profile when `auth.users` row is created |
| `handle_user_email_update` | Keeps profile email in sync |

---

## 4. Configure Supabase Auth providers

**Authentication → Providers**

| Provider | Setting |
|----------|---------|
| Email | Enabled |
| Confirm email | Enabled (recommended for production) |
| Google | Enabled with OAuth client ID + secret |

**Authentication → URL configuration**

Add redirect URLs:

| Environment | URL |
|-------------|-----|
| Local | `http://localhost:3000/auth/callback` |
| Production | `https://your-domain.com/auth/callback` |

Site URL: `http://localhost:3000` (dev) or your production domain.

---

## 5. Promote an admin user

After your first signup, run in SQL Editor (replace email):

```sql
update public.users
set role = 'admin'
where email = 'you@example.com';
```

Roles: `student` | `educator` | `admin`

---

## 6. App routes

| Route | Access |
|-------|--------|
| `/login` | Public |
| `/signup` | Public |
| `/forgot-password` | Public |
| `/reset-password` | Public (from email link) |
| `/auth/callback` | OAuth + email verification callback |
| `/auth/check-email` | Pending verification |
| `/dashboard` | Authenticated + verified email |
| `/admin` | Admin role only |

---

## 7. API routes

| Endpoint | Description |
|----------|-------------|
| `GET /api/auth/session` | JWT-validated session + profile |
| `GET /api/user/profile` | Authenticated profile only |
| `POST /api/auth/login` | Server sign-in (sets cookies) |
| `POST /api/auth/register` | Server sign-up |
| `POST /api/auth/logout` | Clears session cookies |

All routes use `supabase.auth.getUser()` for JWT verification (not `getSession()` alone).

Rate limiting: in-memory placeholder in `lib/rate-limit.ts` (swap for Redis/Upstash in production).

---

## 8. Frontend hooks

```tsx
import { useUser } from "@/hooks/use-user"

const { user, profile, isAuthenticated, emailVerified, loading, refresh } = useUser()
```

Modal auth (in-app): `useAuth()` from `@/context/AuthContext` — also uses real Supabase.

---

## 9. Security checklist

- [x] HTTP-only cookies via `@supabase/ssr`
- [x] Middleware refreshes session on each request
- [x] Protected routes redirect unauthenticated users
- [x] Email verification gate on `/dashboard` and `/app/*`
- [x] RBAC for `/admin`
- [x] RLS on `public.users`
- [ ] Enable CAPTCHA / MFA in Supabase for production (optional)
- [ ] Replace in-memory rate limiter with edge/Redis store

---

## 10. Deploy (Vercel)

1. Add all `NEXT_PUBLIC_*` env vars in Vercel project settings.
2. Add production callback URL in Supabase.
3. Run `npm run build` locally to verify before deploy.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 500 on all pages | Check `NEXT_PUBLIC_SUPABASE_*` in `.env.local` |
| Google redirect fails | Add exact callback URL in Supabase + Google Console |
| Profile missing | Re-run `auth_schema.sql`; check trigger in Database → Triggers |
| Stuck on check-email | Confirm email in inbox; or disable confirm-email in dev only |
| Admin 403 | Run SQL to set `role = 'admin'` on your user row |
