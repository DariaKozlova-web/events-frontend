import React, { useState } from "react";
import { useNavigate } from "react-router";

// In JS brauchst du keinen Typ-Hack, das hier reicht:
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "Title",
    description: "Description",
    date: new Date().toISOString().slice(0, 10),
    location: "Bochum",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage(null);

    // TESTMODUS: keine Token-Prüfung
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   setErrorMessage("Du musst eingeloggt sein, um ein Event zu erstellen.");
    //   // navigate("/signin");
    //   return;
    // }

    if (!form.title || !form.date || !form.location) {
      setErrorMessage("Bitte fülle mindestens Titel, Datum und Ort aus.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // TESTMODUS: kein Auth-Header
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        let message = "Fehler beim Erstellen des Events.";
        try {
          const data = await response.json();
          if (data && data.message) {
            message = data.message;
          }
        } catch (_) {
          // ignorieren
        }
        throw new Error(message);
      }

      navigate("/");
    } catch (error) {
      setErrorMessage(error.message || "Unbekannter Fehler.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Neues Event erstellen</h1>

      {errorMessage && (
        <div className="mb-4 rounded border border-red-500 bg-red-100 text-red-800 px-3 py-2 text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Titel */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Titel *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.title}
            onChange={handleChange}
            placeholder="z.B. JavaScript Meetup"
          />
        </div>

        {/* Datum */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">
            Datum *
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

        {/* Ort */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Ort / Adresse *
          </label>
          <input
            id="location"
            name="location"
            type="text"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.location}
            onChange={handleChange}
            placeholder="z.B. Berlin, Alexanderplatz 1"
          />
        </div>

        {/* Beschreibung */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Beschreibung
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            value={form.description}
            onChange={handleChange}
            placeholder="Kurze Infos zum Event..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          {isSubmitting ? "Wird erstellt..." : "Event erstellen"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
