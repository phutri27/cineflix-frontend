import { useNavigate } from "react-router";
import { Home, Film } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <>
        <Header />
                <div className="bg-[#141414] min-h-screen text-white font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full pointer-events-none"></div>
                    <div className="text-center animate-fade-in relative z-10 flex flex-col items-center">
                        <div className="mb-6 text-neutral-700">
                            <Film className="w-16 h-16 md:w-20 md:h-20" />
                        </div>
                        <h1 className="text-7xl md:text-9xl font-black text-red-600 tracking-tighter drop-shadow-[0_0_30px_rgba(220,38,38,0.4)] mb-2">
                            404
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-4 text-neutral-200">
                            Lost your way?
                        </h2>
                        <p className="text-neutral-400 max-w-md mx-auto mb-10 text-sm md:text-base leading-relaxed">
                            Sorry, we can't find that page. You'll find lots to explore on the home page.
                        </p>
                        <button 
                            onClick={() => navigate('/')} 
                            className="flex items-center justify-center gap-2 bg-white text-black hover:bg-neutral-200 font-bold py-3 px-8 rounded-md transition-colors active:scale-[0.98]"
                        >
                            <Home className="w-5 h-5" />
                            Cineflix Home
                        </button>
                    </div>
                </div>
        <Footer />
        </>
    );
}