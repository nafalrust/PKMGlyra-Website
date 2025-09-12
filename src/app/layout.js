import { Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Background from "./assets/landingPage.svg"
import Image from "next/image";

// Load font Quicksand
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

// Metadata untuk SEO
export const metadata = {
  title: {
    default: "Glyra - UGM",
    template: "%s | Glyra",
  },
  description: "Glycemia Breath Analysis",
  icons: {
    icon: "/logo-icon.svg",
  },
};

// Root layout
// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className="h-full bg-white text-black">
//       <body
//         className={`${quicksand.variable} font-sans antialiased min-h-screen`}
//       >
//         <main className="flex flex-col min-h-screen">
//           {children}
//         </main>
//       </body>
//     </html>
//   );
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white text-black">
      <body
        className={`${quicksand.variable} font-sans antialiased min-h-screen`}
      >
        <Navbar />
        <main className="flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}