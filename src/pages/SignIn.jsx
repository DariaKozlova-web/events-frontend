/** biome-ignore-all lint/correctness/useUniqueElementIds: <not now> */
import { useActionState } from "react";
import { signIn } from "../api/auth.js";
import SubmitBtn from "../components/SubmitBtn.jsx";
import { useNavigate, useOutletContext } from "react-router";

export const SignIn = () => {
  const { setUser } = useOutletContext();
  const navigate = useNavigate();
  async function action(_prevState, formData) {
    const data = Object.fromEntries(formData); // FormData in Objekt einlesen
    return signIn(data)
      .then((userData) => {
        setUser(userData);
        navigate("/");
        return {};
      })
      .catch((error) => {
        return {
          error,
          input: data,
        };
      });
  }
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
          </div>
          <SubmitBtn />
          {state.error && (
            <p className="text-sm text-red-600 mt-1">
              Email or Password not correct!
            </p>
          )}
        </form>
      </div>
    </main>
  );
};
