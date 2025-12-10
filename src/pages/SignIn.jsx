/** biome-ignore-all lint/correctness/useUniqueElementIds: <not now> */
import { useActionState } from "react";
import { loginUser } from "../auth/authApi.js";
import SubmitBtn from "../components/SubmitBtn.jsx";
import { useAuth } from "../auth/AuthContext.jsx";

// Validierung
function validate(values) {
  const errors = {};
  const { email, password } = values;

  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Please enter a valid email.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
}

async function signInAction(_prevState, formData, login) {
  const data = Object.fromEntries(formData); // FormData -> Objekt
  const validationErrors = validate(data);

  if (Object.keys(validationErrors).length > 0) {
    return {
      errors: validationErrors,
      input: data,
    };
  }

  try {
    // Login
    const result = await loginUser({
      email: data.email,
      password: data.password,
    });

    console.debug("Login successful. Backend response:", result);

    const token = result.token;

    // Backend user-Objekt bevorzugt nutzen
    const userFromBackend = result.user;
    let user = null;

    if (userFromBackend && userFromBackend.id && userFromBackend.email) {
      user = {
        id: userFromBackend.id,
        email: userFromBackend.email,
        name: userFromBackend.name,
      };
    } else if (result.id && result.email) {
      // Fallback:  { id, email, token }
      user = {
        id: result.id,
        email: result.email,
        name: result.name,
      };
    }

    // localStorage
    if (token) {
      localStorage.setItem("authToken", token);
    }
    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
    }

    // AuthContext updaten → Navbar bekommt isAuthenticated/user
    if (token && user) {
      login({ token, user });
    }

    alert("Login erfolgreich!");

    return {
      errors: {},
      input: {},
      success: true,
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

  // useActionState bekommt eine Action, die login "eingespritzt" bekommt
  const [state, formAction, isPending] = useActionState(
    (prevState, formData) => signInAction(prevState, formData, login),
    {}
  );

  return (
    <main className="min-h-screen bg-gray-900 p-8 font-sans">
      <div className="max-w-xl mx-auto bg-gray-950 p-6 rounded-lg shadow space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-200">
          Sign In
        </h2>

        {state.errors?.form && (
          <p className="text-sm text-red-500 text-center">
            {state.errors.form}
          </p>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-300"
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
              className="w-full mt-1 border border-gray-700 bg-gray-900 text-gray-100 rounded px-3 py-2"
              placeholder="Enter email"
            />
            {state.errors?.email && (
              <p className="text-sm text-red-500 mt-1">{state.errors.email}</p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-300"
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
              className="w-full mt-1 border border-gray-700 bg-gray-900 text-gray-100 rounded px-3 py-2"
              placeholder="Enter password"
            />
            {state.errors?.password && (
              <p className="text-sm text-red-500 mt-1">
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
