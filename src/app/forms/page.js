"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MedicalFormPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    height: '',
    weight: '',
    age: '',
    familyHistory: '',
    eatingActivity: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const err = {};
    if (!form.height || Number.isNaN(Number(form.height))) err.height = 'Masukkan tinggi dalam cm';
    if (!form.weight || Number.isNaN(Number(form.weight))) err.weight = 'Masukkan berat dalam kg';
    if (!form.age || Number.isNaN(Number(form.age))) err.age = 'Masukkan usia';
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setSubmitting(true);

    // TODO: replace with API call
    console.log('Form submitted', form);

    setTimeout(() => {
      setSubmitting(false);
      router.push('/');
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-start justify-center py-8 px-4 sm:py-12 bg-gradient-to-b from-white to-red-50">
      <div className="w-full max-w-xl sm:max-w-2xl px-2">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <div className="hidden sm:block sm:w-2/12 bg-red-200" />
            <div className="w-full sm:w-10/12 p-6 sm:p-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 text-center sm:text-left">Form Medis</h1>
              <p className="text-sm text-gray-500 mb-4 text-center sm:text-left">Isi data berikut sebelum melanjutkan pemeriksaan.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tinggi Badan (cm)</label>
                  <input
                    name="height"
                    value={form.height}
                    onChange={handleChange}
                    inputMode="numeric"
                    className={`w-full rounded-lg bg-gray-100 px-3 py-3 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-red-300 ${
                      errors.height ? 'border-2 border-red-300' : 'border border-transparent'
                    }`}
                    placeholder="Contoh: 170"
                  />
                  {errors.height && <p className="text-xs text-red-600 mt-1">{errors.height}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Berat Badan (kg)</label>
                  <input
                    name="weight"
                    value={form.weight}
                    onChange={handleChange}
                    inputMode="numeric"
                    className={`w-full rounded-lg bg-gray-100 px-3 py-3 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-red-300 ${
                      errors.weight ? 'border-2 border-red-300' : 'border border-transparent'
                    }`}
                    placeholder="Contoh: 68"
                  />
                  {errors.weight && <p className="text-xs text-red-600 mt-1">{errors.weight}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Usia</label>
                  <input
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    inputMode="numeric"
                    className={`w-full rounded-lg bg-gray-100 px-3 py-3 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-red-300 ${
                      errors.age ? 'border-2 border-red-300' : 'border border-transparent'
                    }`}
                    placeholder="Contoh: 34"
                  />
                  {errors.age && <p className="text-xs text-red-600 mt-1">{errors.age}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Riwayat Diabetes Keluarga</label>
                  <select
                    name="familyHistory"
                    value={form.familyHistory}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-gray-100 px-3 py-3 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-red-300 border border-transparent"
                  >
                    <option value="">Pilih jawaban</option>
                    <option value="none">Tidak ada</option>
                    <option value="parent">Orang tua</option>
                    <option value="sibling">Saudara kandung</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Aktivitas Makan / Pola Makan</label>
                  <textarea
                    name="eatingActivity"
                    value={form.eatingActivity}
                    onChange={handleChange}
                    rows={3}
                    className="w-full rounded-lg bg-gray-100 px-3 py-3 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-red-300 border border-transparent"
                    placeholder="Jelaskan singkat pola makan Anda (mis. sering makan manis, puasa, dsb.)"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:opacity-95 disabled:opacity-60"
                  >
                    {submitting ? 'Mengirim...' : 'Lanjut'}
                  </button>
                </div>

                <p className="text-xs text-gray-400 text-center">Pastikan data yang Anda masukkan benar. Data ini akan membantu proses pemeriksaan.</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
