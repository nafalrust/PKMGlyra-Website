'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Html5Qrcode } from 'html5-qrcode';
import { getCurrentUser } from '@/lib/auth';

export default function CameraCard() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [scanned, setScanned] = useState(false);

  const html5QrCodeScannerRef = useRef(null);

  useEffect(() => {
    // Auto-start camera when component mounts
    startCamera();
    
    return () => {
      // Cleanup: stop camera when component unmounts
      stopCameraCleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopCameraCleanup = async () => {
    try {
      if (html5QrCodeScannerRef.current) {
        const scanner = html5QrCodeScannerRef.current;
        if (scanner.isScanning) {
          await scanner.stop();
        }
        scanner.clear();
        html5QrCodeScannerRef.current = null;
      }
      
      // Stop all media streams
      const streams = await navigator.mediaDevices.getUserMedia({ video: true });
      streams.getTracks().forEach(track => track.stop());
    } catch (err) {
      // Ignore cleanup errors
    }
  };

  const handleQRCodeSuccess = async (decodedText) => {
    if (processing) return;
    
    setProcessing(true);
    setScanned(true);
    
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
    
    try {
      setError('');
      setSuccess('QR Code Detected!');
      
      await stopCamera();
      
      await new Promise(resolve => setTimeout(resolve, 800));
      setSuccess('Saving to database...');
      
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
          qrData: decodedText,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('QR Code Saved Successfully!');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        throw new Error(data.message || 'Failed to save QR code');
      }
    } catch (err) {
      setError(err.message || 'Failed to save QR code');
      setScanned(false);
      setProcessing(false);
    }
  };

  const startCamera = async () => {
    try {
      setError('');
      setSuccess('');
      setProcessing(false);
      setScanned(false);
      
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported in this browser');
      }
      
      const testStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      
      testStream.getTracks().forEach(track => track.stop());
      
      html5QrCodeScannerRef.current = new Html5Qrcode("qr-reader");
      
      const devices = await Html5Qrcode.getCameras();
      
      if (devices && devices.length > 0) {
        let camera = devices.find(d => 
          d.label.toLowerCase().includes('back') || 
          d.label.toLowerCase().includes('rear')
        ) || devices[0];
        
        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        };
        
        await html5QrCodeScannerRef.current.start(
          camera.id,
          config,
          (decodedText) => {
            handleQRCodeSuccess(decodedText);
          },
          () => {
            // No QR in frame
          }
        );
        
        setScanning(true);
      } else {
        throw new Error('No cameras found');
      }
    } catch (err) {
      setError('Camera access failed: ' + (err.message || 'Unknown error'));
    }
  };

  const stopCamera = async () => {
    try {
      if (html5QrCodeScannerRef.current && html5QrCodeScannerRef.current.isScanning) {
        await html5QrCodeScannerRef.current.stop();
      }
      setScanning(false);
    } catch (err) {
      // Ignore stop errors
    }
  };

  const handleCancel = async () => {
    await stopCamera();
    await stopCameraCleanup();
    router.push('/dashboard');
  };

  const handleManualEntry = async () => {
    await stopCamera();
    await stopCameraCleanup();
    router.push('/manual-entry');
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-3 text-center">Scan QR Code</h1>
      
      <p className="text-gray-600 text-sm mb-4 text-center">
        Position QR code in the square frame
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

      {/* QR Reader - ALWAYS in DOM, camera auto-starts */}
      <div 
        id="qr-reader" 
        className="mb-3"
        style={{ 
          border: scanned ? '4px solid #10b981' : '4px solid #ef4444',
          borderRadius: '12px',
          overflow: 'visible',
          width: '100%',
          maxWidth: '100%',
          margin: '0 auto 12px auto',
          aspectRatio: '1 / 1'
        }}
      />

      {scanned && (
        <div className="mb-3 flex justify-center">
          <div className="bg-green-500 text-white rounded-full p-4 animate-bounce">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <button
          onClick={handleManualEntry}
          disabled={processing}
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg text-base font-semibold transition-colors"
        >
          Manual Enter Code
        </button>
        
        <button
          onClick={handleCancel}
          disabled={processing}
          className="w-full py-3 border-2 border-gray-300 hover:bg-gray-100 disabled:opacity-50 text-gray-700 rounded-lg text-base font-semibold transition-colors"
        >
          Cancel
        </button>
      </div>

      <div className="mt-4 text-center space-y-1">
        <p className="text-xs text-gray-500">
          Tip: Hold QR code steady, 20-30cm from camera
        </p>
        <p className="text-xs text-gray-400">
          Make sure lighting is good
        </p>
      </div>
    </div>
  );
}
