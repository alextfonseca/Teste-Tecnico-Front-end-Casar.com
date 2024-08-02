import "@/styles/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SearchHub",
  description: "SearchHub - A search engine for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={poppins.className}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
