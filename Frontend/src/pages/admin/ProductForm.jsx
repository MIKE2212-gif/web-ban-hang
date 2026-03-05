import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [form, setForm] = useState({ name: "", price: "", stock: "" });

  useEffect(() => {
    if (!isNew) {
      // fetch existing
      api.getProductById(id).then((p) => setForm({
        name: p.name,
        price: p.price,
        stock: p.stock
      }));
    }
  }, [id, isNew]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNew) {
        await api.createProduct(form);
      } else {
        await api.updateProduct(id, form);
      }
      navigate("/admin/products");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {isNew ? "Thêm" : "Sửa"} sản phẩm
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Tên</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Giá</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Tồn kho</label>
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Lưu
        </button>
      </form>
    </div>
  );
}
