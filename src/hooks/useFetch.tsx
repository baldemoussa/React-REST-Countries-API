import { useEffect, useState } from "react";

export function useFetch<T>(url: string | null, headers?: HeadersInit) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const requestUrl = url;
    let cancelled = false;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(requestUrl, { headers });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const json = (await response.json()) as T;

        if (!cancelled) {
          setData(json);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}
