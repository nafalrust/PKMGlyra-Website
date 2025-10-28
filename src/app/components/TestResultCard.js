"use client";

import { useRouter } from "next/navigation";
import { HeartPulse, CheckCircle, ArrowLeft } from "lucide-react";

export default function HasilKartu({ hasil }) {
  const router = useRouter();
  const isDiabetes = hasil.toLowerCase() === "diabetes";

  const cardGradient = isDiabetes
    ? "from-red-500 to-rose-600"
    : "from-green-500 to-emerald-600";

  const Icon = isDiabetes ? HeartPulse : CheckCircle;

  const message = isDiabetes
    ? "Hasil menunjukkan indikasi diabetes. Disarankan untuk berkonsultasi dengan dokter untuk pemeriksaan lebih lanjut."
    : "Tidak terdeteksi indikasi diabetes. Pertahankan gaya hidup sehat dan pola makan seimbang.";

  return (
    <div
      className={`bg-gradient-to-br ${cardGradient} p-8 rounded-2xl shadow-2xl text-white max-w-md mx-auto mt-10 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl`}
    >
      {/* Header dengan ikon dan judul */}
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-10 h-10 drop-shadow-md" />
        <h2 className="text-3xl font-bold tracking-tight">Hasil Diagnosa</h2>
      </div>

      {/* Hasil dan pesan */}
      <div className="space-y-3 mb-8">
        <p className="text-2xl font-semibold capitalize">{hasil}</p>
        <p className="text-sm opacity-90 leading-relaxed">{message}</p>
      </div>

      {/* Tombol kembali */}
      <div className="flex justify-end">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 bg-white text-black font-medium py-2.5 px-5 rounded-lg shadow-md hover:bg-gray-100 active:scale-[0.98] transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
}
