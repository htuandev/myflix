import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { METADATA_TITLE } from "@/constants";

const roboto = Roboto({
  subsets: ["vietnamese", "latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: METADATA_TITLE,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`dark ${roboto.className}`}>{children}</body>
    </html>
  );
}
