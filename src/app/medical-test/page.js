"use client";

import { useState } from "react";
import MedicalTestForm from "../components/MedForms";
import CameraCard from "../components/CameraCard";

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

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    
    return (
        <div className="min-h-screen flex justify-center items-center py-8 px-4 sm:py-12 bg-gradient-to-b from-red-100 to-white">
            {   !submitting && ( <MedicalTestForm form={form} setForm={setForm} errors={errors} setErrors={setErrors} submitting={submitting} setSubmitting={setSubmitting} />)}
            {
                submitting && (
                    <CameraCard />
                )
            }
        </div>
    );
}