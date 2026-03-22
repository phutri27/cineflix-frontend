import { Outlet, Link } from "react-router"

export default function Profile() {
    return (
        <div>
            <h2>Profile</h2>
            <Link to="/default/profile">General information</Link>
            <Link to="detailed">Detailed information</Link>
            <Link to="change-password">Change password</Link>
            <Link to="booking-history">Booking history</Link>
            <Link to="vouchers">Vouchers</Link>
            <Outlet />
        </div>
    )
}