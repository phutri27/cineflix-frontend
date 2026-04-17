import { Outlet, NavLink } from "react-router"
import Header from "@/components/Header"
import { User, FileText, Lock, Clock, Ticket } from "lucide-react"
import Footer from "@/components/Footer";

export default function Profile() {
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
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-full md:w-72 shrink-0 bg-neutral-900/30 border border-neutral-800 rounded-xl overflow-hidden flex flex-col shadow-lg">
                        <div className="p-6 border-b border-neutral-800 bg-neutral-900/50">
                            <h2 className="font-black text-xl tracking-wider text-white uppercase">
                                CINEFLIX Account
                            </h2>
                        </div>
                        <div className="flex flex-col">
                            <NavLink to="/default/profile" end className={navLinkClass}>
                                <User className="w-5 h-5" />
                                General Information
                            </NavLink>
                            <NavLink to="detailed" className={navLinkClass}>
                                <FileText className="w-5 h-5" />
                                Detailed Information
                            </NavLink>
                            <NavLink to="change-password" className={navLinkClass}>
                                <Lock className="w-5 h-5" />
                                Change Password
                            </NavLink>
                            <NavLink to="booking-history" className={navLinkClass}>
                                <Clock className="w-5 h-5" />
                                Booking History
                            </NavLink>
                            <NavLink to="vouchers" className={navLinkClass}>
                                <Ticket className="w-5 h-5" />
                                Vouchers
                            </NavLink>
                        </div>
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