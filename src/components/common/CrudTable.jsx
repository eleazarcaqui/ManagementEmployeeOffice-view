import React from 'react';
import PropTypes from 'prop-types';

const CrudTable = ({
  data = [],
  columns = [],
  actions = {},
  isLoading = false,
  noDataMessage = "No hay registros para mostrar",
  tableProps = {},
  onCreateClick,
  onEditClick,
  onViewClick,
  onDeleteClick,
  onDeactivateClick
}) => {

  const renderCell = (item, column) => {
   
    if (column.render) {
      return column.render(item);
    }
    
    const getValue = (obj, path) => {
      return path.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : null;
      }, obj);
    };
    
    const value = getValue(item, column.field);
    
    if (value === null || value === undefined) {
      return column.emptyValue || '-';
    }
    
    if (column.type === 'date' && value) {
      return new Date(value).toLocaleDateString();
    }
    
    if (column.type === 'datetime' && value) {
      return new Date(value).toLocaleString();
    }
    
    if (column.type === 'boolean') {
      return value ? (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {column.trueLabel || 'Sí'}
        </span>
      ) : (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {column.falseLabel || 'No'}
        </span>
      );
    }
    
    if (column.type === 'badge' && column.options) {
      const option = column.options.find(opt => opt.value === value);
      if (option) {
        return (
          <span 
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${option.className}`}
          >
            {option.label}
          </span>
        );
      }
    }
    
    return value.toString();
  };

  const renderActions = (item) => {
    return (
      <div className="flex justify-center space-x-3">
        {onViewClick && (
          <button
            onClick={() => onViewClick(item)}
            className="text-indigo-600 hover:text-indigo-900 transition-colors duration-150"
            title="Ver detalles"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        
        {onEditClick && (
          <button
            onClick={() => onEditClick(item)}
            className="text-amber-600 hover:text-amber-900 transition-colors duration-150"
            title="Editar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        )}
        
        {onDeactivateClick && (
          <button
            onClick={() => onDeactivateClick(item)}
            className="text-orange-600 hover:text-orange-800 transition-colors duration-150"
            title="Desactivar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        
        {onDeleteClick && (
          <button
            onClick={() => onDeleteClick(item)}
            className="text-red-600 hover:text-red-900 transition-colors duration-150"
            title="Eliminar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">{tableProps.title || "Listado"}</h2>
        {onCreateClick && (
          <button
            onClick={onCreateClick}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg
                      transition-colors duration-200 flex items-center gap-2 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Nuevo
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, idx) => (
                <th 
                  key={idx}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
                >
                  {column.title}
                </th>
              ))}
              {(onViewClick || onEditClick || onDeleteClick || onDeactivateClick) && (
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length + (onViewClick || onEditClick || onDeleteClick || onDeactivateClick ? 1 : 0)} 
                  className="px-6 py-4 text-center text-gray-500"
                >
                  {noDataMessage}
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr 
                  key={item.id || index} 
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {columns.map((column, idx) => (
                    <td key={idx} className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${column.field === 'name' ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                        {renderCell(item, column)}
                      </div>
                    </td>
                  ))}
                  {(onViewClick || onEditClick || onDeleteClick || onDeactivateClick) && (
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      {renderActions(item)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

CrudTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['text', 'date', 'datetime', 'boolean', 'badge']),
      render: PropTypes.func,
      className: PropTypes.string,
      emptyValue: PropTypes.node,
      trueLabel: PropTypes.string, 
      falseLabel: PropTypes.string, 
      options: PropTypes.arrayOf( 
        PropTypes.shape({
          value: PropTypes.any.isRequired,
          label: PropTypes.string.isRequired,
          className: PropTypes.string.isRequired
        })
      )
    })
  ).isRequired,
  isLoading: PropTypes.bool,
  noDataMessage: PropTypes.string,
  tableProps: PropTypes.object,
  onCreateClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onViewClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onDeactivateClick: PropTypes.func
};

export default CrudTable;