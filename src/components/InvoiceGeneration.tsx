"use client"; // Asegúrate de que esta línea esté aquí

import React, { useEffect, useState } from "react";
import { Receipt, ChevronLeft, ChevronRight } from "lucide-react";
import { useEnrollment } from "@/hooks/useEnrollment"; // Importa el hook
import { Invoice } from "@/models/Invoice";
import { Course } from "../models/Course";
import { Scholarship } from "@/models/Scholarship";
import { Student } from "@/models/Student"; // Asegúrate de importar el modelo Student

interface InvoiceGenerationProps {
  selectedCourses: Course[]; // Recibe los cursos seleccionados
  scholarships: Scholarship[]; // Recibe las becas seleccionadas
  onNext: (invoice: Invoice) => void;
  onBack: () => void;
}

const InvoiceGeneration: React.FC<InvoiceGenerationProps> = ({
  selectedCourses,
  scholarships,
  onNext,
  onBack,
}) => {
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null); // Estado para el estudiante
  const [creditCost, setCreditCost] = useState<number | null>(null); // Estado para el costo por crédito
  const { getCreditCost } = useEnrollment();

  useEffect(() => {
    // Cargar datos del estudiante desde localStorage
    const studentData = localStorage.getItem("user");
    if (studentData) {
      setCurrentStudent(JSON.parse(studentData)); // Parsear el JSON y establecer el estado
    }

    // Obtener el costo por crédito
    const fetchCreditCost = async () => {
      try {
        const cost = await getCreditCost();
        setCreditCost(cost); // Establecer el costo por crédito en el estado
      } catch (error) {
        console.error("Error al obtener el costo por crédito:", error);
      }
    };

    fetchCreditCost();
  }, [getCreditCost]);

  const calculateSubtotal = () => {
    if (creditCost === null) return 0;
    return selectedCourses.reduce((total, course) => {
      return total + course.credits * creditCost;
    }, 0);
  };

  const calculateDiscount = (subtotal: number) => {
    let discount = 0;
    let discountType = "";

    if (scholarships.length > 0) {
      const appliedScholarship = scholarships[0]; // Ejemplo: tomar la primera beca
      discount = appliedScholarship.discount / 100; // Convertir el porcentaje a decimal
      discountType = appliedScholarship.name; // Nombre de la beca
    }

    return { amount: subtotal * discount, type: discountType };
  };

  const subtotal = calculateSubtotal();
  const { amount: discount, type: discountType } = calculateDiscount(subtotal);
  const total = subtotal - discount;

  const handleNext = () => {
    if (!currentStudent) {
      console.error("No hay estudiante disponible");
      return;
    }

    const invoice: Invoice = {
      subtotal,
      discount,
      total,
      courses: selectedCourses,
      scholarship: scholarships[0],
      date: new Date().toISOString(),
      student: currentStudent,
    };
    onNext(invoice); // Aquí se llama a onNext con el objeto invoice
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Generación de Factura
        </h2>
        <p className="text-gray-600 mt-1">
          Revisa el detalle de tu factura antes de proceder al pago
        </p>
      </div>

      {creditCost === null ? (
        <p className="text-gray-500">Cargando información...</p>
      ) : (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Receipt className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                Detalle de Factura
              </h3>
            </div>
            <div className="text-sm text-gray-500">
              Fecha: {new Date().toLocaleDateString()}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Cursos Seleccionados
              </h4>
              <div className="space-y-2">
                {selectedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex justify-between items-center bg-white p-4 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{course.name}</p>
                      <p className="text-sm text-gray-500">
                        {course.credits} créditos
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ${(course.credits * creditCost).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        ${creditCost.toLocaleString()} x {course.credits}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {scholarships.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Beca Aplicada
                </h4>
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {scholarships[0].name.charAt(0).toUpperCase() +
                        scholarships[0].name.slice(1)}
                    </span>
                    <span className="text-gray-900 font-medium">
                      {scholarships[0].discount}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Descuento (
                      {discountType.charAt(0).toUpperCase() +
                        discountType.slice(1)}
                      )
                    </span>
                    <span className="text-green-600 font-medium">
                      -${discount.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2">
                  <span className="text-gray-900">Total a Pagar</span>
                  <span className="text-blue-600">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-6 border-t">
        <button
          onClick={onBack}
          className="inline-flex items-center px-6 py-3 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        >
          <ChevronLeft className="mr-2 w-5 h-5" />
          Atrás
        </button>
        <button
          onClick={handleNext}
          disabled={creditCost === null} // Deshabilitar si no se ha cargado el costo por crédito
          className={`inline-flex items-center px-6 py-3 rounded-lg text-white ${
            creditCost === null
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          } transition-colors duration-200`}
        >
          Continuar al Pago
          <ChevronRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default InvoiceGeneration;
