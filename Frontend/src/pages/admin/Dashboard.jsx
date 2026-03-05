

import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ orders: 0, revenue: 0, products: 0, users: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const ores = await api.getAdminOrders();
        const ures = await api.getAdminUsers();
        const pres = await api.getAdminProducts();
        const orders = ores.orders || [];
        const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
        setStats({
          orders: orders.length,
          revenue,
          products: (pres.products || []).length,
          users: (ures.users || []).length
        });
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Thống kê doanh thu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-4 bg-white shadow rounded">
          <p className="text-sm text-gray-500">Tổng đơn hàng</p>
          <p className="text-2xl font-bold">{stats.orders}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <p className="text-sm text-gray-500">Doanh thu</p>
          <p className="text-2xl font-bold">{stats.revenue.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <p className="text-sm text-gray-500">Sản phẩm</p>
          <p className="text-2xl font-bold">{stats.products}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <p className="text-sm text-gray-500">Người dùng</p>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>
      </div>
    </div>
  );
}
