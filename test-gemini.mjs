import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

const systemPrompt = `You are KrushiAI, an expert agricultural AI assistant. 
A farmer is asking about a crop problem. The query is: "माझ्या कांद्याला लाल रंग येत नाही काय करू"

You MUST reply ENTIRELY in Marathi language.

Analyze the problem and provide a response EXACTLY in this JSON format. Do not include markdown formatting or backticks around the JSON.
{
  "symptom": "Short title of the symptom/disease",
  "crop": "Name of the crop or 'Unknown'",
  "cause": "Main cause (e.g. Fungal, Nutrient deficiency, Pest)",
  "medicine": "ONLY Fungicides, Insecticides, or Pesticides (e.g. 'Bayer Coragen', 'Mancozeb 75% WP'). If the issue is purely nutrient/growth related and has NO pest/disease, YOU MUST RETURN EXACTLY: 'कीड किंवा रोग नाही, औषधाची गरज नाही.' (for Marathi) or 'No pest/disease, medicine not required.' (for English)",
  "medicineSchedule": "Frequency (e.g. 'Apply once every 10 days'). If no medicine is needed, return 'लागू नाही' or 'N/A'.",
  "medicineResultTime": "Expected time (e.g. '3-5 Days'). If no medicine is needed, return 'लागू नाही' or 'N/A'.",
  "fertilizer": "ONLY Fertilizers, PGRs, Tonics, or Nutrients (e.g. '0:52:34 NPK', 'Planofix (PGR)', 'Urea 46%'). Provide EXACT market names.",
  "fertilizerSchedule": "Detailed frequency or timeline to apply the fertilizer (e.g. 'Apply once every 15 days')",
  "fertilizerResultTime": "Expected time to see the results of the fertilizer (e.g. '5-7 Days')",
  "bestAction": "medicine" OR "fertilizer",
  "recoveryTime": "Expected time to see results or recover (e.g. '5-7 Days')"
}`;

async function run() {
  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
    generationConfig: { temperature: 0.2 }
  });
  const text = result.response.text();
  console.log("RAW TEXT:\n", text);
  try {
    const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
    JSON.parse(clean);
    console.log("JSON IS VALID");
  } catch (e) {
    console.error("JSON ERROR:", e.message);
  }
}
run();
