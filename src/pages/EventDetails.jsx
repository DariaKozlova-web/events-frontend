import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { EventService } from "../api/events";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Loader, Skeleton } from "../components/Loader";
import { geocodeAddressOpenCage } from "../api/geocode";
import "leaflet/dist/leaflet.css";

import { Calendar, MapPin } from "lucide-react";
import L from "leaflet";
import greenMarker from "../assets/markers/marker-icon-green.png";
import markerShadow from "../assets/markers/marker-shadow.png";

const customMarker = L.icon({
  iconUrl: greenMarker,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
      <div className="max-w-3xl mx-auto p-4 md:p-8">
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
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            {/* TITLE + BUTTONS */}
            <div className="flex justify-between gap-4 mb-4 flex-col sm:flex-row sm:items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                {event.title}
              </h1>

              <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 rounded-xl bg-evGreen text-gray-900 font-semibold shadow-md hover:bg-evGreen-dark transition-all"
              >
                ⬅ Back
              </button>
            </div>

            {/* INFO BLOCKS */}
            <div className="bg-white rounded-xl p-4 shadow-md mb-6">
              <p className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-5 h-5 text-red-500" />
                {new Intl.DateTimeFormat("de-DE", {
                  dateStyle: "medium",
                }).format(new Date(event.date))}
              </p>

              <p className="flex items-center gap-2 text-gray-700 mt-2">
                <MapPin className="w-5 h-5 text-evGreen-dark" />
                {event.location}
              </p>
            </div>

            {/* DESCRIPTION */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
              <h2 className="font-semibold mb-2 text-gray-800">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* MAP */}
            <div className="rounded-xl overflow-hidden shadow-lg mb-6">
              {event.latitude && event.longitude ? (
                <MapContainer
                  center={[event.latitude, event.longitude]}
                  zoom={14}
                  style={{ height: "350px", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[event.latitude, event.longitude]} icon={customMarker}>
                    <Popup>{event.location}</Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <div className="p-6 text-center text-gray-500 bg-gray-100">
                  Map not available
                </div>
              )}
            </div>

            {/* FOOTER INFO */}
            <div className="text-sm text-gray-400">
              Created: {new Date(event.createdAt).toLocaleString("de-DE")}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
