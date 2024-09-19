import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../../types/auth.types";
import { ApiService } from "../services/ApiService";

// Injecting endpoints into ApiService
const AuthEndpoints = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (registerData) => ({
        url: "/register",
        method: "POST",
        body: registerData,
      }),
    }),

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (loginData) => ({
        url: "/login",
        method: "POST",
        body: loginData,
      }),
    }),

    logout: builder.mutation<string, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

// Correctly export the useLoginMutation hook
export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  AuthEndpoints;
