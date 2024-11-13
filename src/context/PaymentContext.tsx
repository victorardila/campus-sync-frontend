// context/PaymentContext.tsx

"use client";

import React, { createContext, useState } from "react";

interface User {
  id: string;
  username: string;
  name: string;
  creditosAcumulados: number;
  password: string;
  academicProgram: string;
  saldoPagar: number;
  tipoDescuento: string;
  money: number;
}

// Define el tipo de pago
interface Payment {
  id: string;
  typeDiscount: string;
}

// Define el tipo para el contexto de pagos
interface PaymentContextType {
  getPayment: (id: string) => Promise<Payment | null>;
  updatePayment: (id: string, typeDiscount: string) => Promise<void>;
  registerPayment: (user: User) => Promise<Payment>;
  payment: Payment | null;
}

// Crea el contexto
const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

// Proveedor del contexto
export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [payment, setPayment] = useState<Payment | null>(null);

  // Obtener un pago por ID
  const getPayment = async (id: string): Promise<Payment | null> => {
    const response = await fetch(`/api/payments/${id}`);
    if (!response.ok) {
      console.error("Error al obtener el pago");
      return null;
    }

    const paymentData = await response.json();
    setPayment(paymentData); // Actualiza el estado con el pago obtenido
    return paymentData;
  };

  // Actualizar un pago (cambiar el tipo de descuento)
  const updatePayment = async (id: string, typeDiscount: string) => {
    const response = await fetch(`/api/enrollment/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ typeDiscount }),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el tipo de descuento.");
    }

    // Actualiza el estado local tras una actualización exitosa
    const updatedPayment = await response.json();
    setPayment(updatedPayment);
  };

  // Registrar un nuevo pago, recibe un `User` pero extrae solo `typeDiscount`
  const registerPayment = async (user: User): Promise<Payment> => {
    const response = await fetch(`/api/enrollment/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), // Solo pasa `typeDiscount`
    });

    if (!response.ok) {
      throw new Error("Error al registrar el pago.");
    }

    const newPayment = await response.json();
    setPayment(newPayment); // Actualiza el estado con el nuevo pago
    return newPayment;
  };

  return (
    <PaymentContext.Provider
      value={{ getPayment, updatePayment, registerPayment, payment }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

// Exporta el contexto
export { PaymentContext };
