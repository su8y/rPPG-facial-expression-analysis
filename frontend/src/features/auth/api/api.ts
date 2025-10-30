import axiosInstance from "../../../utils/axios.ts";
import type {AuthCredentials, AuthResponse, SignUpResponse} from "../types/auth.type.ts";

export const login = async (credentials: AuthCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
};

export const signup = async (credentials: AuthCredentials): Promise<SignUpResponse> => {
    const response = await axiosInstance.post("/auth/signup", credentials);
    return response.data;
};

