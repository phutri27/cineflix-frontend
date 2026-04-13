import { useChangePassword } from "@/hooks/user/use-profile";
import { ErrorMessages } from "@/utils/error-messages";
import React, { useState } from "react";
import ConfirmOTP from "./ConfirmOTP";

export default function ChangePassword() {
    const [password, setPassword] = useState<string>("")

    const { mutate: changePassword, 
        isPending: changePasswordPending, 
        isError: isChangePasswordError, 
        error: changePasswordError, 
        isSuccess: changePasswordSuccess } = useChangePassword()

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
        <div>
            {isChangePasswordError && <ErrorMessages error={changePasswordError}/>}
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="current_password">Current password</label>
                    <input type="password" 
                    name="password"
                    id="password"
                    value={password}
                    onChange={handleChange}/>
                </div>
                <button type="submit" disabled={changePasswordPending}>Submit</button>
            </form>
        </div>
    );
}