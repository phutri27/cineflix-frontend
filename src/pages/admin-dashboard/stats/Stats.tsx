import { NavLink, Outlet } from 'react-router'
import { Building2, Users, Film } from 'lucide-react'

export default function Stats(){
    const tabClass = ({ isActive }: { isActive: boolean }) => `
        flex items-center gap-2 px-4 py-3 text-sm font-bold text-center transition-colors
        ${isActive
            ? "text-red-500 border-b-2 border-red-500 bg-neutral-800/50"
            : "text-neutral-500 hover:text-neutral-300"
        }
    `;

    return (
        <div>
            <div className="flex border-b border-neutral-700">
                <NavLink to="cinemas" className={tabClass}>
                    <Building2 className="h-4 w-4" />
                    Cinemas
                </NavLink>
                <NavLink to="users" className={tabClass}>
                    <Users className="h-4 w-4" />
                    Users
                </NavLink>
                <NavLink to="movies" className={tabClass}>
                    <Film className="h-4 w-4" />
                    Movies
                </NavLink>
            </div>
            <div className="p-6">
                <Outlet />
            </div>
        </div>
    )
}