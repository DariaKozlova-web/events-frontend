import { apiConfig } from "./apiConfig";
import { get } from "./utils";

const API_EVENTS_ENDPOINT = `${apiConfig.baseUrl}/events`;

const getEventById = async (id) => {
  return get(`${API_EVENTS_ENDPOINT}/${id}`);
};

export const EventService = {
  getEventById,
};

export const fetchEvents = async () => {
  return get(API_EVENTS_ENDPOINT);
};
