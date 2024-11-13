"use client"; // Asegúrate de que esta línea esté aquí

import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth"; // Asegúrate de que la ruta sea correcta
import Image from "next/image";
import Link from "next/link"; // Importa el componente Link de Next.js

const SignUp = () => {
  const { register } = useAuth(); // Asegúrate de tener esta función en tu contexto
  const [name, setName] = useState("");
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await register({ name, username, password }); // Llama a la función para registrar al usuario
      setMessage(
        "¡Registro exitoso! Verifica tu correo para confirmar tu cuenta."
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        // Si el error es una instancia de Error, puedes acceder a `err.message`
        setError(err.message);
      } else {
        // Si el error no es una instancia de Error, maneja el caso genérico
        setError("Ocurrió un error inesperado.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full rounded-[20px] shadow-md bg-white p-6">
      <Image
        src="/img/logo.png"
        alt="Descripción de la imagen"
        width={180}
        height={180}
        className="mb-4"
      />
      <h1 className="text-2xl font-bold mb-4">Crear Cuenta</h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-4/5">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={username}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Registrarse
        </button>
      </form>
      <p className="mt-4">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/sign-in" className="text-blue-500 hover:underline">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
