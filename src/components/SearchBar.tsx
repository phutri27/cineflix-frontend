import { useMovie } from "@/hooks";
import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
export default function SearchBar(){
    const [movieSearch, setMovieSearch] = useState<string>("")
    const { data: movies } = useMovie("", movieSearch, "")
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        navigate(`/default/movies?q=${movieSearch}`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={movieSearch}
                    onChange={(e) => setMovieSearch(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {movieSearch && 
            <div>
                {movies?.map(movie => (
                    <Link to={`/default/${movie.id}`} key={movie.id}>
                        <div>
                            {movie.title.toLowerCase().includes(movieSearch.toLowerCase()) && (
                                <p>{movie.title}</p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>}
        </div>
    )
}