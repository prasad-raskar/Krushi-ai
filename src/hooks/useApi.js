/**
 * ─── useApi Hook ─────────────────────────────────────────────────────
 * Generic hook that wraps any async service call with:
 *   • loading / idle / success / error state machine
 *   • automatic error extraction
 *   • execute() function to trigger the call
 *   • reset() function to return to idle
 *
 * Usage:
 *   const { data, error, loading, execute } = useApi(cropScan.analyzeCropImage);
 *   <button onClick={() => execute(imageFile)}>Scan</button>
 */
import { useState, useCallback, useRef } from 'react';

export default function useApi(asyncFn) {
  const [state, setState] = useState({
    data: null,
    error: null,
    loading: false,
    status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
  });

  // Abort controller to cancel in-flight requests on unmount / re-call
  const abortRef = useRef(null);

  const execute = useCallback(
    async (...args) => {
      // Cancel any previous request
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setState({ data: null, error: null, loading: true, status: 'loading' });

      try {
        const result = await asyncFn(...args);

        // Guard against aborted requests resolving late
        if (controller.signal.aborted) return;

        setState({ data: result, error: null, loading: false, status: 'success' });
        return result;
      } catch (err) {
        if (controller.signal.aborted) return;

        const errorPayload = {
          message: err.message || 'An unexpected error occurred',
          status: err.status || 500,
          data: err.data || null,
        };

        setState({ data: null, error: errorPayload, loading: false, status: 'error' });
        return undefined;
      }
    },
    [asyncFn],
  );

  const reset = useCallback(() => {
    setState({ data: null, error: null, loading: false, status: 'idle' });
  }, []);

  return { ...state, execute, reset };
}
