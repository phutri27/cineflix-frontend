import { useState } from "react";
import { useUserRoleStore } from "@/utils/user-role-store";
import { Link } from "react-router";
import LogoutBtn from "./LogoutBtn";
import { Film, Menu as MenuIcon, X, PlayCircle, CalendarClock, CircleUser, Bell, Search } from "lucide-react";
import Notification from "./Notification";
import SearchBar from "./SearchBar";
import { useGetUnreadNoti } from "@/hooks/user/use-notification";
import { LayoutDashboard } from "lucide-react"

export default function Header() {
    const { id, first_name, last_name, role } = useUserRoleStore();
    const { data: unreadNoti } = useGetUnreadNoti(id)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isNotiOpen, setIsNotiOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    return (
        <>
        <header className="sticky top-0 z-100 bg-gray-950/95 backdrop-blur-md border-b border-red-900/30 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <div className="flex-shrink-0">
                    <Link to="/" className="flex items-center text-3xl font-black tracking-tighter text-red-600 hover:text-red-500 transition-colors uppercase group">
                        <Film className="w-8 h-8 mr-2 drop-shadow-[0_0_8px_rgba(220,38,38,0.5)] group-hover:scale-110 transition-transform" />
                        CINEFLIX
                    </Link>
                </div>
                <nav className="hidden md:flex items-center space-x-8">
                    <div className="flex gap-10 items-center text-sm font-medium uppercase tracking-widest">
                        <div className="relative group">
                            <span className="text-gray-300 hover:text-white cursor-pointer select-none flex items-center transition-colors py-4">
                                Movies
                                <svg className="w-4 h-4 ml-1 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </span>

                            <div className="absolute left-0 top-full mt-0 w-56 bg-gray-950/95 backdrop-blur-md border border-red-900/30 rounded-md shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-300">
                                <div className="flex flex-col py-2">
                                    <Link to="/default/movies/showing-movies" className="group/link flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900/80 transition duration-300">
                                        <PlayCircle className="w-5 h-5 mr-3 text-gray-500 group-hover/link:text-red-500 transition-colors" />
                                        <span className="group-hover/link:text-shadow-glow">Showing</span>
                                    </Link>
                                    
                                    <Link to="/default/movies/coming-soon" className="group/link flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900/80 transition duration-300">
                                        <CalendarClock className="w-5 h-5 mr-3 text-gray-500 group-hover/link:text-red-500 transition-colors" />
                                        <span className="group-hover/link:text-shadow-glow">Coming Soon</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="relative group">
                         <span className="text-gray-300 hover:text-white cursor-pointer select-none flex items-center transition-colors py-4">
                                cinemas
                                <svg className="w-4 h-4 ml-1 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </span>
                            <div className="absolute left-0 top-full mt-0 w-56 bg-gray-950/95 backdrop-blur-md border border-red-900/30 rounded-md shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-300">
                                <div className="flex flex-col py-2">
                                    <Link to="/default/cinemas" className="group/link flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900/80 transition duration-300">
                                        <PlayCircle className="w-5 h-5 mr-3 text-gray-500 group-hover/link:text-red-500 transition-colors" />
                                        <span className="group-hover/link:text-shadow-glow">All cinemas</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="hidden md:flex items-center space-x-6">
                    <button 
                        onClick={() => setIsSearchOpen(true)} 
                        className="text-gray-300 hover:text-white transition-colors relative"
                    >
                            <Search className="w-6 h-6" />
                    </button>
                    {id ? (
                        <div className="flex items-center space-x-5">
                            <div className="relative">
                                <button 
                                    onClick={() => setIsNotiOpen(!isNotiOpen)} 
                                    className="text-gray-300 hover:text-white transition-colors relative pt-1"
                                >
                                    <Bell className="w-6 h-6" />
                                    {unreadNoti! > 0 && (
                                        <span className="absolute -top-1 -right-1.5 bg-red-600 text-white text-[10px] font-bold h-4 min-w-[16px] px-1 flex items-center justify-center rounded-full">
                                            {unreadNoti}
                                        </span>
                                    )}
                                </button>
                                {isNotiOpen && (
                                    <div className="absolute right-0 top-full mt-4 w-80 bg-gray-950 border border-gray-800 rounded-lg shadow-2xl z-50 overflow-hidden">
                                        <Notification />
                                    </div>
                                )}
                            </div>  
                             {role === "ADMIN" && (
                                <Link 
                                    to="/admin/dashboard" 
                                    className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-400 transition-colors"
                                >
                                    <LayoutDashboard className="h-4 w-4" />
                                    Admin
                                </Link>
                            )}
                            <Link to="/default/profile" className="group text-amber-500 hover:text-amber-400 font-medium tracking-wide flex items-center gap-2 transition-colors">
                                <CircleUser className="w-5 h-5 text-amber-600 group-hover:text-amber-400 transition-colors" />
                                <span className="text-gray-400 text-sm font-normal">Welcome,</span>
                                <span className="truncate max-w-[150px]">{first_name} {last_name}</span>
                            </Link>
                            <div className="border-l border-gray-800 pl-5">
                                <LogoutBtn /> 
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-5">
                            <Link to="/login" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-md font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)]">
                                Login
                            </Link>
                            <Link to="/signup" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-md font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)]">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-300 hover:text-white focus:outline-none p-2 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-7 h-7" strokeWidth={2.5} />
                        ) : (
                            <MenuIcon className="w-7 h-7" strokeWidth={2.5} />
                        )}
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="md:hidden bg-gray-950/95 backdrop-blur-md border-b border-red-900/30 absolute w-full shadow-2xl z-40">
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
                        <div className="flex flex-col space-y-4 pt-2">
                            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest border-b border-gray-800 pb-2">
                                Cinemas
                            </span>
                            
                            <Link 
                                to="/default/cinemas" 
                                onClick={() => setIsMobileMenuOpen(false)} 
                                className="group flex items-center text-gray-300 hover:text-white font-medium uppercase tracking-widest pl-2 border-l-2 border-transparent hover:border-red-600 transition-all"
                            >
                                <PlayCircle className="w-5 h-5 mr-3 text-gray-500 group-hover:text-red-500 transition-colors" />
                                All Cinemas
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
                                <div className="flex flex-col gap-5">
                                    <Link 
                                        to="/login" 
                                        onClick={() => setIsMobileMenuOpen(false)} 
                                        className="flex justify-center items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] w-full"
                                    >
                                        Login
                                    </Link>
                                    <Link 
                                        to="/signup" 
                                        onClick={() => setIsMobileMenuOpen(false)} 
                                        className="flex justify-center items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] w-full"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
        <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}