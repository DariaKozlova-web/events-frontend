import React from "react";
import { EventCard } from "./EventCard";

export const EventGrid = ({ events }) => {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-2">
      {events?.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
