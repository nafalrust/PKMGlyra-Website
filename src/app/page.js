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
      question: "Apa itu Glyra ?",
      answer:
        "Selamat datang di masa depan perawatan diabetes dengan Glyra – perangkat revolusioner untuk pemantauan glukosa non-invasif dan deteksi dini diabetes. Ucapkan selamat tinggal pada ketidaknyamanan dan kerepotan tes darah tradisional. Glyra memanfaatkan teknologi mutakhir untuk mendeteksi biomarker unik yang menunjukkan metabolisme terkait diabetes, sehingga Anda dapat tetap waspada. Dirancang dengan kepraktisan, Glyra ramah pengguna, portabel, dan terjangkau."
    },
    {
      question: "Bagaimana cara kerja Glyra?",
      answer:
        "Glyra mendeteksi biomarker unik dalam napas Anda yang menunjukkan metabolisme terkait diabetes, menyediakan cara non-invasif untuk memantau kadar glukosa."
    },
    {
      question: "Apakah Glyra aman digunakan?",
      answer:
        "Ya, Glyra dirancang aman, ramah pengguna, dan non-invasif untuk semua pengguna."
    },
    {
      question: "Bisakah saya melacak hasil saya secara online?",
      answer:
        "Tentu saja! Glyra terhubung ke platform online kami sehingga Anda dapat menyimpan dan melacak kadar glukosa Anda dengan mudah."
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
      <Image className="absolute hidden md:block" alt="background" src={Background} />
      <div className="w-full min-h-screen relative overflow-hidden">
        {/* Top Login Button - Hidden on small screens */}
        <div className="w-full h-20 md:h-32 p-4 md:p-16 flex items-center justify-end text-white" data-aos="fade-down" data-aos-duration="1000">
          <button
            className="hidden md:flex justify-center items-center w-32 h-12 md:w-48 md:h-16 z-10 bg-red-400 rounded-lg"
            onClick={() => router.push('/login')}
            data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="200"
          >
            <h1 className="text-white text-xl md:text-3xl font-bold">Masuk</h1>
          </button>
        </div>
        {/* Hero Section */}
        <div className="w-full mb-4 md:mb-0  md:min-h-screen mt-4 md:mt-8 px-4 md:px-8" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
          <div className="flex flex-col lg:flex-row justify-evenly items-center gap-8 lg:gap-4">
            {/* Text Content */}
            <div className="w-full lg:w-auto text-center lg:text-left">
              <div className="bg-red-700 w-[50%] lg:w-[50%] h-6 md:h-8 mb-2 mx-auto lg:mx-0" data-aos="fade-right" data-aos-duration="1000" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold" data-aos="fade-down" data-aos-duration="1000">Breath Freely</h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold" data-aos="fade-down" data-aos-duration="1000" data-aos-delay="100">Track Glucose Easily</h1>
              <p className="text-sm sm:text-base md:text-lg mt-4 max-w-lg mx-auto lg:mx-0" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                Perangkat medis revolusioner yang memantau kadar gula darah Anda secara non-invasif—dengan mudah, melalui napas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-8 justify-center items-center lg:justify-start" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="300">
                <button
                  className="flex justify-center items-center w-44 md:w-48 h-14 md:h-16 bg-red-400 rounded-lg"
                  onClick={() => router.push('/login')}
                >
                  <h1 className="text-white text-2xl md:text-3xl font-bold">Login</h1>
                </button>
                <button
                  className="group flex justify-center items-center w-44 md:w-48 h-14 md:h-16 border-4 hover:bg-red-400 duration-500 transform border-red-400 rounded-lg"
                  onClick={() => router.push('/signup')}
                >
                  <h1 className="text-red-400 group-hover:text-white text-2xl md:text-3xl font-bold">Sign Up</h1>
                </button>
              </div>
            </div>
            {/* Device Image */}
            <div className="w-full hidden lg:w-[40%] h-full lg:flex justify-center items-center" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="400">
              <Image src={Lyra} alt="Lyra Device" className="animate-float-robot w-[70%] sm:w-[60%] lg:w-auto lg:ml-12" />
            </div>
          </div>
        </div>
        <section className="w-full bg-white py-12 md:py-16 px-4 flex flex-col items-center" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 text-gray-800 text-center">
            Meet Our Device <span className="text-red-400">Glyra</span>
          </h2>
          <div className="w-full max-w-sm md:max-w-md lg:w-96 h-64 md:h-80 lg:h-96 flex justify-center items-center mb-8 md:mb-10 mt-4 md:mt-6">
            <div className="w-full h-full flex items-center justify-center p-3 md:p-6 rounded-lg bg-gray-50">
              <ModelPrototype />
            </div>
          </div>
          <div className="max-w-2xl border-2 border-red-400 rounded-lg p-4 md:p-6 text-center text-gray-700 mx-4 mt-6 md:mt-8 space-y-4">
            <p className="text-sm md:text-base">
              Selamat datang di masa depan perawatan diabetes dengan <span className="font-bold text-red-400">Glyra</span> — perangkat revolusioner untuk pemantauan glukosa non-invasif dan deteksi dini diabetes. Ucapkan selamat tinggal pada ketidaknyamanan dan kerepotan tes darah tradisional. <span className="font-bold text-red-400">Glyra</span> memanfaatkan teknologi mutakhir untuk mendeteksi biomarker unik yang menunjukkan metabolisme terkait diabetes, sehingga Anda dapat tetap waspada. Dirancang dengan kepraktisan, <span className="font-bold text-red-400">Glyra</span> ramah pengguna, portabel, dan terjangkau.
            </p>
            <p className="mt-4 text-sm md:text-base">
              Selain itu, <span className="font-bold text-red-400">Glyra</span> terhubung ke platform online kami sehingga Anda dapat menyimpan dan melacak kadar gula darah dengan mudah. Baik di rumah, kerja, atau sedang bepergian, riwayat kesehatan Anda selalu dapat diakses, sehingga Anda dan penyedia layanan kesehatan dapat memantau kondisi secara real-time.
            </p>
            <p className="mt-4 font-semibold text-sm md:text-base">
              Breath freely, track Glucose easily
            </p>
          </div>
        </section>
        {/* Section: How To Use It */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-black text-center z-10 px-4" data-aos="fade-down" data-aos-duration="1000" data-aos-delay="200">
          Cara Menggunakannya
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
            <div data-aos="flip-right" data-aos-duration="800" data-aos-delay="200" className="bg-white border-2 border-red-400 rounded-lg p-6 md:p-8 flex-1 flex flex-col items-center w-full max-w-xl mx-auto">
              <div className="w-full aspect-video bg-gray-300 rounded mb-4"></div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-black text-center">Sign Up or Login</h3>
              <p className="text-sm md:text-base text-gray-700 text-justify px-2 md:px-0">
                Mulailah dengan <span className="font-semibold">mendaftar</span> di situs <span className="font-bold text-red-400">Glyra</span> dengan menekan tombol Sign Up. Jika sudah punya akun, cukup masuk menggunakan tombol Login.
              </p>
            </div>
            {/* Card 2 */}
            <div data-aos="flip-right" data-aos-duration="800" data-aos-delay="400" className="bg-white border-2 border-red-400 rounded-lg p-6 md:p-8 flex-1 flex flex-col items-center w-full max-w-xl mx-auto">
              <div className="w-full aspect-video bg-gray-300 rounded mb-4"></div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-black text-center">Lengkapi Formulir dan Gunakan Perangkat</h3>
              <p className="text-sm md:text-base text-gray-700 text-justify px-2 md:px-0">
                Buka menu <span className="font-semibold">Add Medical Test</span> untuk memulai pemeriksaan. Isi formulir dengan informasi yang dibutuhkan lalu kirim. Nyalakan perangkat <span className="font-bold text-red-400">Glyra</span> dan tunggu sampai siap. Setelah siap, hembuskan napas ke dalam breathing bag dan massukan dalam alat.
              </p>
            </div>
            {/* Card 3 */}
            <div data-aos="flip-right" data-aos-duration="800" data-aos-delay="600" className="bg-white border-2 border-red-400 rounded-lg p-6 md:p-8 flex-1 flex flex-col items-center w-full max-w-xl mx-auto">
              <div className="w-full aspect-video bg-gray-300 rounded mb-4"></div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-black text-center">Pindai Kode QR dan Lihat Hasil</h3>
              <p className="text-sm md:text-base text-gray-700 text-justify px-2 md:px-0">
                Setelah pemeriksaan, akan muncul <span className="font-semibold">kode QR</span> pada layar perangkat. Klik <span className="font-semibold">Pindai QR</span> di situs dan pindai kodenya. Hasil pemeriksaan akan ditampilkan segera.
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