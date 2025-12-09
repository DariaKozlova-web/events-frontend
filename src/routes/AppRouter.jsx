import { Routes, Route } from "react-router";
import { Home } from "../pages/Home";
import { EventDetails } from "../pages/EventDetails";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import CreateEvent from "../pages/CreateEvent";
import { PrivateRoute } from "../components/PrivateRoute";
import { NotFound } from "../pages/NotFound";

export const AppRouter = () => {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Home />} />

      {/* Event Details */}
      <Route path="/events/:id" element={<EventDetails />} />

      {/* Autorization */}
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      {/* Event Creation - Protected */}
      <Route
        path="/events/create"
        element={
          // <PrivateRoute>
          <CreateEvent />
          // </PrivateRoute>
        }
      />

      {/* Default Page if URL is invalid */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
