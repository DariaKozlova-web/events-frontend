import { useFormStatus } from "react-dom";

export default function SubmitBtn() {
  // Hook für clientseitigen Pending-State
  // Wenn React 19 forms ohne weitere Hooks verwendet wird
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full py-2 rounded text-white ${
        pending
          ? "bg-blue-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {pending ? "Signing in ..." : "Sign in"}
    </button>
  );
}
