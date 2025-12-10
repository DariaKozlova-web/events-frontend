import { BrowserRouter } from "react-router";
import { AppRouter } from "./routes/AppRouter";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        {/* Content */}
        <main className="flex-1">
          <AppRouter />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
