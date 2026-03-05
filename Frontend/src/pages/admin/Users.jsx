import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.getAdminUsers();
      setUsers(res.users || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBlock = async (id) => {
    try {
      await api.toggleBlockUser(id);
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Danh sách người dùng</h1>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Tên</th>
            <th className="border px-2 py-1">Blocked</th>
            <th className="border px-2 py-1">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id || u._id}>
              <td className="border px-2 py-1">{u.email}</td>
              <td className="border px-2 py-1">{u.name}</td>
              <td className="border px-2 py-1">{u.isBlocked ? "Yes" : "No"}</td>
              <td className="border px-2 py-1">
                <button
                  className="text-red-600"
                  onClick={() => handleBlock(u.id || u._id)}
                >
                  {u.isBlocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
