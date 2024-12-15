import React, { useState } from "react";
import { BookOpen, Clock, Users, ChevronRight } from "lucide-react";
import { useEnrollment } from "@/hooks/useEnrollment"; // Importa el hook
import { Course } from "@/models/Course"; // Asegúrate de importar el modelo Course

interface CourseSelectionProps {
  onNext: (courses: Course[]) => void;
}

const CourseSelection: React.FC<CourseSelectionProps> = ({ onNext }) => {
  const { courses } = useEnrollment(); // Obtén los cursos del contexto
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  const toggleCourse = (course: Course) => {
    if (selectedCourses.find((c) => c.id === course.id)) {
      setSelectedCourses(selectedCourses.filter((c) => c.id !== course.id));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Selección de Cursos
        </h2>
        <p className="text-gray-600 mt-1">
          Selecciona los cursos que deseas tomar este semestre
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {courses?.map(
          (
            course // Usa los cursos del contexto
          ) => (
            <div
              key={course.id}
              className={`
              relative rounded-lg border p-6 cursor-pointer
              transition-all duration-200
              ${
                selectedCourses.find((c) => c.id === course.id)
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
              }
            `}
              onClick={() => toggleCourse(course)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {course.name}
                  </h3>
                  <p className="text-sm text-gray-500">codigo: {course.code}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {course.credits} créditos
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {course.schedule}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {course.teacher}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  {course.name}/{course.maxQuantity} estudiantes
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <div className="flex justify-end pt-6 border-t">
        <button
          onClick={() => onNext(selectedCourses)}
          disabled={selectedCourses.length === 0}
          className={`
            inline-flex items-center px-6 py-3 rounded-lg text-white
            transition-colors duration-200
            ${
              selectedCourses.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }
          `}
        >
          Continuar
          <ChevronRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CourseSelection;
