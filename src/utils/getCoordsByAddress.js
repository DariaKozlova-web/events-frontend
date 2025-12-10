import { geocodeAddressOpenCage } from "../api/geocode";

export const getCoordsByAddress = async (addressString) => {
  let data = null;
  try {
    const coords = await geocodeAddressOpenCage(addressString);
    if (coords) {
      data = {
        latitude: coords.lat,
        longitude: coords.lon,
      };
    } else {
      console.warn("Geocode: no coords found for", addressString);
    }
  } catch (gErr) {
    console.error("Geocode failed:", gErr);

  }
  return data;
};
