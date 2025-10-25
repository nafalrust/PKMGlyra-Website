"use client";

import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

export default function QrScanner() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanCount, setScanCount] = useState(0);
  const [scanned, setScanned] = useState(false);
  const html5QrCodeRef = useRef(null);

  const startScanner = async () => {
    if (scanning) return;
    const divId = "reader";
    const html5QrCode = new Html5Qrcode(divId);
    html5QrCodeRef.current = html5QrCode;

    try {
      const devices = await Html5Qrcode.getCameras();
      if (devices && devices.length) {
        const cameraId = devices[0].id;
        setScanning(true);
        setScanCount(0);
        setScanned(false);
        setError(null);

        await html5QrCode.start(
          cameraId,
          { fps: 5, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            setResult(decodedText);
            setScanCount((c) => c + 1);
            setScanned(true);
            // stop scanner after first detection
            html5QrCode
              .stop()
              .then(() => setScanning(false))
              .catch(console.error);
          },
          (err) => {
            // per-frame decode errors
          }
        );
      } else {
        setError("Tidak ada kamera terdeteksi");
      }
    } catch (e) {
      setError(e && e.message ? e.message : "Gagal memulai scanner");
    }
  };

  const stopScanner = async () => {
    const h = html5QrCodeRef.current;
    if (h) {
      try {
        await h.stop();
      } catch (e) {}
      try {
        await h.clear();
      } catch (e) {}
      html5QrCodeRef.current = null;
    }
    setScanning(false);
  };

  useEffect(() => {
    return () => {
      // cleanup on unmount
      stopScanner();
    };
  }, []);

  return (
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-6">
      <h1 className="text-2xl font-bold text-center mb-1">Scan QR Code</h1>
      <p className="text-center text-sm text-gray-500 mb-4">
        Position the QR code within the camera frame
      </p>

      <div className="w-full bg-gray-100 rounded-xl h-64 flex items-center justify-center mb-4 overflow-hidden">
        {/* camera reader target */}
        <div
          id="reader"
          className={`${scanning ? "w-full h-full" : "hidden"}`}
        />

        {/* placeholder when not active */}
        {!scanning && (
          <div className="flex flex-col items-center justify-center text-center">
            <svg
              className="w-20 h-20 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="16"
                rx="2"
                ry="2"
                strokeWidth="1.5"
              />
              <circle cx="12" cy="13" r="3" strokeWidth="1.5" />
            </svg>
            <p className="text-sm text-gray-500">
              Scanner will automatically detect QR code every 0.3 seconds
            </p>
          </div>
        )}
      </div>

      <button
        onClick={startScanner}
        disabled={scanning}
        className="w-full py-3 bg-red-400 hover:bg-red-500 text-white rounded-lg mb-3 font-semibold disabled:opacity-60"
      >
        Start Camera
      </button>

      <button
        onClick={stopScanner}
        disabled={!scanning}
        className="w-full py-3 border border-gray-200 rounded-lg mb-4 hover:bg-gray-50"
      >
        Cancel
      </button>

      <p className="text-xs text-gray-400 text-center">
        Make sure the QR code is well-lit and clearly visible
      </p>
      <p className="text-xs text-gray-400 text-center mt-1">
        Scanning every 0.3 seconds • Auto-save when detected
      </p>

      {result && (
        <div className="mt-4 text-left text-sm break-words">
          <strong>Last scanned:</strong>
          <p className="mt-1">{result}</p>
        </div>
      )}

      {error && (
        <div className="mt-3 text-left text-sm text-red-600">
          <strong>Error:</strong>
          <p className="mt-1">{error}</p>
        </div>
      )}
    </div>
  );
}