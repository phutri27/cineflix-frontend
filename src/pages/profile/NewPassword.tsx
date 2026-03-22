import { useNewPassword } from "@/hooks/user/use-profile";
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
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            new_password: "",
            confirm_new_password: ""
        }
    })

    const { mutate: newPassword, isPending, isError, error } = useNewPassword()

    const onSubmit: SubmitHandler<NewPasswordForm> = (data) => {
        const newData = {
            pw: data.new_password,
            confirm_pw: data.confirm_new_password,
            resetToken
        }
        newPassword(newData, {
            onSuccess: () => {
                alert("Password changed successfully")
            }
        })
    }

    return (
        <div>
            {isError && <ErrorMessages error={error}/>}
            <form >
                <div>
                    <label htmlFor="new_password">New password</label>
                    <input type="password"
                    id="new_password"
                    {...register("new_password", { required: "New password is required" })}/>
                    {errors.new_password && <p>{errors.new_password.message}</p>}
                </div>
                <div>
                    <label htmlFor="confirm_new_password">Confirm new password</label>
                    <input type="password"
                    id="confirm_new_password"
                    {...register("confirm_new_password", { required: "Confirm new password is required", validate: (value) => {
                        if (value !== watch("new_password")) {
                            return "Confirm new password does not match new password"
                        }
                    }})}/>
                    {errors.confirm_new_password && <p>{errors.confirm_new_password.message}</p>}
                </div>
                <button type="submit" disabled={isPending} onClick={handleSubmit(onSubmit)}>Submit</button> 
            </form>
        </div>
    );
}   