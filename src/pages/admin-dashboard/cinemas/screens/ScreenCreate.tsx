import ScreenEditor from "./ScreenEditor";
import { useParams } from "react-router";
import { useAdminScreen } from "@/hooks";
export default function ScreenCreate(){
    const { cinemaId } = useParams<{ cinemaId: string }>();
    const { mutate: insertScreen, isPending, isError, error } = useAdminScreen.useInsertAdminScreen(cinemaId!)

    return (
        <ScreenEditor 
            cinemaId={cinemaId!}
            onSave={(data, onSuccess) => insertScreen( data, { onSuccess })}
            isPending={isPending}
            isError={isError}
            error={error!}
        />
    )
}