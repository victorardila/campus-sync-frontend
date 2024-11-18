"use client"; // Agrega esta línea

import { useEffect } from "react";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useEnrollment } from "@/hooks/useEnrollment";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Obtienes las funciones y estados del contexto.
  const { fetchCourses, fetchScholarships, errorCourses, errorScholarships } =
    useEnrollment();

  // Llamadas a las funciones para obtener los datos cuando se monta el componente.
  useEffect(() => {
    // Llamar a las funciones para obtener los cursos y becas solo una vez al montar el componente
    fetchCourses();
    fetchScholarships();
  }, []); // Dependencias vacías aseguran que esto se ejecute solo una vez al montar

  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/img/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold">Campus Sync App</span>
        </Link>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-gradient-to-r from-[#B2E0B2] to-[#C9F9C9] overflow-scroll flex flex-col">
        <Navbar />

        {/* Muestra un error si no se pueden cargar los cursos o becas */}
        {errorCourses && (
          <div>Error al cargar los cursos: {errorCourses.message}</div>
        )}
        {errorScholarships && (
          <div>Error al cargar las becas: {errorScholarships.message}</div>
        )}

        {/* Eliminar la sección que muestra cursos y becas */}
        {/* <div>
          <h2>Cursos</h2>
          <ul>
            {courses?.map((course) => (
              <li key={course.id}>{course.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Becas</h2>
          <ul>
            {scholarships?.map((scholarship) => (
              <li key={scholarship.id}>{scholarship.name}</li>
            ))}
          </ul>
        </div> */}

        {children}
      </div>
    </div>
  );
}
