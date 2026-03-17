import type { screenOption } from "@/api/admin/cinema/admin-cinema-api"
import { useDeleteAdminScreen } from "@/hooks/admin/cinemas/use-admin-screen"
import { ErrorMessages } from "@/utils/error-messages"
import { useNavigate } from "react-router"
export default function CinemaScreensList({cinemaId, screens}: {cinemaId: string, screens: screenOption[]}) {
    const navigate = useNavigate()
    const { mutate: deleteScreen, isError: isDeleteError, error: deleteError } = useDeleteAdminScreen(cinemaId)
    const handleViewScreen = (screenId: string) => {
        navigate(`/admin/cinemas/${cinemaId}/screens/${screenId}`)
    }

    const handleDeleteScreen = (screenId: string) => {
        if (window.confirm("Are you sure you want to delete this screen?")) {
            deleteScreen(screenId)
        }
    }

    return (
        <div>
            {screens.map((screen) => (
                <div key={screen.id}>
                    <h3>{screen.name}</h3>
                    <button onClick={() => handleViewScreen(screen.id)}>View</button>
                    {isDeleteError && <ErrorMessages error={deleteError}/>}
                    <button onClick={() => handleDeleteScreen(screen.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}