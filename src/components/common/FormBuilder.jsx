import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const FormBuilder = ({ 
  config, 
  initialValues = {}, 
  onSubmit,
  onChange,
  readOnly = false,
  children
}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    const updatedData = {
      ...formData,
      [name]: fieldValue
    };

    setFormData(updatedData);

    if (onChange) {
      onChange(updatedData);
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(config).forEach(fieldName => {
      const field = config[fieldName];

      if (field.required && !formData[fieldName]) {
        newErrors[fieldName] = `${field.label} es requerido`;
        isValid = false;
      }

      if (field.pattern && formData[fieldName] && !new RegExp(field.pattern).test(formData[fieldName])) {
        newErrors[fieldName] = field.patternMessage || `${field.label} no tiene un formato válido`;
        isValid = false;
      }

      if (field.minLength && formData[fieldName] && formData[fieldName].length < field.minLength) {
        newErrors[fieldName] = `${field.label} debe tener al menos ${field.minLength} caracteres`;
        isValid = false;
      }

      if (field.maxLength && formData[fieldName] && formData[fieldName].length > field.maxLength) {
        newErrors[fieldName] = `${field.label} no debe exceder ${field.maxLength} caracteres`;
        isValid = false;
      }

      if (field.validate && formData[fieldName]) {
        const validationResult = field.validate(formData[fieldName], formData);
        if (validationResult !== true) {
          newErrors[fieldName] = validationResult;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (readOnly) return;

    if (validateForm()) {
      console.log('FormBuilder - Enviando datos del formulario:', formData);
      onSubmit(formData);
    }
  };

  const renderField = (name, field) => {
    const {
      label,
      type = 'text',
      placeholder = '',
      options = [],
      cols = 1,
      rows = 3,
      className = '',
      disabled = false,
      helperText,
      grid = false,
      ...rest
    } = field;

    const fieldProps = {
      id: name,
      name,
      value: formData[name] !== undefined ? formData[name] : '',
      onChange: handleChange,
      disabled: disabled || readOnly,
      placeholder,
      className: `mt-1 ${readOnly ? 'bg-gray-50' : 'focus:ring-blue-500 focus:border-blue-500'} h-10 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${className}`,
      ...rest
    };

    const wrapperClass = grid ? `col-span-${cols}` : '';

    return (
      <div key={name} className={wrapperClass}>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label} {field.required && !readOnly && <span className="text-red-500">*</span>}
        </label>

        {type === 'text' && <input type="text" {...fieldProps} />}
        {type === 'number' && <input type="number" {...fieldProps} />}
        {type === 'email' && <input type="email" {...fieldProps} />}
        {type === 'password' && <input type="password" {...fieldProps} />}
        {type === 'tel' && <input type="tel" {...fieldProps} />}
        {type === 'date' && (
          <input 
            type="date" 
            {...fieldProps} 
            value={formData[name] ? (typeof formData[name] === 'string' ? formData[name].split('T')[0] : formData[name]) : ''}
          />
        )}
        {type === 'textarea' && <textarea rows={rows} {...fieldProps} />}
        {type === 'select' && (
          <select {...fieldProps}>
            <option value="">Seleccionar...</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        )}
        {type === 'checkbox' && (
          <div className="mt-1 flex items-center">
            <input 
              type="checkbox" 
              {...fieldProps} 
              checked={!!formData[name]} 
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-500">{placeholder}</span>
          </div>
        )}
        {type === 'radio' && (
          <div className="mt-1 space-y-2">
            {options.map(option => (
              <div key={option.value} className="flex items-center">
                <input
                  id={`${name}-${option.value}`}
                  name={name}
                  type="radio"
                  value={option.value}
                  checked={formData[name] === option.value}
                  onChange={handleChange}
                  disabled={disabled || readOnly}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor={`${name}-${option.value}`} className="ml-2 text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )}

        {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
        {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name]}</p>}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={`space-y-6 ${Object.keys(config).some(key => config[key].grid) ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : ''}`}>
        {Object.keys(config).map((fieldName) => renderField(fieldName, config[fieldName]))}
      </div>
      {children}
    </form>
  );
};

FormBuilder.propTypes = {
  config: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  children: PropTypes.node
};

export default FormBuilder;
