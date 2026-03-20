import Auth from "./pages/Auth";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Charity from "./pages/Charity";
import Draw from "./pages/Draw";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="bg-slate-900 md:px-20 w-full h-[100%]">
      {/* Navbar */}
      {token && (
        <div className="flex justify-around mb-2 items-center pt-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-pink-500" : "text-white"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/charity"
            className={({ isActive }) =>
              isActive ? "text-pink-500" : "text-white"
            }
          >
            Charity
          </NavLink>

          <NavLink
            to="/draw"
            className={({ isActive }) =>
              isActive ? "text-pink-500" : "text-white"
            }
          >
            Draw
          </NavLink>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <Auth />}
        />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/charity"
          element={token ? <Charity /> : <Navigate to="/" />}
        />
        <Route path="/draw" element={token ? <Draw /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}
