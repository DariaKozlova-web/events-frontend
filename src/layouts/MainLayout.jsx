import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";
import { useState } from "react";

export default function MainLayout() {
  const [user, setUser] = useState(null);

  return (
    <div className="body">
      <Navbar />
      {/* Outlet rendert die Child-Routes an dieser Stelle */}
      {/* context prop übergibt Daten an alle Child-Components */}
      <Outlet context={{ user, setUser }} />
      <footer>&copy; footerbla</footer>
    </div>
  );
}
