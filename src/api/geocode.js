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
