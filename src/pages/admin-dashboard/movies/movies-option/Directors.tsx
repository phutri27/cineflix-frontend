import { useAdminDirector } from "@/hooks";
import MoviesOptionEntity from "../MoviesOptionEntity";
export default function Directors() {
    const { data: admin_director, isLoading, isError, error} = useAdminDirector.useGetDirectorsAdmin()
    const { mutate : insertDirector, isPending: insertPending, isError: isInsertError, error: insertError } = useAdminDirector.useInsertDirectorAdmin()
    const { mutate : updateDirector, isPending: updatePending, isError: isUpdateError, error: updateError } = useAdminDirector.useUpdateDirectorAdmin()
    const { mutate : deleteDirector } = useAdminDirector.useDeleteDirectorAdmin()

    return <MoviesOptionEntity 
            entityName="director"
            data={admin_director}
            isLoading={isLoading}
            isError={isError}
            errorMessage={error?.message}
            onInsert={(name, onSuccess) => insertDirector(name, { onSuccess})}
            onUpdate={(id, name, onSuccess) => updateDirector({id, name}, {onSuccess})}
            onDelete={(id) => deleteDirector(id)}
            isInsertPending={insertPending}
            isUpdatePending={updatePending}
            isInsertError={isInsertError}
            insertError={insertError!}
            isUpdateError={isUpdateError}
            updateError={updateError!}
            />
}
