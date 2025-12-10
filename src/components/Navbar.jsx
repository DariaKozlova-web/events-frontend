import { NavLink } from "react-router";
import logo from "../assets/logo.svg";
import { useAuth } from "../auth/AuthContext";
// import { useEffect } from "react";

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     login({
  //       token:
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJkZXh0ZXJAbW9yZ2FuLmNvbSIsImlhdCI6MTc2NTIzMzg0NCwiZXhwIjoxNzY4ODMzODQ0fQ.CvlXz0vrUAPpSOEAcm7sisYganL7579sIc05ZbgfgQY",
  //       user: { name: "Fake User", email: "fake@example.com" },
  //     });
  //   }
  // }, [isAuthenticated]);

  return (
    <div className="navbar bg-base-100 shadow-sm px-6 pt-2">
      <div className="navbar-start">
        <NavLink to={"/"} className="btn btn-ghost text-xl">
          <img src={logo} alt="logo" className="w-10" />
          <figcaption>Evendule</figcaption>
        </NavLink>
      </div>

      <div className="navbar-end gap-2">
        {!isAuthenticated ? (
          <>
            <NavLink to={"/sign-up"} className="btn">
              Sign Up
            </NavLink>
            <NavLink to={"/sign-in"} className="btn">
              Sign In
            </NavLink>
          </>
        ) : (
          <>
            <span className="mr-2 hidden sm:inline">
              {user?.name || user?.email || "Logged in"}
            </span>
            <NavLink to={"/events/create"} className="btn btn-info">
              Create Event
            </NavLink>
            <button onClick={logout} className="btn btn-ghost">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};
