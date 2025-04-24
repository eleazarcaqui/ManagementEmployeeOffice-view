import { environment } from "../environments/environment";
const API_URL = `${environment.apiUrl}`;

const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const getOffices = async () => {
  const response = await fetch(`${API_URL}/offices`);
  if (!response.ok) throw new Error("Error fetching offices");

  const data = await response.json();

  return data.content;
};

export const getOfficeById = async (id) => {
  const response = await fetch(`${API_URL}/offices/${id}`);
  if (!response.ok) throw new Error(`Error fetching office with id ${id}`);

  return await response.json();
};

export const createOffice = async (officeData) => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Debes iniciar sesión para realizar esta acción");
  }

  console.log('Token utilizado:', token);
  console.log('Datos completos a enviar:', officeData);

  const response = await fetch(`${API_URL}/offices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(officeData),
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

export const updateOffice = async (id, officeData) => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Debes iniciar sesión para realizar esta acción");
  }

  const response = await fetch(`${API_URL}/offices/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(officeData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al actualizar la oficina');
  }

  return await response.json();
};

export const deleteOfficeById = async (id) => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Debes iniciar sesión para realizar esta acción");
  }

  const response = await fetch(`${API_URL}/offices/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Error al eliminar la oficina con id ${id}`);
  }

  return true;
};

export const getOfficesWithEmployees = async () => {
    const response = await fetch(`${API_URL}/offices/with-employee`);
    if (!response.ok) throw new Error("Error fetching employees with offices");
  
    const data = await response.json();
    return data;
  };