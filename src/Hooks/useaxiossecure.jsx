import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./../context/AuthContext";

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);

  const axiosSecureInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  axiosSecureInstance.interceptors.request.use(
    (config) => {
      const token = user?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return axiosSecureInstance;
};

export default useAxiosSecure;
