
import axios from "axios";
import { toast } from "sonner";
import { 
  ProductDTO, 
  CreateProductDTO, 
  UpdateProductDTO, 
  RegisterDTO, 
  LoginDTO, 
  AuthResponseDTO,
  UserDTO
} from "@/types/dto";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Remplacez par votre URL d'API
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Une erreur est survenue";
    toast.error(message);
    
    // Si 401 Unauthorized, rediriger vers la page de connexion
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/auth/login";
    }
    
    return Promise.reject(error);
  }
);

// Service d'API
export const apiService = {
  // Auth Services
  register: async (data: RegisterDTO): Promise<AuthResponseDTO> => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  login: async (data: LoginDTO): Promise<AuthResponseDTO> => {
    const response = await api.post("/auth/login", data);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  },

  logout: (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: async (): Promise<UserDTO> => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  // Product Services
  getAllProducts: async (): Promise<ProductDTO[]> => {
    const response = await api.get("/products");
    return response.data;
  },

  getProductById: async (id: number): Promise<ProductDTO> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  
  searchProducts: async (query: string): Promise<ProductDTO[]> => {
    const response = await api.get(`/products/search?q=${query}`);
    return response.data;
  },
  
  getProductsByCategory: async (category: string): Promise<ProductDTO[]> => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  },

  createProduct: async (product: CreateProductDTO): Promise<ProductDTO> => {
    const response = await api.post("/products", product);
    toast.success("Produit créé avec succès");
    return response.data;
  },

  updateProduct: async (id: number, product: UpdateProductDTO): Promise<ProductDTO> => {
    const response = await api.put(`/products/${id}`, product);
    toast.success("Produit mis à jour avec succès");
    return response.data;
  },

  deleteProduct: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
    toast.success("Produit supprimé avec succès");
  },
};
