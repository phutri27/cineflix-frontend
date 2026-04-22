export interface ShowTimeResponse {
    id: string
    name: string
    showtimes: {id: string, startTime: Date, screenId: string, screenName: string}[]
}

export interface ShowtimeProp {
    screenId: string
    startTime: Date
}

export interface SpecificShowTimeResponse {
    id: string
    startTime: Date
    screen: {
        id: string
        name: string,
        seats: {
            id: string
            row: string
            number: number
            seat_typeId: string
            seatTypeDetail: {seat_type: string}
        }[],
        cinema: {
            name: string
        }
    }
    movie: {
        id: string
        title: string
        rated: string
        posterUrl: string
    }
}