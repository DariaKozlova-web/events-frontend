import { fetchEvents } from "../api/events";
import { useEffect, useState } from "react";
import { EventGrid } from "../components/EventGrid";

export const Home = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetchEvents().then((data) => setEvents(data));
  }, []);
  return (
    <div className="px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <EventGrid events={events.results} />
      </div>
    </div>
  );
};
