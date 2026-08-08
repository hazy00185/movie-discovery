# MovieDiscover 🎬

A production-ready movie discovery app built with React and AI integration.

**Live URL:** https://movie-discovery-smoky.vercel.app/

## What it does
- Browse trending movies (TMDB API)
- Search movies by title
- Save favourites (localStorage)
- Get AI-powered movie insights (OpenRouter + Llama 3.1)

## Setup

```bash
git clone https://github.com/hazy00185/movie-discovery.git
cd movie-discovery
npm install
```

Create `.env` file in root:
```
REACT_APP_TMDB_KEY=your_tmdb_key
REACT_APP_OPENROUTER_KEY=your_openrouter_key
```

```bash
npm start
```

## Architecture
- `src/api.js` — TMDB API calls
- `src/gemini.js` — OpenRouter AI integration
- `src/MovieCard.js` — Movie card component with AI insight
- `src/App.js` — Main app, state management, search, favourites

## AI Integration
OpenRouter API with Llama 3.1 model generates 2-3 sentence movie insights on demand. User clicks "AI Insight" button per movie card.

## Known Limitations
- AI insights require OpenRouter API key
- Favourites reset if localStorage is cleared
- No backend — all client-side

## Deployment
Deployed on Vercel with environment variables configured in dashboard.