import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ErrorMessages } from "@/utils/error-messages";
import { useLocation, useNavigate } from "react-router";
import { useForgotPassword } from "@/hooks";
import { Eye, EyeOff } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from 'react-toastify'

interface NewPasswordForm {
    new_password: string,
    confirm_new_password: string
}

export default function ForgotNewPassword() {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

    const location = useLocation()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            new_password: "",
            confirm_new_password: ""
        }
    })

    const { mutate: newPassword, isPending, isError, error } = useForgotPassword.useNewPasswordForForgotPassword()

    const onSubmit: SubmitHandler<NewPasswordForm> = (data) => {
        const newData = {
            pw: data.new_password,
            email: String(location.state.userCred),
            confirm_pw: data.confirm_new_password,
            resetToken: location.state.resetToken
        }
        newPassword(newData, {
            onSuccess: () => {
                navigate("/login", {state: {message: "Change password successfully"}})
                toast.success("Change password successfully")
            }
        })
    }

    return (
        <div className="bg-[#141414] min-h-screen text-white font-sans flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600/10 border border-red-600/20 mb-4">
                            <span className="text-2xl">🔒</span>
                        </div>
                        <h1 className="text-3xl font-extrabold text-white">
                            Set New Password
                        </h1>
                        <p className="text-sm text-neutral-400 mt-2">
                            Choose a strong password to secure your account.
                        </p>
                    </div>
                    {isError && (
                        <div className="mb-4 text-red-500">
                            <ErrorMessages error={error} />
                        </div>
                    )}
                    <form className="flex flex-col gap-5">
                        <div>
                            <label
                                htmlFor="new_password"
                                className="block text-sm font-medium text-neutral-400 mb-2"
                            >
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="new_password"
                                    placeholder="Enter new password"
                                    {...register("new_password", { required: "New password is required" })}
                                    className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 pr-11 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.new_password && (
                                <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.new_password.message}</p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="confirm_new_password"
                                className="block text-sm font-medium text-neutral-400 mb-2"
                            >
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirm_new_password"
                                    placeholder="Confirm new password"
                                    {...register("confirm_new_password", {
                                        required: "Confirm new password is required",
                                        validate: (value) => {
                                            if (value !== watch("new_password")) {
                                                return "Passwords do not match"
                                            }
                                        }
                                    })}
                                    className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 pr-11 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.confirm_new_password && (
                                <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.confirm_new_password.message}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={isPending}
                            onClick={handleSubmit(onSubmit)}
                            className="w-full py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
                        >
                            {isPending ? "Saving..." : "Save Password"}
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}