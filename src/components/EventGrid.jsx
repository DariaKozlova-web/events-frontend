import React from "react";
import { EventCard } from "./EventCard";

export const EventGrid = ({ events }) => {
  events?.sort((e1, e2) => {
    const date1 = new Date(e1.date);
    const date2 = new Date(e2.date);
    return date1 - date2;
  });

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-2">
      {events?.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
