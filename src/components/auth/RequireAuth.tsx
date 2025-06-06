// src/components/auth/RequireAuth.jsx
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation();
  const token = localStorage.getItem('authToken');

  if (!token) {
    return <Navigate to="/authentication/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
