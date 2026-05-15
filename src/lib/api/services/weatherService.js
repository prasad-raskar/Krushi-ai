/**
 * ─── Weather Service ─────────────────────────────────────────────────
 */
import apiClient from '../client';
import ENDPOINTS from '../endpoints';

/**
 * Fetch current weather for given coordinates.
 * @param {number} lat
 * @param {number} lon
 */
export async function getCurrentWeather(lat, lon) {
  const { data } = await apiClient.get(ENDPOINTS.WEATHER.CURRENT, {
    params: { lat, lon },
  });
  return data;
}

/**
 * Fetch multi-day forecast.
 * @param {number} lat
 * @param {number} lon
 * @param {number} [days=7]
 */
export async function getForecast(lat, lon, days = 7) {
  const { data } = await apiClient.get(ENDPOINTS.WEATHER.FORECAST, {
    params: { lat, lon, days },
  });
  return data;
}

/**
 * Fetch active farming alerts.
 * @param {number} lat
 * @param {number} lon
 */
export async function getWeatherAlerts(lat, lon) {
  const { data } = await apiClient.get(ENDPOINTS.WEATHER.ALERTS, {
    params: { lat, lon },
  });
  return data;
}

/**
 * Get AI irrigation recommendation.
 * @param {number} lat
 * @param {number} lon
 */
export async function getIrrigationAdvice(lat, lon) {
  const { data } = await apiClient.get(ENDPOINTS.WEATHER.IRRIGATION, {
    params: { lat, lon },
  });
  return data;
}
