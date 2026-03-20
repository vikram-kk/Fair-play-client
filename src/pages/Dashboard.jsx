import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [score, setScore] = useState("");

  const subscribe = async (plan) => {
    await API.post("/subscription/subscribe", { plan });
    fetchDashboard();
  };

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleAddScore = async () => {
    try {
      await API.post("/score/add", {
        value: Number(score),
        date: new Date(),
      });
      setScore("");
      fetchDashboard();
    } catch (err) {
      alert("Error adding score");
    }
  };

  if (!data)
    return (
      <div className="text-white p-10 h-full flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="bg-slate-800 p-4 rounded-xl mb-4">
        <h2 className="text-xl font-semibold">Subscription</h2>
        <p>Status: {data.subscription?.status || "inactive"}</p>
        <p>Plan: {data.subscription?.plan || "none"}</p>
      </div>

      <div className="bg-slate-800 p-4 rounded-xl mb-4">
        <h2 className="text-xl font-semibold mb-2">Your Scores</h2>

        <div className="flex gap-2 mb-3">
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder="Enter score"
            className="p-2 rounded bg-slate-700"
          />
          <button onClick={handleAddScore} className="bg-blue-600 px-4 rounded">
            Add
          </button>
        </div>

        <ul>
          {data.scores.map((s, i) => (
            <li className="bg-slate-700 p-2 rounded mb-2" key={i}>
              {s.value} — {new Date(s.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-800 p-4 rounded-xl mb-4">
        <h2 className="text-xl font-semibold">Charity</h2>
        <p>Name: {data.charity?.name || "Not selected"}</p>
        <p>Contribution: {data.charity?.percentage || 0}%</p>
      </div>
      <div className="bg-slate-800 p-4 rounded-xl mb-4">
        <h2 className="text-xl font-semibold mb-2">Pay & Subscribe</h2>

        <div className="flex gap-4">
          <button
            onClick={() => subscribe("monthly")}
            className="bg-green-600 px-4 py-2 rounded"
          >
            Monthly
          </button>

          <button
            onClick={() => subscribe("yearly")}
            className="bg-purple-600 px-4 py-2 rounded"
          >
            Yearly
          </button>
        </div>
      </div>
    </div>
  );
}
