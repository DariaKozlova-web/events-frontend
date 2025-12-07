import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { EventService } from "../api/events";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Loader, Skeleton } from "../components/Loader";
import L from "leaflet";
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
      // const result = EvenService.getEventById(id);

      // try {
      //   const data = await EventService.getEventById(id);
      //   setEvent(data);
      // } catch (error) {
      //   setError('Failed to load event. Try again later.')
      // }finally{
      //   setLoading(false);
      // }

      const result = {
        id: 1,
        title: "Event Title",
        description: "Some Description for the Event",
        date: "2025-12-05T19:49:30.901Z",
        location: "Schloßbezirk 10, 76131 Karlsruhe",
        latitude: 8.404746955649602,
        longitude: 49.01438194665317,
        organizerId: 1,
        createdAt: "2025-12-05T19:49:30.901Z",
        updatedAt: "2025-12-05T19:49:30.901Z",
      };
      setLoading(false);
      if (result) {
        setEvent(result);
      } else {
        setError("Oops... Something wrong!");
      }
    };

    fetchData();
  }, [id]);

  const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
  L.Marker.prototype.options.icon = defaultIcon;

  return (
    <>
      <div className="max-w-3xl mx-auto p-6">
        {/* LOADING */}
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
              📅{new Date(event.date).toLocaleDateString("ru-RU")} <br />
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
