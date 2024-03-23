import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "@/app/globals.css";

const firaCode = Fira_Code({ subsets: ["latin"] });

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
      <body className={`bg-background ${firaCode.className}`}>{children}</body>
    </html>
  );
}
