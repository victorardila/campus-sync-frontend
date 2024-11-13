"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/sign-in"); // Redirige directamente a /sign-in
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Texto encima de la imagen */}
      <h1 className="text-7xl font-bold mb-4 font-GeistVF">Compus Sync App</h1>

      <Image
        src="/img/logo.png"
        alt="Descripción de la imagen"
        width={300}
        height={300}
        className="mb-4"
      />
      <button
        onClick={handleLoginClick}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Iniciar Sesión
      </button>
    </div>
  );
};

export default Home;
