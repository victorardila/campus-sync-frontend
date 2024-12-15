export type Payment = {
  id: number;
  paymentMethod: string; // Asegúrate de que esta propiedad esté correctamente nombrada
  number: string; // Número de tarjeta
  cvv: string; // CVV
  expirationDate: string; // Fecha de expiración
  paymentDate: string; // Fecha de pago
  status: string;
  transactionId: string; // ID de transacción
};
