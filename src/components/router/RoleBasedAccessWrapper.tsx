import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface RoleBasedAccessWrapperProps {
  allowedRoles: string[];
}

const RoleBasedAccessWrapper: React.FC<RoleBasedAccessWrapperProps> = ({
  allowedRoles,
}) => {
  const role: string | null = localStorage.getItem("role");

  const isAllowed: boolean = role !== null && allowedRoles.includes(role);

  if (!isAllowed) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleBasedAccessWrapper;
