import { Outlet, NavLink } from "react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Film, Building2, Popcorn, Ticket, BarChart3 } from "lucide-react";

export default function AdminDashboard(){
    const navLinkClass = ({ isActive }: { isActive: boolean }) => `
        flex items-center gap-3 p-4 font-medium transition-colors border-l-4
        ${isActive 
            ? "bg-neutral-800/80 border-red-600 text-white" 
            : "border-transparent text-neutral-400 hover:bg-neutral-800/40 hover:text-neutral-200"
        }
    `;

    return (
        <div className="bg-[#141414] min-h-screen text-white font-sans flex flex-col">
            <Header />
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 border-b border-neutral-700 pb-6">
                    Admin Dashboard
                </h1>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-full md:w-56 shrink-0 bg-neutral-900/30 border border-neutral-800 rounded-xl overflow-hidden flex flex-col shadow-lg">
                        <NavLink to="movies" className={navLinkClass}>
                            <Film className="w-5 h-5" />
                            Movies
                        </NavLink>
                        <NavLink to="cinemas" className={navLinkClass}>
                            <Building2 className="w-5 h-5" />
                            Cinemas
                        </NavLink>
                        <NavLink to="snacks" className={navLinkClass}>
                            <Popcorn className="w-5 h-5" />
                            Snacks
                        </NavLink>
                        <NavLink to="vouchers" className={navLinkClass}>
                            <Ticket className="w-5 h-5" />
                            Vouchers
                        </NavLink>
                        <NavLink to="stats" className={navLinkClass}>
                            <BarChart3 className="w-5 h-5" />
                            Statistics
                        </NavLink>
                    </div>
                    <div className="flex-1 w-full bg-neutral-900/30 border border-neutral-800 rounded-xl min-h-[500px]">
                        <Outlet />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}