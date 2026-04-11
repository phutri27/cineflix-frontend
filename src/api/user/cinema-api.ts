import axiosClient from "../axios-client";

export interface CinemasProps {
    id: string;
    name: string;
    cityId: number;
    address: string;
    hotline: string;
    createdAt: Date;
}

export interface CinemaSpecificProps {
    id: string;
    name: string;
    cityId: number;
    address: string;
    hotline: string;
    createdAt: Date;
    seatType: {
        id: string;
        price: number;
        seat_type: string;
    }[];
    movies: {
        id: string
        title: string;
        posterUrl: string;
        rated: string;
        showtimes: {
            id: string;
            startTime: Date;
            screen: {
                name: string;
            };
        }[];
    }[];
}

export const getCinemaByCity = async (city_id: number): Promise<CinemasProps[]> => {
    const response = await axiosClient.get("/api/cinema/", {
        params: {
            city_id
        }
    })
    return response.data
}

export const getCinemaSpecificInfo = async (city_id: number, cinemaId: string, date: string) => {
    const response = await axiosClient.get("/api/cinema/", {
        params: {
            cinemaId,
            date,
            city_id
        }
    }) 
    return response.data
}