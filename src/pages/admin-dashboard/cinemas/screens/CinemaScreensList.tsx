import type { screenOption } from "@/types/admin/cinema/cinema-type"
import { useAdminScreen } from "@/hooks"
import { ErrorMessages } from "@/utils/error-messages"
import { useNavigate } from "react-router"
import { Eye, Trash2, Monitor } from "lucide-react"

export default function CinemaScreensList({cinemaId, screens}: {cinemaId: string, screens: screenOption[]}) {
    const navigate = useNavigate()
    const { mutate: deleteScreen, isError: isDeleteError, error: deleteError } = useAdminScreen.useDeleteAdminScreen(cinemaId)

    const handleViewScreen = (screenId: string) => {
        navigate(`/admin/cinemas/${cinemaId}/screens/${screenId}`)
    }

    const handleDeleteScreen = (screenId: string) => {
        if (window.confirm("Are you sure you want to delete this screen?")) {
            deleteScreen(screenId)
        }
    }

    if (screens.length === 0) {
        return <p className="text-sm text-neutral-500 text-center py-4">No screens added yet.</p>
    }

    return (
        <div className="flex flex-col gap-2">
            {isDeleteError && <div className="mb-2 text-red-500"><ErrorMessages error={deleteError}/></div>}
            {screens.map((screen) => (
                <div
                    key={screen.id}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-neutral-700/50 hover:bg-neutral-800/40 transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <Monitor className="h-3.5 w-3.5 text-neutral-500" />
                        <span className="text-sm text-neutral-200 font-semibold">{screen.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => handleViewScreen(screen.id)}
                            className="h-7 w-7 rounded flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-700 transition-colors"
                        >
                            <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                            onClick={() => handleDeleteScreen(screen.id)}
                            className="h-7 w-7 rounded flex items-center justify-center text-neutral-500 hover:text-red-500 hover:bg-red-950/50 transition-colors"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}