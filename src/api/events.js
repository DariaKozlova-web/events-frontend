import { apiConfig } from "./apiConfig";

const getEventById = async (id) => {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/events/${id}`);
    if (!response.ok) {
      const msg = await response.text();
      throw new Error(`API Error: ${response.status} ${msg}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error; //Wichtig – wir lösen einen Fehler aus, um ihn in der Komponente abzufangen.
  }
};

export const EventService = {
  getEventById,
};

export const fetchEvents = async () => {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/events`);
    if (!response.ok) {
      const msg = await response.text();
      throw new Error(`API Error: ${response.status} ${msg}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error; //Wichtig – wir lösen einen Fehler aus, um ihn in der Komponente abzufangen.
  }
};
