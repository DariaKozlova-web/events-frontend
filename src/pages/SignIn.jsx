/** biome-ignore-all lint/correctness/useUniqueElementIds: <not now> */
import { useActionState, useEffect } from "react";
import { useNavigate } from "react-router";
import { validate } from "../api/auth.js";
import { loginUser, fetchProfile } from "../api/authApi.js";
import { useAuth } from "../context/useAuth";
import SubmitBtn from "../components/SubmitBtn.jsx";

// action Funktion anstelle des Submit Handlers
// Hat in Verbindung mit useActionState-Hook Zugriff auf
// vorherigen State und die Formulardaten
async function action(_prevState, formData) {
  const data = Object.fromEntries(formData); // FormData in Objekt einlesen
  const validationErrors = validate(data);

  // 1) Clientseitige Validierung wie bei Simone
  if (Object.keys(validationErrors).length > 0) {
    return {
      errors: validationErrors,
      input: data,
    };
  }

  // 2) Versuch: Login am Backend
  try {
    // loginUser holt den Token vom Backend
    const loginResponse = await loginUser({
      email: data.email,
      password: data.password,
    });

    const token = loginResponse.token;

    // Optional: Profil nachladen, falls dein Backend das anbietet
    // und du mehr als nur den Token brauchst
    let user = loginResponse.user || null;

    if (!user && token) {
      try {
        const profile = await fetchProfile(token);
        user = {
          id: profile.id,
          email: profile.email,
          name: profile.name,
        };
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        // notfalls nur mit Minimal-Daten weiterarbeiten
        user = user ?? { id: null, email: data.email };
      }
    }

    // Rückgabe kommt in state → die Komponente kümmert sich
    // um AuthContext.login + Redirect
    return {
      errors: null,
      input: {},
      auth: {
        token,
        user: user ?? { id: null, email: data.email },
      },
    };
  } catch (error) {
    console.error("Login failed:", error);
    return {
      errors: {
        form: error.message || "Login failed. Please try again.",
      },
      input: data,
    };
  }
}

export const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Hook verbindet Action-Funktion und Komponenten-State
  const [state, formAction, isPending] = useActionState(action, {});

  // Sobald action einen erfolgreichen Login zurückliefert:
  // → AuthContext setzen
  // → auf Home redirecten
  useEffect(() => {
    if (state?.auth?.token && state?.auth?.user) {
      login({
        token: state.auth.token,
        user: state.auth.user,
      });
      navigate("/");
    }
  }, [state, login, navigate]);

  return (
    <main className="min-h-screen bg-gray-900 p-8 font-sans">
      <div className="max-w-xl mx-auto bg-gray-950 p-6 rounded-lg shadow space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-200">
          Sign In
        </h2>

        {/* Globale Fehlermeldung (z.B. falsches Passwort, 401) */}
        {state.errors?.form && (
          <p className="text-sm text-red-500 text-center">
            {state.errors.form}
          </p>
        )}

        {/* Vom Hook vermittelte formAction */}
        <form action={formAction} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              defaultValue={state.input?.email}
              type="email"
              name="email"
              id="email"
              disabled={isPending}
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              placeholder="Enter email"
            />
            {state.errors?.email && (
              <p className="text-sm text-red-600 mt-1">{state.errors.email}</p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              defaultValue={state.input?.password}
              type="password"
              name="password"
              id="password"
              disabled={isPending}
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              placeholder="Enter password"
            />
            {state.errors?.password && (
              <p className="text-sm text-red-600 mt-1">
                {state.errors.password}
              </p>
            )}
          </div>

          <SubmitBtn />
        </form>
      </div>
    </main>
  );
};
