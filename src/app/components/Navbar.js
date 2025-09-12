import Image from "next/image"
import Logo from "../assets/logo.svg"
import LoginButton from "./LoginButton";

export default function Navbar() {
    return (
        <div className="w-full absolute z-10 h-32 p-12 flex justify-between items-center">
            <div className="w-56 h-18 rounded-full bg-white relative ml-8">
                <Image src={Logo} alt="Logo" fill className="object-contain" />
            </div>
            {/* <div className="mr-8">
                <LoginButton />
            </div> */}
        </div>
    );
}