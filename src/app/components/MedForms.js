"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MedicalForm({ form, setForm, errors, setErrors, submitting, setSubmitting }) {
  // Provide default values if props are undefined
  const safeForm = form || {};
  const safeSetForm = setForm || (() => {});
  const safeErrors = errors || {};
  const safeSetErrors = setErrors || (() => {});
  const safeSubmitting = submitting || false;
  const safeSetSubmitting = setSubmitting || (() => {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    safeSetForm((s) => ({ ...s, [name]: value }));
    safeSetErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const err = {};
    if (!safeForm.age_years || Number.isNaN(Number(safeForm.age_years))) err.age_years = 'Masukkan usia dalam tahun (angka)';
    if (!safeForm.gender) err.gender = 'Pilih jenis kelamin';
    if (!safeForm.time_since_meal_min || Number.isNaN(Number(safeForm.time_since_meal_min))) err.time_since_meal_min = 'Masukkan menit sejak makan terakhir (angka)';
    if (!safeForm.height_cm || Number.isNaN(Number(safeForm.height_cm))) err.height_cm = 'Masukkan tinggi badan dalam cm';
    if (!safeForm.weight_kg || Number.isNaN(Number(safeForm.weight_kg))) err.weight_kg = 'Masukkan berat badan dalam kg';
    if (safeForm.exercise_min && Number.isNaN(Number(safeForm.exercise_min))) err.exercise_min = 'Masukkan menit aktivitas (angka)';
    if (safeForm.sleep_hours && Number.isNaN(Number(safeForm.sleep_hours))) err.sleep_hours = 'Masukkan jam tidur per hari (angka)';
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      safeSetErrors(v);
      return;
    }
    safeSetSubmitting(true);
  };

  return (
    <div className="w-full max-w-xl sm:max-w-2xl px-2 mt-24">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="hidden sm:block sm:w-2/12 bg-red-200" />
          <div className="w-full sm:w-10/12 p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 text-center sm:text-left">Form Medis</h1>
            <p className="text-sm text-gray-500 mb-4 text-center sm:text-left">
              Isi data demografi berikut. Isian ini membantu analisis dan pemrosesan hasil.
            </p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Usia */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Usia (tahun)</label>
                <input
                  name="age_years"
                  value={safeForm.age_years || ''}
                  onChange={handleChange}
                  inputMode="numeric"
                  placeholder="Contoh: 25"
                  className={`w-full rounded-lg bg-gray-100 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-red-300 ${
                    safeErrors.age_years ? 'border-2 border-red-300' : 'border border-transparent'
                  }`}
                />
                {safeErrors.age_years && <p className="text-xs text-red-600 mt-1">{safeErrors.age_years}</p>}
              </div>

              {/* Jenis Kelamin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin</label>
                <select
                  name="gender"
                  value={safeForm.gender || ''}
                  onChange={handleChange}
                  className={`w-full rounded-lg bg-gray-100 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-red-300 border ${
                    safeErrors.gender ? 'border-red-300' : 'border-transparent'
                  }`}
                >
                  <option value="">Pilih</option>
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
                {safeErrors.gender && <p className="text-xs text-red-600 mt-1">{safeErrors.gender}</p>}
              </div>

              {/* Menit sejak makan terakhir */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Menit sejak makan terakhir</label>
                <input
                  name="time_since_meal_min"
                  value={safeForm.time_since_meal_min || ''}
                  onChange={handleChange}
                  inputMode="numeric"
                  placeholder="Contoh: 120"
                  className={`w-full rounded-lg bg-gray-100 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-red-300 ${
                    safeErrors.time_since_meal_min ? 'border-2 border-red-300' : 'border border-transparent'
                  }`}
                />
                {safeErrors.time_since_meal_min && (
                  <p className="text-xs text-red-600 mt-1">{safeErrors.time_since_meal_min}</p>
                )}
              </div>

              {/* Riwayat Diabetes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Riwayat Diabetes Keluarga</label>
                <select
                  name="family_history"
                  value={safeForm.family_history || ''}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-gray-100 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-red-300 border border-transparent"
                >
                  <option value="">Pilih</option>
                  <option value="yes">Ya</option>
                  <option value="no">Tidak ada</option>
                </select>
              </div>

              {/* Tinggi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tinggi (cm)</label>
                <input
                  name="height_cm"
                  value={safeForm.height_cm || ''}
                  onChange={handleChange}
                  inputMode="numeric"
                  placeholder="Contoh: 170"
                  className={`w-full rounded-lg bg-gray-100 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-red-300 ${
                    safeErrors.height_cm ? 'border-2 border-red-300' : 'border border-transparent'
                  }`}
                />
                {safeErrors.height_cm && <p className="text-xs text-red-600 mt-1">{safeErrors.height_cm}</p>}
              </div>

              {/* Berat */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Berat (kg)</label>
                <input
                  name="weight_kg"
                  value={safeForm.weight_kg || ''}
                  onChange={handleChange}
                  inputMode="numeric"
                  placeholder="Contoh: 68"
                  className={`w-full rounded-lg bg-gray-100 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-red-300 ${
                    safeErrors.weight_kg ? 'border-2 border-red-300' : 'border border-transparent'
                  }`}
                />
                {safeErrors.weight_kg && <p className="text-xs text-red-600 mt-1">{safeErrors.weight_kg}</p>}
              </div>

              {/* Aktivitas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Menit aktivitas per hari</label>
                <input
                  name="exercise_min"
                  value={safeForm.exercise_min || ''}
                  onChange={handleChange}
                  inputMode="numeric"
                  placeholder="Contoh: 30"
                  className={`w-full rounded-lg bg-gray-100 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-red-300 ${
                    safeErrors.exercise_min ? 'border-2 border-red-300' : 'border border-transparent'
                  }`}
                />
              </div>

              {/* Merokok */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Merokok / Vape</label>
                <select
                  name="smoking_vaping"
                  value={safeForm.smoking_vaping || ''}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-gray-100 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-red-300 border border-transparent"
                >
                  <option value="">Pilih</option>
                  <option value="yes">Ya</option>
                  <option value="no">Tidak</option>
                </select>
              </div>

              {/* Alkohol */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Konsumsi alkohol</label>
                <select
                  name="alcohol"
                  value={safeForm.alcohol || ''}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-gray-100 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-red-300 border border-transparent"
                >
                  <option value="">Pilih</option>
                  <option value="no">Tidak</option>
                  <option value="yes">Ya</option>
                </select>
              </div>

              {/* Tidur */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jam tidur per hari</label>
                <input
                  name="sleep_hours"
                  value={safeForm.sleep_hours || ''}
                  onChange={handleChange}
                  inputMode="numeric"
                  placeholder="Contoh: 7"
                  className={`w-full rounded-lg bg-gray-100 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-red-300 ${
                    safeErrors.sleep_hours ? 'border-2 border-red-300' : 'border border-transparent'
                  }`}
                />
                {safeErrors.sleep_hours && <p className="text-xs text-red-600 mt-1">{safeErrors.sleep_hours}</p>}
              </div>

              {/* Tombol Submit */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={safeSubmitting}
                  className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:opacity-95 disabled:opacity-60"
                >
                  {safeSubmitting ? 'Mengirim...' : 'Lanjutkan'}
                </button>
              </div>

              <p className="text-xs text-gray-400 sm:col-span-2">
                Pastikan data yang Anda masukkan benar. Data demografi membantu proses pemeriksaan dan analisis.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
