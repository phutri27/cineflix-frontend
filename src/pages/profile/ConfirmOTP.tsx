import { useConfirmChangePasswordOTP } from "@/hooks/user/use-profile";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ErrorMessages } from "@/utils/error-messages";
export default function ConfirmOTP() {
    const [otp, setOtp] = useState<string>("")

    const navigate = useNavigate()
    const { mutate: confirmOTP, isPending, isError, error } = useConfirmChangePasswordOTP()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value)
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
        </div>
    );
}