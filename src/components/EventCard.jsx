import React from "react";
import image from "../assets/default-event.jpg";
import { Link } from "react-router";

export const EventCard = ({ event }) => {
  const { id, title, description, date } = event;
  const dateString = new Date(date).toDateString();
  return (
    <Link
      to={`/events/${id}`}
      className="card bg-base-100 w-full max-w-md shadow-sm hover:shadow-md transition-shadow"
    >
      <figure>
        <img src={image} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <h2>{dateString}</h2>
        <p>{description}</p>
      </div>
    </Link>
  );
};
