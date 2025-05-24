
export interface ProductDTO {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  quantity: number;
  category?: string | null;
  imageUrl?: string | null;
  userId?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductDTO {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category?: string;
  imageUrl?: string;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string | null;
  price?: number;
  quantity?: number;
  category?: string | null;
  imageUrl?: string | null;
}

export interface UserDTO {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterDTO {
  username: string;
  email: string;
  password: string;
  role?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  user: UserDTO;
  token: string;
}
