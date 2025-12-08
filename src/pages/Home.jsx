import { fetchEvents } from "../api/events";
import { useEffect, useState } from "react";
import { EventGrid } from "../components/EventGrid";

export const Home = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetchEvents().then((data) => setEvents(data));
  }, []);
  return (
    <div>
      <EventGrid events={events.results} />
    </div>
  );
};
