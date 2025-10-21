'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '../components/MainLayout';
import { getCurrentUser, onAuthStateChange } from '@/lib/auth';

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

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
          {/* Welcome Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Selamat Datang,
            </h1>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              {user?.displayName || 'Pengguna'}
            </h2>
          </div>

          {/* Start Examination Button */}
          <div className="flex justify-center">
            <button
              onClick={handleStartExamination}
              className="group relative px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 
                       bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 
                       rounded-full text-white font-bold text-lg sm:text-xl md:text-2xl
                       shadow-lg shadow-purple-500/50 hover:shadow-purple-500/75
                       transform hover:scale-105 transition-all duration-300
                       border-2 border-white/20 hover:border-white/40"
            >
              <span className="relative z-10">MULAI PEMERIKSAAN</span>
              
              {/* Animated gradient background */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-full bg-white/20 
                            animate-ping opacity-0 group-hover:opacity-20" />
            </button>
          </div>

          {/* Additional Info Section (Optional) */}
          <div className="mt-12 sm:mt-16 text-center">
            <p className="text-white/70 text-sm sm:text-base md:text-lg">
              Siap untuk memulai pemeriksaan kesehatan Anda?
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
