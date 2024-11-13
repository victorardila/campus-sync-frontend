// hooks/useAuth.ts

import { useContext } from 'react';
import { PaymentContext } from '../context/PaymentContext';

const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export default usePayment;
