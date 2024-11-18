// hooks/useAuth.ts

import { useContext } from 'react';
import { EnrollmentContext } from '../context/EnrollmentContext';

// Hook para usar el contexto en componentes
export const useEnrollment = () => {
    const context = useContext(EnrollmentContext);
    if (!context) {
      throw new Error("useEnrollment debe usarse dentro de EnrollmentProvider");
    }
    return context;
  };
  