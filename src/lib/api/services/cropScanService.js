/**
 * ─── Crop Disease Detection Service ──────────────────────────────────
 */
import apiClient from '../client';
import ENDPOINTS from '../endpoints';

/**
 * Upload a crop image for AI disease analysis.
 * @param {File} imageFile – the image file from the input/drop zone
 * @returns {{ disease, confidence, severity, fertilizer, pesticide, water }}
 */
export async function analyzeCropImage(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);

  const { data } = await apiClient.post(ENDPOINTS.CROP_SCAN.ANALYZE, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 30000, // allow extra time for ML inference
  });

  return data;
}

/**
 * Fetch the user's scan history.
 * @param {{ page?: number, limit?: number }} params
 */
export async function getScanHistory(params = {}) {
  const { data } = await apiClient.get(ENDPOINTS.CROP_SCAN.HISTORY, { params });
  return data;
}

/**
 * Get a single scan result by ID.
 * @param {string} id
 */
export async function getScanResult(id) {
  const { data } = await apiClient.get(ENDPOINTS.CROP_SCAN.RESULT(id));
  return data;
}
