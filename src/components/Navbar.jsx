import { NavLink } from "react-router";
import logo from "../assets/logo.svg";
import { useAuth } from "../context/useAuth";

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const displayName = user?.email || user?.name || "Logged in";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="navbar bg-base-100 shadow-sm px-6 pt-2">
      <div className="navbar-start flex items-center gap-4">
        <NavLink to={"/"} className="btn btn-ghost text-xl gap-2">
          <img src={logo} alt="logo" className="w-10" />
          <span>Evendule</span>
        </NavLink>

        {/* Show User Name || EMail */}
        {isAuthenticated && (
          <div className="hidden sm:flex items-center gap-2 pl-3 ml-1 border-l border-base-300/60">
            <div className="avatar placeholder">
              <div className="w-9 h-9 rounded-full bg-info text-info-content flex items-center justify-center text-sm font-semibold">
                {initial}
              </div>
            </div>

            <div className="flex flex-col leading-tight text-left">
              <span className="text-[10px] uppercase tracking-wide text-base-content/60">
                Signed in as
              </span>
              <span className="text-sm font-medium truncate max-w-[160px]">
                {displayName}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="navbar-end gap-3">
        {!isAuthenticated ? (
          <>
            <NavLink to={"/sign-up"} className="btn">
              Sign Up
            </NavLink>
            <NavLink to={"/sign-in"} className="btn btn-ghost">
              Sign In
            </NavLink>
          </>
        ) : (
          <>
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
