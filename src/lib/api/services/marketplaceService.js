/**
 * ─── Marketplace Service ─────────────────────────────────────────────
 */
import apiClient from '../client';
import ENDPOINTS from '../endpoints';

/**
 * Get paginated marketplace listings.
 * @param {{ page?: number, limit?: number, category?: string }} params
 */
export async function getListings(params = {}) {
  const { data } = await apiClient.get(ENDPOINTS.MARKETPLACE.LISTINGS, { params });
  return data;
}

/**
 * Search listings by query and optional category.
 * @param {string} query
 * @param {string} [category]
 */
export async function searchListings(query, category) {
  const { data } = await apiClient.get(ENDPOINTS.MARKETPLACE.SEARCH, {
    params: { q: query, category },
  });
  return data;
}

/**
 * Get a single listing detail.
 * @param {string} id
 */
export async function getListingDetail(id) {
  const { data } = await apiClient.get(ENDPOINTS.MARKETPLACE.DETAIL(id));
  return data;
}

/**
 * Create a new crop listing (seller flow).
 * @param {{ name, category, price, unit, quantity, image_url, description }} payload
 */
export async function createListing(payload) {
  const { data } = await apiClient.post(ENDPOINTS.MARKETPLACE.CREATE, payload);
  return data;
}

/**
 * Get the current seller's own listings.
 */
export async function getMyListings() {
  const { data } = await apiClient.get(ENDPOINTS.MARKETPLACE.MY_LISTINGS);
  return data;
}
