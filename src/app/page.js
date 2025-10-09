"use client";

import Image from "next/image";
import Lyra from "./assets/lyra.svg"
import HowtouseBg from "./assets/howtouse-bg.svg";
import { useEffect, useState } from "react";
import Background from "./assets/landingPage.svg"
import ModelPrototype from "./components/ThreePrototype";
import { useRouter } from 'next/navigation';
import Aos from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const router = useRouter();
  const faqData = [
    {
      question: "What is Glyra ?",
      answer:
        "Welcome to the future of diabetes care with Glyra – the revolutionary non-invasive glucose monitoring and early diabetes detection device. Say goodbye to the discomfort and inconvenience of traditional blood tests. Glyra harnesses cutting-edge technology to detect unique biomarkers indicative of diabetic metabolism, ensuring you stay ahead of the curve. Designed with practicality in mind, Glyra is user-friendly, portable, and affordable."
    },
    {
      question: "How does Glyra work?",
      answer:
        "Glyra detects unique biomarkers in your breath that are indicative of diabetic metabolism, providing a non-invasive way to monitor glucose levels."
    },
    {
      question: "Is Glyra safe to use?",
      answer:
        "Yes, Glyra is designed to be safe, user-friendly, and non-invasive for all users."
    },
    {
      question: "Can I track my results online?",
      answer:
        "Absolutely! Glyra connects to our online platform so you can store and track your glucose levels easily."
    }
  ];
  const [openIndexes, setOpenIndexes] = useState([]);

  const handleToggle = (idx) => {
    setOpenIndexes((prev) =>
      prev.includes(idx)
        ? prev.filter((i) => i !== idx)
        : [...prev, idx]
    );
  };

  useEffect(() => {
    Aos.init({ once: true });
  }, []);

  return (
    <main className="w-full min-h-screen">
      <Image className="absolute" alt="background" src={Background} />
      <div className="w-full min-h-screen relative overflow-hidden">
        {/* Top Login Button - Hidden on small screens */}
        <div className="w-full h-20 md:h-32 p-4 md:p-16 flex items-center justify-end text-white" data-aos="fade-down" data-aos-duration="1000">
          <button
            className="hidden md:flex justify-center items-center w-32 h-12 md:w-48 md:h-16 z-10 bg-red-400 rounded-lg"
            onClick={() => router.push('/login')}
            data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="200"
          >
            <h1 className="text-white text-xl md:text-3xl font-bold">Login</h1>
          </button>
        </div>
        {/* Hero Section */}
        <div className="w-full min-h-screen mt-4 md:mt-8 px-4 md:px-8" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
          <div className="flex flex-col lg:flex-row justify-evenly items-center gap-8 lg:gap-4">
            {/* Text Content */}
            <div className="w-full lg:w-auto text-center lg:text-left">
              <div className="bg-red-700 w-[50%] lg:w-[50%] h-6 md:h-8 mb-2 mx-auto lg:mx-0" data-aos="fade-right" data-aos-duration="1000" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold" data-aos="fade-down" data-aos-duration="1000">Breath Freely</h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold" data-aos="fade-down" data-aos-duration="1000" data-aos-delay="100">Track Glucose Easily</h1>
              <p className="text-sm sm:text-base md:text-lg mt-4 max-w-lg mx-auto lg:mx-0" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                A revolutionary medical device that tracks your glucose levels—effortlessly, through your breath.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-8 justify-center lg:justify-start" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="300">
                <button
                  className="flex justify-center items-center w-full sm:w-40 md:w-48 h-14 md:h-16 bg-red-400 rounded-lg"
                  onClick={() => router.push('/login')}
                >
                  <h1 className="text-white text-2xl md:text-3xl font-bold">Login</h1>
                </button>
                <button
                  className="group flex justify-center items-center w-full sm:w-40 md:w-48 h-14 md:h-16 border-4 hover:bg-red-400 duration-500 transform border-red-400 rounded-lg"
                  onClick={() => router.push('/signup')}
                >
                  <h1 className="text-red-400 group-hover:text-white text-2xl md:text-3xl font-bold">Sign Up</h1>
                </button>
              </div>
            </div>
            {/* Device Image */}
            <div className="w-full lg:w-[40%] h-full flex justify-center items-center" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="400">
              <Image src={Lyra} alt="Lyra Device" className="animate-float-robot w-[70%] sm:w-[60%] lg:w-auto lg:ml-12" />
            </div>
          </div>
        </div>
        <section className="w-full bg-white py-12 md:py-16 px-4 flex flex-col items-center" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 text-gray-800 text-center">
            Meet Our Device <span className="text-red-400">glyra</span>
          </h2>
          <div className="w-full max-w-sm md:max-w-md lg:w-96 h-64 md:h-80 lg:h-96 flex justify-center items-center mb-6 md:mb-8">
            <ModelPrototype />
          </div>
          <div className="max-w-2xl border-2 border-red-400 rounded-lg p-4 md:p-6 text-center text-gray-700 mx-4">
            <p className="text-sm md:text-base">
              Welcome to the future of diabetes care with <span className="font-bold text-red-400">Glyra</span> – the revolutionary non-invasive glucose monitoring and early diabetes detection device. Say goodbye to the discomfort and inconvenience of traditional blood tests. <span className="font-bold text-red-400">Glyra</span> harnesses cutting-edge technology to detect unique biomarkers indicative of diabetic metabolism, ensuring you stay ahead of the curve. Designed with practicality in mind, <span className="font-bold text-red-400">Glyra</span> is user friendly, portable, and affordable.
            </p>
            <p className="mt-4 text-sm md:text-base">
              But that’s not all! <span className="font-bold text-red-400">Glyra</span> seamlessly connects to our online platform, allowing you to store and track your glucose levels effortlessly. Whether you’re at home, work, or on the go, your health history is always accessible, ensuring you and your healthcare provider can monitor your condition in real-time.
            </p>
            <p className="mt-4 font-semibold text-sm md:text-base">
              Breath freely, track Glucose easily
            </p>
          </div>
        </section>
        {/* Section: How To Use It */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-black text-center z-10 px-4" data-aos="fade-down" data-aos-duration="1000" data-aos-delay="200">
          How To Use It
        </h2>
        <section className="w-full relative py-12 md:py-16 flex flex-col items-center px-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
          {/* Background SVG */}
          <div className="absolute inset-0 w-full h-full -z-10">
            <Image
              src={HowtouseBg}
              alt="Background Pattern"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 justify-center items-stretch w-full max-w-7xl z-10">
            {/* Card 1 */}
            <div data-aos="flip-right" data-aos-duration="800" data-aos-delay="200" className="bg-white border-2 border-red-400 rounded-lg p-6 md:p-8 flex-1 flex flex-col items-center">
              <div className="w-full h-48 md:h-64 bg-gray-300 rounded mb-4"></div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-black text-center">Sign Up or Login</h3>
              <p className="text-sm md:text-base text-gray-700 text-justify">
                Start by <span className="font-semibold">signing up</span> on the <span className="font-bold text-red-400">Glyra</span>  website by clicking the Get Started button. If you already have an account, simply log in using your existing credentials.
              </p>
            </div>
            {/* Card 2 */}
            <div data-aos="flip-right" data-aos-duration="800" data-aos-delay="400" className="bg-white border-2 border-red-400 rounded-lg p-6 md:p-8 flex-1 flex flex-col items-center">
              <div className="w-full h-48 md:h-64 bg-gray-300 rounded mb-4"></div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-black text-center">Complete the Form and Use the Device</h3>
              <p className="text-sm md:text-base text-gray-700 text-justify ">
                Go to the <span className="font-semibold">Add Medical Test</span> menu to begin your check-up. Fill out the form with the required information and click Submit. Next, turn on your <span className="font-bold text-red-400">Glyra</span> device and wait until it’s ready. Once ready, exhale into the chamber through the hose for 10 seconds.
              </p>
            </div>
            {/* Card 3 */}
            <div data-aos="flip-right" data-aos-duration="800" data-aos-delay="600" className="bg-white border-2 border-red-400 rounded-lg p-6 md:p-8 flex-1 flex flex-col items-center">
              <div className="w-full h-48 md:h-64 bg-gray-300 rounded mb-4"></div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-black text-center">Scan the QR Code and View Your Results</h3>
              <p className="text-sm md:text-base text-gray-700 text-justify">
                After the test, a <span className="font-semibold">QR code</span> will appear on the device screen. Click <span className="font-semibold">Scan QR</span> on the website and scan the code. Your test results will be displayed shortly after.
              </p>
            </div>
          </div>
        </section>
        {/* FAQ Section */}
        <section className="w-full py-12 md:py-16 px-4 flex flex-col items-center" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-black text-center">Frequently Ask Questions</h2>
          <div className="w-full max-w-4xl flex flex-col gap-4 md:gap-6">
            {faqData.map((item, idx) => (
              <div key={idx} className="rounded-lg overflow-hidden shadow">
                <button
                  className={`w-full text-left px-4 md:px-6 py-4 md:py-5 font-bold text-base md:text-lg bg-red-400 text-white focus:outline-none transition-all duration-300 ${openIndexes.includes(idx) ? 'rounded-t-lg' : 'rounded-lg'}`}
                  onClick={() => handleToggle(idx)}
                >
                  {item.question}
                </button>
                <div
                  className={`bg-red-200 px-4 md:px-6 text-sm md:text-base text-black text-justify rounded-b-lg transition-all duration-300 overflow-hidden ${openIndexes.includes(idx) ? 'max-h-96 py-4 md:py-5 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
                >
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}