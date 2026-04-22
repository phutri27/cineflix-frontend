import { useParams } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import { useAdminCinema } from '@/hooks';
import CinemaScreensList from './screens/CinemaScreensList';
import SeatTypeList from './seat-types/SeatTypeList';
import { useNavigate } from 'react-router';
import { ErrorMessages } from '@/utils/error-messages';
import MoviesList from './showing-movies/MoviesList';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Monitor, Armchair, Film, Plus } from 'lucide-react';

interface CinemaGeneralFormData {
    name: string;
    cityId: number;
    address: string;
    hotline: string;
}

const inputClass = "w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"

const emptyMsg = "field cannot be empty";

export default function EditCinemaPage() {
    const navigate = useNavigate()
    const { cinemaId } = useParams<{ cinemaId: string }>();

    const { data: cinema, isLoading, isError } = useAdminCinema.useGetSpecificAdminCinema(cinemaId as string);
    const { mutate: updateCinema, isPending, isError: isUpdateError, error: updateError } = useAdminCinema.useAdminUpdateCinema();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CinemaGeneralFormData>();

    useEffect(() => {
        if (cinema) {
            reset({
                name: cinema.name,
                address: cinema.address,
                hotline: cinema.hotline
            });
        }
    }, [cinema, reset]);

    const addScreen = () => {
        navigate(`/admin/cinemas/${cinemaId}/add-screen/`);
    }

    const onSubmit: SubmitHandler<CinemaGeneralFormData> = (formData) => {
        updateCinema({ cinema_id: cinema!.id, data: formData }, {
            onSuccess: () => alert("Cinema general info updated!")
        });
    };

    if (isLoading) return (
        <div className="bg-[#141414] min-h-screen">
            <Header />
            <p className="text-neutral-400 text-center pt-20">Loading Cinema Details...</p>
        </div>
    )

    if (isError || !cinema) return (
        <div className="bg-[#141414] min-h-screen">
            <Header />
            <p className="text-red-500 text-center pt-20">Error loading cinema.</p>
        </div>
    )

    return (
        <div className="bg-[#141414] min-h-screen text-white font-sans flex flex-col">
            <Header />
            <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex items-center gap-4 mb-8 border-b border-neutral-700 pb-6">
                    <button
                        onClick={() => navigate("/admin/dashboard/cinemas")}
                        className="h-9 w-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors shrink-0"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                        Edit: {cinema.name}
                    </h1>
                </div>
                <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6 mb-8">
                    <h2 className="text-lg font-bold text-white mb-4 border-b border-neutral-700 pb-3">
                        General Information
                    </h2>

                    {isUpdateError && (
                        <div className="mb-4">
                            <ErrorMessages error={updateError!} />
                        </div>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 max-w-lg">
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Name</label>
                            <input
                                className={inputClass}
                                placeholder="Cinema name"
                                {...register("name", { required: `Name ${emptyMsg}` })}
                            />
                            {errors.name && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Address</label>
                            <input
                                className={inputClass}
                                placeholder="Cinema address"
                                {...register("address", { required: `Address ${emptyMsg}` })}
                            />
                            {errors.address && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.address.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Hotline</label>
                            <input
                                className={inputClass}
                                placeholder="Hotline number"
                                {...register("hotline", { required: `Hotline ${emptyMsg}` })}
                            />
                            {errors.hotline && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.hotline.message}</p>}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="px-6 py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
                            >
                                {isPending ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
                <h2 className="text-lg font-bold text-white mb-4">Cinema Management</h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-700">
                            <div className="flex items-center gap-2">
                                <Monitor className="h-4 w-4 text-neutral-500" />
                                <h3 className="text-sm font-bold text-white">Screens</h3>
                            </div>
                            <button
                                onClick={addScreen}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                            >
                                <Plus className="h-3 w-3" />
                                Add
                            </button>
                        </div>
                        <div className="p-4">
                            <CinemaScreensList cinemaId={cinemaId!} screens={cinema.screens} />
                        </div>
                    </div>
                    <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-700">
                            <div className="flex items-center gap-2">
                                <Armchair className="h-4 w-4 text-neutral-500" />
                                <h3 className="text-sm font-bold text-white">Seat Types</h3>
                            </div>
                        </div>
                        <div className="p-4">
                            <SeatTypeList cinemaId={cinemaId!} seatTypes={cinema.seatType} />
                        </div>
                    </div>
                    <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-700">
                            <div className="flex items-center gap-2">
                                <Film className="h-4 w-4 text-neutral-500" />
                                <h3 className="text-sm font-bold text-white">Showing Movies</h3>
                            </div>
                        </div>
                        <div className="p-4">
                            <MoviesList cinemaId={cinemaId!} movies={cinema.movies} />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}