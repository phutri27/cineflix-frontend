import { useGetGenresAdmin, useInsertGenreAdmin, useUpdateGenreAdmin, useDeleteGenreAdmin } from "@/hooks";
import MoviesOptionEntity from "../MoviesOptionEntity";
export default function Genres() {
    const { data: admin_genres, isLoading, isError, error} = useGetGenresAdmin()
    const { mutate: insertGenre, isPending: insertPending } = useInsertGenreAdmin()
    const { mutate: updateGenre, isPending: updatePending} = useUpdateGenreAdmin()
    const { mutate: deleteGenre} = useDeleteGenreAdmin()

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
            />
}