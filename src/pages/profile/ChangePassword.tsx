import { useChangePassword } from "@/hooks/user/use-profile";
import { ErrorMessages } from "@/utils/error-messages";
import React, { useState } from "react";
import ConfirmOTP from "./ConfirmOTP";
import { useNavigate } from "react-router";

// interface ChangePasswordForm {
//     current_password: string,
//     new_password: string,
//     confirm_new_password: string
// }

export default function ChangePassword() {
    const [password, setPassword] = useState<string>("")

    const navigate = useNavigate()
    const { mutate: changePassword, isPending, isError, error } = useChangePassword()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const onSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        changePassword({ password }, {
            onSuccess : () => {
                navigate("/default/profile/confirm-otp")
            },
        })
    } 

    return (
        <div>
            {isError && <ErrorMessages error={error}/>}
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="current_password">Current password</label>
                    <input type="password" 
                    name="password"
                    id="password"
                    value={password}
                    onChange={handleChange}/>
                </div>
                <button type="submit" disabled={isPending}>Submit</button>
            </form>
        </div>
    );
}