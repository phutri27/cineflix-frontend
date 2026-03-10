import { useGetActorsAdmin, useGetDirectorsAdmin, useGetGenresAdmin } from "@/hooks"
import { useForm, Controller } from "react-hook-form"
import type { MovieFormInput } from "@/api"
import Select from 'react-select'

const emptyMsg = "must not be empty"
export default function MovieForm({onSubmit, isPending}: {onSubmit: (data: MovieFormInput) => void, isPending: boolean}){
    const {data: admin_actors} = useGetActorsAdmin()
    const {data: admin_directors} = useGetDirectorsAdmin()
    const {data: admin_genres} = useGetGenresAdmin()

    const { register, handleSubmit, formState: { errors}, control, watch } = useForm<MovieFormInput>()
    
    const selectedPoster = watch("filename")

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="title">Title</label>
                <input 
                {...register("title", {required: `Title ${emptyMsg}`})} />
                {errors.title && <p>{errors.title.message}</p>}
            </div>
            <div>
                <label htmlFor="plot">Plot</label>
                <input {...register("plot", {required: `Plot ${emptyMsg}`})} />
                {errors.plot && <p>{errors.plot.message}</p>}
            </div>
            <div>
                <label htmlFor="duration">Duration</label>
                <input type="number" {...register("duration", {required: `Duration ${emptyMsg}`, min: 1})}/>
                {errors.duration && <p>{errors.duration.message}</p>}
            </div>
            <div>
                <label htmlFor="premiere_date">Premiere date</label>
                <input type="date" {...register("premiere_date", {required: `Premiere date ${emptyMsg}`})}/>
                {errors.premiere_date && <p>{errors.premiere_date.message}</p>}
            </div>
            <div>
                <label htmlFor="rated">Rated</label>
                <input type="text" {...register("rated", {required: `Rated ${emptyMsg}`})}/>
                {errors.rated && <p>{errors.rated.message}</p>}
            </div>
            <div>
                <label htmlFor="filename">Poster</label>
                <input type="file" {...register("filename", {required: `Poster ${emptyMsg}`})} accept=".jpg, .jpeg, .png"/>
                {selectedPoster && selectedPoster.length > 0 && (
                    <div>
                        <img src={URL.createObjectURL(selectedPoster[0])} alt="image preview" />
                    </div>
                )}
                {errors.filename && <p>{errors.filename.message}</p>}
            </div>
            <div>
                <label htmlFor="genre_option">Genres</label>
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
                        />
                    )}
                />  
                {errors.genre_option && errors.genre_option?.message}
            </div>
            <div>
                <label htmlFor="actors">Actors</label>
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
                        />
                    )}
                />
                {errors.actors && <p>{errors.actors.message}</p>}
            </div>
            <div>
                <label htmlFor="directors">Directors</label>
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
                        />
                    )}
                />
                {errors.directors && <p>{errors.directors.message}</p>}
            </div>
            <button type="submit" disabled={isPending}>{isPending ? "Adding..." : "Add"}</button>
        </form>
    )
}