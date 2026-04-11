import { useGetCities } from "@/hooks/user/movies/use-city";
import Header from "@/components/Header";
import { useState } from "react";
import { useGetCinemaByCity } from "@/hooks/user/use-cinema";
import CinemaSpecificUser from "./CinemaSpecificUser";

export default function CinemasUser() {
    const [pickedCity, setPickedCity] = useState<number | null>(null)
    const [pickedCinema, setPickedCinema] = useState<string>("")
    
    const { data: cities , isLoading, isError, isFetched: citiesFetched } = useGetCities();
    const { data: cinemas, isLoading: cinemaLoading, isError: isErrorCinema, isFetched: cinemaFetched} = useGetCinemaByCity(pickedCity!, {enabled: !!pickedCity})

    const handleCityClick = (city_id: number) => {
        setPickedCity(city_id)
    }

    const handleCinemaClick = (cinemaId: string) => {
        setPickedCinema(cinemaId)
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading cities</div>;

    return (
        <>
            <Header />
            <div className="grid grid-cols-5 gap-4 p-6">
                {cities?.map((city) => (
                    <div 
                    key={city.id} 
                    className="p-4 border rounded"
                    onClick={() => handleCityClick(city.id)}>
                        {city.name}
                    </div>
                ))}
            </div>
            {cinemaLoading && <div>Loading...</div>}
            {isErrorCinema && <div>Error loading cinemas</div>}
            {cinemaFetched && (
                <div>
                    {cinemas?.map((cinema) => (
                        <div onClick={() => handleCinemaClick(cinema.id)}>
                            {cinema.name}
                        </div>
                    ))}
                </div>
            )}
            {citiesFetched && cinemaFetched && 
            <CinemaSpecificUser 
            pickedCinema={pickedCinema} 
            pickedCity={pickedCity!}
            />}
        </>
    );
}