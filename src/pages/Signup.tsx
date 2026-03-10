import React from "react";
import { useSignup } from "@/hooks";
import OTPInput from "@/components/OTPInput";
import ErrorFunc from "@/components/Error";
import { useForm, type SubmitHandler } from "react-hook-form";

interface State {
    email: string
    pw: string
    confirmPw: string
    first_name: string
    last_name: string
}

export default function Signup(){ 
    const {mutate, isPending, isError, error, isSuccess} = useSignup()
    const { register, handleSubmit, watch, formState: {errors}} = useForm<State>()
    
    const email = watch("email")

    let displayError: string | React.ReactNode = ""
    if (isError){
        const errors = error?.response?.data.errors || error?.message || "An error occurred"
        if (Array.isArray(error)){
            displayError = <ErrorFunc errors={errors} />
        } else {
            displayError = errors
        }
    }

    const onSubmit: SubmitHandler<State> = (data) => {
        mutate(data)
    }

    if (isSuccess){
        return <OTPInput email={email}/>
    }

    return (    
        <>
            {displayError}
            <div className="signup-container">
                <h1>Signup</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <input
                            {...register("first_name", { required: "First name is required" })}
                        />
                        {errors.first_name && <p>{errors.first_name.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            {...register("last_name", { required: "Last name is required" })}
                        />
                        {errors.last_name && <p>{errors.last_name.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            {...register("pw", { required: "Password is required" })}
                        />
                        {errors.pw && <p>{errors.pw.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input
                            {...register("confirmPw", {
                                required: "Confirm password is required",
                                validate: (value) => value === watch("pw") || "Passwords do not match"
                            })}
                        />
                        {errors.confirmPw && <p>{errors.confirmPw.message}</p>}
                    </div>
                    <button type="submit" disabled={isPending}>
                        {isPending ? "Loading" : "Sign up"}
                    </button>
                </form>
            </div>
        </>
    )
}