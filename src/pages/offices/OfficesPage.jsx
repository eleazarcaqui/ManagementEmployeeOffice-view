import React from "react";

import useOffices from "../../hooks/useOffices";
import { useEmployeeOfficeAssignments } from "../../hooks/useEmployeeOfficeAssignments";
import CrudTable from "../../components/common/CrudTable";
import OfficeCrud from "../../components/office/OfficeCrud";

const OfficesPage = () => {
  const { offices, loading } = useOffices();
  const { getEmployeesByOfficeId, getEmployeeCountByOfficeId } = useEmployeeOfficeAssignments();
  
  const columns = [
    {
      title: "Nombre",
      field: "name"
    },
    {
      title: "Dirección",
      field: "address",
      emptyValue: "-"
    },
    {
      title: "Ciudad",
      field: "city"
    },
    {
      title: "País",
      field: "country"
    },
    {
      title: "Teléfono",
      field: "phone",
      emptyValue: "-"
    },
    {
      title: "Cantidad Empleados",
      field: "employeeCount",
      render: (office) => {
        const count = getEmployeeCountByOfficeId(office.id);
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {count}
          </span>
        );
      }
    }
  ];

  const renderEmployees = (office) => {
    const employeesByOffice = getEmployeesByOfficeId(office.id);
    
    if (!employeesByOffice || employeesByOffice.length === 0) {
      return <p className="text-sm text-gray-500">Esta oficina no tiene empleados asignados.</p>;
    }
    
    return (
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Empleado</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">DNI</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fecha Asignación</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {employeesByOffice.map((assignment) => (
              <tr key={assignment.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {assignment.employee?.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {assignment.employee?.dni}
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
        <OfficeCrud renderEmployees={renderEmployees}>
          <CrudTable
            data={offices}
            columns={columns}
            isLoading={loading}
            noDataMessage="No hay oficinas registradas"
            tableProps={{ title: "Oficinas" }}
          />
        </OfficeCrud>
      </div>
    </div>
  );
};

export default OfficesPage;