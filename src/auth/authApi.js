import { apiConfig } from "../api/apiConfig";

// 1)Fetch Login
export async function loginUser(credentials) {
  const response = await fetch(`${apiConfig.baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody.message || errorBody.error || "Login failed.";
    throw new Error(message);
  }
  const data = await response.json();
  return data; //{ token, ... }
}

// 2)Fetch Profile
export async function fetchProfile(token) {
  const response = await fetch(`${apiConfig.baseUrl}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch profile");
  }

  return response.json(); // z.B. { id, name, email }
}
