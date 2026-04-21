import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

interface Promo {
    id: number
    badge: string
    badgeColor: string
    title: string
    subtitle: string
    description: string
    tag: string
    gradient: string
    accent: string
    icon: string
}


const PROMOS: Promo[] = [
    {
        id: 1,
        badge: "HOT",
        badgeColor: "#dc2626",
        title: "Monday Magic",
        subtitle: "Monday Discount",
        description: "All tickets 30% off every Monday. Start your week with a blockbuster at a fraction of the price.",
        tag: "EVERY MONDAY",
        gradient: "linear-gradient(135deg, #1a0000 0%, #3d0a0a 50%, #1a0000 100%)",
        accent: "#dc2626",
        icon: "🎬",
    },
    {
        id: 2,
        badge: "NEW",
        badgeColor: "#16a34a",
        title: "Student Pass",
        subtitle: "Student Exclusive",
        description: "Show your student ID and get 25% off any ticket, any day. Valid for all screens and seat types.",
        tag: "ALL WEEK",
        gradient: "linear-gradient(135deg, #001a0a 0%, #0a3d1a 50%, #001a0a 100%)",
        accent: "#16a34a",
        icon: "🎓",
    },
    {
        id: 3,
        badge: "LIMITED",
        badgeColor: "#d97706",
        title: "Couple Combo",
        subtitle: "Romantic Date Package",
        description: "2 couple seats + 1 large popcorn + 2 drinks for only 299,000 VND. Perfect date night.",
        tag: "FRI-SUN ONLY",
        gradient: "linear-gradient(135deg, #1a0f00 0%, #3d2200 50%, #1a0f00 100%)",
        accent: "#d97706",
        icon: "💕",
    },
    {
        id: 4,
        badge: "VIP",
        badgeColor: "#7c3aed",
        title: "Midnight Premiere",
        subtitle: "Late Night First Screening",
        description: "Be the first to watch new releases at midnight screenings. VIP seats include complimentary drinks.",
        tag: "PREMIERE NIGHTS",
        gradient: "linear-gradient(135deg, #0a001a 0%, #1a0a3d 50%, #0a001a 100%)",
        accent: "#7c3aed",
        icon: "🌙",
    },
    {
        id: 5,
        badge: "SAVE",
        badgeColor: "#0891b2",
        title: "Family Bundle",
        subtitle: "Family Package Deal",
        description: "4 regular tickets + 2 large popcorns + 4 drinks for 499,000 VND. Fun for the whole family.",
        tag: "WEEKENDS",
        gradient: "linear-gradient(135deg, #00101a 0%, #002a3d 50%, #00101a 100%)",
        accent: "#0891b2",
        icon: "👨‍👩‍👧‍👦",
    },
    {
        id: 6,
        badge: "MEMBER",
        badgeColor: "#dc2626",
        title: "Birthday Gift",
        subtitle: "Birthday Month Perk",
        description: "Free ticket on your birthday month + 50% off for up to 3 friends. Register to unlock this perk.",
        tag: "YOUR BIRTHDAY MONTH",
        gradient: "linear-gradient(135deg, #1a0005 0%, #3d000f 50%, #1a0005 100%)",
        accent: "#dc2626",
        icon: "🎂",
    },
]

export default function CineflixSpecial() {
    const [hoveredPromo, setHoveredPromo] = useState<number | null>(null)

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", color: "#ffffff", fontFamily: "system-ui, sans-serif" }}>
            <Header />
            <div style={{ position: "relative", padding: "80px 24px 60px", textAlign: "center", overflow: "hidden", background: "linear-gradient(180deg, #1a0000 0%, #0a0a0a 100%)" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(220,38,38,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: "-100px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ display: "inline-block", padding: "6px 20px", borderRadius: "9999px", border: "1px solid rgba(220,38,38,0.3)", backgroundColor: "rgba(220,38,38,0.08)", fontSize: "12px", fontWeight: 700, color: "#dc2626", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px" }}>
                        ✦ CINEFLIX SPECIAL ✦
                    </div>
                    <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 16px 0", letterSpacing: "-1px" }}>
                        <span style={{ color: "#dc2626" }}>Only</span> at<br />  Cineflix
                    </h1>
                    <p style={{ fontSize: "16px", color: "#737373", maxWidth: "500px", margin: "0 auto", lineHeight: 1.6 }}>
                        Exclusive deals, member perks, and special screenings — your cinema experience, elevated.
                    </p>
                </div>
            </div>
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 60px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
                    <div style={{ width: "4px", height: "28px", backgroundColor: "#dc2626", borderRadius: "9999px" }} />
                    <h2 style={{ fontSize: "20px", fontWeight: 800, margin: 0, textTransform: "uppercase", letterSpacing: "1px" }}>
                        Current Promotions
                    </h2>
                    <span style={{ fontSize: "12px", color: "#dc2626", fontWeight: 700, backgroundColor: "rgba(220,38,38,0.1)", padding: "4px 10px", borderRadius: "9999px" }}>
                        {PROMOS.length} OFFERS
                    </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "20px" }}>
                    {PROMOS.map((promo) => (
                        <div
                            key={promo.id}
                            onMouseEnter={() => setHoveredPromo(promo.id)}
                            onMouseLeave={() => setHoveredPromo(null)}
                            style={{
                                position: "relative",
                                background: promo.gradient,
                                border: `1px solid ${hoveredPromo === promo.id ? promo.accent : "rgba(255,255,255,0.06)"}`,
                                borderRadius: "12px",
                                padding: "28px",
                                overflow: "hidden",
                                cursor: "pointer",
                                transition: "all 300ms ease",
                                transform: hoveredPromo === promo.id ? "translateY(-4px)" : "translateY(0)",
                                boxShadow: hoveredPromo === promo.id ? `0 20px 40px ${promo.accent}15` : "none",
                            }}
                        >
                            <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "120px", height: "120px", borderRadius: "50%", background: `radial-gradient(circle, ${promo.accent}15 0%, transparent 70%)`, pointerEvents: "none" }} />

                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                                <span style={{ fontSize: "10px", fontWeight: 800, color: "#fff", backgroundColor: promo.badgeColor, padding: "3px 10px", borderRadius: "4px", letterSpacing: "1px" }}>
                                    {promo.badge}
                                </span>
                                <span style={{ fontSize: "10px", fontWeight: 700, color: promo.accent, letterSpacing: "1.5px" }}>
                                    {promo.tag}
                                </span>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                                <span style={{ fontSize: "32px" }}>{promo.icon}</span>
                                <div>
                                    <h3 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 2px 0", color: "#ffffff" }}>
                                        {promo.title}
                                    </h3>
                                    <p style={{ fontSize: "12px", color: "#737373", margin: 0, fontWeight: 500 }}>
                                        {promo.subtitle}
                                    </p>
                                </div>
                            </div>

                            <p style={{ fontSize: "13px", color: "#a3a3a3", lineHeight: 1.6, margin: "16px 0 0 0" }}>
                                {promo.description}
                            </p>

                            <div style={{ position: "absolute", bottom: 0, left: "28px", right: "28px", height: "2px", backgroundColor: promo.accent, opacity: hoveredPromo === promo.id ? 1 : 0.2, transition: "opacity 300ms" }} />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}