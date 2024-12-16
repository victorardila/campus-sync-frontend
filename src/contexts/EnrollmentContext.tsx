"use client"; // Asegúrate de que esta línea esté aquí

import React, { createContext, useState } from "react";

// Definición de tipo para Course
type Course = {
  id: number;
  code: string;
  name: string;
  credits: number;
  teacher: string;
  currentQuantity: number;
  maxQuantity: number;
  schedule: string;
};

// Definición de tipo para Invoice
interface Invoice {
  id: number;
  invoiceDate: string;
  discount: number;
  amount: number;
}

// Definición de tipo para Scholarship
interface Scholarship {
  id: number;
  name: string;
  description: string;
  requirements: string[];
  discount: number;
}

// Define el tipo de error
type ErrorType = {
  message: string;
};

// Define el tipo para InvoiceRequestDTO, incluyendo el campo amount
interface InvoiceRequestDTO {
  student: {
    id: number;
    name: string;
  };
  courses: Course[];
  scholarship: Scholarship;
}

// Define el tipo para Payment
interface Payment {
  id: number;
  paymentMethod: string; // Asegúrate de que esta propiedad esté correctamente nombrada
  number: string; // Número de tarjeta
  cvv: string; // CVV
  amount: number; // Monto
  expirationDate: string; // Fecha de expiración
  paymentDate: string; // Fecha de pago
  status: string;
  transactionId: string; // ID de transacción
}

// Define el tipo para el contexto de inscripción
interface EnrollmentContextType {
  courses: Course[] | null;
  scholarships: Scholarship[] | null;
  errorCourses: ErrorType | null;
  errorScholarships: ErrorType | null;
  selectedScholarship: Scholarship | null;
  fetchCourses: () => Promise<void>;
  fetchScholarships: () => Promise<void>;
  updateSelectedScholarship: (scholarship: Scholarship | null) => void;
  getCreditCost: () => Promise<number>;
  generateInvoice: (invoiceRequestDTO: InvoiceRequestDTO) => Promise<Invoice>;
  processPayment: (payment: Payment, studentId: number) => Promise<string>;
  confirmEnrollment: () => Promise<string>;
}

// Crea el contexto
const EnrollmentContext = createContext<EnrollmentContextType | undefined>(
  undefined
);

// Proveedor del contexto
export const EnrollmentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [scholarships, setScholarships] = useState<Scholarship[] | null>(null);
  const [errorCourses, setErrorCourses] = useState<ErrorType | null>(null);
  const [errorScholarships, setErrorScholarships] = useState<ErrorType | null>(
    null
  );
  const [selectedScholarship, setSelectedScholarship] =
    useState<Scholarship | null>(null);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses/all");
      if (!response.ok) {
        throw new Error("Error al obtener los cursos");
      }
      const data = await response.json();
      setCourses(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorCourses({ message: error.message });
      } else {
        setErrorCourses({ message: "Ocurrió un error desconocido" });
      }
    }
  };

  const fetchScholarships = async () => {
    try {
      const response = await fetch("/api/scholarship/all");
      if (!response.ok) {
        throw new Error("Error al obtener las becas");
      }
      const data = await response.json();
      setScholarships(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorScholarships({ message: error.message });
      } else {
        setErrorScholarships({ message: "Ocurrió un error desconocido" });
      }
    }
  };

  const updateSelectedScholarship = (scholarship: Scholarship | null) => {
    setSelectedScholarship(scholarship);
  };

  // peticion a la URI /api/enrollment/credit-cost QUE NO RECIBE NADA y retorna el valor de creditos
  const getCreditCost = async () => {
    try {
      const response = await fetch("/api/enrollment/credit-cost");
      if (!response.ok) {
        throw new Error("Error al obtener el costo de los créditos");
      }
      const data = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Ocurrió un error desconocido");
      }
    }
  };

  const generateInvoice = async (invoiceRequestDTO: InvoiceRequestDTO) => {
    try {
      const response = await fetch("/api/enrollment/generate-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoiceRequestDTO),
      });
      if (!response.ok) {
        throw new Error("Error al generar la factura");
      }
      const data = await response.json();
      return data; // Retorna la factura generada
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Ocurrió un error desconocido");
      }
    }
  };

  const processPayment = async (payment: Payment, studentId: number) => {
    try {
      const response = await fetch("/api/enrollment/process-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payment, studentId }), // Envía ambos parámetros en el body
      });
      if (!response.ok) {
        throw new Error("Error al procesar el pago");
      }
      const data = await response.text(); // Si esperas un texto
      return data; // Retorna el mensaje de éxito
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Ocurrió un error desconocido");
      }
    }
  };

  const confirmEnrollment = async () => {
    try {
      const response = await fetch("/api/enrollment/confirm-enrollment");
      if (!response.ok) {
        throw new Error("Error al confirmar la matrícula");
      }
      const data = await response.text(); // Si esperas un texto
      console.log(data);
      return data; // Retorna el mensaje de confirmación
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Ocurrió un error desconocido");
      }
    }
  };

  return (
    <EnrollmentContext.Provider
      value={{
        courses,
        scholarships,
        errorCourses,
        errorScholarships,
        selectedScholarship,
        fetchCourses,
        fetchScholarships,
        updateSelectedScholarship,
        getCreditCost,
        generateInvoice,
        processPayment,
        confirmEnrollment,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
};

export { EnrollmentContext };
