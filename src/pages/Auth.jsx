import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await API.post("/auth/login", {
          email: form.email,
          password: form.password,
        });

        localStorage.setItem("token", res.data.token);
        alert("Login successful");
        window.location.href = "/dashboard";
      } else {
        await API.post("/auth/register", form);
        alert("Registered successfully");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error while getting to user");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl shadow-xl w-[350px]">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full mb-3 p-3 rounded-lg bg-slate-800 outline-none"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 p-3 rounded-lg bg-slate-800 outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-5 p-3 rounded-lg bg-slate-800 outline-none"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-semibold"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-center mt-4 text-sm text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-blue-400 cursor-pointer"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
