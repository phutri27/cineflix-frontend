import React, { useState } from "react"
import { useForgotPassword } from "@/hooks"
import { ErrorMessages } from "@/utils/error-messages"
import OTPInput from "@/components/OTPInput"

export default function ForgotPassword(){
    const [email, setEmail] = useState<string>("")

    const { mutate, isPending, isError, error, isSuccess } = useForgotPassword.useForgotPassword()
    const { 
        mutate: confirmOTPmutate, 
        isError: isConfirmOTPError, 
        error: confirmOTPError } = useForgotPassword.useConfirmForgotPasswordOTP()

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    
    const onSubmit = (e : React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate(email)
    }

    if (isSuccess){
        return <OTPInput 
                onMutate={(otp, email, onSuccess) => confirmOTPmutate({otp, email}, { onSuccess})}
                email={email}
                isError={isConfirmOTPError}
                error={confirmOTPError!}
                navigateURL={`new-password`}
                />
    }

    return (
        <div>
            <h1>Forgot password</h1>
            <form onSubmit={onSubmit}>
                {isError && <ErrorMessages error={error} />}
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" 
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}/>
                </div>
                <button type="submit" disabled={isPending}>Continue</button>
            </form>
        </div>
    )
}