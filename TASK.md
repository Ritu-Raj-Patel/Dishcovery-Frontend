# Recipe Recommendation System Development Plan

## Phase 0 — Repo & Envs (15–25 min)
- [x] Create monorepo
- [x] Git init → first commit
- [x] Environment variables
  - Backend: `GEMINI_API_KEY=<your_key>` (required)
  - Frontend: `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000`

## Phase 1 — Backend Core (60–75 min)
- [ ] Dependencies (requirements.txt): fastapi, uvicorn[standard], python-multipart, pydantic==2.*, httpx, google-generativeai, Pillow
- [ ] Models (lib/models.py): Diet, Difficulty, Ingredient, Nutrition, Recipe, RecognizeResponse, MatchFilters, MatchRequest, ScoredRecipe
- [ ] Normalization (lib/normalize.py): canon(name), dedupe(list), synonyms map
- [ ] Substitutions (lib/substitutions.py): editable dict
- [ ] Matching (lib/matching.py): score_recipe(), hard filters, paginate()
- [ ] Gemini integration (lib/gemini_ing.py)
- [ ] API (main.py)
  - CORS * (dev); restrict in prod
  - GET /health
  - POST /recognize
  - POST /recipes/search
  - GET /recipes/{id}

## Phase 2 — Data (30–45 min)
- [ ] Seed data/recipes.json with ≥20 recipes
- [ ] Startup validation: load into Pydantic Recipe[]; log count

## Phase 3 — Frontend Core (60–75 min)
- [ ] Scaffold UI
  - Header with app name + link to GitHub
  - Main page with: Ingredient chips input, Image upload, Filters panel, “Find recipes” button, Results grid
  - Modal/drawer for recipe detail
- [ ] Types (src/types.ts) mirror backend
- [ ] Utils (src/utils/scale.ts): scaleQty(q, fromServ, toServ)
- [ ] API client (src/lib/api.ts)
- [ ] Components
  - IngredientChips
  - ImageUpload
  - FiltersPanel
  - RecipeCard
  - RecipeDetailModal
  - Rating + Favorite toggle

## Phase 4 — Wiring & States (30–45 min)
- [ ] Main page state management
- [ ] On “Find recipes” → call searchRecipes → render RecipeCard[]
- [ ] Loading spinners & graceful errors
- [ ] Empty state copy

## Phase 5 — Gemini Image Recognition (25–40 min)
- [ ] ImageUpload → recognizeImage(file) → merge chips uniquely
- [ ] Resize/compress client image to ~1024px max side before upload

## Phase 6 — Feedback & Suggestions (30–45 min)
- [ ] useLocalPrefs() hook → favorites/ratings in localStorage
- [ ] “Suggested for you”: compute client-side from 4–5★ items

## Phase 7 — A11y & Mobile Polish (20–30 min)
- [ ] ARIA labels on all interactive elements
- [ ] Modal focus trap, Esc close, focus restore
- [ ] Tailwind focus-visible rings; large tap targets on mobile
- [ ] Lighthouse a11y ≥90

## Phase 8 — Deployment (30–45 min)
- [ ] Backend deploy (Render/Railway)
  - Dockerfile + uvicorn main:app
  - Env: GEMINI_API_KEY
- [ ] Frontend deploy (Vercel)
  - Env: NEXT_PUBLIC_API_BASE_URL=<backend-public-url>

## Phase 9 — Docs & Finalization (20–30 min)
- [ ] README.md
  - Features checklist
  - Run instructions (FE/BE)
  - API docs
  - Env variables
  - Limitations & future ideas
  - 200-word approach
- [ ] Verify deliverables
  - Live FE+BE URLs
  - GitHub repo public
  - README complete