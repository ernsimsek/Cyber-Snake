import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CYBER SNAKE // Neural Arcade System",
  description: "A futuristic cyberpunk snake game experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <div className="grain" />
        <div className="scanline" />
      </body>
    </html>
  );
}
