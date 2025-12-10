import { BrowserRouter } from "react-router";
import { AppRouter } from "./routes/AppRouter";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./auth/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          {/* Navigation */}
          <Navbar />

          {/* Content */}
          <main className="flex-1">
            <AppRouter />
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
