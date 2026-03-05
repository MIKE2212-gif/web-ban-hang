import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function AdminLayout({ children }) {
  const location = useLocation();

  const linkClass = (path) =>
    location.pathname.startsWith(path) ? "font-semibold text-blue-600" : "hover:text-blue-600";

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Admin</h2>
        <nav className="flex flex-col space-y-2 text-sm">
          <Link to="/admin" className={linkClass("/admin")}>Dashboard</Link>
          <Link to="/admin/products" className={linkClass("/admin/products")}>Products</Link>
          <Link to="/admin/orders" className={linkClass("/admin/orders")}>Orders</Link>
          <Link to="/admin/users" className={linkClass("/admin/users")}>Users</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-white">
        {/* render nested routes or children */}
        {children || <Outlet />}
      </main>
    </div>
  );
}
