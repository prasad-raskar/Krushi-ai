/**
 * ─── Service Barrel Export ───────────────────────────────────────────
 * Import all services from a single path:
 *   import { cropScan, voice, weather } from '@/lib/api';
 */
export * as cropScan from './services/cropScanService';
export * as voice from './services/voiceService';
export * as weather from './services/weatherService';
export * as marketplace from './services/marketplaceService';
export * as yield from './services/yieldService';

export { default as apiClient } from './client';
export { default as ENDPOINTS } from './endpoints';
