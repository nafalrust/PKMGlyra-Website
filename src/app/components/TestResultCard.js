"use client";

import { useRouter } from "next/navigation";
import { HeartPulse, CheckCircle, ArrowLeft, Activity, TrendingUp, AlertCircle } from "lucide-react";

export default function HasilKartu({ prediction }) {
  const router = useRouter();
  
  // Debug logging
  console.log("🔍 TestResultCard received:", prediction);
  
  // Safety check
  if (!prediction) {
    console.error("❌ No prediction data");
    return null;
  }
  
  // Extract prediction data
  const { 
    diabetes_diagnosis, 
    diabetes_probability, 
    blood_sugar_mgdl,
    risk_category,
    risk_level 
  } = prediction;
  
  console.log("📊 Data:", { diabetes_diagnosis, diabetes_probability, blood_sugar_mgdl });
  
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
    <div className={`bg-gradient-to-br ${cardGradient} p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl text-white w-full max-w-2xl mx-auto mt-6 mb-6`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white border-opacity-30">
        <Icon className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md flex-shrink-0" />
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Hasil Diagnosa</h2>
          <p className="text-xs sm:text-sm opacity-80 mt-1">Diabetes Detection Result</p>
        </div>
      </div>

      {/* Status Diabetes - BIG with white bg */}
      <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 shadow-lg">
        <p className="text-xs font-bold text-gray-500 mb-2 uppercase">Status Diabetes</p>
        <p className={`text-3xl sm:text-4xl md:text-5xl font-black ${isDiabetes ? 'text-red-600' : 'text-green-600'} leading-tight`}>
          {isDiabetes ? "TERDETEKSI" : "TIDAK TERDETEKSI"}
        </p>
      </div>

      {/* Probability */}
      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 mb-3 border border-white border-opacity-30">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold opacity-90 uppercase">Probabilitas</p>
            <p className="text-3xl sm:text-4xl font-black mt-1">{probabilityPercent}%</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-full h-2 sm:h-3 overflow-hidden">
          <div 
            className="bg-white h-full rounded-full transition-all duration-500"
            style={{ width: `${probabilityPercent}%` }}
          />
        </div>
      </div>

      {/* Blood Sugar */}
      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 mb-3 border border-white border-opacity-30">
        <div className="flex items-center gap-3 mb-2">
          <Activity className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold opacity-90 uppercase">Gula Darah</p>
            <div className="flex items-baseline gap-2 mt-1 flex-wrap">
              <p className="text-3xl sm:text-4xl font-black">{blood_sugar_mgdl}</p>
              <p className="text-lg sm:text-xl font-bold opacity-90">mg/dL</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-lg px-3 py-1.5 mt-2">
          <span className="text-xl sm:text-2xl">{bloodSugarStatus.icon}</span>
          <span className={`text-sm sm:text-base font-bold ${bloodSugarStatus.color}`}>
            {bloodSugarStatus.text}
          </span>
        </div>
      </div>

      {/* Risk Badge */}
      <div className="mb-4">
        <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs sm:text-sm font-bold ${
          risk_level === 'high' ? 'bg-red-900 bg-opacity-60' :
          risk_level === 'medium' ? 'bg-yellow-900 bg-opacity-60' :
          'bg-green-900 bg-opacity-60'
        }`}>
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{risk_category}</span>
        </div>
      </div>

      {/* Message */}
      <div className="bg-white bg-opacity-15 rounded-xl p-4 mb-4">
        <p className="text-xs sm:text-sm leading-relaxed">{message}</p>
      </div>

      {/* Button */}
      <button
        onClick={() => router.push("/dashboard")}
        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-800 font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-gray-100 active:scale-95 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Dashboard
      </button>
    </div>
  );
}
