import { Building2, Clapperboard, Sparkles, Phone, Newspaper, UserPlus } from "lucide-react"
import { Link } from "react-router"
import { useUserRoleStore } from "@/utils/user-role-store"

const navItems = [
    {
        icon: Building2,
        titleEn: "CINEFLIX CINEMAS",
        titleVi: "RẠP CINEFLIX",
        to: "/default/cinemas",
        color: "#dc2626",
    },
    {
        icon: Clapperboard,
        titleEn: "NOW SHOWING",
        titleVi: "PHIM ĐANG CHIẾU",
        to: "/default/movies/showing-movies",
        color: "#dc2626",
    },
    {
        icon: Sparkles,
        titleEn: "CINEFLIX SPECIAL",
        titleVi: "ĐẶC TRƯNG CINEFLIX",
        to: "/default/special",
        color: "#dc2626",
    },
    {
        icon: Phone,
        titleEn: "CONTACT CINEFLIX",
        titleVi: "LIÊN HỆ CINEFLIX",
        to: "/default/contact",
        color: "#dc2626",
    },
    {
        icon: Newspaper,
        titleEn: "NEWS & OFFERS",
        titleVi: "TIN MỚI & ƯU ĐÃI",
        to: "/default/news",
        color: "#dc2626",
    },
    {
        icon: UserPlus,
        titleEn: "REGISTER NOW",
        titleVi: "ĐĂNG KÝ NGAY",
        to: "/signup",
        color: "#dc2626",
    },
]

export default function CineflixNavBar() {
    const userId = useUserRoleStore((state) => state.id)
    return (
        <div
            style={{
                width: "100%",
                borderTop: "4px solid #dc2626",
                backgroundColor: "#1a1a1a",
                borderBottom: "1px solid #2a2a2a",
            }}
        >
            <div
                style={{
                    maxWidth: "1280px",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "stretch",
                    padding: "0 16px",
                }}
            >
                {navItems.map((item, i) => {
                    const Icon = item.icon
                    let to = item.to
                    if (to === "/signup" && userId){
                        to = "/default/profile"
                    }
                    return (
                        <Link
                            key={i}
                            to={to}
                            style={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "16px 8px",
                                textDecoration: "none",
                                borderLeft: i > 0 ? "1px solid #2a2a2a" : "none",
                                transition: "background-color 200ms",
                            }}
                            className="hover:bg-neutral-800/50"
                        >
                            <div
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "50%",
                                    backgroundColor: "rgba(220, 38, 38, 0.1)",
                                    border: "2px solid rgba(220, 38, 38, 0.3)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "8px",
                                }}
                            >
                                <Icon size={22} color="#dc2626" />
                            </div>
                            <p
                                style={{
                                    fontSize: "11px",
                                    fontWeight: 800,
                                    color: "#ffffff",
                                    textAlign: "center",
                                    lineHeight: 1.3,
                                    letterSpacing: "0.5px",
                                    textTransform: "uppercase",
                                    margin: 0,
                                }}
                            >
                                {item.titleEn}
                            </p>
                            <p
                                style={{
                                    fontSize: "10px",
                                    fontWeight: 500,
                                    color: "#737373",
                                    textAlign: "center",
                                    lineHeight: 1.3,
                                    margin: "2px 0 0 0",
                                    textTransform: "uppercase",
                                }}
                            >
                                {item.titleVi}
                            </p>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}