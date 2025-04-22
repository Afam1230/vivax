import { useState, useEffect } from 'react';

/**
 * key       – localStorage key
 * fetcher   – () => Promise<freshData>
 * deps      – dependency array to refetch when things change
 */
export function useCachedData(key, fetcher, deps = []) {
  const [data, setData]     = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw).data : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const fresh = await fetcher();
        if (!cancelled) {
          setData(fresh);
          localStorage.setItem(key, JSON.stringify({ data: fresh, timestamp: Date.now() }));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
          // data stays whatever was in state (possibly cached)
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
