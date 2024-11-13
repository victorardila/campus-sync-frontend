"use client"; // Asegúrate de que esta línea esté aquí

import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Image from "next/image";
import Link from "next/link"; // Importa el componente Link de Next.js
import { useRouter } from "next/navigation"; // Importar el hook useRouter de Next.js
import { toast, ToastContainer } from "react-toastify"; // Importar toast y ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Estilos de react-toastify

const SignIn = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState(""); // Cambia email a username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Inicializa el router para redirigir

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Llama a la función login del contexto
      await login({ username, password });

      // Muestra el mensaje de éxito utilizando react-toastify
      toast.success("¡Inicio de sesión exitoso!"); // Muestra el toast de éxito

      // Redirigir a la ruta /admin después de un login exitoso
      setTimeout(() => {
        router.push("/admin"); // Redirige al usuario a /admin
      }, 1000); // Espera 1 segundo para mostrar el toast antes de redirigir
    } catch (err: unknown) {
      if (err instanceof Error) {
        // Si el error es una instancia de Error, puedes acceder a `err.message`
        setError(err.message);
        toast.error(error); // Muestra el toast de éxito
      } else {
        // Si el error no es una instancia de Error, maneja el caso genérico
        setError("Ocurrió un error inesperado.");
        toast.error(error); // Muestra el toast de éxito
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
      <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-4/5">
        <input
          type="text" // Cambia el tipo a text
          placeholder="Nombre de usuario" // Cambia el placeholder
          value={username} // Usa el estado de username
          onChange={(e) => setUsername(e.target.value)} // Cambia email a username
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
        {/* Enlace para "Forgot password?" */}
        <Link
          href="/forgot-password"
          className="self-end text-blue-500 hover:underline mb-4"
        >
          ¿Olvidaste tu contraseña?
        </Link>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Iniciar Sesión
        </button>
      </form>
      {/* Mensaje para crear una cuenta */}
      <p className="mt-4">
        ¿No tienes una cuenta?{" "}
        <Link href="/sign-up" className="text-blue-500 hover:underline">
          Crea una aquí
        </Link>
      </p>

      {/* ToastContainer: Este componente debe estar en tu árbol de componentes */}
      <ToastContainer
        position="top-right" // Puedes cambiar la posición del toast
        autoClose={5000} // Tiempo que permanece visible (en ms)
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default SignIn;
