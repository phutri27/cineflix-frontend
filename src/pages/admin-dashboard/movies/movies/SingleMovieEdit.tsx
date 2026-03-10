import { useParams } from "react-router";
import { useGetSpecificMovieAdmin, useUpdateMovieAdmin } from "@/hooks";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import type { MovieFormInput } from "@/api";
import Select from "react-select"
import { movieData } from "@/components/helper/movie-submit-helper";
import { useNavigate } from "react-router";
import Error from "@/components/Error";

const emptyMsg = "must not be empty"

export default function SingleMovieEdit(){
    const navigate = useNavigate()
    const { movieId } = useParams()

    const { data: admin_movie, isLoading, isError: queyrIsError, error: queryError} = useGetSpecificMovieAdmin(movieId!)
    const { mutate, isPending, isError: mutateIsError, error: mutateError} = useUpdateMovieAdmin()

    let displayError: string | React.ReactNode = ""
    if (mutateIsError){
        const errors: string[] | string = mutateError?.response?.data.errors || mutateError?.message || "An error occurred"
        if (Array.isArray(errors)){
            displayError = <Error errors={errors} />
        } else {
            displayError = errors
        }
    }

    const { register, handleSubmit, formState: {errors: formError}, control, watch}  = useForm<MovieFormInput>({
        values: {
            title: admin_movie?.title as string,
            plot: admin_movie?.plot as string,
            filename: [] ,
            duration: admin_movie?.durationMin as number,
            premiere_date: admin_movie?.premiereDate.toString().split('T')[0] as string,
            rated: admin_movie?.rated as string,
            genre_option: admin_movie?.genres.map((g) => ({value: g.id, label: g.name})) || [],
            directors: admin_movie?.directors.map((d) => ({value: d.id, label: d.name})) || [],
            actors: admin_movie?.actors.map((a) => ({value: a.id, label: a.name})) || []
        }
    })

    const selectedPoster = watch("filename")

    const onSubmit: SubmitHandler<MovieFormInput> = (data) => {
        const formData = movieData(data)
        mutate({id: movieId!, formData}, {
            onSuccess: () => navigate("/admin/dashboard/movies")
        });
    }

    if (isLoading){
        return <div>Loading...</div>
    }

    if (queyrIsError){
        return <div>{queryError.message}</div>
    }

    return (
        <div>
            {displayError}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type="file" {...register("filename")} accept=".jpg, .jpeg, .png"/>
                    <img src={(selectedPoster && selectedPoster.length > 0) ? 
                    URL.createObjectURL(selectedPoster[0]) : 
                    admin_movie?.posterUrl} 
                    alt="Image preview" />
                    {formError.filename && <p>{formError.filename.message}</p>}
                </div>
                <div>
                    <input {...register("title", {required: `Title ${emptyMsg}`})} placeholder="Title" />
                    {formError.title && <p>{formError.title.message}</p>}
                </div>
                <div>
                    <div>
                        <label htmlFor="directors">Directors</label>
                        <Controller
                            name="directors"
                            control={control}
                            rules={{required: `Directors ${emptyMsg}`}}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={admin_movie?.directors?.map((director: {id: string, name: string}) => ({value: director.id, label: director.name})) || []}
                                    isMulti
                                    placeholder="Select directors..."
                                />
                            )}
                        /> 
                        {formError.directors && <p>{formError.directors.message}</p>}
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
                                    options={admin_movie?.actors?.map((actor: {id: string, name: string}) => ({value: actor.id, label: actor.name})) || []}
                                    isMulti
                                    placeholder="Select actors..."
                                />
                            )}
                        />  
                        {formError.actors && <p>{formError.actors.message}</p>}
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
                                    options={admin_movie?.genres?.map((genre: {id: string, name: string}) => ({value: genre.id, label: genre.name})) || []}
                                    isMulti
                                    placeholder="Select genres..."
                                />
                            )}
                        />
                        {formError.genre_option && <p>{formError.genre_option.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="premiere_date">Premiere date</label>
                        <input 
                        type="date" 
                        {...register("premiere_date", {required: `Premiere date ${emptyMsg}`})} 
                        placeholder="Premiere date"/>
                    </div>
                    <div>
                        <label htmlFor="duration">Duration</label>
                        <input 
                        type="number" 
                        {...register("duration", {required: `Duration ${emptyMsg}`, min: 1})} 
                        placeholder="Duration"/>
                    </div>
                    <div>
                        <label htmlFor="rated">Rated</label>
                        <input 
                        {...register("rated", {required: `Rating ${emptyMsg}`})} 
                        placeholder="rating"/>
                    </div>
                </div>
                <div>
                    <label htmlFor="plot">Plot</label>
                    <textarea 
                    {...register("plot", {required: `Plot ${emptyMsg}`})} 
                    placeholder="Plot"/>
                </div>
                <button type="submit" disabled={isPending}>{isPending ? "Updating..." : "Update"}</button>
            </form>
        </div>
    )
}