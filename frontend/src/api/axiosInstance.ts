import axios from "axios";

// Configura la URL base de tu API
const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

// // Determinar el tipo de Content-Type basado en la solicitud
//     if (config.url?.includes("/")) {
//       // Para login, usamos application/x-www-form-urlencoded
//       config.headers["Content-Type"] = "application/x-www-form-urlencoded";
//     } else if (config.url?.includes("/familia")) {
//       // Para crear deseos, usamos application/json
//       config.headers["Content-Type"] = "application/json";
//     }

// ✅ Interceptor de solicitud para agregar el token dinámicamente
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem("access_token");
      window.location.href = "/"; // Redirigir al login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
