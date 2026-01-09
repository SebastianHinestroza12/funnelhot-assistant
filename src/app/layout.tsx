import type { Metadata } from "next";
import { jakarta } from "@/app/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "Funnelhot AI - Gestión de Asistentes Inteligentes",
  description:
    "Crea, entrena y gestiona asistentes de IA personalizados para automatizar tus interacciones con leads",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${jakarta.className} font-sans bg-slate-50 text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
