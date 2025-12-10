import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = "authContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, email }
  const [token, setToken] = useState(null); // String-JWT
  const [isLoading, setIsLoading] = useState(true);

  // Bei App-Start 1x localStorage laden
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) {
      setIsLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      if (parsed.token) {
        setToken(parsed.token);
        setUser(parsed.user || null);
      }
    } catch {
      // Falls JSON nicht lesbar ist
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 1)Login
  function login({ token, user }) {
    setToken(token);
    setUser(user);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ token, user }));
  }

  // 2)Logout
  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    isAuthLoading: isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
