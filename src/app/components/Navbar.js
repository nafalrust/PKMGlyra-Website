"use client"
import Image from "next/image"
import Logo from "../assets/logo.svg"
import { useRouter } from "next/navigation";
import LoginButton from "./LoginButton";

export default function Navbar() {
    const router = useRouter();
    return (
        <div className="w-full absolute z-10 h-32 p-12 flex justify-between items-center">
            <button
                className="w-56 h-18 rounded-full bg-white relative ml-8"
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