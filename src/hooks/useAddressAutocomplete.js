import { useState, useEffect } from "react";
import { autocompleteAddressOpenCage } from "../api/geocode";

export function useAddressAutocomplete(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer;

    timer = setTimeout(async () => {
      if (!query || query.length < 3) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const suggestions = await autocompleteAddressOpenCage(query);
        setResults(suggestions);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }, 500); // debounce 0.5s

    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading };
}
