import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { EventService } from "../api/events";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Loader, Skeleton } from "../components/Loader";
import { geocodeAddressOpenCage } from "../api/geocode";
import "leaflet/dist/leaflet.css";

export const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await EventService.getEventById(id);
       // If there are no coordinates, get the address
        if (
          (!data.latitude && data.latitude !== 0) ||
          (!data.longitude && data.longitude !== 0)
        ) {
          try {
            const coords = await geocodeAddressOpenCage(data.location);
            if (coords) {
              data.latitude = coords.lat;
              data.longitude = coords.lon;
            } else {
              console.warn("Geocode: no coords found for", data.location);
            }
          } catch (gErr) {
            console.error("Geocode failed:", gErr);
           // We won't stop it - we'll still display the data without a map or with a fallback
          }
        }
        setEvent(data);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError("Failed to load event. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);


  return (
    <>
      <div className="max-w-3xl mx-auto p-6">
        {/* LOADING */}
        {loading && <Loader />}
        {loading && <Skeleton />}
        {/* ERROR */}
        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg border border-red-300">
            <p className="font-semibold">{error}</p>
          </div>
        )}
        {/* SUCCESS */}
        {event && (
          <>
            <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
            <p className="text-gray-600 mb-4">
              📅{new Date(event.date).toLocaleDateString("de-DE")} <br />
              📍 {event.location}
            </p>
            <p className="text-lg leading-relaxed mb-6">{event.description}</p>
            {/*MAP*/}
            <div className="rounded-lg overflow-hidden shadow-lg mb-6">
              <MapContainer
                center={[event.latitude, event.longitude]}
                zoom={14}
                style={{ height: "350px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  // attribution="&copy; OpenStreetMap contributors"
                />
                <Marker position={[event.latitude, event.longitude]}>
                  <Popup>{event.location}</Popup>
                </Marker>
              </MapContainer>
            </div>
            <div className="text-sm text-gray-400">
              Created: {new Date(event.createdAt).toLocaleString()}
            </div>
          </>
        )}
      </div>
    </>
  );
};
