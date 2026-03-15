import { useGetAdminSpecificScreen } from "@/hooks/admin/cinemas/use-admin-screen";
import { useGetAdminSeatTypesByCinema } from "@/hooks/admin/cinemas/use-admin-seat-type";
import { useUpdateAdminScreen } from "@/hooks/admin/cinemas/use-admin-screen";
import { useParams } from "react-router";
import ScreenEditor from "./ScreenEditor";

export default function ScreenView(){
    const { cinemaId } = useParams<{ cinemaId: string }>();
    const { screenId } = useParams<{ screenId: string }>();

    const { data: screen, isLoading, isError } = useGetAdminSpecificScreen(screenId!)
    const { data: seat_type, isLoading: isSeatTypeLoading, isError: isSeatTypeError } = useGetAdminSeatTypesByCinema(cinemaId!)
    const { mutate: updateScreen, isPending: isUpdatingScreen, isError: isUpdateScreenError, error: updateScreenError } = useUpdateAdminScreen(cinemaId!)

    if (isSeatTypeLoading || isLoading) return <div>Loading screen details...</div>
    if (isError || isSeatTypeError || !screen) return <div>Error loading screen details.</div>

    const seatData = screen?.seats.map((seat) => {
        const seatTypeInfo = seat_type?.find(type => type.id === seat.seat_typeId);
        return {
            row: seat.row,
            number: seat.number,
            seat_typeId: seatTypeInfo ? { value: seatTypeInfo.id, label: seatTypeInfo.seat_type } : { value: "", label: "Unknown" }
        }
    })

    return (
        <ScreenEditor 
            cinemaId={cinemaId!}
            initialName={screen?.name}
            initialSeats={seatData!}    
            onSave={(data, onSuccess) => updateScreen({ id: screenId!, data: data }, { onSuccess })}
            screenId={screenId}
            isPending={isUpdatingScreen}
            isError={isUpdateScreenError}
            error={updateScreenError!}
        />
    )
}