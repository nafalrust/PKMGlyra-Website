"use client";

import { useRouter } from "next/navigation";
import { HeartPulse, CheckCircle, ArrowLeft, Activity, TrendingUp, AlertCircle } from "lucide-react";

export default function HasilKartu({ prediction }) {
  const router = useRouter();
  
  // Extract prediction data
  const { 
    diabetes_diagnosis, 
    diabetes_probability, 
    blood_sugar_mgdl,
    risk_category,
    risk_level 
  } = prediction;
  
  const isDiabetes = diabetes_diagnosis === "YES";
  const probabilityPercent = (diabetes_probability * 100).toFixed(1);

  // Determine colors based on diagnosis
  const cardGradient = isDiabetes
    ? "from-red-500 to-rose-600"
    : "from-green-500 to-emerald-600";

  const Icon = isDiabetes ? HeartPulse : CheckCircle;

  // Determine blood sugar status and color
  const getBloodSugarStatus = (level) => {
    if (level < 70) return { text: "Rendah", color: "text-blue-200", icon: "↓" };
    if (level < 100) return { text: "Normal", color: "text-green-200", icon: "✓" };
    if (level < 126) return { text: "Pre-Diabetes", color: "text-yellow-200", icon: "⚠" };
    return { text: "Tinggi (Diabetes)", color: "text-red-200", icon: "⚠" };
  };

  const bloodSugarStatus = getBloodSugarStatus(blood_sugar_mgdl);

  const message = isDiabetes
    ? "Hasil menunjukkan indikasi diabetes. Disarankan untuk segera berkonsultasi dengan dokter untuk pemeriksaan dan penanganan lebih lanjut."
    : "Tidak terdeteksi indikasi diabetes. Pertahankan gaya hidup sehat, pola makan seimbang, dan olahraga teratur.";

  return (
    <div
      className={`bg-gradient-to-br ${cardGradient} p-8 rounded-2xl shadow-2xl text-white max-w-lg mx-auto mt-10 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl`}
    >
      {/* Header dengan ikon dan judul */}
      <div className="flex items-center gap-3 mb-6">
        <Icon className="w-12 h-12 drop-shadow-md animate-pulse" />
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Hasil Diagnosa</h2>
          <p className="text-sm opacity-80 mt-1">Diabetes Detection Result</p>
        </div>
      </div>

      {/* Status Diabetes - BIG */}
      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 mb-6 border-2 border-white border-opacity-30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">Status Diabetes</p>
            <p className="text-4xl font-bold">
              {isDiabetes ? "TERDETEKSI" : "TIDAK TERDETEKSI"}
            </p>
          </div>
          <Icon className="w-16 h-16 opacity-50" />
        </div>
      </div>

      {/* Probability */}
      <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 mb-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6" />
          <div className="flex-1">
            <p className="text-sm opacity-90">Probabilitas Diabetes</p>
            <p className="text-2xl font-bold">{probabilityPercent}%</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-white h-full rounded-full transition-all duration-500"
            style={{ width: `${probabilityPercent}%` }}
          />
        </div>
      </div>

      {/* Blood Sugar Level */}
      <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6" />
          <div className="flex-1">
            <p className="text-sm opacity-90">Kadar Gula Darah</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-3xl font-bold">{blood_sugar_mgdl}</p>
              <p className="text-lg opacity-90">mg/dL</p>
            </div>
          </div>
        </div>
        {/* Status badge */}
        <div className="mt-3 flex items-center gap-2">
          <span className={`text-2xl ${bloodSugarStatus.color}`}>
            {bloodSugarStatus.icon}
          </span>
          <span className={`text-lg font-semibold ${bloodSugarStatus.color}`}>
            {bloodSugarStatus.text}
          </span>
        </div>
      </div>

      {/* Risk Category Badge */}
      <div className="mb-6">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
          risk_level === 'high' ? 'bg-red-900 bg-opacity-50' :
          risk_level === 'medium' ? 'bg-yellow-900 bg-opacity-50' :
          'bg-green-900 bg-opacity-50'
        }`}>
          <AlertCircle className="w-4 h-4" />
          {risk_category}
        </div>
      </div>

      {/* Pesan dan Rekomendasi */}
      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 mb-6">
        <p className="text-sm leading-relaxed">{message}</p>
      </div>

      {/* Tombol kembali */}
      <div className="flex justify-end">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 bg-white text-gray-800 font-medium py-3 px-6 rounded-xl shadow-md hover:bg-gray-100 active:scale-[0.98] transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
}
