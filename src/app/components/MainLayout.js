"use clients";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import{  Menu,
    X,
} from "lucide-react";
import Image from "next/image";

export default function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    const navigation = [
        { name: "Home", href: "/" },
        { name: "Log In", href: "/about" },
        { name: "Get Started - Sign Up", href: "/contact" },
    ];

    return (
        <>
            <nav className="bg-[#3B75A8] shadow-lg sticky top-0 z-50">
                <div className="max-w-7xxl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-24">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-2">
                                <Image src="/logo.png" alt="MST Logo" width={80} height={64} className="h-8 sm:h-8 md:h-10 lg:h-12 xl:h-14 2xl:h-16 w-auto" priority />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`text-white hover:text-[#FFCA7A] px-3 py-2 rounded-md transition-colors duration-200 text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl ${pixelifySans.className}`}
                                >
                                    <span>{item.name}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-white hover:text-[#FFCA7A] p-2 text-base"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-[#3B75A8] border-t border-blue-400">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`text-white hover:text-[#FFCA7A] block px-3 py-2 rounded-md transition-colors duration-200 ${pixelifySans.className}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span>{item.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            <main className="flex-1">{children}</main>

            {/* FOOTER BARU */}
            <footer className="w-full">
                <div className="flex">
                    {/* Bagian Kiri (Kuning) - 1/3 lebar */}
                    <div className="w-1/3 bg-[#FFBC33] text-[#3B75A8] py-4 px-4 text-base flex items-center shrink-0">
                        <p className={`font-bold text-center w-full
              text-sm sm:text-base md:text-lg lg:text-xl ${pixelifySans.className}`}> {/* <--- UKURAN TEKS RESPONSIVE DI SINI */}
                            Kelompok MST - Teknologi Informasi
                        </p>
                    </div>

                    {/* Bagian Kanan (Biru Gelap) - 2/3 lebar */}
                    <div className="w-2/3 bg-[#3B75A8] text-[#FFBC33] py-4 px-4 text-base flex items-center justify-end shrink-0">
                        <p className={`
              text-xs sm:text-sm md:text-base lg:text-lg ${pixelifySans.className}`}> {/* <--- UKURAN TEKS RESPONSIVE DI SINI */}
                            &copy; 2025. Dibuat untuk Proyek ASD - DTETI FT UGM.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}