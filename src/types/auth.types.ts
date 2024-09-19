export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}
export interface RegisterResponse {
  message: string;
  data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserProps {
  id: number;
  avatar?: string | null;
  name: string;
  email: string;
  phone: string;
  email_verified_at?: string | null;
  status?: boolean;
  created_at: string;
  updated_at: string;
  custom_fields?: any | null;
  avatar_url?: string | null;
}

export interface LoginResponse {
  message: string;
  user: UserProps;
  token: string;
}

export interface APIErrorType {
  data?: {
    errors?: {
      email?: string[];
      phone?: string[];
    };
  };
}

export interface FormValueType {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthState {
  user: UserProps | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}


