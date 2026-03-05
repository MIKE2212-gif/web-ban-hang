import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await api.getAdminProducts();
      setProducts(res.products || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa sản phẩm này?")) return;
    try {
      await api.deleteProduct(id);
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/admin/products/new")}
        >
          Thêm sản phẩm
        </button>
      </div>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Tên</th>
            <th className="border px-2 py-1">Giá</th>
            <th className="border px-2 py-1">Tồn kho</th>
            <th className="border px-2 py-1">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td className="border px-2 py-1">{p.name}</td>
              <td className="border px-2 py-1">{p.price}</td>
              <td className="border px-2 py-1">{p.stock}</td>
              <td className="border px-2 py-1 space-x-2">
                <button
                  className="text-blue-600"
                  onClick={() => navigate(`/admin/products/${p._id}`)}
                >
                  Sửa
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(p._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
