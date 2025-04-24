import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CrudModal from '../common/CrudModal';
import employeeFormConfig from '../../config/formConfigs/employeeFormConfig';
import useEmployees from '../../hooks/useEmployees';
import { createEmployee, updateEmployee, deleteEmployee } from '../../services/employeeService';

const EmployeeCrud = ({ 
  onAfterSubmit,
  renderAssignments,
  children
}) => {

  const [modalMode, setModalMode] = useState('create');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formConfig, setFormConfig] = useState(employeeFormConfig);
  
  const { employees, loading: isLoading, error } = useEmployees();

  const handleCreate = () => {
    setModalMode('create');
    setSelectedEmployee({
      name: '',
      dni: '',
      email: '',
      phone: '',
      address: '',
      birthDate: '',
      active: true
    });
    setIsModalOpen(true);
  };

  const handleEdit = (employee) => {
    setModalMode('edit');
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleView = (employee) => {
    setModalMode('view');
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDelete = (employee) => {
    setModalMode('delete');
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (formData) => {
    try {
        console.log('Datos a enviar:', formData);
      if (modalMode === 'create') {
        await createEmployee(formData);
      } else if (modalMode === 'edit') {
        await updateEmployee(selectedEmployee.id, formData);
      }
      
      handleCloseModal();
      
      if (onAfterSubmit) {
        onAfterSubmit(modalMode, formData);
      }
    } catch (error) {
      console.error(`Error al ${modalMode === 'create' ? 'crear' : 'actualizar'} empleado:`, error);
    }
  };

  const handleConfirmDelete = async (id) => {
    try {
      await deleteEmployee(id);
      handleCloseModal();
      
      if (onAfterSubmit) {
        onAfterSubmit('delete', { id });
      }
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
    }
  };

  const detailSections = renderAssignments ? [
    {
      title: 'Oficinas Asignadas',
      render: (employee) => renderAssignments(employee)
    }
  ] : [];

  return (
    <>
      <CrudModal
        mode={modalMode}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={selectedEmployee}
        onSubmit={handleSubmit}
        onDelete={handleConfirmDelete}
        formConfig={formConfig}
        isLoading={isLoading}
        entityName="Empleado"
        extraConfig={{
          detailSections,
          enableEdit: modalMode === 'view',
          onEdit: (employee) => {
            handleCloseModal();
            handleEdit(employee);
          }
        }}
      />
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            onCreateClick: handleCreate,
            onEditClick: handleEdit,
            onViewClick: handleView,
            onDeleteClick: handleDelete
          });
        }
        return child;
      })}
    </>
  );
};

EmployeeCrud.propTypes = {
  onAfterSubmit: PropTypes.func,
  renderAssignments: PropTypes.func,
  children: PropTypes.node
};

export default EmployeeCrud;