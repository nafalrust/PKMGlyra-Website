"use client";

import { useState, useEffect, useRef } from "react";
import MedicalTestForm from "../components/MedForms";
import CameraCard from "../components/CameraCard";
import HasilKartu from "../components/TestResultCard";
import { useRouter } from "next/navigation";
import { getCurrentUser, onAuthStateChange, logout } from "@/lib/auth";
import { useFirebaseReadings } from "../components/GetData";

export default function MedicalTest() {
  const [form, setForm] = useState({
    age_years: "",
    gender: "",
    time_since_meal_min: "",
    family_history: "",
    height_cm: "",
    weight_kg: "",
    exercise_min: "",
    smoking_vaping: "",
    alcohol: "",
    sleep_hours: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [decodeText, setDecodeText] = useState("");
  const [apiResult, setApiResult] = useState(null);

  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoggingOutRef = useRef(false);

  const { data, loadData, errorMsg } = useFirebaseReadings(decodeText);

  // 🔹 Cegah multiple request
  const hasSentDataRef = useRef(false);

  const handleSendData = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    console.log("🚀 handleSendData() dipanggil");
    const payload = { ...form, ...data };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/medical-test/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      console.log("Data submitted successfully:", result);
      setApiResult(result);
    } catch (error) {
      console.error("Error submitting data:", error);
      setApiResult({ error: "Gagal submit data" });
    }
  };

  // 🧩 Efek: Autentikasi pengguna
  useEffect(() => {
    const unsubscribe = onAuthStateChange((currentUser) => {
      if (!currentUser) {
        if (isLoggingOutRef.current) {
          isLoggingOutRef.current = false;
          setUser(null);
          setLoading(false);
          return;
        }
        router.push("/login");
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // 🧩 Efek: Buka kamera saat mulai submit
  useEffect(() => {
    if (submitting) {
      setIsCameraOpen(true);
    }
  }, [submitting]);

  // 🧩 Efek: Setelah success → kirim data ke API (sekali saja)
  useEffect(() => {
    if (success && !hasSentDataRef.current) {
      hasSentDataRef.current = true; // cegah multiple call
      setIsCameraOpen(false);
      handleSendData();
    }
  }, [data]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-8 px-4 sm:py-12 bg-gradient-to-b from-red-100 to-white">
      {!submitting && (
        <MedicalTestForm
          form={form}
          setForm={setForm}
          errors={errors}
          setErrors={setErrors}
          submitting={submitting}
          setSubmitting={setSubmitting}
        />
      )}

      {isCameraOpen && (
        <CameraCard
          success={success}
          setSuccess={setSuccess}
          decodeText={decodeText}
          setDecodeText={setDecodeText}
        />
      )}

      {apiResult && apiResult.prediction && (
        <HasilKartu prediction={apiResult.prediction} />
      )}
    </div>
  );
}
