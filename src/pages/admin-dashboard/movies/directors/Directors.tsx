import { useGetDirectorsAdmin, useInsertDirectorAdmin, useDeleteDirectorAdmin, useUpdateDirectorAdmin} from "@/hooks";
import MoviesOptionEntity from "../MoviesOptionEntity";
export default function Directors() {
    const { data: admin_director, isLoading, isError, error} = useGetDirectorsAdmin()
    const { mutate : insertDirector, isPending: insertPending } = useInsertDirectorAdmin()
    const { mutate : updateDirector, isPending: updatePending } = useUpdateDirectorAdmin()
    const { mutate : deleteDirector } = useDeleteDirectorAdmin()

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
            />
}
