export type Student = {
  id: number; // Identificador único del estudiante
  name: string; // Nombre del estudiante
  academicProgram: string; // Programa académico del estudiante
  tipoDescuento: string; // Tipo de descuento ("beca", "votaciones", "descendencia")
  saldoPagar: number; // Saldo que debe pagar
  creditosAcumulados: number; // Créditos acumulados por el estudiante
  username: string; // Nombre de usuario
  password: string; // Contraseña (considera no exponer esto en el frontend)
  money: number; // Dinero disponible
};
