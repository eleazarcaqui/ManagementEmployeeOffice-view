
const assignmentFormConfig = {
    employeeId: {
      label: 'Empleado',
      type: 'select',
      required: true,
      options: [], 
      cols: 12,
      grid: true
    },
    officeId: {
      label: 'Oficina',
      type: 'select',
      required: true,
      options: [], 
      cols: 12,
      grid: true
    },
    assignmentDate: {
      label: 'Fecha de Asignación',
      type: 'date',
      defaultValue: new Date().toISOString().split('T')[0],
      cols: 6,
      grid: true
    },
    active: {
      label: 'Asignación Activa',
      type: 'checkbox',
      placeholder: 'La asignación está activa',
      defaultValue: true,
      cols: 6,
      grid: true
    }
  };
  
  export default assignmentFormConfig;