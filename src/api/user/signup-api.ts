import axiosClient from "../axios-client"

interface SignupData {
    email: string;
    pw: string;
    confirm_pw: string;
    first_name: string;
    last_name: string;
}

export const signUpUser = async (data: SignupData) => {
    const response = await axiosClient.post("/api/signup", data);
    return response.data
}