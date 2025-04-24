import React from "react";
import { useNavigate } from "react-router-dom";
import useOffices from "../../hooks/useOffices";

const OfficeList = () => {
  const { offices, loading, deleteOffice } = useOffices();
  const getEmployeeCountByOfficeId = () => 0;
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/offices/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/offices/edit/${id}`);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar la oficina ${name}?`)) {
      try {
        await deleteOffice(id);
      } catch (error) {
        console.error("Error al eliminar oficina:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  const columnWidths = {
    name: "w-1/6", 
    address: "w-1/5", 
    city: "w-1/8",
    country: "w-1/8", 
    phone: "w-1/8", 
    employees: "w-1/10", 
    actions: "w-1/7" 
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Listado de Oficinas</h1>
        <button
          onClick={() => navigate("/offices/new")}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg
                    transition-colors duration-200 flex items-center gap-2 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Nueva Oficina
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className={`${columnWidths.name} px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                  Nombre
                </th>
                <th className={`${columnWidths.address} px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                  Dirección
                </th>
                <th className={`${columnWidths.city} px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                  Ciudad
                </th>
                <th className={`${columnWidths.country} px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                  País
                </th>
                <th className={`${columnWidths.phone} px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                  Teléfono
                </th>
                <th className={`${columnWidths.employees} px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                  Empleados
                </th>
                <th className={`${columnWidths.actions} px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {offices.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No hay oficinas registradas
                  </td>
                </tr>
              ) : (
                offices.map((office) => (
                  <tr 
                    key={office.id} 
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className={`${columnWidths.name} px-6 py-4 truncate`}>
                      <div className="text-sm font-medium text-gray-900 truncate">{office.name}</div>
                    </td>
                    <td className={`${columnWidths.address} px-6 py-4 truncate`}>
                      <div className="text-sm text-gray-500 truncate">{office.address || "-"}</div>
                    </td>
                    <td className={`${columnWidths.city} px-6 py-4 truncate`}>
                      <div className="text-sm text-gray-900 truncate">{office.city}</div>
                    </td>
                    <td className={`${columnWidths.country} px-6 py-4 truncate`}>
                      <div className="text-sm text-gray-900 truncate">{office.country}</div>
                    </td>
                    <td className={`${columnWidths.phone} px-6 py-4 truncate`}>
                      <div className="text-sm text-gray-500 truncate">{office.phone || "-"}</div>
                    </td>
                    <td className={`${columnWidths.employees} px-6 py-4`}>
                      <div className="text-sm text-gray-900 flex justify-start">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {getEmployeeCountByOfficeId(office.id)}
                        </span>
                      </div>
                    </td>
                    <td className={`${columnWidths.actions} px-6 py-4 text-center`}>
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleView(office.id)}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors duration-150 p-1 rounded hover:bg-indigo-50"
                          title="Ver detalles"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleEdit(office.id)}
                          className="text-amber-600 hover:text-amber-900 transition-colors duration-150 p-1 rounded hover:bg-amber-50"
                          title="Editar"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(office.id, office.name)}
                          className="text-red-600 hover:text-red-900 transition-colors duration-150 p-1 rounded hover:bg-red-50"
                          title="Eliminar"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OfficeList;