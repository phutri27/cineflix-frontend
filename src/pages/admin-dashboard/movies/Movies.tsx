import { Outlet } from "react-router"
import { Link } from "react-router"
export default function Movies(){
    return (
        <div>
            <div>
                <Link to="">Movies</Link>
                <Link to="actors">Actors</Link>
                <Link to="directors">Directors</Link>
                <Link to="genres">Genres</Link>
            </div>
            <Outlet />
        </div>
    )
}