"use client"

import { useState, useEffect, useRef } from "react";
import MedicalTestForm from "../components/MedForms";
import CameraCard from "../components/CameraCard";
import HasilKartu from "../components/TestResultCard";
import { useRouter } from "next/navigation";
import { getCurrentUser, onAuthStateChange, logout } from '@/lib/auth';


export default function MedicalTest() {
  const [form, setForm] = useState({
    sex: '', 
    age: '', 
    time_since_meal_min: '',
    family_history: '',
    height_cm: '',
    weight_kg: '',
    exercise_min: '',
    smoking_vaping: '',
    alcohol: '',
    sleep_hours: '',
  });

  const [signal, setSignal] = useState({
    mics5524: [0.3892],
    mq135: [1.0726],
    mq138: [0.49158],
    pressure: [997.96185],
    temperature: [34.4],
    tgs2602: [0.84938],
    tgs822: [0.49883]
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [decodeText, setDecodeText] = useState('');
  const [apiResult, setApiResult] = useState(null); // ← untuk menampilkan hasil
  
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoggingOutRef = useRef(false);

  const handleSendData = async () => {
    const payload = { ...form, ...signal };
    try {
      const response = await fetch('http://localhost:5000/api/medical-test/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log('Data submitted successfully:', result);
      setApiResult(result); // simpan hasil untuk ditampilkan
    } catch (error) {
      console.error('Error submitting data:', error);
      setApiResult({ error: 'Gagal submit data' });
    }
  };

  // 🔹 Kirim data otomatis saat success = true
  useEffect(() => {
    const unsubscribe = onAuthStateChange((currentUser) => {
      if (!currentUser) {
        // If we initiated a logout, redirect to home instead of login
        if (isLoggingOutRef.current) {
          isLoggingOutRef.current = false;
          setUser(null);
          setLoading(false);
          return;
        }

        router.push('/login');
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });

    
    if (submitting) {
      setIsCameraOpen(true); // Buka kamera saat submitting
    }
    if (success) {
      setIsCameraOpen(false); // Set submitting to true to show CameraCard
      handleSendData();
    }
    return () => unsubscribe();

  }, [success, submitting, router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-8 px-4 sm:py-12 bg-gradient-to-b from-red-100 to-white">
      { !submitting && (
        <MedicalTestForm 
          form={form} 
          setForm={setForm} 
          errors={errors} 
          setErrors={setErrors} 
          submitting={submitting} 
          setSubmitting={setSubmitting} 
        />
      )}

      { isCameraOpen && (
        <CameraCard 
          success={success} 
          setSuccess={setSuccess} 
          decodeText={decodeText} 
          setDecodeText={setDecodeText} 
        />
      )}

      { apiResult && (
        // <div className="mt-8 p-4 bg-white rounded shadow-md w-full max-w-md text-center">
        //   <h2 className="text-xl font-bold mb-2">Hasil API</h2>
        //   <pre className="text-sm">{JSON.stringify(apiResult, null, 2)}</pre>
        // </div>
        <HasilKartu hasil={apiResult.hasil} />
      )}
    </div>
  );
}
