// API Service để gọi Backend
// Dùng biến môi trường REACT_APP_API_URL nếu có, fallback sang localhost:5000
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function để xử lý response
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
  
};

export const api = {
  // ================= PRODUCTS =================
  getProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString
      ? `${API_URL}/products?${queryString}`
      : `${API_URL}/products`;

    const response = await fetch(url);
    return handleResponse(response);
  },

  getProductById: async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    return handleResponse(response);
  },

  getNewArrivals: async () => {
    // Lấy danh sách sản phẩm mới (backend trả về tất cả)
    const response = await fetch(`${API_URL}/products`);
    const data = await handleResponse(response);
    // Format lại data từ array -> object với .data property
    return { data: data };
  },

  searchProducts: async (keyword) => {
    const response = await fetch(`${API_URL}/products?search=${encodeURIComponent(keyword)}`);
    return handleResponse(response);
  },

  createProduct: async (productData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });
    return handleResponse(response);
  },

  updateProduct: async (id, productData) => {
    const token = localStorage.getItem('token');
    // admin endpoint handles update
    const response = await fetch(`${API_URL}/admin/products/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });
    return handleResponse(response);
  },

  deleteProduct: async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/admin/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    return handleResponse(response);
  },

  // ================= AUTH =================
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return handleResponse(response);
  },

  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  // ================= CART =================
  getCart: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return handleResponse(response);
  },

  addToCart: async (productId, quantity) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ productId, quantity })
    });
    return handleResponse(response);
  },

  // ================= ORDERS =================
  createOrder: async (orderData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });
    return handleResponse(response);
  },

  getOrders: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return handleResponse(response);
  },

  // ================= ADMIN =================
  getAdminProducts: async () => {
    const token = localStorage.getItem('token');
    const resp = await fetch(`${API_URL}/admin/products`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return handleResponse(resp);
  },

  getAdminUsers: async () => {
    const token = localStorage.getItem('token');
    const resp = await fetch(`${API_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return handleResponse(resp);
  },

  toggleBlockUser: async (id) => {
    const token = localStorage.getItem('token');
    const resp = await fetch(`${API_URL}/admin/users/${id}/block`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` }
    });
    return handleResponse(resp);
  },

  getAdminOrders: async () => {
    const token = localStorage.getItem('token');
    const resp = await fetch(`${API_URL}/admin/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return handleResponse(resp);
  },

  updateOrderStatus: async (orderId, status) => {
    const token = localStorage.getItem('token');
    const resp = await fetch(`${API_URL}/admin/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    return handleResponse(resp);
  }
};

export default api;
