import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mateo Mercado | Desarrollador Backend",
  description:
    "Portafolio de Mateo Mercado, desarrollador backend: APIs REST con Node.js, Express, NestJS, TypeScript y PostgreSQL.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={jakarta.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
