import { NavLink } from "react-router";
import logo from "../assets/logo.svg";

export const Navbar = () => {
  const user = "me";
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <NavLink to={"/"} className="btn btn-ghost text-xl">
          <img src={logo} alt="logo" className="w-10" />
          <figcaption>Evendule</figcaption>
        </NavLink>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <NavLink to={"/sign-up"} className={"btn"}>
              Sign Up
            </NavLink>
            <NavLink to={"/sign-in"} className={"btn"}>
              Sign In
            </NavLink>
          </>
        ) : (
          <NavLink to={"create-event"} className={"btn"}>
            Create Event
          </NavLink>
        )}
      </div>
    </div>
  );
};
