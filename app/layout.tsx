import type { Metadata } from "next";
import "./globals.css";
import { montserrat } from "@/utils/fonts";

export const metadata: Metadata = {
  title: "GodEye - By WadecX",
  description: "Application de recherche OSINT pour trouver des résultats à partir d'une requête.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${montserrat.variable}`}>
        {children}
      </body>
    </html>
  );
}
