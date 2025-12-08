import { apiConfig } from "../api/apiConfig";
import { Link } from "react-router";

// 🔧 Funktion, die die Verbindung zum Backend testet
async function testBackendConnection() {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/events`);
    // ⬆️ ggf. auf /health oder deinen tatsächlichen Endpoint ändern

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Backend antwortet. Antwortdaten:", data);

    // Nur für den schnellen Check – später kannst du das schöner machen
    alert("Backend OK – schau in die Konsole für Details.");
  } catch (error) {
    console.error("❌ Backend-Request fehlgeschlagen:", error);
    alert("Backend-Request fehlgeschlagen – Details in der Konsole.");
  }
}

export const Navbar = () => {
  return (
    <div>
      Navigation
      <p className="p-4 flex gap-4">
        <button className="btn" onClick={testBackendConnection}>
          Show Event
        </button>

        <Link to="/events/create" className="btn">
          Create Event
        </Link>
      </p>
    </div>
  );
};
