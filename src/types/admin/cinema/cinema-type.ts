export type screenOption = {
    id: string
    name: string
    cinemaId: string
}

export interface CinemaResponse{
    id: string
    name: string
    cityId: number
    address: string
    hotline: string
}

type movieOption = {
    id: string
    title: string
    posterUrl: string
}

type SeatType = {
    id: string
    price : number
    seat_type: string
    cinemaId: string
}

export interface CinemaDetailResponse extends CinemaResponse{
    seatType: SeatType[]
    movies: movieOption[]
    screens: screenOption[]
}
