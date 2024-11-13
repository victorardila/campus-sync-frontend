import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";
import { PaymentProvider } from "../context/PaymentContext"; // Asegúrate de importar PaymentProvider
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Campus Sync",
  description:
    "Application for the management of financial registrations using simulated microservices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <PaymentProvider>
        <html lang="en">
          <head>
            <link rel="icon" href="/assets/icon/favicon.ico" />
          </head>
          <body className={inter.className}>{children}</body>
        </html>
      </PaymentProvider>
    </AuthProvider>
  );
}
