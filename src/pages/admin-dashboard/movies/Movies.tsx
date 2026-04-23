import { Outlet, NavLink } from "react-router"

export default function Movies(){
    const tabClass = ({ isActive }: { isActive: boolean }) => `
        px-4 py-3 text-sm font-bold text-center transition-colors
        ${isActive 
            ? "text-red-500 border-b-2 border-red-500 bg-neutral-800/50" 
            : "text-neutral-500 hover:text-neutral-300"
        }
    `;

    return (
        <div>
            <div className="flex border-b border-neutral-700">
                <NavLink to="" end className={tabClass}>
                    Movies
                </NavLink>
                <NavLink to="actors" className={tabClass}>
                    Actors
                </NavLink>
                <NavLink to="directors" className={tabClass}>
                    Directors
                </NavLink>
                <NavLink to="genres" className={tabClass}>
                    Genres
                </NavLink>
                <NavLink to="archive" className={tabClass}>
                    Archive
                </NavLink>
            </div>
            <div className="p-6">
                <Outlet />
            </div>
        </div>
    )
}