import ArchiveMovie from "./ArchiveMovie"
import { useAdminMovie } from "@/hooks"

export default function Archive(){
    const {data: archive_movies, isLoading, isError, error} = useAdminMovie.useGetMovieAdmin(true)

    if (isError){
        return <div className="p-6 text-red-500">{error.message}</div>
    }

    if(isLoading) {
        return <div className="p-6 text-neutral-400">Loading...</div>
    }

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {archive_movies?.map((movie) => (
                    <ArchiveMovie key={movie.id} movie={movie}/>
                ))}
            </div>
        </div>
    )
}