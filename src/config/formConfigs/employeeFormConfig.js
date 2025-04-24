
const employeeFormConfig = {
    name: {
      label: 'Nombre Completo',
      type: 'text',
      placeholder: 'Ej. Juan Pérez',
      required: true,
      minLength: 2,
      maxLength: 100,
      cols: 12, 
      grid: true
    },
    dni: {
      label: 'DNI / Identificación',
      type: 'text',
      placeholder: 'Ej. 12345678A',
      required: true,
      pattern: '^[0-9]{8}[A-Za-z]$',
      patternMessage: 'El DNI debe tener 8 números seguidos de una letra',
      cols: 6,
      grid: true
    },
    phone: {
      label: 'Teléfono',
      type: 'tel',
      placeholder: 'Ej. 600123456',
      pattern: '^[0-9]{9}$',
      patternMessage: 'El teléfono debe tener 9 dígitos',
      cols: 6,
      grid: true
    },
    birthDate: {
      label: 'Fecha de Nacimiento',
      type: 'date',
      helperText: 'Formato: DD/MM/AAAA',
      cols: 6,
      grid: true
    },
    address: {
      label: 'Dirección',
      type: 'textarea',
      placeholder: 'Dirección completa',
      rows: 3,
      cols: 12,
      grid: true
    },
  
    active: {
      label: 'Activo',
      type: 'checkbox',
      defaultValue: true,
      modes: ['create', 'edit'], 
      cols: 6,
      grid: true
    }
  };
  
  export default employeeFormConfig;