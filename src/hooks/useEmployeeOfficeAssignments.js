import { useState } from 'react';
import { getAssignmentsByOfficeId } from '../services/employeeOfficeAssignmentService';

export const useEmployeeOfficeAssignments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [assignments, setAssignments] = useState({});
  
  const getActiveAssignmentsByEmployeeId = (employeeId) => {
 
    return []; 
  };

  const fetchAssignmentsForOffice = async (officeId) => {
    setIsLoading(true);
    try {
      const data = await getAssignmentsByOfficeId(officeId);
      setAssignments(prev => ({
        ...prev,
        [officeId]: data
      }));
    } catch (error) {
      console.error(`Error fetching assignments for office ${officeId}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const getEmployeeCountByOfficeId = (officeId) => {
    
    if (!assignments[officeId]) {
      fetchAssignmentsForOffice(officeId);
      return 0; 
    }
    
    return assignments[officeId].filter(assignment => assignment.active).length;
  };
  
  
  const getEmployeesByOfficeId = (officeId) => {

    return [];
  };

  const createAssignment = async (data) => {
    setIsLoading(true);
   
    setIsLoading(false);
  };

  const updateAssignment = async (id, data) => {
    setIsLoading(true);

    setIsLoading(false);
  };

  const deleteAssignment = async (id) => {
    setIsLoading(true);
    
    setIsLoading(false);
  };

  const deactivateAssignment = async (id) => {
    setIsLoading(true);
 
    setIsLoading(false);
  };

  return {
    isLoading,
    getActiveAssignmentsByEmployeeId,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    deactivateAssignment,
    getEmployeeCountByOfficeId,
    getEmployeesByOfficeId 
  };
};