import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "admin") {
      return children;
    }
  } catch {}
  return <Navigate to="/" replace />;
}
