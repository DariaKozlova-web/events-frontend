import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { EvenService } from "../api/events";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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

  // const defaultIcon = L.icon({
  //   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  //   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  //   iconSize: [25, 41],
  //   iconAnchor: [12, 41],
  // });
  // L.Marker.prototype.options.icon = defaultIcon;

  return (
    <>
      {loading && <p className="text-center mt-6">Loading...</p>}
      {error && <p>{error}</p>}
      {event && <p>{event.title}</p>}

      {event && (
        <MapContainer
          center={[event.latitude, event.longitude]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={[event.latitude, event.longitude]}>
            <Popup>
              Координаты: {event.latitude}, {event.longitude}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
};
