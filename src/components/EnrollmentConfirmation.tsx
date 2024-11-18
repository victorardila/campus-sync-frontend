import React from "react";
import { CheckCircle, ChevronLeft } from "lucide-react";

interface EnrollmentConfirmationProps {
  enrollmentData: any;
  onBack: () => void;
}

const EnrollmentConfirmation: React.FC<EnrollmentConfirmationProps> = ({
  enrollmentData,
  onBack,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          ¡Matrícula Completada con Éxito!
        </h2>
        <p className="text-gray-600 mt-2">
          Tu proceso de matrícula ha sido confirmado. A continuación encontrarás
          el resumen de tu inscripción.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Cursos Inscritos
          </h3>
          <div className="space-y-2">
            {enrollmentData.selectedCourses.map((course: any) => (
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
              </div>
            ))}
          </div>
        </div>

        {Array.isArray(enrollmentData.scholarships) &&
          enrollmentData.scholarships.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Becas Aplicadas
              </h3>
              <div className="bg-white p-4 rounded-lg">
                <ul className="space-y-2">
                  {enrollmentData.scholarships.map((scholarship: string) => (
                    <li key={scholarship} className="text-gray-600">
                      {scholarship.charAt(0).toUpperCase() +
                        scholarship.slice(1)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Detalles del Pago
          </h3>
          <div className="bg-white p-4 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">
                  ${enrollmentData.invoice.subtotal.toLocaleString()}
                </span>
              </div>
              {enrollmentData.invoice.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Descuento</span>
                  <span className="text-green-600">
                    -${enrollmentData.invoice.discount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="pt-2 border-t">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Pagado</span>
                  <span className="text-blue-600">
                    ${enrollmentData.invoice.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            Próximos Pasos
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>
              • Recibirás un correo de confirmación con los detalles de tu
              matrícula
            </li>
            <li>• Revisa tu horario de clases en el portal estudiantil</li>
            <li>• Descarga el calendario académico actualizado</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t">
        <button
          onClick={onBack}
          className="inline-flex items-center px-6 py-3 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        >
          <ChevronLeft className="mr-2 w-5 h-5" />
          Volver
        </button>
      </div>
    </div>
  );
};

export default EnrollmentConfirmation;
