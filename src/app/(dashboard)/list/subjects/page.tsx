import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import { role, subjectsData } from "@/lib/data";
import { Book, Clock, Users, Filter, SortAsc } from "lucide-react";

const SubjectListPage = () => {
  return (
    <div className="space-y-6 bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Lista de Asignaturas
        </h2>
        <div className="flex items-center space-x-4">
          <TableSearch />
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
            <Filter size={14} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
            <SortAsc size={14} />
          </button>
          {role === "admin" && <FormModal table="subject" type="create" />}
        </div>
      </div>

      {/* Subject List */}
      <div className="grid grid-cols-1 gap-6">
        {subjectsData.map((subject) => (
          <div
            key={subject.id}
            className="bg-white p-6 rounded-lg border border-gray-200"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-gray-900">
                  {subject.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {subject.teachers.join(", ")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {role === "admin" && (
                  <>
                    <FormModal table="subject" type="update" data={subject} />
                    <FormModal table="subject" type="delete" id={subject.id} />
                  </>
                )}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">Horario</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Profesores: {subject.teachers.length}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Book className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Créditos:{" "}
                  {/* Aquí podrías agregar la información de créditos si la tienes */}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default SubjectListPage;
