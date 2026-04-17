import { useSignup } from "@/hooks";
import OTPInput from "@/components/OTPInput";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ErrorMessages } from "@/utils/error-messages";
import { useOTP } from "@/hooks";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface State {
    email: string
    pw: string
    confirm_pw: string
    first_name: string
    last_name: string
}

export default function Signup(){ 
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

    const {mutate: signUpMutate, isPending, isError: isSignupError, error: signupError, isSuccess: signupSuccess} = useSignup()
    const { register, handleSubmit, watch, formState: {errors}} = useForm<State>()
    const { mutate: OTPMutate, isError: isOTPError, error: OTPError } = useOTP()

    const email = watch("email") 

    const onSubmit: SubmitHandler<State> = (data) => {
        signUpMutate(data)
    }

    if (signupSuccess){
        return <OTPInput 
        onMutate={(otp, email, onSuccess) => OTPMutate({otp, email}, { onSuccess })}
        email={email}
        isError={isOTPError}
        error={OTPError!}
        navigateURL="/login"/>
    }

    return (    
        <div className="bg-[#141414] min-h-screen text-white font-sans flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-extrabold text-white text-center mb-8">
                        Sign Up
                    </h1>
                    {isSignupError && (
                        <div className="mb-4">
                            <ErrorMessages error={signupError!} />
                        </div>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-neutral-400 mb-2">
                                    First Name
                                </label>
                                <input
                                    id="first_name"
                                    {...register("first_name", { required: "First name is required" })}
                                    className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
                                    placeholder="First name"
                                />
                                {errors.first_name && (
                                    <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.first_name.message}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="last_name" className="block text-sm font-medium text-neutral-400 mb-2">
                                    Last Name
                                </label>
                                <input
                                    id="last_name"
                                    {...register("last_name", { required: "Last name is required" })}
                                    className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
                                    placeholder="Last name"
                                />
                                {errors.last_name && (
                                    <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.last_name.message}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-neutral-400 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    {...register("pw", { required: "Password is required" })}
                                    className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 pr-11 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.pw && (
                                <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.pw.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="confirm_pw" className="block text-sm font-medium text-neutral-400 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirm_pw"
                                    type={showConfirmPassword ? "text" : "password"}
                                    {...register("confirm_pw", {
                                        required: "Confirm password is required",
                                        validate: (value) => value === watch("pw") || "Passwords do not match"
                                    })}
                                    className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 pr-11 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.confirm_pw && (
                                <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.confirm_pw.message}</p>
                            )}
                        </div>
                        <button 
                            type="submit" 
                            disabled={isPending}
                            className="w-full py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors mt-1"
                        >
                            {isPending ? "Signing up..." : "Sign Up"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-neutral-500 mt-6">
                        Already have an account?{" "}
                        <a href="/login" className="text-red-500 font-semibold hover:text-red-400 transition-colors">
                            Login
                        </a>
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    )
}