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