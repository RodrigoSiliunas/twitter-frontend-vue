// services/axios.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000", // Substitua pelo URL base da sua API
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default apiClient;
