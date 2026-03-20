import Auth from "./pages/Auth";
import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Charity from "./pages/Charity";
import Draw from "./pages/Draw";

export default function App() {
  return (
    <div className=" bg-slate-900 md:px-20 ">
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
      <Routes>
        <Route path="/user/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/charity" element={<Charity />} />
        <Route path="/draw" element={<Draw />} />
      </Routes>
    </div>
  );
}
