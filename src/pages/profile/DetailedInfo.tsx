import { useUpdateProfile } from "@/hooks/user/use-profile";
import { useUserRoleStore } from "@/utils/user-role-store";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ErrorMessages } from "@/utils/error-messages";
import { useState } from "react";
interface FormData {
    first_name: string;
    last_name: string;
    password: string
}

const fieldMsg = "must not be empty"

export default function DetailedInfo() {
    const [successMessage, setSuccessMessage] = useState<string>("")

    const { id, first_name, last_name, email } = useUserRoleStore()
    const setFirstName = useUserRoleStore(state => state.setFirstName)
    const setLastName = useUserRoleStore(state => state.setLastName)

    const { register, handleSubmit, formState: {errors} } = useForm({
        defaultValues: {
            first_name,
            last_name,
            password: ""
        }
    })
    const { mutate: updateProfile, isPending, isError, error, } = useUpdateProfile(id!)

    const onSubmit:SubmitHandler<FormData> = (data) => {    
        updateProfile(data, {
            onSuccess: (responseData) => {
                setFirstName(data.first_name)
                setLastName(data.last_name)
                setSuccessMessage(responseData.message)
            }
        })
    }

    return (
        <div>
            <h1>Detailed Information</h1>
            {isError && <ErrorMessages error={error}/>}
            {successMessage && <p>{successMessage}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="first_name">First Name:</label>
                    <input id="first_name" {...register("first_name", {required: `First name ${fieldMsg}`})} />
                    {errors.first_name && <p>{errors.first_name.message}</p>}
                </div>
                <div>
                    <label htmlFor="last_name">Last Name:</label>
                    <input id="last_name" {...register("last_name", {required: `Last name ${fieldMsg}`})} />
                    {errors.last_name && <p>{errors.last_name.message}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" {...register("password", {required: `Password ${fieldMsg}`})}/>
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <button type="submit" disabled={isPending}>Update Profile</button>
            </form>
            <div>
                <p>Email address: {email}</p>
            </div>
        </div>
    )   
}