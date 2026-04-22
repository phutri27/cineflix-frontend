export interface SeatType {
    price: number,
    seat_type: string,
    cinemaId: string
}

export interface SeatTypeProp extends SeatType {
    id: string
}