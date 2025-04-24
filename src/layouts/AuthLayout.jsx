import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-center py-8">
        <div className="text-xl font-bold text-blue-600">
         Sistema de gestión de empleados y sus oficinas
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;