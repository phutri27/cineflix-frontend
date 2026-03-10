import axiosClient from "../axios-client";

const API_URL = import.meta.env.VITE_API_URL

interface LoginCredentials {
    email: string;
    pw: string;
}

interface LoginResponse {
    message: string;
    user: {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        role: string
    };
}

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axiosClient.post<LoginResponse>(
        "/api/login",
        credentials
    );
    
    return response.data;
};

export const loginGoogle = async() => {
    window.location.href = `${API_URL}/api/login/auth/google`;
}