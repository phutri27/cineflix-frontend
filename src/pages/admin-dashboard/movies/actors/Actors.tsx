import { useGetActorsAdmin, useInsertActorAdmin, useUpdateActorAdmin, useDeleteActorAdmin } from "@/hooks";
import MoviesOptionEntity from "../MoviesOptionEntity";
export default function Actors() {
    const { data: admin_actor, isLoading, isError, error} = useGetActorsAdmin()
    const { mutate : insertActor, isPending: insertPending } = useInsertActorAdmin()
    const { mutate : updateActor, isPending: updatePending } = useUpdateActorAdmin()
    const { mutate : deleteActor } = useDeleteActorAdmin()

    return <MoviesOptionEntity 
            entityName="actor"
            data={admin_actor}
            isLoading={isLoading}
            isError={isError}
            errorMessage={error?.message}
            onInsert={(name, onSuccess) => insertActor(name, {onSuccess})}
            onUpdate={(id, name, onSuccess) => updateActor({id, name}, { onSuccess})}
            onDelete={(id) => deleteActor(id)} 
            isInsertPending={insertPending}
            isUpdatePending={updatePending}
            />
}