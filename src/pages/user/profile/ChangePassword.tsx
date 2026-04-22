import { ErrorMessages } from "@/utils/error-messages";
import React, { useState } from "react";
import ConfirmOTP from "./ConfirmOTP";
import { useProfile } from "@/hooks";

export default function ChangePassword() {
    const [password, setPassword] = useState<string>("")

    const { mutate: changePassword, 
        isPending: changePasswordPending, 
        isError: isChangePasswordError, 
        error: changePasswordError, 
        isSuccess: changePasswordSuccess } = useProfile.useChangePassword()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const onSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        changePassword({ password })
    } 

    if (changePasswordSuccess){
        return <ConfirmOTP password={password}/>
    }

    return (
        <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-neutral-700 pb-4">
                Change Password
            </h2>

            {isChangePasswordError && (
                <div className="mb-4">
                    <ErrorMessages error={changePasswordError}/>
                </div>
            )}

            <form onSubmit={onSubmit} className="max-w-md">
                <div className="mb-5">
                    <label 
                        htmlFor="password" 
                        className="block text-sm font-medium text-neutral-400 mb-2"
                    >
                        Current Password
                    </label>
                    <input 
                        type="password" 
                        name="password"
                        id="password"
                        value={password}
                        onChange={handleChange}
                        className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
                        placeholder="Enter your current password"
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={changePasswordPending}
                    className="px-6 py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
                >
                    {changePasswordPending ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}