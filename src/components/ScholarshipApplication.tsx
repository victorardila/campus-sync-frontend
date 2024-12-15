"use client"; // Asegúrate de que esta línea esté aquí

import React, { useEffect, useState } from "react";
import { GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import { useEnrollment } from "@/hooks/useEnrollment"; // Importa el hook
import { Scholarship } from "@/models/Scholarship"; // Asegúrate de importar el modelo Scholarship

interface ScholarshipApplicationProps {
  onNext: (scholarships: Scholarship[]) => void; // Asegúrate de que el tipo sea correcto
  onBack: () => void;
}

const ScholarshipApplication: React.FC<ScholarshipApplicationProps> = ({
  onNext,
  onBack,
}) => {
  const { scholarships, fetchScholarships, updateSelectedScholarship } =
    useEnrollment(); // Obtén las becas del contexto
  const [selectedScholarship, setSelectedScholarship] =
    useState<Scholarship | null>(null); // Cambia a un objeto

  useEffect(() => {
    fetchScholarships(); // Llama a la función para obtener las becas al montar el componente
  }, [fetchScholarships]);

  const toggleScholarship = (scholarship: Scholarship) => {
    // Si ya está seleccionado, lo deseleccionamos, de lo contrario, lo seleccionamos
    setSelectedScholarship(
      selectedScholarship?.id === scholarship.id ? null : scholarship
    );
  };

  const handleNext = () => {
    if (selectedScholarship) {
      updateSelectedScholarship(selectedScholarship); // Almacena la beca seleccionada en el contexto
      onNext([selectedScholarship]); // Cambia aquí para pasar el objeto completo
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Solicitud de Becas</h2>
        <p className="text-gray-600 mt-1">
          Selecciona la beca o ayuda financiera a la que deseas aplicar
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {scholarships?.map((scholarship) => (
          <div
            key={scholarship.id}
            className={`
              relative rounded-lg border p-6 cursor-pointer
              transition-all duration-200
              ${
                selectedScholarship?.id === scholarship.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
              }
            `}
            onClick={() => toggleScholarship(scholarship)}
          >
            <div className="absolute top-4 right-4">
              <GraduationCap
                className={`
                w-6 h-6
                ${
                  selectedScholarship?.id === scholarship.id
                    ? "text-blue-600"
                    : "text-gray-400"
                }
              `}
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {scholarship.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {scholarship.description}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Requisitos:
                </h4>
                <ul className="space-y-1">
                  {scholarship.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-600 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t">
                <span className="text-lg font-bold text-blue-600">
                  Descuento: {scholarship.discount}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-6 border-t">
        <button
          onClick={onBack}
          className="inline-flex items-center px-6 py-3 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        >
          <ChevronLeft className="mr-2 w-5 h-5" />
          Atrás
        </button>
        <button
          onClick={handleNext} // Llama a handleNext
          disabled={selectedScholarship === null} // Deshabilita el botón si no hay selección
          className={`inline-flex items-center px-6 py-3 rounded-lg text-white ${
            selectedScholarship
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Continuar
          <ChevronRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ScholarshipApplication;
