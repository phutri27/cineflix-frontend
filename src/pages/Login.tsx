import { useState } from 'react';
import { useLogin, useLoginGoolge } from '@/hooks';
import { Navigate, useLocation } from 'react-router';
import { ErrorMessages } from '@/utils/error-messages';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [pw, setPw] = useState<string>('');
    const [googleLogin, setGoogleLogin] = useState<boolean>(false)
    const location = useLocation()

    const { mutate, isPending, isError, error, isSuccess } = useLogin();
    const { isLoading } = useLoginGoolge({enabled: googleLogin})

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        mutate({email, pw});
    };

    const handleLoginGoogle = () => {
        setGoogleLogin(true)
    }

    if (isLoading){
        return <div>Loading...</div>
    }

    if (isSuccess) {
        return <Navigate to="/" />
    }

    return (
        <div className="login-container">
            {location.state ? (<p>{location.state.message}</p>) : null}
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        required
                    />
                </div>
                {(isError && <ErrorMessages error={error!}/>)}
                <button type="submit" disabled={isPending}>
                    {isPending ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <button onClick={handleLoginGoogle}>Sign in with Google</button>
        </div>
    );
}