import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Puthu Lanang Malang Est. 1935 | Smart Takeaway & Heritage Web",
  description: "Platform Smart Takeaway resmi Puthu Lanang Celaket Malang. Nikmati cita rasa warisan 90 tahun: Puthu, Klepon, Cenil, dan Lupis 100% Gula Aren Murni.",
  keywords: ["Puthu Lanang", "Kuliner Malang", "Kue Tradisional", "Puthu Celaket", "Smart Takeaway Malang", "Jajanan Pasar Malang"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#17110C] text-[#F8F4EC] selection:bg-[#D49B42] selection:text-[#17110C]">
        {children}
      </body>
    </html>
  );
}

