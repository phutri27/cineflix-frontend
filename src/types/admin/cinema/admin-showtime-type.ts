export interface Showtime {
    id: string;
    screenId: string;
    movieId: string;
    startTime: Date;
}

export interface ShowTimeChange {
    screenId: string
    movieId: string
    startTime: string
}