import { environment } from "../environments/environment";

const API_URL = `${environment.apiUrl}`;

export const getAssignmentsByEmployeeId = async (employeeId) => {
  const response = await fetch(`${API_URL}/employee-office-assignments/employee/${employeeId}`);
  if (!response.ok) throw new Error("Error fetching employee assignments");
  
  const data = await response.json();
  return data;
};

export const getAssignmentsByOfficeId = async (officeId) => {
  const response = await fetch(`${API_URL}/employee-office-assignments/office/${officeId}`);
  if (!response.ok) throw new Error("Error fetching office assignments");
  
  const data = await response.json();
  return data;
};


export const createAssignment = async (assignment) => {
  const response = await fetch(`${API_URL}/employee-office-assignments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(assignment),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error creating assignment");
  }
  
  return await response.json();
};

export const updateAssignment = async (id, assignment) => {
  const response = await fetch(`${API_URL}/employee-office-assignments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(assignment),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error updating assignment");
  }
  
  return await response.json();
};

export const deactivateAssignment = async (id) => {
  const response = await fetch(`${API_URL}/employee-office-assignments/${id}/deactivate`, {
    method: 'PATCH',
  });
  
  if (!response.ok) {
    throw new Error("Error deactivating assignment");
  }
};

export const deleteAssignment = async (id) => {
  const response = await fetch(`${API_URL}/employee-office-assignments/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error("Error deleting assignment");
  }
};