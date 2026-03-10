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
    rated: string
    genres: Option[]
    directors: Option[]
    actors: Option[]
}