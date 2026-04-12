import { Link, Outlet} from 'react-router'
import "../../../styles/style.css"
export default function Stats(){
    return (
        <>
            <Link to="cinemas">Cinemas</Link>
            <Link to="users">Users</Link>
            <Link to="movies">Movies</Link>
            <Outlet />
        </>
    )
}