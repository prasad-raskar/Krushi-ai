import { NextResponse } from 'next/server';

// Helper function to get all available API keys
function getApiKeys() {
  const keys = [];
  
  // Get the primary key if it exists
  if (process.env.GEMINI_API_KEY) {
    keys.push(process.env.GEMINI_API_KEY);
  }
  
  // Get any numbered keys (GEMINI_API_KEY_1, GEMINI_API_KEY_2, etc.)
  let i = 1;
  while (process.env[`GEMINI_API_KEY_${i}`]) {
    keys.push(process.env[`GEMINI_API_KEY_${i}`]);
    i++;
  }
  
  return keys;
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function callGeminiWithRetry(parts) {
  const models = ['gemini-2.0-flash-lite', 'gemini-2.0-flash', 'gemini-2.5-flash-lite', 'gemini-2.5-flash'];
  const apiKeys = getApiKeys();
  
  if (apiKeys.length === 0) {
    throw new Error('NO_API_KEY');
  }

  const deadKeys = new Set(); // Keys that hit daily limit

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
              contents: [{ parts }],
              generationConfig: { temperature: 0.2 },
            }),
          }
        );

        if (res.status === 429) {
          const errBody = await res.json().catch(() => null);
          const retryInfo = errBody?.error?.details?.find(d => d['@type']?.includes('RetryInfo'));
          const retrySeconds = retryInfo?.retryDelay ? parseInt(retryInfo.retryDelay) : 0;
          if (retrySeconds > 60) {
            deadKeys.add(apiKey);
            console.log(`🚫 Key ...${apiKey.slice(-6)} hit DAILY LIMIT. Skipping permanently.`);
          } else {
            console.log(`⚡ Key ...${apiKey.slice(-6)} on ${model}: per-minute limit, retry in ${retrySeconds}s`);
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
                contents: [{ parts }],
                generationConfig: { temperature: 0.2 },
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
    const { query, lang, image } = await request.json();

    if (!query && !image) {
      return NextResponse.json({ error: 'Query or image is required' }, { status: 400 });
    }

    const languageContext = lang === 'mr' 
      ? 'You MUST reply ENTIRELY in Marathi language.' 
      : 'You MUST reply ENTIRELY in English language.';

    const systemPrompt = `You are KrushiAI, an expert agricultural AI assistant. 
A farmer is asking about a crop problem. The query is: "${query || 'Analyze this image.'}"

${languageContext}

CRITICAL VISION INSTRUCTION:
If the user uploaded an image, analyze it carefully. If the crop or produce looks PERFECTLY HEALTHY (e.g. a normal mature onion, healthy green leaves, no visible spots/pests), DO NOT hallucinate a disease. 
Instead, set:
- symptom: "पीक निरोगी दिसत आहे" (Crop looks healthy)
- cause: "कोणताही रोग किंवा कीड नाही" (No disease or pest detected)
- medicine: "सध्या कोणतेही औषध फवारण्याची गरज नाही. पीक निरोगी आहे." (No medicine needed right now)
- fertilizer: "नियमित खत व्यवस्थापन सुरू ठेवा. (उदा. 0:0:50 किंवा सूक्ष्म अन्नद्रव्ये)" (Continue regular management)

If there IS a problem (either visible in the image or described in the query), Analyze the problem and provide a response EXACTLY in this JSON format. Do not include markdown formatting or backticks.
{
  "symptom": "Short title of the symptom/disease",
  "crop": "Name of the crop or 'Unknown'",
  "cause": "Main cause (e.g. Fungal, Nutrient deficiency, Pest)",
  "medicine": "EXACT MARKET BRAND NAME or EXACT CHEMICAL COMPOSITION. If it's a pest/disease, name a Fungicide/Pesticide (e.g., 'Bayer Coragen'). If it's a nutrient deficiency/growth issue, suggest a Foliar Spray, Tonic, or PGR (e.g., 'Planofix'). ALWAYS provide a specific product unless the crop is 100% healthy.",
  "medicineSchedule": "Frequency (e.g. 'Apply once every 10 days' or '10 दिवसांच्या अंतराने 2 वेळा फवारणी करा')",
  "medicineResultTime": "Expected time (e.g. '3-5 Days' or '५-७ दिवसांत')",
  "fertilizer": "ONLY Fertilizers or Nutrients (e.g. '0:52:34 NPK', 'Urea 46%'). Provide EXACT market names.",
  "fertilizerSchedule": "Detailed frequency or timeline to apply the fertilizer",
  "fertilizerResultTime": "Expected time to see the results of the fertilizer",
  "bestAction": "medicine" OR "fertilizer",
  "recoveryTime": "Expected time to see results or recover (e.g. '5-7 Days')"
}`;

    const parts = [{ text: systemPrompt }];
    if (image && image.data && image.mimeType) {
      parts.push({
        inlineData: {
          data: image.data,
          mimeType: image.mimeType
        }
      });
    }

    const parsed = await callGeminiWithRetry(parts);
    return NextResponse.json(parsed);

  } catch (error) {
    console.error('Diagnosis error:', error);
    if (error.message === 'NO_API_KEY') {
      return NextResponse.json(
        { error: 'No GEMINI_API_KEY found in .env.local' },
        { status: 500 }
      );
    }
    if (error.message === 'RATE_LIMIT') {
      return NextResponse.json({ error: 'RATE_LIMIT' }, { status: 429 });
    }
    return NextResponse.json({ error: 'Failed to analyze crop issue' }, { status: 500 });
  }
}
