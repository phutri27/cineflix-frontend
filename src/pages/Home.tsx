import { useMovie } from "@/hooks";
import { ErrorMessages } from "@/utils/error-messages";
import { Link } from "react-router";
import Header from "@/components/Header";
import "@/styles/style.css"
export default function Home(){
    const { data: movies, isError, isLoading, error } = useMovie()

    return (
       <main className="p-5">
            <Header />
            <section>
                <h2 className="text-xl font-semibold mb-4">Now Showing</h2>
                {isLoading && <p className="text-gray-500">Loading movies...</p>}
                {isError && <ErrorMessages error={error} />}
                {!isLoading && !isError && movies && (
                    <div className="flex gap-4 overflow-x-auto py-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {movies.map(movie => (
                            <div key={movie.id} className="flex-none w-[200px] snap-start">
                                <img 
                                    src={movie.posterUrl} 
                                    alt={movie.title} 
                                    draggable="false"
                                    className="w-full h-[300px] object-cover rounded-xl shadow-md transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer"
                                />
                                <div className="flex gap-10 justify-center ">
                                    <Link to={`/default/${movie.id}`}>Details</Link>
                                    {/* <Link to={}>Book a ticket</Link> */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}