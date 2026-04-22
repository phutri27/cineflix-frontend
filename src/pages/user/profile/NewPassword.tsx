import { useProfile } from "@/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ErrorMessages } from "@/utils/error-messages";
import { useSearchParams } from "react-router";

interface NewPasswordForm {
    new_password: string,
    confirm_new_password: string
}

export default function NewPassword() {
    const [searchParams] = useSearchParams()
    const resetToken = searchParams.get("token") || ""
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
        defaultValues: {
            new_password: "",
            confirm_new_password: ""
        }
    })

    const { mutate: newPassword, isPending, isError, error } = useProfile.useNewPassword()

    const onSubmit: SubmitHandler<NewPasswordForm> = (data) => {
        const newData = {
            pw: data.new_password,
            confirm_pw: data.confirm_new_password,
            resetToken
        }
        newPassword(newData, {
            onSuccess: () => {
                alert("Password changed successfully")
                reset()
            }
        })
    }

    return (
        <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-neutral-700 pb-4">
                Set New Password
            </h2>

            {isError && (
                <div className="mb-4">
                    <ErrorMessages error={error}/>
                </div>
            )}

            <form className="max-w-md">
                <div className="mb-5">
                    <label 
                        htmlFor="new_password" 
                        className="block text-sm font-medium text-neutral-400 mb-2"
                    >
                        New Password
                    </label>
                    <input 
                        type="password"
                        id="new_password"
                        {...register("new_password", { required: "New password is required" })}
                        className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
                        placeholder="Enter new password"
                    />
                    {errors.new_password && (
                        <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.new_password.message}</p>
                    )}
                </div>

                <div className="mb-6">
                    <label 
                        htmlFor="confirm_new_password" 
                        className="block text-sm font-medium text-neutral-400 mb-2"
                    >
                        Confirm New Password
                    </label>
                    <input 
                        type="password"
                        id="confirm_new_password"
                        {...register("confirm_new_password", { 
                            required: "Confirm new password is required", 
                            validate: (value) => {
                                if (value !== watch("new_password")) {
                                    return "Passwords do not match"
                                }
                            }
                        })}
                        className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
                        placeholder="Confirm new password"
                    />
                    {errors.confirm_new_password && (
                        <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.confirm_new_password.message}</p>
                    )}
                </div>

                <button 
                    type="submit" 
                    disabled={isPending} 
                    onClick={handleSubmit(onSubmit)}
                    className="px-6 py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
                >
                    {isPending ? "Saving..." : "Save Password"}
                </button>
            </form>
        </div>
    );
}