import axiosInstance from "../common/axios.ts";
import type { DashboardData } from "../types/rppg.type.ts";
import type {AuthCredentials, AuthResponse, SignUpResponse} from "../types/auth.type.ts";

export const getDashboardData = async (): Promise<DashboardData> => {
    const dashboardUrl = import.meta.env.VITE_DASHBOARD_API as string;

    const response = await axiosInstance.get(dashboardUrl);

    return response.data;
};

export const login = async (credentials: AuthCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
};

export const signup = async (credentials: AuthCredentials): Promise<SignUpResponse> => {
    const response = await axiosInstance.post("/auth/signup", credentials);
    return response.data;
};

