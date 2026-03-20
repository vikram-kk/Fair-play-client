import { useState } from "react";
import API from "../services/api";

export default function Draw() {
  const [result, setResult] = useState(null);

  const runDraw = async () => {
    const res = await API.get("/draw/run");
    setResult(res.data);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Monthly Draw 🎯</h1>

      <button onClick={runDraw} className="bg-blue-600 px-6 py-2 rounded mb-6">
        Run Draw
      </button>

      {result && (
        <div className="bg-slate-800 p-4 rounded-xl">
          <h2 className="text-xl mb-3">Draw Numbers</h2>
          <div className="flex gap-2 mb-4">
            {result.drawNumbers.map((num, i) => (
              <span key={i} className="bg-blue-500 px-3 py-1 rounded">
                {num}
              </span>
            ))}
          </div>

          <h2 className="text-xl mb-2">Winners</h2>
          {result.winners.map((w, i) => (
            <div key={i} className="bg-slate-700 p-2 rounded mb-2">
              {w.matchType} — Matches: {w.matches}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
