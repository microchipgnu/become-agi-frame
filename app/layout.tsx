import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";

const fontSans = localFont({
  src: "./FiraCode-Regular.ttf",
  variable: "--font-sans",
  weight: "400",
});

export const metadata: Metadata = {
  title: "b{AGI}",
  description: "Train your model, share data, race to become AGI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen bg-background font-sans antialiased ${fontSans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
