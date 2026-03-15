import { useParams } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import * as cinemasApi from '@/hooks/admin/cinemas/use-admin-cinema';
import CinemaScreensList from './screens/CinemaScreensList';
import SeatTypeList from './seat-types/SeatTypeList';
import { useNavigate } from 'react-router';
import Error from '@/components/Error';
import { errorMessages } from '@/utils/error-messages';

interface CinemaGeneralFormData {
    name: string;
    cityId: number;
    address: string;
    hotline: string;
}

const emptyMsg = "field cannot be empty";

export default function EditCinemaPage() {
    const navigate = useNavigate()
    const { cinemaId } = useParams<{ cinemaId: string }>();

    const { data: cinema, isLoading, isError } = cinemasApi.useGetSpecificAdminCinema(cinemaId as string);
    const { mutate: updateCinema, isPending, isError: isUpdateError, error: updateError } = cinemasApi.useAdminUpdateCinema();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CinemaGeneralFormData>();

    let displayError: string | string[] = ""
    if (isUpdateError){
        displayError = errorMessages(updateError!)
    }

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

    if (isLoading) return <div>Loading Cinema Details...</div>;
    if (isError || !cinema) return <div>Error loading cinema.</div>;

    return (
        <div className="edit-cinema-container">
            <h1>Edit Cinema: {cinema.name}</h1>
            <section className="general-info-section">
                <h2>General Information</h2>
                {isUpdateError && Array.isArray(displayError)
                ? <Error errors={displayError}/> 
                : <div>{displayError}</div> }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Name</label>
                        <input {...register("name", { required: `Name ${emptyMsg}` })} />
                        {errors.name && <span>{errors.name.message}</span>}
                    </div>
                    <div>
                        <label>Address</label>
                        <input {...register("address", { required: `Address ${emptyMsg}` })} />
                        {errors.address && <span>{errors.address.message}</span>}
                    </div>
                    <div>
                        <label>Hotline</label>
                        <input {...register("hotline", { required: `Hotline ${emptyMsg}` })} />
                        {errors.hotline && <span>{errors.hotline.message}</span>}
                    </div>
                    
                    <button type="submit" disabled={isPending}>
                        {isPending ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </section>

            <hr />
            
            <section className="relational-data-section">
                <h2>Cinema Management</h2>
                
                <div className="management-grid">
                    <div className="management-card">
                         {/* <h3>Screens ({cinema.screens.length})</h3>  */}
                        <CinemaScreensList cinemaId={cinemaId!} screens={cinema.screens}/>
                        <button onClick={addScreen}>Add screen</button>
                    </div>
                    <div className="management-card">
                        {/* <h3>Seat Types ({cinema.seatTypes.length})</h3>  */}
                        <SeatTypeList  cinemaId={cinemaId!} seatTypes={cinema.seatType} />
                        <button>Manage Seat Types</button>
                    </div>

                    <div className="management-card">
                        {/* <h3>Currently Showing Movies ({cinema.movies.length})</h3> */}
                        
                        <button>Manage Movies</button>
                    </div>
                </div>
            </section>
        </div>
    );
}