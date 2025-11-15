import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // This ensures cookies are sent with requests
});

// Admin Authentication APIs
export const adminAuthAPI = {
  login: (email) => api.post("/admin/login-admin", { email }),
  verifyOTP: (email, otp) => api.post("/admin/verify-otp", { email, otp }),
  logout: () => api.post("/admin/logout"),
};

// Admin Product Management APIs
export const adminProductAPI = {
  getAllProducts: () => api.get("/admin/products"),
  getProductById: (id) => api.get(`/admin/products/${id}`),
  createProduct: (productData) => api.post("/admin/products", productData),
  updateProduct: (id, productData) => api.put(`/admin/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
  getAllCategories: () => api.get("/admin/categories"),
  getAllTypes: () => api.get("/admin/types"),
  createType: (typeData) => api.post("/admin/types", typeData),
};

// Image Upload APIs
export const imageAPI = {
  uploadImage: (formData) => api.post("/images/upload", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  deleteImage: (filename) => api.delete(`/images/${filename}`),
};

export default api;







