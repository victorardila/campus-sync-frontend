"use client"; // Asegúrate de que esta línea esté aquí

import React from "react";
import { Receipt, ChevronLeft, ChevronRight } from "lucide-react";
import { useEnrollment } from "@/hooks/useEnrollment"; // Importa el hook

interface Course {
  id: string;
  name: string;
  credits: number;
}

interface InvoiceGenerationProps {
  selectedCourses: Course[];
  onNext: (invoice: any) => void;
  onBack: () => void;
}

const CREDIT_COST = 150000; // Costo por crédito en pesos

const InvoiceGeneration: React.FC<InvoiceGenerationProps> = ({
  selectedCourses,
  onNext,
  onBack,
}) => {
  const { selectedScholarship } = useEnrollment(); // Obtén la beca seleccionada del contexto

  const calculateSubtotal = () => {
    return selectedCourses.reduce((total, course) => {
      return total + course.credits * CREDIT_COST;
    }, 0);
  };

  const calculateDiscount = (subtotal: number) => {
    let discount = 0;
    let discountType = "";

    if (selectedScholarship) {
      discount = selectedScholarship.discount / 100; // Convertir el porcentaje a decimal
      discountType = selectedScholarship.name; // Nombre de la beca
    }

    return { amount: subtotal * discount, type: discountType };
  };

  const subtotal = calculateSubtotal();
  const { amount: discount, type: discountType } = calculateDiscount(subtotal);
  const total = subtotal - discount;

  const handleNext = () => {
    const invoice = {
      subtotal,
      discount,
      total,
      courses: selectedCourses,
      scholarship: selectedScholarship,
      date: new Date().toISOString(),
    };
    onNext(invoice);
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
                      ${(course.credits * CREDIT_COST).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      ${CREDIT_COST.toLocaleString()} x {course.credits}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedScholarship && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Beca Aplicada
              </h4>
              <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {selectedScholarship.name.charAt(0).toUpperCase() +
                      selectedScholarship.name.slice(1)}
                  </span>
                  <span className="text-gray-900 font-medium">
                    {selectedScholarship.discount}%
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
                <span className="text-blue-600">${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
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
          onClick={handleNext}
          className="inline-flex items-center px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
        >
          Continuar al Pago
          <ChevronRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default InvoiceGeneration;
