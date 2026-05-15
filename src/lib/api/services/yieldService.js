/**
 * ─── Yield Prediction Service ────────────────────────────────────────
 */
import apiClient from '../client';
import ENDPOINTS from '../endpoints';

/**
 * Run an AI yield prediction.
 * @param {{ crop: string, area: number, soil: string, season: string }} params
 * @returns {{ yield_quintals, revenue, input_cost, profit, monthly_forecast, weather_factors, soil_health }}
 */
export async function predictYield(params) {
  const { data } = await apiClient.post(ENDPOINTS.YIELD.PREDICT, params);
  return data;
}

/**
 * Fetch past prediction history.
 * @param {{ page?: number, limit?: number }} params
 */
export async function getPredictionHistory(params = {}) {
  const { data } = await apiClient.get(ENDPOINTS.YIELD.HISTORY, { params });
  return data;
}
