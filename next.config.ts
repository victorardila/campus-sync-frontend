import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/students/:path*',
        destination: 'http://localhost:8080/students/:path*', // Proxy a tu servidor
      },
      {
        source: '/api/enrollment/:path*',
        destination: 'http://localhost:8080/api/enrollment/:path*', // Proxy a tu servidor
      },
      {
        source: '/api/courses/:path*',
        destination: 'http://localhost:8080/api/courses/:path*', // Proxy a tu servidor
      },
      {
        source: '/api/scholarship/:path*',
        destination: 'http://localhost:8080/api/scholarship/:path*', // Proxy a tu servidor
      },
      {
        source: '/api/invoices/:path*',
        destination: 'http://localhost:8080/api/invoices/:path*', // Proxy a tu servidor
      },
      {
        source: '/api/payments/:path*',
        destination: 'http://localhost:8080/api/payments/:path*', // Proxy a tu servidor
      },
      {
        source: '/img/:path*',  // Para imágenes
        destination: '/assets/img/:path*',
      },
      {
        source: '/icon/:path*',  // Para íconos
        destination: '/assets/icon/:path*',
      },
      {
        source: '/svg/:path*',  // Para SVGs
        destination: '/assets/svg/:path*',
      },
      {
        source: '/fonts/:path*',  // Para SVGs
        destination: '/assets/fonts/:path*',
      },
      // Puedes agregar más rutas aquí si tienes otras carpetas
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com', // Dominio de Pexels
        port: '', // Puedes dejarlo vacío si no es necesario
        pathname: '/photos/**', // Ajusta el path según sea necesario
      },
      // Agrega otros patrones si es necesario
    ],
  },
};

export default nextConfig;
