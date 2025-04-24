import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';

import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

import Dashboard from '../pages/dashboard/Dashboard';

import EmployeesPage from '../pages/employees/EmployeesPage';
import { EmployeeProvider } from '../context/employee/EmployeeProvider';

import OfficesPage from '../pages/offices/OfficesPage';
import { OfficeProvider } from "../context/office/OfficeProvider";

import AssignmentsPage from '../pages/assigments/AssigmentPage';
import { AssignmentProvider } from '../context/assignment/AssignmentProvider';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const AppRouter = () => {
  return (
    <EmployeeProvider>
      <OfficeProvider>
        <AssignmentProvider>
          <Routes>
            <Route path="/auth" element={
              <PublicRoute>
                <AuthLayout />
              </PublicRoute>
            }>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />

              <Route path="employees">
                <Route index element={<EmployeesPage />} />
              </Route>

              <Route path="offices">
                <Route index element={<OfficesPage />} />
              </Route>

              <Route path="assignments">
                <Route index element={<AssignmentsPage />} />
              </Route>
            </Route>

            <Route path="*" element={
              <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-lg text-gray-600 mb-8">Page not found</p>
                <button
                  onClick={() => window.history.back()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Go Back
                </button>
              </div>
            } />
          </Routes>
        </AssignmentProvider>
      </OfficeProvider>
    </EmployeeProvider>
  );
};

export default AppRouter;