import { useAdminDeleteCinema } from "@/hooks/admin/cinemas/use-admin-cinema"
import { type CinemaResponse } from "@/api/admin/cinema/admin-cinema-api"
import { Link } from "react-router";
interface CinemaDetailsProps {
    cinema: CinemaResponse;
    handleEditingCinema: (cinemaId: string, cinemaName: string, cinemaAddress: string, cinemaHotline: string) => void;
}
export default function CinemaDetails({cinema, handleEditingCinema}: CinemaDetailsProps ){
    const { mutate: deleteCinema, isPending: deleteCinemaPending } = useAdminDeleteCinema()

    const handleDeleteCinema = () => {
        deleteCinema(cinema.id)
    }

    const handleDelete = () => {
        handleEditingCinema(cinema.id, cinema.name, cinema.address, cinema.hotline)
    }

    return (
        <div>
            <div>
                <div>
                    <Link to={`/admin/edit-cinemas/${cinema.id}`}><p>{cinema.name}</p></Link>
                    <p>Address: {cinema.address}</p>
                    <p>Hotline: {cinema.hotline}</p> 
                </div>
                <div>
                    <button onClick={handleDelete}>Edit</button>
                    <button onClick={handleDeleteCinema} disabled={deleteCinemaPending}>{deleteCinemaPending ? "Deleting..." : "Delete"}</button>
                </div>
            </div>
        </div>
    )
}