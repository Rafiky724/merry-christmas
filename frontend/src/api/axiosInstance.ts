import axios from 'axios';
import.meta.env.VITE_API_URL

// Configura la URL base de tu API
const API_URL = import.meta.env.VITE_API_URL; // Ajusta la URL según tu servidor backend
const token = localStorage.getItem("access_token");

// Crea una instancia de Axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    ...(token && { Authorization: `Bearer ${token}` })
  },
});

// Interceptor de respuesta
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Si la respuesta es exitosa, la retorna
  },
  (error) => {
    // Si el error es de autenticación (por ejemplo, sesión expirada)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('access_token');

      // Redirige al login
      window.location.href = '/'; // Redirigir a la página de login
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
