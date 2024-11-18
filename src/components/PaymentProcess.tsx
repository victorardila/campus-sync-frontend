import React, { useState } from "react";
import { CreditCard, ChevronLeft, ChevronRight } from "lucide-react";
import { useEnrollment } from "@/hooks/useEnrollment"; // Importa el hook

interface PaymentProcessProps {
  invoice: any;
  onNext: (payment: any) => void;
  onBack: () => void;
}

const PaymentProcess: React.FC<PaymentProcessProps> = ({
  invoice,
  onNext,
  onBack,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { generateInvoice, processPayment, confirmEnrollment } =
    useEnrollment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Generar la factura
      const invoiceRequestDTO = {
        student: { id: invoice.studentId, name: invoice.studentName },
        courses: invoice.courses,
        scholarship: invoice.scholarship,
        amount: invoice.total,
      };
      const generatedInvoice = await generateInvoice(invoiceRequestDTO);

      // 2. Procesar el pago
      const payment = {
        method: paymentMethod,
        amount: invoice.total,
        date: new Date().toISOString(),
        status: "completed",
        transactionId: "trans_" + Date.now(), // Genera un ID ficticio
      };
      await processPayment(payment);

      // 3. Confirmar la inscripción
      await confirmEnrollment();

      // Llamar a onNext si todo fue exitoso
      onNext(payment);
    } catch (error) {
      console.error("Error durante el proceso de pago:", error);
      alert(
        "Ocurrió un error durante el proceso de pago. Por favor, intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Proceso de Pago</h2>
        <p className="text-gray-600 mt-1">
          Ingresa los datos de tu método de pago
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Selección de método de pago */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Método de Pago
            </h3>
            <div className="space-y-3">
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="credit"
                  checked={paymentMethod === "credit"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-3">Tarjeta de Crédito</span>
              </label>
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="debit"
                  checked={paymentMethod === "debit"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-3">Tarjeta de Débito</span>
              </label>
            </div>
          </div>

          {/* Formulario de datos de tarjeta */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre en la Tarjeta
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="card"
                className="block text-sm font-medium text-gray-700"
              >
                Número de Tarjeta
              </label>
              <input
                type="text"
                id="card"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="expiry"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de Expiración
                </label>
                <input
                  type="text"
                  id="expiry"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="cvv"
                  className="block text-sm font-medium text-gray-700"
                >
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </form>
        </div>

        {/* Resumen del pago */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Resumen del Pago
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">
                ${invoice.subtotal.toLocaleString()}
              </span>
            </div>
            {invoice.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Descuento</span>
                <span className="text-green-600">
                  -${invoice.discount.toLocaleString()}
                </span>
              </div>
            )}
            <div className="pt-4 border-t">
              <div className="flex justify-between text-lg font-bold">
                <span>Total a Pagar</span>
                <span className="text-blue-600">
                  ${invoice.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-between pt-6 border-t">
        <button
          onClick={onBack}
          className="inline-flex items-center px-6 py-3 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        >
          <ChevronLeft className="mr-2 w-5 h-5" />
          Atrás
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`inline-flex items-center px-6 py-3 rounded-lg text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } transition-colors duration-200`}
        >
          {loading ? "Procesando..." : "Procesar Pago"}
          {!loading && <ChevronRight className="ml-2 w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default PaymentProcess;
