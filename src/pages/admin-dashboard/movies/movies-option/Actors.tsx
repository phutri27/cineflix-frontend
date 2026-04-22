import { useAdminActor } from "@/hooks";
import MoviesOptionEntity from "../MoviesOptionEntity";
export default function Actors() {
    const { data: admin_actor, isLoading, isError, error} = useAdminActor.useGetActorsAdmin()
    const { mutate : insertActor, isPending: insertPending, isError: isInsertError, error: insertError } = useAdminActor.useInsertActorAdmin()
    const { mutate : updateActor, isPending: updatePending, isError: isUpdateError, error: updateError} = useAdminActor.useUpdateActorAdmin()
    const { mutate : deleteActor } = useAdminActor.useDeleteActorAdmin()

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
            isInsertError={isInsertError}
            insertError={insertError!}
            isUpdateError={isUpdateError}
            updateError={updateError!}
            />
}