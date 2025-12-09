import React, { useState } from "react";
import { useNavigate } from "react-router";

const API_FALLBACK = "http://localhost:3001/api";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || API_FALLBACK;
const API_EVENTS_ENDPOINT = `${API_BASE_URL}/events`;

const CreateEvent = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().slice(0, 10),
    location: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function handleQuickFill() {
    setForm({
      title: "JavaScript Meetup",
      description: "Casual evening with short talks and pizza.",
      date: new Date().toISOString().slice(0, 10),
      location: "Berlin",
    });
  }
  /*===================================================*/
  /*================== HANDLE SUBMIT ==================*/
  /*===================================================*/
  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage(null);

    // 1)Check Token
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("You must be logged in to create an event.");
      return;
    }

    // 2)Check Data
    if (!form.title || !form.date || !form.location) {
      setErrorMessage("Please fill at least title, date and location.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(API_EVENTS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Auth-Header
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        let message = "Error while creating the event.";
        try {
          const data = await response.json();
          if (data && data.message) {
            message = data.message;
          }
        } catch (error) {
          console.error(error);
        }
        throw new Error(message);
      }

      navigate("/");
    } catch (error) {
      setErrorMessage(error.message || "Unknown error.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Create New Event</h1>
      {/* Conditional Error Message */}
      {errorMessage && (
        <div className="mb-4 rounded border border-red-500 bg-red-100 text-red-800 px-3 py-2 text-sm">
          {errorMessage}
        </div>
      )}

      {/*========================================*/}
      {/*================= FORM =================*/}
      {/*========================================*/}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. JavaScript Meetup"
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">
            Date *
          </label>
          <input
            id="date"
            name="date"
            type="date"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Location / Address *
          </label>
          <input
            id="location"
            name="location"
            type="text"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Berlin, Alexanderplatz 1"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            value={form.description}
            onChange={handleChange}
            placeholder="Details about the event..."
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex items-center justify-between gap-4">
          {/* Links: Insert Test Data */}
          <button
            type="button"
            onClick={handleQuickFill}
            className="inline-flex items-center justify-center rounded border border-gray-300 px-4 py-2 text-sm font-medium
               text-gray-700 bg-white hover:bg-gray-100 hover:border-gray-400
               focus:outline-none focus:ring-2 focus:ring-blue-500/40
               transition-all duration-150"
          >
            Insert Test Data
          </button>

          {/* Rechts: Abbrechen + Event erstellen */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center rounded border border-gray-300 px-4 py-2 text-sm font-medium
                 text-gray-700 bg-white hover:bg-gray-100 hover:border-gray-400
                 focus:outline-none focus:ring-2 focus:ring-blue-500/40
                 transition-all duration-150"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium
                 bg-blue-600 text-white hover:bg-blue-700
                 disabled:opacity-60 disabled:cursor-not-allowed
                 shadow-sm hover:shadow-md hover:-translate-y-[1px]
                 focus:outline-none focus:ring-2 focus:ring-blue-500/60
                 transition-all duration-150"
            >
              {isSubmitting ? "Creating..." : "Create event"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
