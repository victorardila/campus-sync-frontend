import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";
import { EnrollmentProvider } from "../context/EnrollmentContext";
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
      <EnrollmentProvider>
        <html lang="en">
          <head>
            <link rel="icon" href="/assets/icon/favicon.ico" />
          </head>
          <body className={inter.className}>{children}</body>
        </html>
      </EnrollmentProvider>
    </AuthProvider>
  );
}
