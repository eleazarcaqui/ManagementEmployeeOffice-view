import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import FormBuilder from './FormBuilder';

const CrudModal = ({
  mode = 'create',
  isOpen,
  onClose,
  data = null,
  onSubmit,
  onDelete,
  formConfig,
  isLoading = false,
  entityName = 'Registro',
  extraConfig = {},
  children
}) => {
  const [initialValues, setInitialValues] = useState({});
  const [formValues, setFormValues] = useState({});
  

  useEffect(() => {
    if (data && (mode === 'edit' || mode === 'view')) {
      setInitialValues(data);
      setFormValues(data);
      console.log('CrudModal - Inicializando con datos:', data);
    } else {
      const defaultValues = {};
      Object.keys(formConfig).forEach(key => {
        if (formConfig[key].defaultValue !== undefined) {
          defaultValues[key] = formConfig[key].defaultValue;
        }
      });
      setInitialValues(defaultValues);
      setFormValues(defaultValues);
      console.log('CrudModal - Inicializando con valores por defecto:', defaultValues);
    }
  }, [data, mode, formConfig]);

  const getTitle = () => {
    switch (mode) {
      case 'create':
        return `Crear ${entityName}`;
      case 'edit':
        return `Editar ${entityName}`;
      case 'view':
        return `Detalles de ${entityName}`;
      case 'delete':
        return `Eliminar ${entityName}`;
      default:
        return entityName;
    }
  };


  const getFormConfig = () => {
   
    if (mode === 'view') {
      return formConfig;
    }
    
    return Object.keys(formConfig).reduce((config, key) => {
      const field = formConfig[key];
      
      if (field.modes && !field.modes.includes(mode)) {
        return config;
      }
      
      return {
        ...config,
        [key]: field
      };
    }, {});
  };
  
  const handleFormSubmit = (e) => {
    if (e) e.preventDefault(); 
    console.log('CrudModal - Enviando formValues a onSubmit:', formValues);
  
    if (onSubmit) {
      onSubmit(formValues);
    }
  };

  const renderContent = () => {
    if (mode === 'delete') {
      return (
        <div className="text-sm text-gray-500">
          <p>¿Estás seguro de que deseas eliminar {entityName.toLowerCase()} 
            {data?.name && <span className="font-medium text-gray-700"> {data.name}</span>}?
          </p>
          <p className="mt-2">Esta acción no se puede deshacer y todos los datos asociados serán eliminados permanentemente.</p>
        </div>
      );
    }

    return (
      <FormBuilder
        config={getFormConfig()}
        initialValues={initialValues}
        onSubmit={handleFormSubmit} 
        onChange={(data) => {
    console.log('CrudModal - onChange recibió:', data);
    setFormValues(data);
  }}
 
        readOnly={mode === 'view'}
      >
        {children}
        
        {mode === 'view' && extraConfig.detailSections && (
          <div className="mt-8 space-y-6">
            {extraConfig.detailSections.map((section, index) => (
              <div key={index} className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">{section.title}</h4>
                {section.render(data)}
              </div>
            ))}
          </div>
        )}
      </FormBuilder>
    );
  };

  const getModalConfig = () => {
    switch (mode) {
        case 'create':
      return {
        confirmButton: () => handleFormSubmit(), 
        confirmText: 'Crear',
        cancelText: 'Cancelar'
      };
      case 'edit':
      return {
        confirmButton: () => handleFormSubmit(), 
        confirmText: 'Guardar Cambios',
        cancelText: 'Cancelar'
      };
      case 'view':
        return {
          confirmButton: extraConfig.enableEdit ? () => extraConfig.onEdit(data) : null,
          confirmText: extraConfig.enableEdit ? 'Editar' : null,
          cancelText: 'Cerrar'
        };
      case 'delete':
        return {
          confirmButton: () => onDelete(data?.id),
          confirmText: 'Eliminar',
          cancelText: 'Cancelar',
          danger: true
        };
      default:
        return {};
    }
  };

  const getSize = () => {
    if (extraConfig.size) return extraConfig.size;
    
    switch (mode) {
      case 'view':
        return 'lg';
      case 'delete':
        return 'sm';
      default:
        return 'md';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getTitle()}
      size={getSize()}
      isLoading={isLoading}
      {...getModalConfig()}
    >
      {renderContent()}
    </Modal>
  );
};

CrudModal.propTypes = {
  mode: PropTypes.oneOf(['create', 'edit', 'view', 'delete']).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  formConfig: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  entityName: PropTypes.string,
  extraConfig: PropTypes.object,
  children: PropTypes.node
};

export default CrudModal;