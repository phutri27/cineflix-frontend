import { useAdminGenre } from "@/hooks";
import MoviesOptionEntity from "../MoviesOptionEntity";
export default function Genres() {
    const { data: admin_genres, isLoading, isError, error} = useAdminGenre.useGetGenresAdmin()
    const { mutate: insertGenre, isPending: insertPending, isError: isInsertError, error: insertError } = useAdminGenre.useInsertGenreAdmin()
    const { mutate: updateGenre, isPending: updatePending, isError: isUpdateError, error: updateError} = useAdminGenre.useUpdateGenreAdmin()
    const { mutate: deleteGenre} = useAdminGenre.useDeleteGenreAdmin()

    return <MoviesOptionEntity 
            entityName="genre"
            data={admin_genres}
            isLoading={isLoading}
            isError={isError}
            errorMessage={error?.message}
            onInsert={(name, onSuccess) => insertGenre(name, {onSuccess})}
            onUpdate={(id, name, onSuccess) => updateGenre({id, name}, { onSuccess})}
            onDelete={(id) => deleteGenre(id)} 
            isInsertPending={insertPending}
            isUpdatePending={updatePending}
            isInsertError={isInsertError}
            insertError={insertError!}
            isUpdateError={isUpdateError}
            updateError={updateError!}
            />
}