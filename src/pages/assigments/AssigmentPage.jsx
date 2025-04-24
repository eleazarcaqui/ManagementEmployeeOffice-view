import React, { useEffect, useState } from 'react';
import { getAssignmentsByEmployeeId, getAssignmentsByOfficeId, createAssignment, deleteAssignment, updateAssignment } from '../../services/employeeOfficeAssignmentService';
import { useParams } from 'react-router-dom';

const AssignmentsPage = () => {
  const { employeeId, officeId } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        let data;
        if (employeeId) {
          data = await getAssignmentsByEmployeeId(employeeId);
        } else if (officeId) {
          data = await getAssignmentsByOfficeId(officeId);
        }
        setAssignments(data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [employeeId, officeId]);

  const handleDelete = async (id) => {
    try {
      await deleteAssignment(id);
      setAssignments(assignments.filter((assignment) => assignment.id !== id));
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Employee-Office Assignments</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Employee ID</th>
            <th className="border px-4 py-2">Office ID</th>
            <th className="border px-4 py-2">Assignment Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id}>
              <td className="border px-4 py-2">{assignment.employee_id}</td>
              <td className="border px-4 py-2">{assignment.office_id}</td>
              <td className="border px-4 py-2">{assignment.assignment_date}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(assignment.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Assign Employee</button>
    </div>
  );
};

export default AssignmentsPage;
