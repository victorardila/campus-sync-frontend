import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/students/:path*",
        destination: "http://localhost:8080/students/:path*", // Ruta de la API de estudiantes
      },
      {
        source: "/api/enrollment/:path*",
        destination: "http://localhost:8080/api/enrollment/:path*", // Ruta de la API de matrícula
      },
      {
        source: "/api/courses/:path*",
        destination: "http://localhost:8080/api/courses/:path*", // Ruta de la API de cursos
      },
      {
        source: "/api/scholarship/:path*",
        destination: "http://localhost:8080/api/scholarship/:path*", // Ruta de la API de becas
      },
      {
        source: "/api/invoices/:path*",
        destination: "http://localhost:8080/api/invoices/:path*", // Ruta de la API de facturas
      },
      {
        source: "/api/payments/:path*",
        destination: "http://localhost:8080/api/payments/:path*", // Ruta de la API de pagos
      },
      {
        source: "/img/:path*", // Para imágenes
        destination: "/assets/img/:path*", // Ruta de las imágenes
      },
      {
        source: "/icon/:path*", // Para íconos
        destination: "/assets/icon/:path*", // Ruta de los íconos
      },
      {
        source: "/svg/:path*", // Para SVGs
        destination: "/assets/svg/:path*", // Ruta de los SVGs
      },
      {
        source: "/fonts/:path*", // Para SVGs
        destination: "/assets/fonts/:path*", // Ruta de las fuentes
      },
      // Puedes agregar más rutas aquí si tienes otras carpetas
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com", // Dominio de Pexels
        port: "", // Puedes dejarlo vacío si no es necesario
        pathname: "/photos/**", // Ajusta el path según sea necesario
      },
      // Agrega otros patrones si es necesario
    ],
  },
};

export default nextConfig;
