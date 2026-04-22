import { useState } from 'react';
import { useLogin } from '@/hooks';
import { useNavigate, useLocation, Link } from 'react-router';
import { ErrorMessages } from '@/utils/error-messages';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from "react-icons/fc"
export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [pw, setPw] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [googleLogin, setGoogleLogin] = useState<boolean>(false)
    const navigate = useNavigate()

    const location = useLocation()

    const { mutate, isPending, isError, error } = useLogin.useLogin();
    const { isLoading } = useLogin.useLoginGoogle({enabled: googleLogin})

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
        return (
            <div className="bg-[#141414] min-h-screen">
                <Header />
                <p className="text-neutral-400 text-center pt-20">Loading...</p>
            </div>
        )
    }

    return (
        <div className="bg-[#141414] min-h-screen text-white font-sans flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-md">
                    {location.state && (
                        <div className="mb-4 bg-red-950/40 border border-red-800 rounded-lg px-4 py-3 text-sm text-red-400">
                            {location.state.message}
                        </div>
                    )}
                    <h1 className="text-3xl font-extrabold text-white text-center mb-8">
                        Login
                    </h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div>
                            <label 
                                htmlFor="email" 
                                className="block text-sm font-medium text-neutral-400 mb-2"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label 
                                htmlFor="password" 
                                className="block text-sm font-medium text-neutral-400 mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={pw}
                                    onChange={(e) => setPw(e.target.value)}
                                    required
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
                        </div>
                        {isError && (
                            <div>
                                <ErrorMessages error={error!} />
                            </div>
                        )}
                        <div className="flex justify-end">
                            <Link 
                                to="/forgotpassword" 
                                className="text-sm text-neutral-400 hover:text-white transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <button 
                            type="submit" 
                            disabled={isPending}
                            className="w-full py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
                        >
                            {isPending ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-neutral-700" />
                        <span className="text-xs text-neutral-500 font-medium">OR</span>
                        <div className="flex-1 h-px bg-neutral-700" />
                    </div>
                    <button 
                        onClick={handleLoginGoogle}
                        className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border border-neutral-700 bg-neutral-800/50 hover:bg-neutral-800 hover:border-neutral-500 transition-colors"
                    >
                        <FcGoogle className="h-5 w-5" />
                        <span className="text-sm font-semibold text-neutral-300">
                            Sign in with Google
                        </span>
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
}