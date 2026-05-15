import { NextResponse } from 'next/server';

// Helper function to get all available API keys
function getApiKeys() {
  const keys = [];
  if (process.env.GEMINI_API_KEY) keys.push(process.env.GEMINI_API_KEY);
  
  let i = 1;
  while (process.env[`GEMINI_API_KEY_${i}`]) {
    keys.push(process.env[`GEMINI_API_KEY_${i}`]);
    i++;
  }
  return keys;
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function callGeminiWithRetry(prompt) {
  const models = ['gemini-2.0-flash-lite', 'gemini-2.0-flash', 'gemini-2.5-flash-lite', 'gemini-2.5-flash'];
  const apiKeys = getApiKeys();
  
  if (apiKeys.length === 0) throw new Error('NO_API_KEY');

  const deadKeys = new Set();

  // Round 1: Try all combos fast (no delay)
  for (const model of models) {
    for (const apiKey of apiKeys) {
      if (deadKeys.has(apiKey)) continue;
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.3 },
            }),
          }
        );

        if (res.status === 429) {
          const errBody = await res.json().catch(() => null);
          const retryInfo = errBody?.error?.details?.find(d => d['@type']?.includes('RetryInfo'));
          const retrySeconds = retryInfo?.retryDelay ? parseInt(retryInfo.retryDelay) : 0;
          if (retrySeconds > 60) {
            deadKeys.add(apiKey);
            console.log(`🚫 Key ...${apiKey.slice(-6)} hit DAILY LIMIT. Skipping.`);
          } else {
            console.log(`⚡ Key ...${apiKey.slice(-6)} on ${model}: per-minute limit`);
          }
          if (deadKeys.size === apiKeys.length) {
            console.log('💀 ALL keys hit daily limit. Failing fast.');
            throw new Error('RATE_LIMIT');
          }
          continue;
        }

        if (!res.ok) {
          const errorData = await res.json();
          console.error(`Gemini API Error (${model}):`, errorData);
          continue;
        }

        const data = await res.json();
        const textResponse = data.candidates[0].content.parts[0].text;
        const cleanJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanJson);
      } catch (err) {
        if (err.message === 'RATE_LIMIT') throw err;
        console.error(`Attempt with ${model} failed:`, err.message);
      }
    }
  }

  // Round 2: If some keys are alive but per-minute limited, wait 5s and retry once
  const aliveKeys = apiKeys.filter(k => !deadKeys.has(k));
  if (aliveKeys.length > 0) {
    console.log(`⏳ Waiting 5s for per-minute limit reset (${aliveKeys.length} keys alive)...`);
    await delay(5000);
    for (const model of models) {
      for (const apiKey of aliveKeys) {
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.3 },
              }),
            }
          );
          if (res.status === 429) continue;
          if (!res.ok) continue;
          const data = await res.json();
          const textResponse = data.candidates[0].content.parts[0].text;
          const cleanJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
          return JSON.parse(cleanJson);
        } catch (err) {
          console.error(`Retry attempt with ${model} failed:`, err.message);
        }
      }
    }
  }

  throw new Error('RATE_LIMIT');
}

