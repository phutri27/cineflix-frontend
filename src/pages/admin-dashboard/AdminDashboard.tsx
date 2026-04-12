import { Outlet } from "react-router";
import { Link } from "react-router";
export default function AdminDashboard(){
    return (
        <div>
            <div>
            Admin Dashboard
            </div>
            <div>
                <div>
                    <Link to="movies">Movies</Link>
                    <Link to="cinemas">Cinemas</Link>
                    <Link to="snacks">Snacks</Link>
                    <Link to="vouchers">Vouchers</Link>
                    <Link to="users">Users</Link>
                    <Link to="stats">Statistics</Link>
                </div>
            </div>
            <Outlet />
        </div>

    )
}