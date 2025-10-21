'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getCurrentUser, onAuthStateChange, logout } from '@/lib/auth';
import Background from '../assets/landingPage.svg';
import Lyra from '../assets/lyra.svg';
import Aos from 'aos';
import 'aos/dist/aos.css';

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

  useEffect(() => {
    Aos.init({ once: true });
  }, []);

  const handleStartExamination = () => {
    // TODO: Navigate to examination page when ready
    console.log('Start examination');
    alert('Examination feature coming soon!');
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
    <main className="w-full min-h-screen">
      <Image className="absolute hidden md:block" alt="background" src={Background} />
      <div className="w-full min-h-screen relative overflow-hidden">
        {/* Top Logout Button - Hidden on small screens */}
        <div className="w-full h-20 md:h-32 p-4 md:p-16 flex items-center justify-end text-white" data-aos="fade-down" data-aos-duration="1000">
          <button
            className="hidden md:flex justify-center items-center w-32 h-12 md:w-48 md:h-16 z-10 bg-red-400 rounded-lg"
            onClick={handleLogout}
            data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="200"
          >
            <h1 className="text-white text-xl md:text-3xl font-bold">Logout</h1>
          </button>
        </div>
        
        {/* Hero Section */}
        <div className="w-full mb-4 md:mb-0 md:min-h-screen mt-4 md:mt-8 px-4 md:px-8" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
          <div className="flex flex-col lg:flex-row justify-evenly items-center gap-8 lg:gap-4">
            {/* Text Content */}
            <div className="w-full lg:w-auto text-center lg:text-left">
              <div className="bg-red-700 w-[50%] lg:w-[50%] h-6 md:h-8 mb-2 mx-auto lg:mx-0" data-aos="fade-right" data-aos-duration="1000" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold" data-aos="fade-down" data-aos-duration="1000">Welcome,</h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-red-700" data-aos="fade-down" data-aos-duration="1000" data-aos-delay="100">
                {user?.displayName || 'User'}
              </h1>
              <p className="text-sm sm:text-base md:text-lg mt-4 max-w-lg mx-auto lg:mx-0" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                Ready to start your health examination?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-8 justify-center items-center lg:justify-start" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="300">
                <button
                  className="flex justify-center items-center w-56 md:w-64 h-14 md:h-16 bg-red-400 rounded-lg hover:bg-red-500 transition-colors duration-300"
                  onClick={handleStartExamination}
                >
                  <h1 className="text-white text-xl md:text-2xl font-bold">START EXAMINATION</h1>
                </button>
              </div>
            </div>
            
            {/* Device Image */}
            <div className="w-full hidden lg:w-[40%] h-full lg:flex justify-center items-center" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="400">
              <Image src={Lyra} alt="Lyra Device" className="animate-float-robot w-[70%] sm:w-[60%] lg:w-auto lg:ml-12" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
