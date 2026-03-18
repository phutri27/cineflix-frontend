import { useMovie } from "@/hooks";
import { useUserRoleStore } from "@/utils/user-role-store";
export default function Home(){
    const { data: movies, isError, isLoading, error } = useMovie()
    const { first_name, last_name, email, role } = useUserRoleStore()

    return (
        <>
            <header>Welcome back , {first_name + " " + last_name}</header>
            <div className="movies-container">
                <div>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : isError ? (
                        <p>{error instanceof Error ? error.message : "An error occurred"}</p>
                    ) : (
                        movies?.map(movie => (
                            <div key={movie.id} className="movie-card">
                                <h3>{movie.title}</h3>
                                <p>{movie.description}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}