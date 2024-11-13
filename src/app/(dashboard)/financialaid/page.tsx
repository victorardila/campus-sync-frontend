import React from "react";
import { Award, FileText, CheckCircle2, AlertCircle } from "lucide-react";

interface Scholarship {
  id: number;
  name: string;
  amount: number;
  status: "approved" | "pending";
  description: string;
  requirements: string[];
}

const FinancialAid: React.FC = () => {
  const scholarships: Scholarship[] = [
    {
      id: 1,
      name: "Beca por Excelencia Académica",
      amount: 1500,
      status: "approved",
      description: "Beca otorgada por mantener un promedio superior a 9.0",
      requirements: ["Promedio mínimo 9.0", "Carga académica completa"],
    },
    {
      id: 2,
      name: "Apoyo Socioeconómico",
      amount: 1000,
      status: "pending",
      description: "Apoyo basado en necesidad económica demostrada",
      requirements: [
        "Estudio socioeconómico",
        "Documentación de ingresos",
        "Carta de motivos",
      ],
    },
  ];

  return (
    <div className="px-6 py-6 space-y-6">
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Ayuda Financiera</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Nueva Solicitud
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SummaryCard approvedAmount={1500} pendingAmount={1000} />
        <DocumentsCard />
      </div>

      <section className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Becas Disponibles</h3>
        {scholarships.map((scholarship) => (
          <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
        ))}
      </section>
    </div>
  );
};

interface SummaryCardProps {
  approvedAmount: number;
  pendingAmount: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  approvedAmount,
  pendingAmount,
}) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200">
    <h3 className="text-lg font-medium text-gray-900 mb-4">
      Resumen de Ayuda Financiera
    </h3>
    <div className="space-y-4">
      <SummaryItem
        label="Becas Aprobadas"
        amount={approvedAmount}
        amountClass="text-green-600"
      />
      <SummaryItem
        label="Becas Pendientes"
        amount={pendingAmount}
        amountClass="text-yellow-600"
      />
      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-base font-medium text-gray-900">
            Total Potencial
          </span>
          <span className="text-base font-medium text-gray-900">
            ${(approvedAmount + pendingAmount).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const SummaryItem: React.FC<{
  label: string;
  amount: number;
  amountClass: string;
}> = ({ label, amount, amountClass }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-gray-500">{label}</span>
    <span className={`text-sm font-medium ${amountClass}`}>
      ${amount.toFixed(2)}
    </span>
  </div>
);

const DocumentsCard: React.FC = () => (
  <div className="bg-white p-6 rounded-lg border border-gray-200">
    <h3 className="text-lg font-medium text-gray-900 mb-4">
      Documentos Requeridos
    </h3>
    <div className="space-y-4">
      <DocumentItem name="Comprobante de Ingresos" completed />
      <DocumentItem name="Historial Académico" completed />
      <DocumentItem name="Carta de Motivos" />
    </div>
  </div>
);

interface DocumentItemProps {
  name: string;
  completed?: boolean;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ name, completed }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <FileText className="h-5 w-5 text-gray-400 mr-2" />
      <span className="text-sm text-gray-700">{name}</span>
    </div>
    {completed ? (
      <CheckCircle2 className="h-5 w-5 text-green-500" />
    ) : (
      <AlertCircle className="h-5 w-5 text-yellow-500" />
    )}
  </div>
);

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200">
    <div className="flex items-start justify-between">
      <div className="flex items-start space-x-4">
        <div
          className={`p-3 rounded-lg ${
            scholarship.status === "approved" ? "bg-green-100" : "bg-yellow-100"
          }`}
        >
          <Award
            className={`h-6 w-6 ${
              scholarship.status === "approved"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          />
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-900">
            {scholarship.name}
          </h4>
          <p className="text-sm text-gray-500 mt-1">
            {scholarship.description}
          </p>
          <div className="mt-4">
            <h5 className="text-sm font-medium text-gray-700 mb-2">
              Requisitos:
            </h5>
            <ul className="list-disc list-inside space-y-1">
              {scholarship.requirements.map((req, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-lg font-semibold text-gray-900">
          ${scholarship.amount.toFixed(2)}
        </span>
        <span
          className={`text-sm ${
            scholarship.status === "approved"
              ? "text-green-600"
              : "text-yellow-600"
          }`}
        >
          {scholarship.status === "approved" ? "Aprobada" : "En Revisión"}
        </span>
      </div>
    </div>
  </div>
);

// Asegúrate de exportarlo como `default`
export default FinancialAid;
