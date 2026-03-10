import React, { useState } from "react";
import { useOTP } from "@/hooks/user/use-otp";
import { useNavigate } from "react-router";
export default function OTPInput({email} : {email: string}){
    const [otp, setOTP] = useState<string>('')

    const navigate = useNavigate()
    const {data, mutate, isSuccess } = useOTP()
    
    const handleOTP = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOTP(e.target.value)
    }

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        mutate({otp, email})
    }

    if (isSuccess){
        navigate('/login', { state: data })
    }

    return (
        <div className="otp-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="otp">
                    OTP 
                    <input 
                    type="number" 
                    name="otp" 
                    id="otp"
                    value={otp}
                    onChange={handleOTP}/>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}