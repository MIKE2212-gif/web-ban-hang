import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const fetchData = async () => {
    try {
      const res = await api.getAdminOrders();
      const found = res.orders?.find((o) => o._id === id);
      setOrder(found);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleChangeStatus = async () => {
    if (!newStatus) return;
    try {
      await api.updateOrderStatus(id, newStatus);
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Chi tiết đơn #{order._id}</h1>
      <p>User: {order.userId?.email}</p>
      <p>Total: {order.total}</p>
      <p>Status: <span className="capitalize">{order.status}</span></p>
      <div className="mt-4">
        <label className="block mb-1">Cập nhật trạng thái</label>
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="border p-2"
        >
          <option value="">-- chọn --</option>
          <option value="pending">pending</option>
          <option value="processing">processing</option>
          <option value="shipped">shipped</option>
          <option value="delivered">delivered</option>
          <option value="cancelled">cancelled</option>
        </select>
        <button
          onClick={handleChangeStatus}
          className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
        >
          Lưu
        </button>
      </div>
    </div>
  );
}
