import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      {/* Logo Responsif */}
      <div className="mb-6 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-60 lg:h-60 relative">
        <Image
          src="/logo-icon.svg"
          alt="Logo Glyra"
          fill
          className="object-contain"
        />
      </div>

      {/* Teks Coming Soon */}
      <h1 className="text-5xl sm:text-6xl md:text-8xl font-quicksand text-gray-800 text-center font-bold">
        Coming Soon
      </h1>
    </main>
  );
}
