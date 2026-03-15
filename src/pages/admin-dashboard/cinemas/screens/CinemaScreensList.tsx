import type { screenOption } from "@/api/admin/cinema/admin-cinema-api"
import { useDeleteAdminScreen } from "@/hooks/admin/cinemas/use-admin-screen"
import { errorMessages } from "@/utils/error-messages"
import Error from "@/components/Error"
import { useNavigate } from "react-router"
export default function CinemaScreensList({cinemaId, screens}: {cinemaId: string, screens: screenOption[]}) {
    const navigate = useNavigate()
    const { mutate: deleteScreen, isError: isDeleteError, error: deleteError } = useDeleteAdminScreen(cinemaId)

    let displayError: string | string[]
    if (isDeleteError){
        displayError = errorMessages(deleteError)
    }

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
                    {isDeleteError && Array.isArray(displayError)
                    ? <Error errors={displayError}/> 
                    : <div>{displayError}</div> }
                    <button onClick={() => handleDeleteScreen(screen.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}