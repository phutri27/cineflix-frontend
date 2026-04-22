export type SeatType = {
    row: string
    number: number
    seat_typeId: string
}

export interface ScreenTypeProp {
    name: string
    cinema_id: string
    seats: SeatType[]
}

export interface ScreenByMovieAndCinemaResponse {
    id: string
    name: string
    cinemaId: string
    showtimes: {
        id: string
        startTime: Date
        movieId: string
        screenId: string
    }[]
}


export interface ScreensProp {
    id: string
    name: string
    cinemaId: string
    showtimes: {
        id: string,
        startTime: Date
        movie:{
            id: string
        }
    }[]
}
