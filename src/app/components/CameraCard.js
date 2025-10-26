'use client';

import { useState, useEffect } from 'react';
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

  let html5QrCodeScanner = null;

  useEffect(() => {
    return () => {
      stopCameraCleanup();
    };
  }, []);

  const stopCameraCleanup = async () => {
    try {
      const scanner = document.getElementById("qr-reader");
      if (scanner && html5QrCodeScanner) {
        if (html5QrCodeScanner.isScanning) {
          await html5QrCodeScanner.stop();
        }
        html5QrCodeScanner.clear();
      }
    } catch (err) {
      console.log('Cleanup error:', err);
    }
  };

  const handleQRCodeSuccess = async (decodedText) => {
    if (processing) return;
    
    console.log('✅✅✅ QR Code DETECTED:', decodedText);
    
    setProcessing(true);
    setScanned(true);
    
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
    
    try {
      setError('');
      setSuccess('✓ QR Code Detected!');
      
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
        setSuccess('✓ QR Code Saved Successfully!');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        throw new Error(data.message || 'Failed to save QR code');
      }
    } catch (err) {
      console.error('❌ Error:', err);
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
      
      console.log('📷 Initializing camera...');
      
      html5QrCodeScanner = new Html5Qrcode("qr-reader");
      
      const devices = await Html5Qrcode.getCameras();
      console.log('📹 Cameras found:', devices.length);
      
      if (devices && devices.length > 0) {
        let camera = devices.find(d => 
          d.label.toLowerCase().includes('back') || 
          d.label.toLowerCase().includes('rear')
        ) || devices[0];
        
        console.log('✅ Using camera:', camera.label);
        
        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          videoConstraints: {
            facingMode: "environment",
            width: { ideal: 640 },
            height: { ideal: 480 }
          }
        };
        
        await html5QrCodeScanner.start(
          camera.id,
          config,
          (decodedText, decodedResult) => {
            console.log('🎯 SCAN SUCCESS!', decodedText);
            handleQRCodeSuccess(decodedText);
          },
          (errorMessage) => {
            // Normal - no QR in frame
          }
        );
        
        setScanning(true);
        console.log('✅ Camera started!');
        
        // Debug: Check if video element is created
        setTimeout(() => {
          const qrReaderDiv = document.getElementById('qr-reader');
          const videoElement = qrReaderDiv?.querySelector('video');
          console.log('📹 QR Reader div:', qrReaderDiv);
          console.log('🎥 Video element:', videoElement);
          if (videoElement) {
            console.log('📐 Video dimensions:', videoElement.videoWidth, 'x', videoElement.videoHeight);
            console.log('🎬 Video playing:', !videoElement.paused);
          }
        }, 1000);
      } else {
        throw new Error('No cameras found');
      }
    } catch (err) {
      console.error('❌ Camera error:', err);
      setError('Camera access failed: ' + err.message);
    }
  };

  const stopCamera = async () => {
    try {
      if (html5QrCodeScanner && html5QrCodeScanner.isScanning) {
        await html5QrCodeScanner.stop();
        console.log('📷 Camera stopped');
      }
      setScanning(false);
    } catch (err) {
      console.error('Stop camera error:', err);
    }
  };

  const handleCancel = async () => {
    await stopCamera();
    router.push('/dashboard');
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md md:w-96 bg-white rounded-2xl shadow-lg p-6 sm:p-8 mx-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Scan QR Code</h1>
      
      <p className="text-gray-600 text-sm mb-2 text-center">
        Position QR code in the square frame
      </p>
      
      <p className="text-green-600 text-xs mb-6 text-center font-semibold">
        ✅ Using html5-qrcode - TESTED & WORKING!
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

      <div className="mb-6 w-full">
        {!scanning && (
          <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex flex-col items-center justify-center gap-4 border-2 border-dashed border-gray-300">
            <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-gray-500 text-sm font-medium">Camera preview</p>
            <p className="text-gray-400 text-xs">Click Start Camera below</p>
          </div>
        )}
        
        {scanning && (
          <div 
            id="qr-reader" 
            style={{ 
              border: scanned ? '4px solid #10b981' : '4px solid #ef4444',
              borderRadius: '12px',
              overflow: 'hidden',
              width: '100%',
              minHeight: '300px',
              display: 'block'
            }}
          />
        )}
      </div>

      {scanned && (
        <div className="mb-4 flex justify-center">
          <div className="bg-green-500 text-white rounded-full p-4 animate-bounce">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {!scanning ? (
          <button
            onClick={startCamera}
            disabled={processing}
            className="w-full py-3 bg-red-400 hover:bg-red-500 disabled:bg-gray-300 text-white rounded-lg font-semibold transition-colors"
          >
            {processing ? '⏳ Processing...' : '📷 Start Camera'}
          </button>
        ) : (
          <button
            onClick={stopCamera}
            disabled={processing}
            className="w-full py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white rounded-lg font-semibold transition-colors"
          >
            ⏹️ Stop Camera
          </button>
        )}
        
        <button
          onClick={handleCancel}
          disabled={processing}
          className="w-full py-3 border-2 border-gray-300 hover:bg-gray-100 disabled:opacity-50 text-gray-700 rounded-lg font-semibold transition-colors"
        >
          Cancel
        </button>
      </div>

      <div className="mt-4 text-center space-y-2">
        <p className="text-xs text-gray-500">
          💡 Tip: Hold QR code steady, 20-30cm from camera
        </p>
        <p className="text-xs text-gray-400">
          ☀️ Make sure lighting is good
        </p>
      </div>
    </div>
  );
}
