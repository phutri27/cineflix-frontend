import MoviesByStatus from "./MoviesByStatus"
import { useSearchParams } from "react-router"
export default function MoviesBySearch(){
    const [searchParams] = useSearchParams()
    const movieSearch = searchParams.get("q") || ""

    return (
        <MoviesByStatus status="" title={movieSearch} genre="" />
    )
}