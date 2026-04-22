import { useMovie } from "@/hooks";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Search, X } from "lucide-react";

interface SearchBarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
    const [movieSearch, setMovieSearch] = useState<string>("");
    const { data: movies } = useMovie.useGetMovie("", movieSearch, "");
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!movieSearch.trim()) return;
        onClose();
        navigate(`/default/movies?q=${movieSearch}`);
    };

    const filteredMovies = movies?.filter(movie => 
        movie.title.toLowerCase().includes(movieSearch.toLowerCase())
    ) || [];

    return (
        <>
            <div 
                className={`fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 z-[60] ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={onClose}
            />
            <div 
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-gray-950 border-l border-gray-800 shadow-[[-10px_0_30px_rgba(0,0,0,0.8)]] z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Header of the Search Drawer */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h2 className="text-lg font-bold text-gray-200 tracking-widest uppercase flex items-center">
                        <Search className="w-5 h-5 mr-2 text-red-600" />
                        Search
                    </h2>
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-4">
                    <form onSubmit={handleSubmit} className="relative">
                        <input
                            type="text"
                            placeholder="Search for movies, genres..."
                            value={movieSearch}
                            onChange={(e) => setMovieSearch(e.target.value)}
                            autoFocus={isOpen} 
                            className="w-full bg-gray-900 border border-gray-700 focus:border-red-600 text-white pl-4 pr-10 py-3 rounded-md outline-none transition-colors shadow-inner"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                    </form>
                </div>
                <div className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    {movieSearch ? (
                        filteredMovies.length > 0 ? (
                            <div className="space-y-2">
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-3">Results</p>
                                {filteredMovies.map(movie => (
                                    <Link 
                                        to={`/default/${movie.id}`} 
                                        key={movie.id}
                                        onClick={onClose}
                                        className="flex items-center gap-3 p-3 rounded-md bg-gray-900/50 hover:bg-gray-800 border border-transparent hover:border-gray-700 transition-all group"
                                    >
                                        <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
                                            <img src={movie.posterUrl} className="w-8 h-10 text-gray-500 group-hover:text-red-500" />
                                        </div>
                                        <p className="text-gray-300 group-hover:text-white font-medium line-clamp-1">
                                            {movie.title}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center mt-10 text-gray-500">
                                <p>No movies found matching "{movieSearch}"</p>
                            </div>
                        )
                    ) : (
                        <div className="text-center mt-10 text-gray-600 flex flex-col items-center">
                            <Search className="w-12 h-12 mb-3 opacity-20" />
                            <p className="text-sm">Type something to start searching...</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}