import Auth from "./pages/Auth";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Charity from "./pages/Charity";
import Draw from "./pages/Draw";
import { useEffect, useState } from "react";

export default function App() {
  const [isUser, setIsUser] = useState(true);
  let token;
  useEffect(() => {
    token = localStorage.getItem("token");
    if (token) {
      setIsUser(false);
    }
  }, []);

  if (isUser == false) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className=" bg-slate-900 md:px-20 w-full h-[100%]">
      <div
        className={`${isUser ? "flex" : "hidden"} justify-around mb-2 items-center pt-4 `}
      >
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
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/charity" element={<Charity />} />
        <Route path="/draw" element={<Draw />} />
      </Routes>
    </div>
  );
}
