import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";
import { Link } from "react-router";

export default function ErrorElement(){
    return (
        <div className="bg-[#141414] min-h-screen text-white font-sans flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div style={{
                        fontSize: "clamp(6rem, 15vw, 10rem)",
                        fontWeight: 900,
                        lineHeight: 1,
                        color: "transparent",
                        WebkitTextStroke: "2px #dc2626",
                        marginBottom: "16px",
                        letterSpacing: "-4px",
                    }}>
                        404
                    </div>
                    <h1 className="text-2xl font-extrabold text-white mb-3">
                        Not Found
                    </h1>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            to="/"
                            className="px-6 py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                        >
                            Back to Home
                        </Link>
                        <Link
                            to="/default/movies/showing-movies"
                            className="px-6 py-2.5 text-sm font-bold rounded-lg border border-neutral-600 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
                        >
                            Browse Movies
                        </Link>
                    </div>
                    <div className="mt-12 flex items-center justify-center gap-2 opacity-20">
                        {[...Array(7)].map((_, i) => (
                            <div
                                key={i}
                                className="w-8 h-6 rounded-sm border border-neutral-500"
                            />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}