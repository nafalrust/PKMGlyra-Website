'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default function ManualEntryCard() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleInputChange = (index, value) => {
    // Allow alphanumeric (letters and numbers)
    if (value && !/^[a-zA-Z0-9]$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.toUpperCase(); // Convert to uppercase for consistency
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().toUpperCase();
    
    // Accept 6 alphanumeric characters
    if (/^[A-Z0-9]{6}$/i.test(pastedData)) {
      const newCode = pastedData.split('');
      setCode(newCode);
      
      // Focus last input
      const lastInput = document.getElementById('code-5');
      if (lastInput) lastInput.focus();
    }
  };

  const handleSubmit = async () => {
    const fullCode = code.join('');
    
    if (fullCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      setSuccess('Saving code...');

      const user = getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/auth/save-qr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          qrData: fullCode,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Code Saved Successfully!');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        throw new Error(data.message || 'Failed to save code');
      }
    } catch (err) {
      setError(err.message || 'Failed to save code');
      setProcessing(false);
    }
  };

  const handleCancel = () => {
    router.push('/scan-qr');
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-3 text-center">Enter Code</h1>
      
      <p className="text-gray-600 text-sm mb-4 text-center">
        Enter the 6-digit code from your examination
      </p>

      {error && (
        <div className="mb-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-3 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm font-semibold flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {success}
        </div>
      )}

      {/* 6-character code input */}
      <div className="mb-4 flex justify-center gap-2">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            inputMode="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            disabled={processing}
            className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none disabled:bg-gray-100 uppercase"
          />
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleSubmit}
          disabled={processing || code.join('').length !== 6}
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg text-base font-semibold transition-colors"
        >
          {processing ? 'Saving...' : 'Submit Code'}
        </button>
        
        <button
          onClick={handleCancel}
          disabled={processing}
          className="w-full py-3 border-2 border-gray-300 hover:bg-gray-100 disabled:opacity-50 text-gray-700 rounded-lg text-base font-semibold transition-colors"
        >
          Back to Scan
        </button>
      </div>

      <div className="mt-4 text-center space-y-1">
        <p className="text-xs text-gray-500">
          Code format: 6 characters (letters or numbers)
        </p>
        <p className="text-xs text-gray-400">
          You can paste the code directly
        </p>
      </div>
    </div>
  );
}
