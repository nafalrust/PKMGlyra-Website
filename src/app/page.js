import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4 sm:p-6 md:p-8">
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
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-quicksand text-gray-800 text-center font-bold max-w-screen-md px-4">
        Coming Soon
      </h1>
    </main>
  );
}
