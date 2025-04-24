import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllAssignments } from "../../services/employeeOfficeAssignmentService"; 

export const AssignmentContext = createContext();

export const AssignmentProvider = ({ children }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const data = await getAllAssignments();  
      setAssignments(data);
    } catch (err) {
      console.error("Failed to fetch assignments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <AssignmentContext.Provider value={{ assignments, loading, setAssignments }}>
      {children}
    </AssignmentContext.Provider>
  );
};

export const useAssignmentContext = () => useContext(AssignmentContext);
