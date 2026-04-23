export type Option = {
    id: string
    name: string
}

export interface MovieResponse {
    id: string
    title: string
    plot: string
    posterUrl: string
    durationMin: number
    premiereDate: Date
    trailerUrl: string
    rated: string
    genres: Option[]
    directors: Option[]
    actors: Option[]
    isActive: boolean
    showtimes: {
        bookings: {
            id: string;
            createdAt: Date;
            status: string;
            userId: string;
            showtimeId: string;
        }[];
    }[];
}

export interface MovieFormInput{
    title: string
    plot: string
    filename: File[]
    duration: number
    premiere_date: Date | string,
    trailerUrl: string
    rated: string
    genre_option : {value: string, label: string}[]
    actors: {value: string, label: string}[]
    directors: {value: string, label: string}[]
}
