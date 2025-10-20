'use client';
import LoginCard from "../components/LoginCard";
import Image from "next/image";
import Pattern from "../assets/pattern.svg";

export default function SignIn() {
    return (
        <main className="w-full min-h-screen relative overflow-hidden flex justify-center items-center bg-red-100">
            <Image
                src={Pattern}
                alt="Background Pattern"
                fill
                className="object-cover z-0"
                style={{ pointerEvents: 'none' }}
            />
            <div className="z-10 w-full flex justify-center items-center">
                <LoginCard />
            </div>
        </main>
    );
}