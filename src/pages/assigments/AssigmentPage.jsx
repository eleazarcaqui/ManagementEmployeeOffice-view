import React, { useEffect, useState } from 'react';
import { getAllAssignments } from '../../services/employeeOfficeAssignmentService';  // Asegúrate de que la ruta sea correcta

const AssignmentsPage = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newEmployeeId, setNewEmployeeId] = useState('');
    const [newOfficeId, setNewOfficeId] = useState('');

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                setLoading(true);
                const data = await getAllAssignments();  // Usamos el método getAllAssignments aquí
                setAssignments(data.content || []);  // Actualizamos el estado con las asignaciones obtenidas
            } catch (error) {
                console.error('Error fetching assignments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteAssignment(id);
            setAssignments(assignments.filter((assignment) => assignment.id !== id));
        } catch (error) {
            console.error('Error deleting assignment:', error);
        }
    };

    if (loading) return <div className="text-center">Cargando...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Asignaciones de Empleado a Oficina</h1>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID de Empleado</th>
                        <th className="border px-4 py-2">ID de Oficina</th>
                        <th className="border px-4 py-2">Fecha de Asignación</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.map((assignment) => (
                        <tr key={assignment.id}>
                            <td className="border px-4 py-2">{assignment.employeeId}</td>
                            <td className="border px-4 py-2">{assignment.officeId}</td>
                            <td className="border px-4 py-2">{new Date(assignment.assignmentDate).toLocaleString()}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleDelete(assignment.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Nueva Asignación</h2>
                <div className="flex gap-4 items-center">
                    <input
                        type="number"
                        placeholder="ID de Empleado"
                        value={newEmployeeId}
                        onChange={(e) => setNewEmployeeId(e.target.value)}
                        className="border p-2 rounded w-40"
                    />
                    <input
                        type="number"
                        placeholder="ID de Oficina"
                        value={newOfficeId}
                        onChange={(e) => setNewOfficeId(e.target.value)}
                        className="border p-2 rounded w-40"
                    />
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={async () => {
                            try {
                                const newAssignment = await createAssignment(Number(newEmployeeId), Number(newOfficeId));
                                setAssignments([...assignments, newAssignment]);
                                setNewEmployeeId('');
                                setNewOfficeId('');
                            } catch (error) {
                                console.error('Error al asignar empleado:', error);
                            }
                        }}
                    >
                        Asignar
                    </button>
                </div>
            </div>

        </div>
    );
};

export default AssignmentsPage;
