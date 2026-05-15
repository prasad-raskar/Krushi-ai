const apiKey = 'AIzaSyAec6p9r-3qjrOx5oEvGBqm9yy_7FQ2J2I';
const systemPrompt = `You are KrushiAI, an expert agricultural economist and agronomist.
A farmer wants a yield prediction for their farm.
Crop: onion
Location (District/State): ahmednagar
Land Area: 5 Acres
Soil Type: black
Season: kharif

You MUST reply ENTIRELY in Marathi language. Use ₹ for currency.

Based on typical agricultural data for India, calculate a highly realistic estimate and provide a response EXACTLY in this JSON format. Do not include markdown formatting or backticks around the JSON.
{
  "estimatedYield": "e.g. 95 Q",
  "revenue": "e.g. ₹2,10,000",
  "harvestTime": "e.g. 120 Days",
  "marketRate": "e.g. ₹2,200 / Q",
  "waterRequired": "e.g. 2500 L",
  "waterFill": 75,
  "seedsRequired": "e.g. 50 kg",
  "seedsFill": 60,
  "fertilizerRequired": "e.g. 150 kg",
  "fertilizerFill": 85,
  "actionPlan": [
    { 
      "title": "Short title (e.g. Optimal Sowing)", 
      "desc": "1 sentence description" 
    }
  ]
}`;

fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: [{ parts: [{ text: systemPrompt }] }],
    generationConfig: { temperature: 0.3 }
  })
}).then(res => res.json()).then(data => console.log(JSON.stringify(data, null, 2))).catch(console.error);
