import { useMovie } from "@/hooks";
import { ErrorMessages } from "@/utils/error-messages";
import { Link } from "react-router";
import Header from "@/components/Header";
import { useUserRoleStore } from "@/utils/user-role-store";
import { useGetUserInfo } from "@/hooks";
import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";
import "@/styles/style.css"
export default function Home(){
    const { data: movies, isError, isLoading, error } = useMovie()
    const setUser = useUserRoleStore((state) => state.setUser)
    const clearUser = useUserRoleStore((state) => state.clearUser)
    const { data: userInfo } = useGetUserInfo()

    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (userInfo){
            setUser(userInfo.user)
        } else {
            clearUser()
            useUserRoleStore.persist.clearStorage()
        }
    }, [userInfo, setUser, clearUser])

    const scroll = (direction: "left" | "right") => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.clientWidth;
            carouselRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    return (
       <main className="bg-gray-950 min-h-screen text-white">
            <Header />
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-100 tracking-wider uppercase flex items-center">
                    <span className="w-2 h-8 bg-red-600 mr-3 rounded-full"></span>
                    Now Showing
                </h2>
                {isLoading && (
                    <div className="flex gap-4 animate-pulse">
                        {[1, 2, 3, 4, 5].map(n => (
                            <div key={n} className="w-[200px] h-[300px] bg-gray-800 rounded-xl"></div>
                        ))}
                    </div>
                )}
                {isError && <ErrorMessages error={error} />}
                {!isLoading && !isError && movies && (
                    <div className="relative group">
                        <button 
                            onClick={() => scroll("left")}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 z-10 bg-black/60 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>
                        <div 
                            ref={carouselRef}
                            className="flex gap-6 overflow-x-auto py-4 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        >
                            {movies.map(movie => (
                                <div key={movie.id} className="flex-none w-[200px] snap-start group/card relative">
                                    <div className="relative overflow-hidden rounded-xl shadow-lg">
                                        <img 
                                            src={movie.posterUrl} 
                                            alt={movie.title} 
                                            draggable="false"
                                            className="w-full h-[300px] object-cover transition-transform duration-300 ease-in-out group-hover/card:scale-110 group-hover/card:brightness-50 select-none"
                                        />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 gap-4 p-4">
                                            <Link 
                                                to={`/default/${movie.id}`}
                                                className="bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition-colors w-full text-center text-sm"
                                            >
                                                Details
                                            </Link>
                                        </div>
                                    </div>
                                    <h3 className="mt-3 text-sm font-semibold text-gray-300 line-clamp-1 group-hover/card:text-white transition-colors">
                                        {movie.title}
                                    </h3>
                                </div>
                            ))}
                        </div>
                        <button 
                            onClick={() => scroll("right")}
                            className="absolute right-0 top-1/2 
                            -translate-y-1/2 -mr-4 md:-mr-6 z-10 
                            bg-black/60 hover:bg-red-600 text-white 
                            p-2 rounded-full backdrop-blur-sm opacity-0
                             group-hover:opacity-100 transition-all duration-300 shadow-xl"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>

                    </div>
                )}
            </section>
            <Footer />
        </main>
    )
}