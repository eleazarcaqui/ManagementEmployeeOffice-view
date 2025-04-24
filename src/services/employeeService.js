import { environment } from "../environments/environment";
const API_URL = `${environment.apiUrl}`;

const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const getEmployees = async () => {
  const response = await fetch(`${API_URL}/employees`);
  if (!response.ok) throw new Error("Error fetching employees");

  const data = await response.json();

  return data.content;
};

export const createEmployee = async (employeeData) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error("Debes iniciar sesión para realizar esta acción");
    }
    
    console.log('Token utilizado:', token);
    console.log('Datos completos a enviar:', employeeData);
    
    const response = await fetch(`${API_URL}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(employeeData),
      credentials: 'include'
    });
  
    console.log('Respuesta status:', response.status);
    console.log('Respuesta headers:', Object.fromEntries([...response.headers]));
    
    if (!response.ok) {
      let errorMessage = `Error ${response.status}`;
      try {
        const errorData = await response.json();
        console.log('Error detallado:', errorData);
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
       
        console.log('No se pudo obtener JSON de error');
      }
      throw new Error(errorMessage);
    }
  
    return await response.json();
};
  
export const updateEmployee = async (id, employeeData) => {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error("Debes iniciar sesión para realizar esta acción");
    }
    
    const response = await fetch(`${API_URL}/employees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(employeeData)
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al actualizar el empleado');
    }
  
    return await response.json();
};
  
export const deleteEmployee = async (id) => {
    const token = getAuthToken();
  
    if (!token) {
      throw new Error("Debes iniciar sesión para realizar esta acción");
    }
  
    const response = await fetch(`${API_URL}/employees/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al eliminar el empleado');
    }
  
    if (response.status === 204) {
      return; 
    }
  
    return await response.json();
  };
  
  
export const getEmployeesWithOffices = async () => {
    const response = await fetch(`${API_URL}/employees/with-offices`);
    if (!response.ok) throw new Error("Error fetching employees with offices");
    
    const data = await response.json();
    return data.content;
};