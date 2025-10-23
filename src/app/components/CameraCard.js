'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BrowserMultiFormatReader } from '@zxing/library';
import { getCurrentUser } from '@/lib/auth';

export default function CameraCard() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [stream, setStream] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [scanned, setScanned] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const codeReaderRef = useRef(null);
  const scanIntervalRef = useRef(null);

  useEffect(() => {
    // Initialize code reader
    codeReaderRef.current = new BrowserMultiFormatReader();
    
    return () => {
      stopCamera();
      if (codeReaderRef.current) {
        codeReaderRef.current.reset();
      }
    };
  }, []);

  const scanQRCode = async () => {
    if (!videoRef.current || !canvasRef.current || processing) return;

    try {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      const result = await codeReaderRef.current.decodeFromImageData(imageData);
      
      if (result) {
        setProcessing(true);
        await handleQRCodeDetected(result.text);
      }
    } catch (err) {
      // No QR code detected in this frame, continue scanning
    }
  };

  const handleQRCodeDetected = async (qrData) => {
    console.log('QR Code detected:', qrData);
    
    // Stop scanning immediately
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    
    // Vibrate if supported (mobile devices)
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
    
    // Show scanned state with animation
    setScanned(true);
    
    try {
      setError('');
      setSuccess('✓ QR Code Detected!');
      
      // Wait a moment for visual feedback
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSuccess('Saving to database...');
      
      // Get current user
      const user = getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Send QR data to backend
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/auth/save-qr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          qrData: qrData,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('✓ QR Code Saved Successfully!');
        
        // Redirect to dashboard after 1.5 seconds
        setTimeout(() => {
          stopCamera();
          router.push('/dashboard');
        }, 1500);
      } else {
        throw new Error(data.message || 'Failed to save QR code');
      }
    } catch (err) {
      console.error('Error saving QR code:', err);
      setError(err.message || 'Failed to save QR code. Please try again.');
      setScanned(false);
      setProcessing(false);
      
      // Restart scanning after error
      scanIntervalRef.current = setInterval(scanQRCode, 500);
    }
  };

  const startCamera = async () => {
    try {
      setError('');
      setSuccess('');
      setProcessing(false);
      setScanned(false);
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      setStream(mediaStream);
      setScanning(true);
      
      // Wait for video element to be ready
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        
        // Ensure video plays
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(err => {
            console.error('Error playing video:', err);
            setError('Unable to start video playback');
          });
        };
      }
      
      // Start scanning QR codes every 500ms
      scanIntervalRef.current = setInterval(scanQRCode, 500);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please check your permissions.');
    }
  };

  const stopCamera = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setScanning(false);
    setProcessing(false);
    setScanned(false);
  };

  const handleCancel = () => {
    stopCamera();
    router.push('/dashboard');
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Update video source when stream changes
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="w-full max-w-sm sm:max-w-md md:w-96 bg-white rounded-2xl shadow-lg p-6 sm:p-8 mx-4 flex flex-col justify-center items-center">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Scan QR Code</h1>
      
      <p className="text-gray-600 text-sm sm:text-base mb-2 text-center">
        Position the QR code within the camera frame
      </p>
      
      <p className="text-gray-500 text-xs mb-6 text-center">
        Scanner will automatically detect QR code every 0.5 seconds
      </p>

      {error && (
        <div className="w-full mb-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="w-full mb-3 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm font-semibold flex items-center gap-2 animate-pulse">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {success}
        </div>
      )}

      {/* Camera View */}
      <div className="w-full mb-6">
        {!scanning ? (
          <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
            <svg 
              className="w-24 h-24 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
          </div>
        ) : (
          <div className="relative w-full aspect-square bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
            
            {/* Success Flash Overlay */}
            {scanned && (
              <div className="absolute inset-0 bg-green-500 bg-opacity-30 flex items-center justify-center animate-pulse">
                <div className="bg-white rounded-full p-6">
                  <svg className="w-20 h-20 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
            
            {/* QR Code Frame Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-3/4 h-3/4">
                {/* Corner borders */}
                <div className={`absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 transition-colors duration-300 ${scanned ? 'border-green-400' : 'border-white'}`}></div>
                <div className={`absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 transition-colors duration-300 ${scanned ? 'border-green-400' : 'border-white'}`}></div>
                <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 transition-colors duration-300 ${scanned ? 'border-green-400' : 'border-white'}`}></div>
                <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 transition-colors duration-300 ${scanned ? 'border-green-400' : 'border-white'}`}></div>
              </div>
            </div>
            
            {/* Scanning line animation - only show when not scanned */}
            {!scanned && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-3/4 h-1 bg-red-400 opacity-75 animate-scan-line"></div>
              </div>
            )}
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Buttons */}
      <div className="w-full flex flex-col gap-3">
        {!scanning ? (
          <button
            onClick={startCamera}
            className="w-full py-3 bg-red-400 hover:bg-red-500 text-white rounded-lg font-semibold transition-colors duration-200"
          >
            Start Camera
          </button>
        ) : (
          <button
            onClick={stopCamera}
            className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors duration-200"
          >
            Stop Camera
          </button>
        )}
        
        <button
          onClick={handleCancel}
          className="w-full py-3 border-2 border-gray-300 hover:bg-gray-100 text-gray-700 rounded-lg font-semibold transition-colors duration-200"
        >
          Cancel
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Make sure the QR code is well-lit and clearly visible
      </p>
      
      <p className="text-xs text-gray-400 mt-2 text-center">
        Scanning every 0.5 seconds • Auto-save when detected
      </p>
    </div>
  );
}
