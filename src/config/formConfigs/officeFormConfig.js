const officeFormConfig = {
    name: {
      label: 'Nombre',
      type: 'text',
      placeholder: 'Nombre de la oficina',
      required: true,
      minLength: 3,
      validationMessage: 'El nombre debe tener al menos 3 caracteres'
    },
    address: {
      label: 'Dirección',
      type: 'text',
      placeholder: 'Dirección completa',
      required: true,
      validationMessage: 'La dirección es obligatoria'
    },
    city: {
      label: 'Ciudad',
      type: 'text',
      placeholder: 'Ciudad',
      required: true,
      validationMessage: 'La ciudad es obligatoria'
    },
    country: {
      label: 'País',
      type: 'text',
      placeholder: 'País',
      required: true,
      validationMessage: 'El país es obligatorio'
    },
    phone: {
      label: 'Teléfono',
      type: 'tel',
      placeholder: '+34 000 000 000',
      pattern: '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s./0-9]*$',
      patternMessage: 'Introduzca un número de teléfono válido'
    },

    isHeadquarters: {
      label: 'Sede central',
      type: 'checkbox',
      defaultValue: false
    }
  };
  
  export default officeFormConfig;
  