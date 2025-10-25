"use client"
import Image from "next/image"
import Logo from "../assets/logo.svg"
import { useRouter } from "next/navigation";
import LoginButton from "./LoginButton";

export default function Navbar() {
    const router = useRouter();
    return (
        <div className="w-full absolute h-20 sm:h-24 md:h-32 p-4 sm:p-8 md:p-12 flex justify-between items-center">
            <button
                className="w-40 sm:w-48 md:w-56 h-14 sm:h-16 md:h-18 rounded-full bg-white relative ml-2 sm:ml-4 md:ml-8"
                onClick={() => router.push('/')}
            >
                <Image src={Logo} alt="Logo" fill className="object-contain" />
            </button>
            {/* <div className="mr-8">
                <LoginButton />
            </div> */}
        </div>
    );
}