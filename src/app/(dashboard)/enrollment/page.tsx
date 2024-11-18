"use client"; // Agrega esta línea al inicio de tu archivo

import React, { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Receipt,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import EnrollmentStepper from "../../../components/EnrollmentStepper";
import CourseSelection from "../../../components/CourseSelection";
import ScholarshipApplication from "../../../components/ScholarshipApplication";
import InvoiceGeneration from "../../../components/InvoiceGeneration";
import PaymentProcess from "../../../components/PaymentProcess";
import EnrollmentConfirmation from "../../../components/EnrollmentConfirmation";

// types.ts
type Course = {
  id: string;
  name: string;
  credits: number;
  // ... otras propiedades del curso
};

export type Step = {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Selección de Cursos",
    icon: <BookOpen className="w-6 h-6" />,
    description: "Selecciona tus cursos para el próximo semestre",
  },
  {
    id: 2,
    title: "Solicitud de Becas",
    icon: <GraduationCap className="w-6 h-6" />,
    description: "Aplica para becas y ayudas financieras",
  },
  {
    id: 3,
    title: "Generación de Factura",
    icon: <Receipt className="w-6 h-6" />,
    description: "Revisa el detalle de tu factura",
  },
  {
    id: 4,
    title: "Proceso de Pago",
    icon: <CreditCard className="w-6 h-6" />,
    description: "Realiza el pago de tu matrícula",
  },
  {
    id: 5,
    title: "Confirmación",
    icon: <CheckCircle className="w-6 h-6" />,
    description: "Verifica el estado de tu matrícula",
  },
];

const Enrollment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [enrollmentData, setEnrollmentData] = useState({
    selectedCourses: [] as Course[],
    scholarships: [] as string[],
    invoice: null,
    payment: null,
    confirmation: null,
  });

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CourseSelection
            onNext={(courses) => {
              setEnrollmentData((prev) => ({
                ...prev,
                selectedCourses: courses,
              }));
              setCurrentStep(2);
            }}
          />
        );
      case 2:
        return (
          <ScholarshipApplication
            onNext={(scholarships) => {
              setEnrollmentData((prev) => ({ ...prev, scholarships }));
              setCurrentStep(3);
            }}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <InvoiceGeneration
            selectedCourses={enrollmentData.selectedCourses}
            scholarships={enrollmentData.scholarships}
            onNext={(invoice) => {
              setEnrollmentData((prev) => ({ ...prev, invoice }));
              setCurrentStep(4);
            }}
            onBack={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <PaymentProcess
            invoice={enrollmentData.invoice}
            onNext={(payment) => {
              setEnrollmentData((prev) => ({ ...prev, payment }));
              setCurrentStep(5);
            }}
            onBack={() => setCurrentStep(3)}
          />
        );
      case 5:
        return (
          <EnrollmentConfirmation
            enrollmentData={enrollmentData}
            onBack={() => setCurrentStep(4)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="w-[98%] h-[95%] bg-white rounded-md overflow-y-auto">
        {" "}
        {/* Clase overflow-y-auto añadida */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Sistema de Matrícula Universitaria
            </h1>
            <p className="text-lg text-gray-600">
              Gestiona tu proceso de matrícula de manera simple y eficiente
            </p>
          </header>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <EnrollmentStepper steps={steps} currentStep={currentStep} />
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enrollment;
