// context/AuthContext.tsx

"use client"; // Asegúrate de que esta línea esté aquí

import React, { createContext, useState } from "react";

// Define el tipo para el usuario
interface User {
  id: string;
  username: string;
  name: string;
  creditosAcumulados: number;
  password: string;
  academicProgram: string;
  saldoPagar: number;
  tipoDescuento: string;
  money: number;
}

// Define el tipo para el contexto de autenticación
interface AuthContextType {
  login: (data: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  register: (data: {
    username: string;
    password: string;
    name: string;
  }) => Promise<void>;
  resetPassword: (data: { username: string }) => Promise<void>;
  updateUser: (user: User) => Promise<void>; // Nueva función
  user: User | null; // Cambia esto para reflejar el tipo de usuario
}

// Crea el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor del contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null); // Usa el tipo de usuario definido

  const login = async (data: { username: string; password: string }) => {
    const { username, password } = data; // Desestructura los datos

    const response = await fetch("/students/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    // Si la respuesta no es OK, lanza un error
    if (!response.ok) {
      throw new Error("Error al iniciar sesión. Verifica tus credenciales.");
    }

    const responseData = await response.json();
    console.log("Token:", responseData.token); // Verifica el valor del token

    // Si no hay token o usuario, lanza un error
    if (!responseData.token || !responseData.user) {
      throw new Error("Error: La respuesta del servidor no es válida.");
    }

    // Guarda el token y el usuario por separado
    localStorage.setItem("token", responseData.token);
    localStorage.setItem("user", JSON.stringify(responseData.user)); // Guarda el usuario también

    setUser(responseData.user); // Guarda el usuario en el estado
  };

  const logout = () => {
    setUser(null); // Limpia el usuario al cerrar sesión
    localStorage.removeItem("token"); // Opcional: limpiar el token al cerrar sesión
    localStorage.removeItem("user"); // Limpia el usuario del localStorage
  };

  const register = async (data: {
    username: string;
    password: string;
    name: string;
  }) => {
    const { username, password, name } = data; // Desestructura los datos

    const response = await fetch("http://localhost:8080/students/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, name }),
    });

    if (!response.ok) {
      throw new Error("Error al registrarse. Verifica tus datos.");
    }

    const responseData = await response.json();
    // Guarda el token o la información del usuario en el estado o en localStorage
    localStorage.setItem("token", responseData.token); // Asegúrate de que `responseData.token` sea el nombre correcto
    setUser(responseData.user); // Guarda la información del usuario en el estado
  };

  const resetPassword = async (data: { username: string }) => {
    const { username } = data; // Desestructura los datos

    const response = await fetch(
      "http://localhost:8080/students/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Error al restablecer la contraseña. Verifica tu correo."
      );
    }

    // Aquí podrías manejar la respuesta, como mostrar un mensaje de éxito
    return await response.json();
  };

  const updateUser = async (user: User) => {
    const response = await fetch(`/students/update/`, {
      method: "PUT", // O "PATCH" dependiendo de la API
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Enviar token de autorización
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar los datos del usuario.");
    }

    const updatedUser = await response.json();

    // Log para revisar la respuesta
    console.log("Usuario actualizado desde el backend:", updatedUser);

    // Verifica si el formato de la respuesta es correcto
    if (!updatedUser || !updatedUser.id) {
      throw new Error("La respuesta de la API no tiene el formato esperado.");
    }

    // Actualiza el estado con los nuevos datos
    setUser(updatedUser);

    // Actualiza la información en localStorage con los datos del usuario actualizado
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, register, resetPassword, updateUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Exporta el contexto
export { AuthContext };
