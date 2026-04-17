import axiosClient from "../axios-client";

export interface ProfileProps{
    spending_total : number;
    member_rank: string
}

export interface BookingHistoryProps{
    data: {
        id: string;
        createdAt: Date;
        tickets: {
            ticketUrl: string | null;
            seat: {
                number: number;
                row: string;
            };
        }[];
        showtime: {
            startTime: Date;
            movie: {
                title: string;
                posterUrl: string;
            };
            screen: {
                name: string;
                cinema: {
                    name: string;
                };
            };
        };
        seats: {
            number: number;
            row: string;
            seatTypeDetail: {
                price: number;
                seat_type: string;
            };
        }[];
        vouchers: {
            quantity: number;
            voucher: {
                name: string;
                reduceAmount: number;
            };
        }[];
        snacks: {
            quantity: number;
            snack: {
                name: string;
                price: number;
            };
        }[];
        transaction: {
            amount: number;
        }[];
    }[];
    meta: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
    };
}
export const getProfile = async (): Promise<ProfileProps> => {
    const response = await axiosClient.get("/api/customer/profile")
    return response.data
}

export const getProfileBookingHistory = async (page: number): Promise<BookingHistoryProps> => {
    const response = await axiosClient.get(`/api/customer/profile/booking_history/${page}`)
    return response.data
}

export const updateProfile = async (data: {password: string, first_name: string, last_name: string}) => {
    const response = await axiosClient.put("/api/customer/profile", data)
    return response.data
}

export const changePassword = async (data: {password: string}) => {
    const response = await axiosClient.post("/api/password/change", data)
    return response.data
}

export const confirmChangePasswordOTP = async (data: {otp: string}) => {
    const response = await axiosClient.post("/api/password/change/otp", data)
    return response.data
}

export const newPassword = async (data: {pw: string, confirm_pw: string, resetToken:string}) => {
    const response = await axiosClient.post("/api/password/new", data)
    return response.data
}

export const insertVoucher = async (voucher_code: string) => {
    const response = await axiosClient.post("/api/customer/profile/vouchers", {voucher_code})
    return response.data
}

