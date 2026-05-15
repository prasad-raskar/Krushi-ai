/**
 * ─── Voice Assistant Service ─────────────────────────────────────────
 */
import apiClient from '../client';
import ENDPOINTS from '../endpoints';

/**
 * Send an audio blob for Marathi transcription.
 * @param {Blob} audioBlob – recorded audio
 * @returns {{ text: string, language: string }}
 */
export async function transcribeAudio(audioBlob) {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');

  const { data } = await apiClient.post(ENDPOINTS.VOICE.TRANSCRIBE, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 20000,
  });

  return data;
}

/**
 * Send a text query to the AI assistant.
 * @param {string} text – user query in Marathi/English
 * @returns {{ answer: string, suggestions?: string[] }}
 */
export async function queryAssistant(text) {
  const { data } = await apiClient.post(ENDPOINTS.VOICE.QUERY, { text });
  return data;
}

/**
 * Convert text to speech and get an audio URL.
 * @param {string} text
 * @returns {{ audio_url: string }}
 */
export async function textToSpeech(text) {
  const { data } = await apiClient.post(ENDPOINTS.VOICE.TTS, { text });
  return data;
}
