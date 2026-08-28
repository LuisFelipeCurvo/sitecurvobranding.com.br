import type { Metadata } from "next";
import "./globals.css";
import { optika } from "./fonts";
import { ConstellationCanvas } from "@/components/constellation-canvas";

export const metadata: Metadata = {
  title: "Curvo Branding | inteligência de marca",
  description:
    "Construímos as marcas mais estruturadas do mercado. Estratégia de negócio, design de marcas, comunicação e tecnologias emergentes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`h-full antialiased ${optika.variable}`}>
      <body className="min-h-full flex flex-col bg-obsidian text-ghost font-sans">
        <ConstellationCanvas />
        {children}
      </body>
    </html>
  );
}
