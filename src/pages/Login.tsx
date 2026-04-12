import { useState } from 'react';
import { useLogin, useLoginGoogle } from '@/hooks';
import { useNavigate, useLocation, Link } from 'react-router';
import { ErrorMessages } from '@/utils/error-messages';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [pw, setPw] = useState<string>('');
    const [googleLogin, setGoogleLogin] = useState<boolean>(false)
    const navigate = useNavigate()

    const location = useLocation()

    const { mutate, isPending, isError, error } = useLogin();
    const { isLoading } = useLoginGoogle({enabled: googleLogin})

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        mutate({email, pw}, {
            onSuccess() {
                navigate("/")
            }
        });
    };

    const handleLoginGoogle = () => {
        setGoogleLogin(true)
    }

    if (isLoading){
        return <div>Loading...</div>
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
                <div>
                    <Link to="/forgotpassword">Forgot password?</Link>
                </div>
                <button type="submit" disabled={isPending}>
                    {isPending ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <button onClick={handleLoginGoogle}>Sign in with Google</button>
        </div>
    );
}