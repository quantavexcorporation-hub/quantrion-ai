# Quantrion Mobile

Native Android & iOS client for the existing Quantrion web platform.

This is **not** a rebuild of Quantrion and **not** a WebView wrapper. It reuses the same branding, Supabase auth, and Next.js `/api/*` AI endpoints while delivering a touch-first React Native experience.

## Stack

- Expo (React Native) + TypeScript
- React Navigation (bottom tabs + stacks)
- TanStack Query
- Supabase Auth (SecureStore session)
- Expo modules: notifications, biometrics, camera, image picker, document picker, sharing, clipboard, haptics, linking, network, background fetch

## Run

```bash
cd mobile
cp .env.example .env
# set EXPO_PUBLIC_API_URL to your running Next.js origin
# set EXPO_PUBLIC_SUPABASE_* to the same keys as web
npm start
```

Then press `a` (Android) or `i` (iOS simulator / Expo Go).

Demo mode works without Supabase via **Continue with demo** on the login screen.

## Navigation

Bottom tabs: **Home · Learn · QuickLearn · AI · Library · Profile · More**

**More** includes Performance IQ, Knowledge DNA, Study Material, Mock Tests, Practice, Analytics, Exams, Future of Industries, Explore Industries, Downloads, Notifications, Search, Settings, Help, Upgrade.

## Sharing logic with web

| Concern | Approach |
|--------|----------|
| Auth | Same Supabase project; mobile stores session in SecureStore |
| AI | `POST /api/doubt`, `/api/mcq`, `/api/test`, `/api/ai` via `EXPO_PUBLIC_API_URL` |
| Types | `src/lib/types.ts` mirrors `lib/supabase/types.ts` |
| Design | `src/theme/tokens.ts` mirrors `app/globals.css` dark tokens |

Web app under `/app`, `/components`, `/lib` is untouched.

## Native capabilities

- Push + local study reminders
- Biometric unlock
- Camera / gallery / document attach for AI Tutor
- Offline download catalog + sync queue scaffolding
- Deep links: `quantrion://…` and App/Universal Links hosts in `app.json`
- Haptics (respects Reduce Motion)
- Share + clipboard

## Store builds

```bash
npm install -g eas-cli
eas login
eas build --platform android
eas build --platform ios
```

Update `extra.eas.projectId`, icons in `assets/`, and privacy strings in `app.json` before production submission.

## Folder map

```
mobile/
  App.tsx
  src/
    theme/          # brand tokens
    lib/            # env, supabase, api, types
    providers/      # auth + react-query
    navigation/     # root, tabs, auth
    screens/        # feature surfaces
    components/ui/  # Screen, GlassCard, buttons…
    services/       # biometrics, notifications, downloads, offline
```
