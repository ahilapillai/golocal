# GoLocal

A responsive Vietnamese pocket translator, with public prepared phrases, browser-local saved phrases and stay details, and a server-backed translation and speech service.

## Development

Node 22.13+ required. Install with the Sites `install-dependencies.mjs` helper, then `npm run dev`. `npm test` checks backend contracts with mocked provider responses and an in-memory SQLite database; it does not call paid APIs. Build with the Sites `build-site.mjs` helper. `public/` contains the existing interface; `server/api.mjs` implements the endpoints. `drizzle/` contains the usage-counter database migration, applied by Sites during publication.

## Production activation

The site remains public. Live AI tools require ChatGPT sign-in using the Sites gateway. Prepared phrases and local saves do not require sign-in.

1. Enable the OpenAI Developers plugin and use its `openai-platform-api-key` skill to securely obtain an API key for an OpenAI project with API billing enabled.
2. Set the hosted Sites runtime secret `OPENAI_API_KEY` using the native environment-variable tool. Never put the value in Git, the browser, or a chat message.
3. Set the hosted runtime variable `AI_ENABLED` to `true` and redeploy the saved version to apply the environment revision. To disable AI, set it to `false` and redeploy.
4. Verify `/api/status` reports `ready: true`. Sign in and test typed translation, microphone permissions, a Vietnamese reply and speech playback on an actual iPhone and Android device.

The backend fails closed when key, enable flag, or database binding is missing. Activation and paid provider testing have not yet been completed. `.env.example` lists names only. Local identity simulation belongs only to the Sites development runtime.

## Endpoints

- `GET /api/status`: readiness and sign-in state; no secrets.
- `POST /api/translate`: 1–500 characters, English ↔ Vietnamese; structured translation or clarification.
- `POST /api/transcribe`: English dictation from bounded mono 16 kHz PCM WAV.
- `POST /api/reply`: Vietnamese transcription followed by English translation.
- `POST /api/speak`: Vietnamese AI-generated audio, up to 2,000 characters.

Paid requests require same-origin POST and a Sites-authenticated visitor. Atomic D1 reservations limit a visitor to 8 requests/minute and 120 units/day; the whole site has a 1,500-unit/day cap. Translation costs 1 unit, transcription or speech 2, and reply translation 3. Units are application quotas, not dollar amounts. Failed provider attempts still consume a reservation. Set provider project budgets and monitor billing as well.

Recordings stop at 30 seconds and are converted locally to bounded WAV. Cancellation, closing the dialog, hiding the page and interrupted microphone tracks release recording resources. OpenAI handles submitted text/audio under its API data policy; requests disable Responses storage. GoLocal stores only hashed user IDs and usage counters on the server, retained for up to 48 hours until subsequent usage cleanup. It does not persist recordings, custom input or replies. Saved phrases and stay details stay in the visitor's browser.

Provider errors are redacted. API responses and audio are never cached by the service worker. Offline support covers the app shell and prepared/local saved phrases, not live translation.
