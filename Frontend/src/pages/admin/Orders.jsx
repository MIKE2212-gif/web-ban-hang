import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await api.getAdminOrders();
      setOrders(res.orders || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Danh sách đơn hàng</h1>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">User</th>
            <th className="border px-2 py-1">Tổng</th>
            <th className="border px-2 py-1">Trạng thái</th>
            <th className="border px-2 py-1">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td className="border px-2 py-1">{o._id}</td>
              <td className="border px-2 py-1">{o.userId?.email || "-"}</td>
              <td className="border px-2 py-1">{o.total}</td>
              <td className="border px-2 py-1 capitalize">{o.status}</td>
              <td className="border px-2 py-1">
                <button
                  className="text-blue-600"
                  onClick={() => navigate(`/admin/orders/${o._id}`)}
                >
                  Xem
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
