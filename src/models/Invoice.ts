import { Course } from "./Course";
import { Scholarship } from "./Scholarship";
import { Student } from "./Student";

export type Invoice = {
  subtotal: number;
  discount: number;
  total: number;
  courses: Course[];
  scholarship: Scholarship;
  date: string; // O puedes usar Date si prefieres
  student: Student; // Añadir el campo student
};
