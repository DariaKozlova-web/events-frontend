const OPENCAGE_KEY = import.meta.env.VITE_OPENCAGE_KEY;

export async function geocodeAddressOpenCage(address) {
  if (!OPENCAGE_KEY) throw new Error('No OpenCage API key found in VITE_OPENCAGE_KEY');

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${OPENCAGE_KEY}&limit=1&language=de`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Geocoding (OpenCage) failed: ${res.status}`);
  }
  const json = await res.json();
  if (!json.results || json.results.length === 0) return null;

  const r = json.results[0].geometry;
  return { lat: r.lat, lon: r.lng };
}

// ------------------ NEW ------------------------

export async function autocompleteAddressOpenCage(query) {
  if (!query || query.length < 3) return []; // Mindestlänge für die automatische Vervollständigung
  if (!OPENCAGE_KEY) throw new Error("No OpenCage API key found");

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    query
  )}&key=${OPENCAGE_KEY}&limit=5&language=de`;

  const res = await fetch(url);
  if (!res.ok) return [];

  const json = await res.json();
  if (!json.results) return [];

  return json.results.map(r => ({
    formatted: r.formatted,
    lat: r.geometry.lat,
    lon: r.geometry.lng,
  }));
}