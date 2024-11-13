// src/app/(auth)/layout.tsx

import React from "react";

export const metadata = {
  title: "Auth - CampusSync",
  description: "Authentication pages for CampusSync",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-r from-[#B2E0B2] to-[#C9F9C9] flex items-center justify-center h-screen w-full">
      <div className="flex items-center justify-center h-[80%] w-[30%]">
        {children}
      </div>
    </div>
  );
}
