import { useConfirmChangePasswordOTP } from "@/hooks/user/use-profile";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ErrorMessages } from "@/utils/error-messages";
import { useChangePassword } from "@/hooks/user/use-profile";
import { useSetTimer } from "@/hooks/user/use-set-timer";
import { useEffect } from "react";

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

    useEffect(() => {
        if (remainingTimes === 0 && otpResend){
            setOtpResend(false)
        }
    }, [remainingTimes, otpResend])

    return (
        <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-neutral-700 pb-4">
                Confirm OTP
            </h2>

            {isError && (
                <div className="mb-4">
                    <ErrorMessages error={error} />
                </div>
            )}
            {isResendOtpError && (
                <div className="mb-4">
                    <ErrorMessages error={resendOtpError} />
                </div>
            )}

            <form onSubmit={onSubmit} className="max-w-md">
                <div className="mb-5">
                    <label 
                        htmlFor="otp" 
                        className="block text-sm font-medium text-neutral-400 mb-2"
                    >
                        OTP Code
                    </label>
                    <input 
                        type="text" 
                        name="otp"
                        id="otp"
                        value={otp}
                        onChange={handleChange}
                        className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors tracking-widest"
                        placeholder="Enter OTP"
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={isPending}
                    className="px-6 py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
                >
                    {isPending ? "Verifying..." : "Verify"}
                </button>
            </form>

            <div className="mt-6 pt-4 border-t border-neutral-700">
                <p className="text-sm text-neutral-400">
                    Haven't received an OTP?{" "}
                    <button 
                        disabled={otpResend} 
                        onClick={handleResendOtp}
                        className="text-red-500 font-semibold hover:text-red-400 disabled:text-neutral-600 disabled:cursor-not-allowed transition-colors"
                    >
                        Resend
                    </button>
                </p>
                {otpResend && (
                    <p className="mt-2 text-sm text-neutral-500">
                        Please check your email. Resend available in{" "}
                        <span className="text-red-500 font-bold">{remainingTimes}s</span>
                    </p>
                )}
            </div>
        </div>
    );
}