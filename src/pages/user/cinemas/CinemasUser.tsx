import { useGetCities } from "@/hooks/user/movies/use-city";
import Header from "@/components/Header";
import { useState } from "react";
import { useGetCinemaByCity } from "@/hooks/user/use-cinema";
import CinemaSpecificUser from "./CinemaSpecificUser";
import Footer from "@/components/Footer";
export default function CinemasUser() {
    const [pickedCity, setPickedCity] = useState<number | null>(null)
    const [pickedCinema, setPickedCinema] = useState<string>("")
    
    const { data: cities , isLoading, isError, isFetched: citiesFetched } = useGetCities();
    const { data: cinemas, isLoading: cinemaLoading, isError: isErrorCinema, isFetched: cinemaFetched} = useGetCinemaByCity(pickedCity!, {enabled: !!pickedCity})

    const handleCityClick = (city_id: number) => {
        setPickedCity(city_id)
        setPickedCinema("")
    }

    const handleCinemaClick = (cinemaId: string) => {
        setPickedCinema(cinemaId)
    }

    if (isLoading) {
        return (
            <div className="bg-[#141414] min-h-screen text-white font-sans flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-8 w-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-neutral-400">Loading cities...</p>
                    </div>
                </div>
            </div>
        )
    }
    if (isError) {
        return (
            <div className="bg-[#141414] min-h-screen text-white font-sans flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-red-500 font-bold">Error loading cities. Please try again.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-[#141414] min-h-screen text-white font-sans flex flex-col">
            <Header />
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-8">
                    Select a Location
                </h1>
                <div className="w-full max-w-4xl mx-auto mb-16">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-4 gap-x-2">
                        {cities?.map((city) => {
                            const isSelected = pickedCity === city.id;
                            return (
                                <button 
                                    key={city.id} 
                                    onClick={() => handleCityClick(city.id)}
                                    className={`py-3 px-2 text-center text-sm md:text-base transition-colors font-medium rounded-md
                                        ${isSelected 
                                            ? "text-red-500 font-bold bg-red-600/10" 
                                            : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                                        }
                                    `}
                                >
                                    {city.name}
                                </button>
                            )
                        })}
                    </div>
                </div>
                {pickedCity && (
                    <div className="w-full max-w-4xl mx-auto animate-fade-in">
                        <div className="border-t border-neutral-800 pt-10">
                            {cinemaLoading && (
                                <p className="text-center text-neutral-500 animate-pulse mb-8">
                                    Loading cinemas...
                                </p>
                            )}
                            {isErrorCinema && (
                                <p className="text-center text-red-500 mb-8">
                                    Error loading cinemas in this city.
                                </p>
                            )}
                            {cinemaFetched && cinemas && cinemas.length === 0 && (
                                <p className="text-center text-neutral-400 mb-8">
                                    Sorry, no cinemas found in this city.
                                </p>
                            )}
                            {cinemaFetched && cinemas && cinemas.length > 0 && (
                                <div className="mb-12">
                                    <h2 className="text-xl font-bold text-neutral-200 mb-6 text-center">
                                        Select a Cinema
                                    </h2>
                                    <div className="flex flex-wrap justify-center gap-4">
                                        {cinemas?.map((cinema) => {
                                            const isCinemaSelected = pickedCinema === cinema.id;
                                            return (
                                                <button 
                                                    key={cinema.id}
                                                    onClick={() => handleCinemaClick(cinema.id)}
                                                    className={`px-6 py-3 rounded-lg border transition-all duration-200 font-medium
                                                        ${isCinemaSelected
                                                            ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                                            : "bg-neutral-900 border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white"
                                                        }
                                                    `}
                                                >
                                                    {cinema.name}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                            {citiesFetched && cinemaFetched && pickedCinema && (
                                <div className="mt-8 pt-8 border-t border-neutral-800 animate-fade-in">
                                    <CinemaSpecificUser 
                                        pickedCinema={pickedCinema} 
                                        pickedCity={pickedCity}
                                    />
                                </div>
                            )}
                            
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}