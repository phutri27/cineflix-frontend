import axiosClient from "../axios-client";

const GOOGLE_URL = import.meta.env.VITE_GOOGLE_URL

interface LoginCredentials {
    email: string;
    pw: string;
}

interface UserInfoProps{
    user: {
        id: string
        email: string
        first_name: string
        last_name: string
        role: string
    }
}

interface LoginResponse extends UserInfoProps{
    message: string;
}



export const getUserInfo = async (): Promise<UserInfoProps> => {
    const response = await axiosClient.get("/api/login/user/me")
    return response.data
}

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axiosClient.post<LoginResponse>(
        "/api/login",
        credentials
    );
    
    return response.data;
};

export const loginGoogle = async() => {
    window.location.href = `${GOOGLE_URL}`;
}