import React, { useState } from "react"
import { useForgotPassword } from "@/hooks"
import { ErrorMessages } from "@/utils/error-messages"
import OTPInput from "@/components/OTPInput"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

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
                onMutate={(otp, email, onSuccess) => confirmOTPmutate({otp, email}, { onSuccess })}
                email={email}
                isError={isConfirmOTPError}
                error={confirmOTPError!}
                navigateURL={`new-password`}
                />
    }

    return (
        <div className="bg-[#141414] min-h-screen text-white font-sans flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600/10 border border-red-600/20 mb-4">
                            <span className="text-2xl">🔑</span>
                        </div>
                        <h1 className="text-3xl font-extrabold text-white">
                            Forgot Password
                        </h1>
                        <p className="text-sm text-neutral-400 mt-2">
                            Enter your email and we'll send you a code to reset your password.
                        </p>
                    </div>

                    {isError && (
                        <div className="mb-4 text-red-500">
                            <ErrorMessages error={error} />
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="flex flex-col gap-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-neutral-400 mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Enter your email"
                                required
                                className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
                        >
                            {isPending ? "Sending..." : "Continue"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <a
                            href="/login"
                            className="text-sm text-neutral-400 hover:text-white transition-colors"
                        >
                            ← Back to Login
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}