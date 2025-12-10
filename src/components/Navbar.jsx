import { NavLink } from "react-router";
import logo from "../assets/logo.svg";

export const Navbar = ({ user }) => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-6 pt-2">
      <div className="navbar-start">
        <NavLink to={"/"} className="btn btn-ghost text-xl">
          <img src={logo} alt="logo" className="w-10" />
          <figcaption>Evendule</figcaption>
        </NavLink>
      </div>
      <div className="navbar-end">
        {user ? (
          <NavLink to={"/events/create"} className={"btn btn-info ml-16"}>
            Create Event
          </NavLink>
        ) : (
          <>
            <NavLink to={"/sign-up"} className={"btn"}>
              Sign Up
            </NavLink>
            <NavLink to={"/sign-in"} className={"btn"}>
              Sign In
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};
