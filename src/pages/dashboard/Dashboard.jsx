import React, { useEffect, useState } from 'react';
import { Card } from '../../components/common/Card';
import {getEmployees, getEmployeesWithOffices } from '../../services/employeeService';
import {getOffices } from '../../services/officeService';


const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalEmployees: 0,
    remoteEmployees: 0,
    totalOffices: 0,
    topOffices: [],
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [employees, offices, employeesWithOffices] = await Promise.all([
          getEmployees(),
          getOffices(),
          getEmployeesWithOffices(),
        ]);

        const totalEmployees = employees.length;
        const totalOffices = offices.length;
        const remoteEmployees = employeesWithOffices.filter(emp => emp.offices.length === 0).length;
        const officeEmployeeCount = {};
        employeesWithOffices.forEach((emp) => {
          emp.offices.forEach((office) => {
            officeEmployeeCount[office.id] = (officeEmployeeCount[office.id] || 0) + 1;
          });
        });
        const topOffices = Object.entries(officeEmployeeCount)
          .map(([officeId, count]) => {
            const office = offices.find(o => o.id === parseInt(officeId));
            return {
              id: office.id,
              name: office.name,
              count,
            };
          })
          .sort((a, b) => b.count - a.count)
          .slice(0, 3);
        setSummary({
          totalEmployees,
          remoteEmployees,
          totalOffices,
          topOffices,
        });
      } catch (error) {
        console.error("Error loading dashboard summary:", error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <Card title="Total de Empleados" value={summary.totalEmployees} />
      <Card title="Empleados Remotos" value={summary.remoteEmployees} />
      <Card title="Total de Oficinas" value={summary.totalOffices} />
      <Card title="Oficinas con más empleados">
        <ul className="text-sm">
          {summary.topOffices.map((o) => (
            <li key={o.id}>
              <strong>{o.name}</strong>: {o.count} empleados
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default Dashboard;
