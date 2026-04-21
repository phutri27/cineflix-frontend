import { useGetActorsAdmin, useGetDirectorsAdmin } from "@/hooks"
import type { GenreResponse } from "@/api"
import { useForm, Controller } from "react-hook-form"
import type { MovieFormInput } from "@/api"
import Select from 'react-select'

type MovieFormProps = {
    onSubmit: (data: MovieFormInput) => void
    isPending: boolean
    admin_genres: GenreResponse[] | undefined
}

const darkSelectStyles = {
    control: (base: any) => ({
        ...base,
        backgroundColor: '#262626',
        borderColor: '#525252',
        color: '#fff',
        minHeight: '40px',
        '&:hover': { borderColor: '#a3a3a3' },
    }),
    menu: (base: any) => ({
        ...base,
        backgroundColor: '#1a1a1a',
        border: '1px solid #404040',
    }),
    option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isFocused ? '#dc2626' : 'transparent',
        color: '#e5e5e5',
        '&:active': { backgroundColor: '#b91c1c' },
    }),
    multiValue: (base: any) => ({
        ...base,
        backgroundColor: '#dc2626',
        borderRadius: '4px',
    }),
    multiValueLabel: (base: any) => ({
        ...base,
        color: '#fff',
        fontSize: '12px',
        fontWeight: 600,
    }),
    multiValueRemove: (base: any) => ({
        ...base,
        color: '#fca5a5',
        '&:hover': { backgroundColor: '#b91c1c', color: '#fff' },
    }),
    placeholder: (base: any) => ({ ...base, color: '#737373' }),
    input: (base: any) => ({ ...base, color: '#fff' }),
}

const inputClass = "w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"

const emptyMsg = "must not be empty"

export default function MovieForm({onSubmit, isPending, admin_genres}: MovieFormProps){
    const {data: admin_actors} = useGetActorsAdmin()
    const {data: admin_directors} = useGetDirectorsAdmin()

    const { register, handleSubmit, formState: { errors }, control, watch } = useForm<MovieFormInput>()
    
    const selectedPoster = watch("filename")
    const selectedTrailer = watch("trailerUrl")

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <h2 className="text-xl font-bold text-white border-b border-neutral-700 pb-4">
                Add Movie
            </h2>

            {/* Title */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-neutral-400 mb-2">Title</label>
                <input className={inputClass} placeholder="Movie title" {...register("title", {required: `Title ${emptyMsg}`})} />
                {errors.title && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.title.message}</p>}
            </div>

            {/* Plot */}
            <div>
                <label htmlFor="plot" className="block text-sm font-medium text-neutral-400 mb-2">Plot</label>
                <textarea 
                    className={`${inputClass} min-h-[80px] resize-y`} 
                    placeholder="Movie plot..."
                    {...register("plot", {required: `Plot ${emptyMsg}`})} 
                />
                {errors.plot && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.plot.message}</p>}
            </div>

            {/* Duration, Premiere, Rated — row */}
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

            {/* Poster */}
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

            {/* Trailer */}
            <div>
                <label htmlFor="trailerUrl" className="block text-sm font-medium text-neutral-400 mb-2">Trailer URL</label>
                <input className={inputClass} placeholder="https://..." {...register("trailerUrl")}/>
                {selectedTrailer && (
                    <video className="mt-3 w-full rounded-lg border border-neutral-700" width="320" height="400" muted>
                        <source src={selectedTrailer}/>
                    </video>
                )}
            </div>

            {/* Genres */}
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
                            styles={darkSelectStyles}
                        />
                    )}
                />  
                {errors.genre_option && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.genre_option.message}</p>}
            </div>

            {/* Actors */}
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
                            styles={darkSelectStyles}
                        />
                    )}
                />
                {errors.actors && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.actors.message}</p>}
            </div>

            {/* Directors */}
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
                            styles={darkSelectStyles}
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