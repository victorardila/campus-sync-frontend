"use client"; // Esta línea hace que el componente se ejecute en el cliente.

import { role } from "@/lib/data";
import { useRouter } from "next/navigation"; // Cambia la importación aquí
import { Home, User, Settings, LogOut, CreditCard } from "lucide-react"; // Importa los iconos necesarios
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: Home,
        label: "Home",
        href: "/admin",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: User,
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: CreditCard, // Icono para "Pagos"
        label: "Matricula",
        href: "/enrollment",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: User,
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: Settings,
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: LogOut,
        label: "Logout",
        href: "/sign-in", // Puedes cambiar esto si prefieres redirigir de otra manera
        visible: ["admin", "teacher", "student", "parent"],
        action: "logout", // Agregamos una propiedad "action" para identificar el logout
      },
    ],
  },
];

const Menu = () => {
  const router = useRouter(); // Inicializa el hook useRouter para la navegación

  // Función para manejar el logout
  const handleLogout = () => {
    // Elimina los datos del localStorage relacionados con el usuario
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Si usas un contexto de autenticación, también puedes limpiarlo aquí:
    // authContext.logout(); // Por ejemplo, si tu AuthContext tiene un método logout

    // Redirige al usuario a la página de inicio de sesión
    router.push("/sign-in"); // O la página que prefieras
  };
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              const IconComponent = item.icon; // Obtén el componente del icono
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                  onClick={item.action === "logout" ? handleLogout : undefined} // Ejecuta handleLogout en el caso de logout
                >
                  <IconComponent size={20} /> {/* Renderiza el icono */}
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
            return null; // Asegúrate de retornar algo si no se cumple la condición
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
