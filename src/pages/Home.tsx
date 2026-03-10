import { useMovie } from "@/hooks";

export default function Home(){
    const { data: movies, isError, isLoading, error } = useMovie()

    console.log(movies)
    if (isError){
        return <div>{error.message}</div>
    }

    if (isLoading){
        return <div>Loading...</div>
    }

    return (
        <div className="movies-container">
            <div>
                
            </div>
        </div>
    )
}