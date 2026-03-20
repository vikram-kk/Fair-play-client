import { useEffect, useState } from "react";
import API from "../services/api";

export default function Charity() {
  const [charities, setCharities] = useState([]);

  useEffect(() => {
    API.get("/charity").then((res) => setCharities(res.data));
  }, []);

  const selectCharity = async (id) => {
    await API.post("/charity/select", {
      charityId: id,
      percentage: 10,
    });
    alert("Charity selected");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Choose a Charity ❤️</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {charities.map((c) => (
          <div
            key={c._id}
            className="bg-slate-800 p-4 rounded-xl shadow hover:scale-105 transition"
          >
            <img
              src={c.image}
              alt={c.name}
              className="rounded-lg mb-3 h-40 w-full object-cover"
            />

            <h2 className="text-xl font-semibold">{c.name}</h2>
            <p className="text-sm text-gray-400 mb-3">{c.description}</p>

            <button
              onClick={() => selectCharity(c._id)}
              className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded w-full"
            >
              Support This ❤️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
