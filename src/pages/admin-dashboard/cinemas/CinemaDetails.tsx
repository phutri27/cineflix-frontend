import { useAdminCinema } from "@/hooks";
import { Link } from "react-router";
import { Pencil, Trash2, MapPin, Phone } from "lucide-react";
import type { CinemaResponse } from "@/types/admin/cinema/cinema-type";

interface CinemaDetailsProps {
    cinema: CinemaResponse;
    handleEditingCinema: (cinemaId: string, cinemaName: string, cinemaAddress: string, cinemaHotline: string) => void;
}

export default function CinemaDetails({cinema, handleEditingCinema}: CinemaDetailsProps) {
    const { mutate: deleteCinema, isPending: deleteCinemaPending } = useAdminCinema.useAdminDeleteCinema()

    const handleDeleteCinema = () => {
        deleteCinema(cinema.id)
    }

    const handleEdit = () => {
        handleEditingCinema(cinema.id, cinema.name, cinema.address, cinema.hotline)
    }

    return (
        <div className="px-4 py-3 border-t border-neutral-700/50 hover:bg-neutral-800/40 transition-colors">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <Link 
                        to={`/admin/edit-cinemas/${cinema.id}`}
                        className="text-sm font-bold text-white hover:text-red-400 transition-colors"
                    >
                        {cinema.name}
                    </Link>
                    <div className="flex flex-col gap-1 mt-1.5">
                        <div className="flex items-center gap-2 text-xs text-neutral-400">
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span className="truncate">{cinema.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-neutral-400">
                            <Phone className="h-3 w-3 shrink-0" />
                            <span>{cinema.hotline}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                    <button
                        onClick={handleEdit}
                        className="h-7 w-7 rounded flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-700 transition-colors"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                        onClick={handleDeleteCinema}
                        disabled={deleteCinemaPending}
                        className="h-7 w-7 rounded flex items-center justify-center text-neutral-500 hover:text-red-500 hover:bg-red-950/50 disabled:opacity-50 transition-colors"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>
        </div>
    )
}