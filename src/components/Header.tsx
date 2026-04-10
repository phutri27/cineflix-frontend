import { useState } from "react";
import { useUserRoleStore } from "@/utils/user-role-store";
import { Link } from "react-router";
import LogoutBtn from "./LogoutBtn";
// Nhập các icon từ lucide-react
import { Film, Menu as MenuIcon, X, PlayCircle, CalendarClock, CircleUser } from "lucide-react";

export default function Header() {
    const { id, first_name, last_name } = useUserRoleStore();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-red-900/30 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                
                {/* 1. BRAND/LOGO */}
                <div className="flex-shrink-0">
                    <Link to="/" className="flex items-center text-3xl font-black tracking-tighter text-red-600 hover:text-red-500 transition-colors uppercase group">
                        {/* Thêm cuộn phim vào Logo */}
                        <Film className="w-8 h-8 mr-2 drop-shadow-[0_0_8px_rgba(220,38,38,0.5)] group-hover:scale-110 transition-transform" />
                        CINEFLIX
                    </Link>
                </div>

                {/* 2. DESKTOP NAVIGATION */}
                <nav className="hidden md:flex items-center space-x-8">
                    <div className="flex items-center space-x-6 text-sm font-medium uppercase tracking-widest">
                        <span className="text-gray-500 cursor-default select-none border-r border-gray-800 pr-6">
                            Movies
                        </span>
                        
                        <Link to="/default/movies/showing-movies" className="group flex items-center text-gray-300 hover:text-white transition duration-300">
                            <PlayCircle className="w-4 h-4 mr-1.5 text-gray-500 group-hover:text-red-500 transition-colors" />
                            <span className="group-hover:text-shadow-glow">Showing</span>
                        </Link>
                        
                        <Link to="/default/movies/coming-soon" className="group flex items-center text-gray-300 hover:text-white transition duration-300">
                            <CalendarClock className="w-4 h-4 mr-1.5 text-gray-500 group-hover:text-red-500 transition-colors" />
                            <span className="group-hover:text-shadow-glow">Coming Soon</span>
                        </Link>
                    </div>
                </nav>

                {/* 3. DESKTOP USER ACTIONS */}
                <div className="hidden md:flex items-center space-x-6">
                    {id ? (
                        <div className="flex items-center space-x-5">
                            <Link to="/default/profile" className="group text-amber-500 hover:text-amber-400 font-medium tracking-wide flex items-center gap-2 transition-colors">
                                {/* Thêm Icon User */}
                                <CircleUser className="w-5 h-5 text-amber-600 group-hover:text-amber-400 transition-colors" />
                                <span className="text-gray-400 text-sm font-normal">Welcome,</span>
                                <span className="truncate max-w-[150px]">{first_name} {last_name}</span>
                            </Link>
                            <div className="border-l border-gray-800 pl-5">
                                <LogoutBtn /> 
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-md font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)]">
                            Login
                        </Link>
                    )}
                </div>

                {/* 4. MOBILE / TABLET HAMBURGER BUTTON */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-300 hover:text-white focus:outline-none p-2 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {/* Thay thế SVG dài dòng bằng Icon của Lucide */}
                        {isMobileMenuOpen ? (
                            <X className="w-7 h-7" strokeWidth={2.5} />
                        ) : (
                            <MenuIcon className="w-7 h-7" strokeWidth={2.5} />
                        )}
                    </button>
                </div>
            </div>

            {/* 5. MOBILE / TABLET DROPDOWN MENU */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-gray-950/95 backdrop-blur-md border-b border-red-900/30 absolute w-full shadow-2xl">
                    <div className="px-4 pt-4 pb-6 space-y-6">
                        
                        <div className="flex flex-col space-y-4">
                            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest border-b border-gray-800 pb-2">
                                Movies
                            </span>
                            
                            <Link 
                                to="/default/movies/showing-movies" 
                                onClick={() => setIsMobileMenuOpen(false)} 
                                className="group flex items-center text-gray-300 hover:text-white font-medium uppercase tracking-widest pl-2 border-l-2 border-transparent hover:border-red-600 transition-all"
                            >
                                <PlayCircle className="w-5 h-5 mr-3 text-gray-500 group-hover:text-red-500 transition-colors" />
                                Showing
                            </Link>
                            
                            <Link 
                                to="/default/movies/coming-soon" 
                                onClick={() => setIsMobileMenuOpen(false)} 
                                className="group flex items-center text-gray-300 hover:text-white font-medium uppercase tracking-widest pl-2 border-l-2 border-transparent hover:border-red-600 transition-all"
                            >
                                <CalendarClock className="w-5 h-5 mr-3 text-gray-500 group-hover:text-red-500 transition-colors" />
                                Coming Soon
                            </Link>
                        </div>

                        <div className="pt-4 border-t border-gray-800">
                            {id ? (
                                <div className="flex flex-col space-y-5">
                                    <Link 
                                        to="/default/profile" 
                                        onClick={() => setIsMobileMenuOpen(false)} 
                                        className="text-amber-500 font-medium tracking-wide flex flex-col pl-2"
                                    >
                                        <div className="flex items-center mb-1">
                                            <CircleUser className="w-5 h-5 mr-2 text-amber-600" />
                                            <span className="text-gray-400 text-sm">Logged in as</span>
                                        </div>
                                        <span className="text-lg ml-7">{first_name} {last_name}</span>
                                    </Link>
                                    <div onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                                        <LogoutBtn />
                                    </div>
                                </div>
                            ) : (
                                <Link 
                                    to="/login" 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    className="flex justify-center items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] w-full"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}