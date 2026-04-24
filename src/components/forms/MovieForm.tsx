import { useAdminActor, useAdminDirector } from "@/hooks"
import type { GenreResponse } from "@/types/admin/movies/genres-type"
import { useForm, Controller } from "react-hook-form"
import type { MovieFormInput } from "@/types/admin/movies/movie-type"
import Select from 'react-select'
import { darkSelectEditStyles } from "@/utils/react-select-style"
type MovieFormProps = {
    onSubmit: (data: MovieFormInput) => void
    isPending: boolean
    admin_genres: GenreResponse[] | undefined
}



const inputClass = "w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"

const emptyMsg = "must not be empty"

export default function MovieForm({onSubmit, isPending, admin_genres}: MovieFormProps){
    const {data: admin_actors} = useAdminActor.useGetActorsAdmin()
    const {data: admin_directors} = useAdminDirector.useGetDirectorsAdmin()

    const { register, handleSubmit, formState: { errors }, control, watch } = useForm<MovieFormInput>()
    
    const selectedPoster = watch("filename")
    const selectedTrailer = watch("trailerUrl")

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <h2 className="text-xl font-bold text-white border-b border-neutral-700 pb-4">
                Add Movie
            </h2>
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-neutral-400 mb-2">Title</label>
                <input className={inputClass} placeholder="Movie title" {...register("title", {required: `Title ${emptyMsg}`})} />
                {errors.title && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.title.message}</p>}
            </div>
            <div>
                <label htmlFor="plot" className="block text-sm font-medium text-neutral-400 mb-2">Plot</label>
                <textarea 
                    className={`${inputClass} min-h-[80px] resize-y`} 
                    placeholder="Movie plot..."
                    {...register("plot", {required: `Plot ${emptyMsg}`})} 
                />
                {errors.plot && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.plot.message}</p>}
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-neutral-400 mb-2">Duration</label>
                    <input type="number" className={inputClass} placeholder="Min" {...register("duration", {required: `Duration ${emptyMsg}`, min: 1})}/>
                    {errors.duration && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.duration.message}</p>}
                </div>
                <div>
                    <label htmlFor="premiere_date" className="block text-sm font-medium text-neutral-400 mb-2">Premiere</label>
                    <input type="date" className={`${inputClass} [color-scheme:dark]`} {...register("premiere_date", {required: `Premiere date ${emptyMsg}`})}/>
                    {errors.premiere_date && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.premiere_date.message}</p>}
                </div>
                <div>
                    <label htmlFor="rated" className="block text-sm font-medium text-neutral-400 mb-2">Rated</label>
                    <input className={inputClass} placeholder="PG-13" {...register("rated", {required: `Rated ${emptyMsg}`})}/>
                    {errors.rated && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.rated.message}</p>}
                </div>
            </div>
            <div>
                <label htmlFor="filename" className="block text-sm font-medium text-neutral-400 mb-2">Poster</label>
                <input 
                    type="file" 
                    accept="image/*"
                    {...register("filename", {required: `Poster ${emptyMsg}`})} 
                    className="w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-neutral-700 file:text-neutral-200 hover:file:bg-neutral-600 file:cursor-pointer file:transition-colors"
                />
                {selectedPoster && selectedPoster.length > 0 && (
                    <img 
                        src={URL.createObjectURL(selectedPoster[0])} 
                        alt="Preview" 
                        className="mt-3 h-40 rounded-lg object-cover border border-neutral-700"
                    />
                )}
                {errors.filename && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.filename.message}</p>}
            </div>
            <div>
                <label htmlFor="trailerUrl" className="block text-sm font-medium text-neutral-400 mb-2">Trailer URL</label>
                <input className={inputClass} placeholder="https://..." {...register("trailerUrl")}/>
                {selectedTrailer && (
                    <video className="mt-3 w-full rounded-lg border border-neutral-700" width="320" height="400" muted>
                        <source src={selectedTrailer}/>
                    </video>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Genres</label>
                <Controller
                    name="genre_option"
                    control={control}
                    rules={{required: `Genres ${emptyMsg}`}}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={admin_genres?.map(genre => ({value: genre.id, label: genre.name})) || []}
                            isMulti
                            placeholder="Select genres..."
                            styles={darkSelectEditStyles}
                        />
                    )}
                />  
                {errors.genre_option && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.genre_option.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Actors</label>
                <Controller 
                    name="actors"
                    control={control}
                    rules={{required: `Actors ${emptyMsg}`}}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={admin_actors?.map(actor => ({value: actor.id, label: actor.name})) || []}
                            isMulti
                            placeholder="Select actors..."
                            styles={darkSelectEditStyles}
                        />
                    )}
                />
                {errors.actors && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.actors.message}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Directors</label>
                <Controller 
                    name="directors"
                    control={control}
                    rules={{required: `Directors ${emptyMsg}`}}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={admin_directors?.map(director => ({value: director.id, label: director.name})) || []}
                            isMulti
                            placeholder="Select directors..."
                            styles={darkSelectEditStyles}
                        />
                    )}
                />
                {errors.directors && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.directors.message}</p>}
            </div>

            <button 
                type="submit" 
                disabled={isPending}
                className="w-full py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
            >
                {isPending ? "Adding..." : "Add Movie"}
            </button>
        </form>
    )
}