"use client";
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * ─── ApiErrorFallback ────────────────────────────────────────────────
 * Drop-in error state component matching the KrushiAI glassmorphism theme.
 *
 * Props:
 *   error    – { message, status }
 *   onRetry  – optional callback to retry the failed request
 */
export default function ApiErrorFallback({ error, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card border-red-500/30 p-10 flex flex-col items-center text-center"
    >
      <div className="w-16 h-16 rounded-full bg-red-900/30 flex items-center justify-center border border-red-500/30 mb-6">
        <AlertTriangle className="w-8 h-8 text-red-400" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Connection Error</h3>
      <p className="text-gray-400 mb-1 max-w-md">{error?.message || 'Unable to reach the server. Please check your connection.'}</p>
      {error?.status && (
        <p className="text-xs text-red-400 font-mono mb-6">STATUS {error.status}</p>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-red-500/10 border border-red-500/40 text-red-400 font-bold rounded-xl hover:bg-red-500 hover:text-black transition-all uppercase tracking-widest text-sm flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      )}
    </motion.div>
  );
}
