"use client";

import { useState } from "react";

export default function Home() {
  const [features, setFeatures] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          features: features.split(",").map((x) => parseFloat(x.trim())),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Gagal memproses");
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          🔮 Prediksi Model Machine Learning
        </h1>

        <label className="block text-gray-700 font-medium mb-2">
          Masukkan Fitur (pisahkan dengan koma)
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Contoh: 5.1, 3.5, 1.4, 0.2"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
        />

        <button
          onClick={handlePredict}
          disabled={loading || !features.trim()}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
            loading || !features.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "🔄 Memproses..." : "🚀 Prediksi Sekarang"}
        </button>

        {error && (
          <div className="mt-4 bg-red-100 text-red-700 p-3 rounded-lg text-sm">
            ⚠️ {error}
          </div>
        )}

        {result && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              ✅ Hasil Prediksi:
            </h2>
            <pre className="text-sm bg-white p-3 rounded-md border border-gray-200 overflow-x-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
