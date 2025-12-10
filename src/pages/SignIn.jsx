/** biome-ignore-all lint/correctness/useUniqueElementIds: <not now> */
import { useActionState } from "react";
import { validate, signIn } from "../api/auth.js";
import SubmitBtn from "../components/SubmitBtn.jsx";

// action Funktion anstelle des Submit Handlers
// Hat in Verbindung mit useActionState-Hook Zugriff auf
// vorherigen State und die Formulardaten
async function action(_prevState, formData) {
  console.log(_prevState);
  const data = Object.fromEntries(formData); // FormData in Objekt einlesen
  const validationErrors = validate(data);

  if (Object.keys(validationErrors).length === 0) {
    // hier würde Netzwerkrequest stattfinden
    console.log("Submitted:", data);
    signIn(data);
    alert("Form submitted successfully!");

    // Rückgabe kommt in state
    return {};
  }
  // Bei Fehlern können wir den state nutzen, um
  // die ursprüngliche Nutzereingabe zu erhalten
  // und Fehlermeldungen anzuzeigen.
  return {
    errors: validationErrors,
    input: data,
  };
}

export const SignIn = () => {
  // Hook verbinded Action-Funktion und Komponenten-State
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <main className="min-h-screen bg-gray-900 p-8 font-sans">
      <div className="max-w-xl mx-auto bg-gray-950 p-6 rounded-lg shadow space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-200">
          Sign In
        </h2>
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
