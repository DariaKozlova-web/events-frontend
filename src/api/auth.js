import { apiConfig } from "./apiConfig";
import { post } from "./utils";

const API_USERS_ENDPOINT = `$${apiConfig.baseUrl}/users`;
const API_AUTH_LOGIN_ENDPOINT = `${apiConfig.baseUrl}/auth/login`;

export const validate = ({ email, password }) => {
  const newErrors = {};
  if (!email.trim()) {
    newErrors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Invalid email format.";
  }
  if (!password.trim()) newErrors.password = "Password is required.";
  return newErrors;
};

export const signUp = async (formState) => {
  return post(API_USERS_ENDPOINT, formState);
};

export const signIn = async (formState) => {
  return post(API_AUTH_LOGIN_ENDPOINT, formState);
};
