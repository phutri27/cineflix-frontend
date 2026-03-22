import { useUserRoleStore } from "@/utils/user-role-store";
import { Link } from "react-router";
export default function Header() {
    const { id, first_name, last_name } = useUserRoleStore()
    return (
        <header className="mb-6">
            {id ? <div>
                <Link to="/default/profile">Welcome back, {first_name} {last_name}</Link>
            </div> : <Link to="/login">Login</Link>}
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