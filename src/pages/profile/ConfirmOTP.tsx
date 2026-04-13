import { useConfirmChangePasswordOTP } from "@/hooks/user/use-profile";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ErrorMessages } from "@/utils/error-messages";
import { useChangePassword } from "@/hooks/user/use-profile";
import { useSetTimer } from "@/hooks/user/use-set-timer";
export default function ConfirmOTP({password}: {password: string}) {
    const [otp, setOtp] = useState<string>("")
    const [otpResend, setOtpResend] = useState<boolean>(false)
    const remainingTimes = useSetTimer(60, otpResend)

    const navigate = useNavigate()
    const { mutate: confirmOTP, isPending, isError, error } = useConfirmChangePasswordOTP()
    const { mutate: resendOTP, isError: isResendOtpError, error: resendOtpError } = useChangePassword()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value)
    }

    const handleResendOtp = () => {
        setOtpResend(true)
        resendOTP({ password })
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        confirmOTP({ otp }, {
            onSuccess : (data) => {
                navigate(`/default/profile/new-password?token=${data.resetToken}`)
            },
        })
    }

    return (
        <div>
            {isError && <ErrorMessages error={error} />}
            {isResendOtpError && <ErrorMessages error={resendOtpError} />}
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="otp">OTP</label>
                    <input type="text" 
                    name="otp"
                    id="otp"
                    value={otp}
                    onChange={handleChange}/>
                </div>
                <button type="submit" disabled={isPending}>Submit</button>
            </form>
            <div>
                <p>Haven't got an OTP? <button disabled={otpResend} onClick={handleResendOtp}>Click here</button></p>
                {otpResend && <span>Please check your email, wait {remainingTimes}s for a resend</span>}
            </div>
        </div>
    );
}