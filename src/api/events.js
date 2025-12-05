import { apiConfig } from "./apiConfig";

const getEventById = async (id) => {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/events/${id}`);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error)
    return undefined;
  }

  // {
  //   "id": 1,
  //   "title": "Event Title",
  //   "description": "Some Description for the Event",
  //   "date": "2025-12-05T19:49:30.901Z",
  //   "location": "Schloßbezirk 10, 76131 Karlsruhe",
  //   "latitude": 8.404746955649602,
  //   "longitude": 49.01438194665317,
  //   "organizerId": 1,
  //   "createdAt": "2025-12-05T19:49:30.901Z",
  //   "updatedAt": "2025-12-05T19:49:30.901Z"
  // }
};

export const EvenService = {
  getEventById,
};