export async function POST(request) {
  try {
    const { crop, area, soil, season, plantingType, lang } = await request.json();

    if (!crop || !area || !soil || !season) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const languageContext =
      lang === 'mr'
        ? 'You MUST reply ENTIRELY in Marathi language. Use ₹ for currency.'
        : 'You MUST reply ENTIRELY in English language. Use ₹ for currency.';

    const systemPrompt = `You are KrushiAI — a highly rigorous agricultural scientist for the Government of Maharashtra.

FARMER'S FIELD DATA:
- Crop: ${crop}
- Total Land Area: ${area} Acres
- Soil Type: ${soil}
- Season: ${season}
- Planting Material: ${plantingType || 'Seeds'}

${languageContext}

MANDATORY AGRONOMY RULES (DO NOT HALLUCINATE OR EXCEED THESE BASELINES):

1. FERTILIZER CALCULATION (CRITICAL):
   - Typical chemical fertilizer requirement in India is ONLY 100 kg to 300 kg PER ACRE depending on the crop.
   - NEVER suggest 1000 kg or 500 kg of chemical fertilizers (like Urea, DAP, SSP, MOP, 10:26:26) per acre. That will destroy the soil!
   - Example realistic per acre: 50 kg DAP + 50 kg Urea + 30 kg MOP = 130 kg/acre.
   - You MUST multiply your realistic per-acre chemical fertilizer by ${area} acres for "fertilizerRequired". (e.g. 130 kg * 5 = 650 kg total).

2. YIELD CALCULATION:
   - Onion: ~100-120 Quintals/acre
   - Soybean: ~8-12 Quintals/acre
   - Cotton: ~8-10 Quintals/acre
   - Wheat: ~15-20 Quintals/acre
   - Sugarcane: ~35-45 Tons/acre (Convert to Quintals if needed)
   - Pomegranate: ~4-6 Tons/acre (40-60 Quintals/acre)
   Multiply the base yield by ${area} acres. Give the EXACT calculated number.

3. SEEDS/PLANTING MATERIAL CALCULATION:
   - Onion Seeds: 3-4 kg/acre. Onion Bulbs/Sets: 400-500 kg/acre.
   - Soybean Seeds: 25-30 kg/acre.
   - Cotton Seeds: 2-2.5 kg/acre.
   - Wheat Seeds: 40-50 kg/acre.
   - Pomegranate Saplings: ~250-300 saplings/acre.
   - Sugarcane Setts: ~10,000-15,000 setts/acre.
   Multiply the base material by ${area} acres. Label it EXACTLY as "${plantingType || 'Seeds'}".

4. WATER CALCULATION:
   - Provide the exact total liters needed for the ENTIRE SEASON for 1 acre. 
   - (e.g., 15,00,000 L/acre).

5. ACTION PLAN:
   - Step 1: Basal Dose (At planting). Give exact kg/acre of realistic fertilizers (e.g., 50 kg DAP, 50 kg Potash per acre).
   - Step 2: Top Dressing (Growth stage). (e.g., 40 kg Urea after 30 days).
   - Step 3: Pest/Disease management. Name a specific pesticide/fungicide for the crop.

Respond ONLY with valid JSON. No markdown, no backticks, no explanation:
{
  "estimatedYield": "Total yield for ${area} acres (e.g. 550 Quintal)",
  "harvestTime": "Exact crop duration range (e.g. 110-120 Days)",
  "waterRequired": "Water per acre for full season (e.g. 15,00,000 L/acre)",
  "waterFill": 75,
  "plantingLabel": "${plantingType || 'Seeds'}",
  "plantingMaterial": "Total quantity for ${area} acres (e.g. 15 kg)",
  "plantingFill": 60,
  "fertilizerRequired": "Total CHEMICAL fertilizer for ${area} acres (e.g. 650 kg)",
  "fertilizerFill": 85,
  "actionPlan": [
    {
      "title": "Specific title",
      "desc": "1-2 sentences with EXACT product names, EXACT kg per acre, EXACT timing"
    },
    {
      "title": "Specific title", 
      "desc": "1-2 sentences with EXACT product names, EXACT kg per acre, EXACT timing"
    },
    {
      "title": "Specific title",
      "desc": "1-2 sentences with EXACT product names, EXACT kg per acre, EXACT timing"
    }
  ]
}`;

    const parsed = await callGeminiWithRetry(systemPrompt);
    return NextResponse.json(parsed);

  } catch (error) {
    console.error('Yield prediction error:', error);
    if (error.message === 'NO_API_KEY') {
      return NextResponse.json(
        { error: 'No GEMINI_API_KEY found in .env.local' },
        { status: 500 }
      );
    }
    if (error.message === 'RATE_LIMIT') {
      return NextResponse.json({ error: 'RATE_LIMIT' }, { status: 429 });
    }
    return NextResponse.json({ error: 'Failed to generate prediction' }, { status: 500 });
  }
}
