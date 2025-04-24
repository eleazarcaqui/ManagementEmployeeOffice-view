import React, { useState, useEffect } from 'react';
import { createAssignment, updateAssignment } from '../../services/employeeOfficeAssignmentService';

const AssignmentForm = ({ assignmentId, initialData, onSuccess }) => {
  const [employeeId, setEmployeeId] = useState(initialData?.employee_id || '');
  const [officeId, setOfficeId] = useState(initialData?.office_id || '');
  const [assignmentDate, setAssignmentDate] = useState(initialData?.assignment_date || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const assignment = { employee_id: employeeId, office_id: officeId, assignment_date: assignmentDate };

    try {
      if (assignmentId) {
        await updateAssignment(assignmentId, assignment);
      } else {
        await createAssignment(assignment);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving assignment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Employee ID</label>
        <input
          type="number"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Office ID</label>
        <input
          type="number"
          value={officeId}
          onChange={(e) => setOfficeId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Assignment Date</label>
        <input
          type="datetime-local"
          value={assignmentDate}
          onChange={(e) => setAssignmentDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className={`w-full p-2 bg-blue-500 text-white rounded ${isSubmitting ? 'opacity-50' : ''}`}
        disabled={isSubmitting}
      >
        {assignmentId ? 'Update Assignment' : 'Create Assignment'}
      </button>
    </form>
  );
};

export default AssignmentForm;
