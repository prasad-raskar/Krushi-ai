/**
 * ─── API Endpoint Constants ───────────────────────────────────────────
 * Single source of truth for every backend route.
 * Changing a URL here updates it everywhere.
 */

const ENDPOINTS = {
  // ── Crop Disease Detection ──────────────────────────────────────────
  CROP_SCAN: {
    ANALYZE:   '/crop-scan/analyze',       // POST  – multipart/form-data (image)
    HISTORY:   '/crop-scan/history',        // GET   – past scan results
    RESULT:    (id) => `/crop-scan/${id}`,  // GET   – single result by ID
  },

  // ── Voice Assistant ─────────────────────────────────────────────────
  VOICE: {
    TRANSCRIBE: '/voice/transcribe',  // POST  – audio blob → Marathi text
    QUERY:      '/voice/query',       // POST  – { text } → AI answer
    TTS:        '/voice/tts',         // POST  – { text } → audio URL
  },

  // ── Weather ─────────────────────────────────────────────────────────
  WEATHER: {
    CURRENT:    '/weather/current',        // GET ?lat=&lon=
    FORECAST:   '/weather/forecast',       // GET ?lat=&lon=&days=
    ALERTS:     '/weather/alerts',         // GET ?lat=&lon=
    IRRIGATION: '/weather/irrigation',     // GET ?lat=&lon=
  },

  // ── Marketplace ─────────────────────────────────────────────────────
  MARKETPLACE: {
    LISTINGS:   '/marketplace/listings',              // GET  – all listings
    CREATE:     '/marketplace/listings',              // POST – new listing
    DETAIL:     (id) => `/marketplace/listings/${id}`,// GET  – single listing
    SEARCH:     '/marketplace/search',                // GET ?q=&category=
    MY_LISTINGS:'/marketplace/me',                    // GET  – seller's own
  },

  // ── Yield Prediction ───────────────────────────────────────────────
  YIELD: {
    PREDICT:    '/yield/predict',      // POST – { crop, area, soil, season }
    HISTORY:    '/yield/history',       // GET  – past predictions
  },

  // ── Government Schemes ──────────────────────────────────────────────
  SCHEMES: {
    LIST:       '/schemes',            // GET  – all schemes
    DETAIL:     (id) => `/schemes/${id}`,
    APPLY:      (id) => `/schemes/${id}/apply`, // POST
  },

  // ── Auth (future) ──────────────────────────────────────────────────
  AUTH: {
    LOGIN:      '/auth/login',
    REGISTER:   '/auth/register',
    ME:         '/auth/me',
    REFRESH:    '/auth/refresh',
  },
};

export default ENDPOINTS;
