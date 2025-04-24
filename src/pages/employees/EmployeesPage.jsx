import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useEmployees from "../../hooks/useEmployees";
import { useEmployeeOfficeAssignments } from "../../hooks/useEmployeeOfficeAssignments";
import CrudTable from "../../components/common/CrudTable";
import EmployeeCrud from "../../components/employee/EmployeeCrud";

const EmployeesPage = () => {
  const navigate = useNavigate();
  const { employees, loading } = useEmployees();
  const { getActiveAssignmentsByEmployeeId } = useEmployeeOfficeAssignments();
  
  const columns = [
    {
      title: "Nombre",
      field: "name"
    },
    {
      title: "Teléfono",
      field: "phone",
      emptyValue: "-"
    },
    {
      title: "DNI",
      field: "dni"
    },
    {
      title: "Dirección",
      field: "address",
      emptyValue: "-"
    },
    {
      title: "Fecha Nacimiento",
      field: "birthDate",
      type: "date"
    },
    {
      title: "Oficinas",
      field: "offices",
      render: (employee) => {
        if (!employee.offices || employee.offices.length === 0) {
          return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Remoto
            </span>
          );
        }
        
        return (
          <div className="flex flex-wrap gap-1">
            {employee.offices.map((office, idx) => (
              <span 
                key={idx} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {office.name}
              </span>
            ))}
          </div>
        );
      }
    }
  ];

  const renderAssignments = (employee) => {
    const assignmentsByEmployee = getActiveAssignmentsByEmployeeId(employee.id);
    
    if (!assignmentsByEmployee || assignmentsByEmployee.length === 0) {
      return <p className="text-sm text-gray-500">Este empleado no tiene oficinas asignadas.</p>;
    }
    
    return (
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Oficina</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Ubicación</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fecha Asignación</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {assignmentsByEmployee.map((assignment) => (
              <tr key={assignment.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {assignment.office?.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {assignment.office?.city}, {assignment.office?.country}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {new Date(assignment.assignmentDate).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  {assignment.active ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Activo
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Inactivo
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       
        <EmployeeCrud renderAssignments={renderAssignments}>
          <CrudTable
            data={employees}
            columns={columns}
            isLoading={loading}
            noDataMessage="No hay empleados registrados"
            tableProps={{ title: "Empleados" }}
          />
        </EmployeeCrud>
      </div>
    </div>
  );
};

export default EmployeesPage;