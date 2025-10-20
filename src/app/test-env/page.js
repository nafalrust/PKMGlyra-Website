'use client';
import { useEffect } from 'react';

export default function EnvTest() {
  useEffect(() => {
    console.log('=== Environment Variables Check ===');
    console.log('API Key:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✓ Present' : '✗ Missing');
    console.log('Auth Domain:', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✓ Present' : '✗ Missing');
    console.log('Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✓ Present' : '✗ Missing');
    console.log('Backend URL:', process.env.NEXT_PUBLIC_API_URL);
    console.log('===================================');
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Test</h1>
      <p>Check browser console (F12) for results</p>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p>API Key: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✓ Loaded' : '✗ Not Loaded'}</p>
        <p>Auth Domain: {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✓ Loaded' : '✗ Not Loaded'}</p>
        <p>Project ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✓ Loaded' : '✗ Not Loaded'}</p>
        <p>Backend URL: {process.env.NEXT_PUBLIC_API_URL || '✗ Not Loaded'}</p>
      </div>
    </div>
  );
}
