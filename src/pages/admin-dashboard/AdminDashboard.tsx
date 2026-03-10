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
                </div>
            </div>
            <Outlet />
        </div>

    )
}