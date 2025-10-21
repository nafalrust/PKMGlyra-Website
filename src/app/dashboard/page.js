'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, onAuthStateChange, logout } from '@/lib/auth';
import { Pixelify_Sans } from "next/font/google";

// Load Pixelify Sans font
const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixelify-sans",
  display: "swap",
});

// Disable static generation for this page
export const dynamic = 'force-dynamic';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const unsubscribe = onAuthStateChange((currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleStartExamination = () => {
    // TODO: Navigate to examination page when ready
    console.log('Start examination');
    alert('Fitur pemeriksaan akan segera hadir!');
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      router.push('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-800 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-white">
      {/* Top Navigation Bar - Minimalist */}
      <div className="w-full h-20 px-4 md:px-16 flex items-center justify-between border-b border-gray-200">
        <h1 className={`text-2xl md:text-3xl font-bold text-gray-800 ${pixelifySans.className}`}>
          Glyra
        </h1>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-semibold transition-colors duration-200"
        >
          Logout
        </button>
      </div>

      {/* Main Content - Centered */}
      <div className="w-full min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl text-center">
          {/* Welcome Message */}
          <div className="mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Selamat Datang,
            </h1>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              {user?.displayName || 'Pengguna'}
            </h2>
          </div>

          {/* Start Examination Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleStartExamination}
              className="group relative px-10 sm:px-14 md:px-20 py-5 sm:py-6 md:py-7
                       bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 
                       rounded-full text-white font-bold text-lg sm:text-xl md:text-2xl
                       shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50
                       transform hover:scale-105 transition-all duration-300
                       border-2 border-white/20 hover:border-white/40"
            >
              <span className="relative z-10">MULAI PEMERIKSAAN</span>
              
              {/* Animated gradient background on hover */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Subtitle */}
          <div className="mt-12">
            <p className="text-gray-600 text-base sm:text-lg md:text-xl">
              Siap untuk memulai pemeriksaan kesehatan Anda?
            </p>
          </div>
        </div>
      </div>

      {/* Footer - Simple */}
      <footer className="w-full border-t border-gray-200 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 md:px-16 gap-4">
          <p className={`text-sm md:text-base text-gray-600 ${pixelifySans.className}`}>
            Kelompok MST - Teknologi Informasi
          </p>
          <p className={`text-xs md:text-sm text-gray-500 ${pixelifySans.className}`}>
            &copy; 2025. Dibuat untuk Proyek ASD - DTETI FT UGM.
          </p>
        </div>
      </footer>
    </main>
  );
}
