import React from "react";
import { create } from 'zustand';
import { useSignup } from "@/hooks";
import OTPInput from "@/components/OTPInput";
import ErrorFunc from "@/components/Error";

interface State {
    email: string
    pw: string
    confirmPw: string
    first_name: string
    last_name: string
}

type Action = { 
    updateEmail: (email: State["email"]) => void
    updatePw : (pw: State["pw"]) => void
    updateConfirmPw: (confirmPw: State["confirmPw"]) => void
    updateFirstName: (first_name: State["first_name"]) => void
    updateLastName: (last_name: State["last_name"]) => void
};

const initialObj: State = {
    email: '',
    pw: '',
    confirmPw: '',
    first_name: '',
    last_name: ''
}

const useSignupStore = create<State & Action>((set) => ({
    ...initialObj,
    updateEmail: (email) => set(() => ({ email })),
    updatePw: (pw) => set(() => ({ pw })),
    updateConfirmPw: (confirmPw) => set(() => ({ confirmPw })),
    updateFirstName: (first_name) => set(() => ({ first_name })),
    updateLastName: (last_name) => set(() => ({ last_name }))
}));

export default function Signup(){ 
    const state = useSignupStore()

    const {mutate, isPending, isError, error, isSuccess} = useSignup()
    const errors = error?.response?.data.errors

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        switch(name){
            case "email":
                state.updateEmail(value)
                break
            case "pw":
                state.updatePw(value)
                break
            case "confirmPw":
                state.updateConfirmPw(value)
                break
            case "first_name":
                state.updateFirstName(value)
                break
            case "last_name":
                state.updateLastName(value)
                break
        }
    }

    const handleSubmit =  (e: React.SubmitEvent) => {
        e.preventDefault()
        mutate(state)
    }

    if (isSuccess){
        return <OTPInput email={state.email}/>
    }

    return (    
        <div className="signup-container">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    {isError ? <ErrorFunc errors={errors} keyword="Email"/> : null}
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={state.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    {isError ? <ErrorFunc errors={errors} keyword="First name"/> : null}
                    <label htmlFor="first_name">First Name</label>
                    <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        value={state.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    {isError ? <ErrorFunc errors={errors} keyword="Last name"/> : null}
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        value={state.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    {isError ? <ErrorFunc errors={errors} keyword="Password"/> : null}
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="pw"
                        type="password"
                        value={state.pw}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    {isError ? <ErrorFunc errors={errors} keyword="Confirm password"/> : null}
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input
                        id="confirm_password"
                        name="confirmPw"
                        type="password"
                        value={state.confirmPw}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={isPending}>
                    {isPending ? "Loading" : "Sign up"}
                </button>
            </form>
        </div>
    )
}