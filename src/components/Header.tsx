import { useUserRoleStore } from "@/utils/user-role-store";
import { Link } from "react-router";
export default function Header() {
    const { first_name, last_name } = useUserRoleStore()
    return (
        <header className="mb-6">
            <h1 className="text-2xl font-bold">Welcome back, {first_name} {last_name}</h1>
            <div>
                <div>Movies</div>
                <div>
                    <Link to="/default/movies/showing-movies">Showing Movies</Link>
                    <Link to="/default/movies/coming-soon">Coming Soon</Link>
                </div>
            </div>
        </header>
    )
}