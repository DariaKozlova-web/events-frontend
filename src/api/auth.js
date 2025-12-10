import { apiConfig } from "./apiConfig";

export const API_USERS_ENDPOINT = `$${apiConfig.baseUrl}/users`;
export const API_AUTH_LOGIN_ENDPOINT = `${apiConfig.baseUrl}/auth/login`;

export const validate = ({ email, password }) => {
  const newErrors = {};
  if (!email.trim()) {
    newErrors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Invalid email format.";
  }
  if (!password.trim()) newErrors.message = "Password is required.";
  return newErrors;
};

export const signIn = async (formState) => {
  post(API_AUTH_LOGIN_ENDPOINT, formState);
};

const post = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const msg = await response.text();
      throw new Error(`API Error: ${response.status} ${msg}`);
    }
    const responseData = await response.json();
    console.debug("response", responseData);
    return responseData;
  } catch (error) {
    console.error("Error posting data", error);
    throw error;
  }
};
