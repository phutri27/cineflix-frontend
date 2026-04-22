import { useParams } from "react-router";
import { useAdminMovie, useAdminActor, useAdminDirector, useAdminGenre } from "@/hooks";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import type { MovieFormInput } from "@/types/admin/movies/movie-type";
import Select from "react-select"
import { movieData } from "@/components/helper/movie-submit-helper";
import { useNavigate } from "react-router";
import { ErrorMessages } from "@/utils/error-messages";
import ReactPlayer from 'react-player'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Upload } from "lucide-react";
import { darkSelectEditStyles } from "@/utils/react-select-style";

const inputClass = "w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"

const emptyMsg = "must not be empty"

export default function SingleMovieEdit(){
    const navigate = useNavigate()
    const { movieId } = useParams()

    const { data: admin_movie, isLoading, isError: queyrIsError, error: queryError} = useAdminMovie.useGetSpecificMovieAdmin(movieId!)
    const { mutate, isPending, isError: mutateIsError, error: mutateError} = useAdminMovie.useUpdateMovieAdmin()
    const { data: actors} = useAdminActor.useGetActorsAdmin()
    const { data: directors} = useAdminDirector.useGetDirectorsAdmin()
    const { data: genres} = useAdminGenre.useGetGenresAdmin()

    const { register, handleSubmit, formState: {errors: formError}, control, watch} = useForm<MovieFormInput>({
        values: {
            title: admin_movie?.title as string,
            plot: admin_movie?.plot as string,
            filename: [],
            duration: admin_movie?.durationMin as number,
            premiere_date: admin_movie?.premiereDate.toString().split('T')[0] as string,
            trailerUrl: admin_movie?.trailerUrl as string,
            rated: admin_movie?.rated as string,
            genre_option: admin_movie?.genres.map((g) => ({value: g.id, label: g.name})) || [],
            directors: admin_movie?.directors.map((d) => ({value: d.id, label: d.name})) || [],
            actors: admin_movie?.actors.map((a) => ({value: a.id, label: a.name})) || []
        }
    })

    const selectedPoster = watch("filename")
    const selectedTrailer = watch("trailerUrl")

    const onSubmit: SubmitHandler<MovieFormInput> = (data) => {
        const formData = movieData(data)
        mutate({id: movieId!, formData}, {
            onSuccess: () => navigate("/admin/dashboard/movies")
        });
    }

    if (isLoading){
        return (
            <div className="bg-[#141414] min-h-screen">
                <Header />
                <p className="text-neutral-400 text-center pt-20">Loading...</p>
            </div>
        )
    }

    if (queyrIsError){
        return (
            <div className="bg-[#141414] min-h-screen">
                <Header />
                <p className="text-red-500 text-center pt-20">{queryError.message}</p>
            </div>
        )
    }

    const posterSrc = (selectedPoster && selectedPoster.length > 0) 
        ? URL.createObjectURL(selectedPoster[0]) 
        : admin_movie?.posterUrl

    return (
        <div className="bg-[#141414] min-h-screen text-white font-sans flex flex-col">
            <Header />
            <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex items-center gap-4 mb-8 border-b border-neutral-700 pb-6">
                    <button
                        onClick={() => navigate("/admin/dashboard/movies")}
                        className="h-9 w-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors shrink-0"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                        Edit Movie
                    </h1>
                </div>

                {mutateIsError && (
                    <div className="mb-6">
                        <ErrorMessages error={mutateError!} />
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                        <div className="shrink-0">
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Poster</label>
                            <div className="relative group w-56">
                                <img
                                    src={posterSrc}
                                    alt="Poster preview"
                                    className="w-56 h-80 rounded-lg object-cover border border-neutral-700"
                                />
                                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center cursor-pointer">
                                    <Upload className="h-6 w-6 text-white mb-2" />
                                    <span className="text-xs text-neutral-300 font-medium">Change Poster</span>
                                    <input
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        {...register("filename")}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {formError.filename && (
                                <p className="mt-1.5 text-xs text-red-500 font-medium">{formError.filename.message}</p>
                            )}
                        </div>
                        <div className="flex-1 flex flex-col gap-5">
                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">Title</label>
                                <input
                                    className={inputClass}
                                    placeholder="Movie title"
                                    {...register("title", {required: `Title ${emptyMsg}`})}
                                />
                                {formError.title && <p className="mt-1.5 text-xs text-red-500 font-medium">{formError.title.message}</p>}
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-400 mb-2">Duration</label>
                                    <input
                                        type="number"
                                        className={inputClass}
                                        placeholder="Min"
                                        {...register("duration", {required: `Duration ${emptyMsg}`, min: 1})}
                                    />
                                    {formError.duration && <p className="mt-1.5 text-xs text-red-500 font-medium">{formError.duration.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-400 mb-2">Premiere</label>
                                    <input
                                        type="date"
                                        className={`${inputClass} [color-scheme:dark]`}
                                        {...register("premiere_date", {required: `Premiere date ${emptyMsg}`})}
                                    />
                                    {formError.premiere_date && <p className="mt-1.5 text-xs text-red-500 font-medium">{formError.premiere_date.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-400 mb-2">Rated</label>
                                    <input
                                        className={inputClass}
                                        placeholder="PG-13"
                                        {...register("rated", {required: `Rating ${emptyMsg}`})}
                                    />
                                    {formError.rated && <p className="mt-1.5 text-xs text-red-500 font-medium">{formError.rated.message}</p>}
                                </div>
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
                                            options={directors?.map((d: {id: string, name: string}) => ({value: d.id, label: d.name})) || []}
                                            isMulti
                                            placeholder="Select directors..."
                                            styles={darkSelectEditStyles}
                                        />
                                    )}
                                />
                                {formError.directors && <p className="mt-1.5 text-xs text-red-500 font-medium">{formError.directors.message}</p>}
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
                                            options={actors?.map((a: {id: string, name: string}) => ({value: a.id, label: a.name})) || []}
                                            isMulti
                                            placeholder="Select actors..."
                                            styles={darkSelectEditStyles}
                                        />
                                    )}
                                />
                                {formError.actors && <p className="mt-1.5 text-xs text-red-500 font-medium">{formError.actors.message}</p>}
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
                                            options={genres?.map((g: {id: string, name: string}) => ({value: g.id, label: g.name})) || []}
                                            isMulti
                                            placeholder="Select genres..."
                                            styles={darkSelectEditStyles}
                                        />
                                    )}
                                />
                                {formError.genre_option && <p className="mt-1.5 text-xs text-red-500 font-medium">{formError.genre_option.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="bg-neutral-900/50 border border-neutral-700 rounded-lg p-6 mb-6">
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Trailer URL</label>
                        <input
                            className={inputClass}
                            placeholder="https://..."
                            {...register("trailerUrl")}
                        />
                        {selectedTrailer && (
                            <div className="mt-4 aspect-video rounded-lg overflow-hidden">
                                <ReactPlayer
                                    src={selectedTrailer}
                                    playing={false}
                                    controls={true}
                                    width="100%"
                                    height="100%"
                                />
                            </div>
                        )}
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Plot</label>
                        <textarea
                            className={`${inputClass} min-h-[120px] resize-y`}
                            placeholder="Movie plot..."
                            {...register("plot", {required: `Plot ${emptyMsg}`})}
                        />
                        {formError.plot && <p className="mt-1.5 text-xs text-red-500 font-medium">{formError.plot.message}</p>}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="px-8 py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
                        >
                            {isPending ? "Updating..." : "Update Movie"}
                        </button>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    )
}