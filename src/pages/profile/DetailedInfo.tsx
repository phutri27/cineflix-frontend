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

    const { register, handleSubmit, formState: {errors}, reset } = useForm({
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
                reset({password: ""})
            }
        })
    }

    const inputClass = "w-full bg-neutral-800/50 border border-neutral-700 text-white rounded-lg px-4 py-2.5 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all";
    const labelClass = "block text-sm font-medium text-neutral-400 mb-1.5";

    return (
        <div className="p-6 md:p-8 animate-fade-in">
            <h1 className="text-2xl font-bold text-white mb-6 border-b border-neutral-800 pb-4">
                Detailed Information
            </h1>
            {isError && <div className="mb-6"><ErrorMessages error={error}/></div>}
            {successMessage && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-sm">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 max-w-md">
                <div>
                    <label htmlFor="first_name" className={labelClass}>First Name</label>
                    <input id="first_name" className={inputClass} {...register("first_name", {required: `First name ${fieldMsg}`})} />
                    {errors.first_name && <p className="text-xs text-red-500 mt-1.5">{errors.first_name.message}</p>}
                </div>
                <div>
                    <label htmlFor="last_name" className={labelClass}>Last Name</label>
                    <input id="last_name" className={inputClass} {...register("last_name", {required: `Last name ${fieldMsg}`})} />
                    {errors.last_name && <p className="text-xs text-red-500 mt-1.5">{errors.last_name.message}</p>}
                </div>
                <div>
                    <label htmlFor="password" className={labelClass}>Confirm Password to Update</label>
                    <input type="password" id="password" className={inputClass} {...register("password", {required: `Password ${fieldMsg}`})}/>
                    {errors.password && <p className="text-xs text-red-500 mt-1.5">{errors.password.message}</p>}
                </div>
                <button 
                    type="submit" 
                    disabled={isPending}
                    className="mt-4 bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-400 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                >
                    {isPending ? "Updating..." : "Update Profile"}
                </button>
            </form>
            <div className="mt-8 pt-6 border-t border-neutral-800 max-w-md">
                <p className="text-sm text-neutral-400 flex justify-between items-center bg-neutral-800/30 px-4 py-3 rounded-lg border border-neutral-700/50">
                    Registered Email: <span className="text-white font-medium">{email}</span>
                </p>
            </div>
        </div>
    )   
}