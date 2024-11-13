"use client";

import { useState } from "react";
import { CreditCard, Calendar, Receipt, ArrowRight } from "lucide-react";
import useAuth from "../../../hooks/useAuth"; // Importa el hook para acceder al contexto de autenticación
import usePayment from "../../../hooks/usePayment"; // Importa el hook para acceder al contexto de autenticación
import { toast, ToastContainer } from "react-toastify"; // Importar toast y ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Estilos de react-toastify

const Payments = () => {
  const { user, updateUser } = useAuth(); // Obtén el usuario desde el contexto
  const { registerPayment } = usePayment();
  const [error, setError] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("credit");

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("Usuario no encontrado.");
      toast.error(error);
      return;
    }

    try {
      // Registra el pago del usuario
      await registerPayment(user);

      const remainingBalance = user.money - user.saldoPagar;

      // Actualiza el usuario con el nuevo saldo y saldo a pagar a 0
      await updateUser({
        ...user,
        money: remainingBalance,
        saldoPagar: 0,
      });

      // Esto ahora está gestionado por el contexto y localStorage en updateUser
      toast.success("Pago realizado con éxito");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(error);
      } else {
        setError("Ocurrió un error inesperado.");
        toast.error(error);
      }
    }
  };

  const paymentMethods = [
    {
      id: "credit",
      name: "Tarjeta de Crédito",
      icon: CreditCard,
      description: "Pago seguro con tarjeta de crédito",
    },
    {
      id: "installments",
      name: "Plan de Pagos",
      icon: Calendar,
      description: "Divide tu pago en cuotas mensuales",
    },
    {
      id: "transfer",
      name: "Transferencia Bancaria",
      icon: Receipt,
      description: "Transferencia directa a cuenta universitaria",
    },
  ];

  return (
    <div className="space-y-6 px-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Realizar Pago</h2>
        <div className="text-lg font-semibold text-gray-700">
          Total a pagar: $
          {user?.saldoPagar ? user?.saldoPagar.toLocaleString("es-CO") : 1200}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;
          return (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`p-6 rounded-lg border ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              } text-left transition-colors`}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-lg ${
                    isSelected ? "bg-indigo-600" : "bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      isSelected ? "text-white" : "text-gray-600"
                    }`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-medium ${
                      isSelected ? "text-indigo-600" : "text-gray-900"
                    }`}
                  >
                    {method.name}
                  </h3>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Detalles del Pago
        </h3>
        {selectedMethod === "credit" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Tarjeta
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Expiración
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="123"
                />
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handlePay} // Aquí se llama a la función handlePay
          className="mt-6 w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <span>Proceder al Pago</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
      {/* ToastContainer: Este componente debe estar en tu árbol de componentes */}
      <ToastContainer
        position="top-right" // Puedes cambiar la posición del toast
        autoClose={5000} // Tiempo que permanece visible (en ms)
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Payments;
