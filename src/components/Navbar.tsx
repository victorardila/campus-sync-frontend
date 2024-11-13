"use client"; // Asegura que el archivo se ejecute solo en el cliente

import { Search, MessageCircle, Bell, DollarSign } from "lucide-react";
import useAuth from "../hooks/useAuth"; // Importa el hook para acceder al contexto de autenticación

const Navbar = () => {
  const { user } = useAuth(); // Obtén el usuario desde el contexto

  return (
    <div className="flex items-center justify-between p-4">
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full bg-white bg-opacity-80 ring-[1.5px] ring-gray-300 px-2 shadow-md">
        <Search size={14} /> {/* Icono de búsqueda */}
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>
      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <MessageCircle size={20} /> {/* Icono de mensajes */}
        </div>
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Bell size={20} /> {/* Icono de anuncios */}
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-yellow-400 text-black rounded-full text-xs">
            1
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
            <DollarSign size={20} /> {/* Icono de dinero */}
          </div>
          <span className="text-sm font-medium">
            ${user?.money ? user?.money.toLocaleString("es-CO") : 0} COP{" "}
            {/* Monto de dinero en COP */}
          </span>
        </div>
        <div className="flex flex-col">
          {/* Mostrar el nombre del usuario */}
          <span className="text-xs leading-3 font-medium">
            {user?.name || "John Doe"}
          </span>
          <span className="text-[10px] text-gray-500 text-right">Student</span>
        </div>
        <div className="bg-white rounded-full w-9 h-9 flex items-center justify-center">
          {/* Iniciales del usuario */}
          <span className="text-gray-500">
            {user?.name ? user.name[0] : "JD"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
