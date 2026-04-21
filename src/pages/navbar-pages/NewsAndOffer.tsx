import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

interface NewsItem {
    id: number
    category: "news" | "offer"
    badge: string
    badgeColor: string
    title: string
    description: string
    date: string
    image: string
    accent: string
}

const NEWS_DATA: NewsItem[] = [
    {
        id: 1,
        category: "news",
        badge: "NEW",
        badgeColor: "#dc2626",
        title: "Cineflix Opens 5th Branch in Da Nang",
        description: "Our newest cinema features 8 screens, IMAX technology, and a premium VIP lounge. Grand opening on July 15th with free tickets for the first 200 guests.",
        date: "Jul 10, 2025",
        image: "../../../news/news1.png",
        accent: "#dc2626",
    },
    {
        id: 2,
        category: "offer",
        badge: "50% OFF",
        badgeColor: "#16a34a",
        title: "Summer Blockbuster Sale",
        description: "All tickets half price every Wednesday throughout July and August. Applies to all screens, all seat types, all movies.",
        date: "Jun 28, 2025",
        image: "../../../news/news2.png",
        accent: "#16a34a",
    },
    {
        id: 3,
        category: "news",
        badge: "UPDATE",
        badgeColor: "#0891b2",
        title: "New Dolby Atmos Sound System Installed",
        description: "Screens 1 and 2 at our District 1 branch now feature Dolby Atmos surround sound for an immersive cinematic experience.",
        date: "Jun 20, 2025",
        image: "../../../news/news3.png",
        accent: "#0891b2",
    },
    {
        id: 4,
        category: "offer",
        badge: "COMBO",
        badgeColor: "#d97706",
        title: "Snack Attack: Buy 1 Get 1 Free",
        description: "Buy any large popcorn and get a second one free. Valid at all Cineflix locations. Limited time only — while stocks last.",
        date: "Jun 15, 2025",
        image: "../../../news/news4.png",
        accent: "#d97706",
    },
    {
        id: 5,
        category: "news",
        badge: "EVENT",
        badgeColor: "#7c3aed",
        title: "Cineflix Film Festival 2025",
        description: "Celebrating independent cinema with 30 curated films over 5 days. Q&A sessions with directors, free workshops, and awards ceremony.",
        date: "Jun 10, 2025",
        image: "../../../news/news5.png",
        accent: "#7c3aed",
    },
    {
        id: 7,
        category: "offer",
        badge: "FREE",
        badgeColor: "#16a34a",
        title: "Refer a Friend, Get a Free Ticket",
        description: "Share your referral code with friends. When they make their first booking, you both get a free regular ticket.",
        date: "May 28, 2025",
        image: "../../../news/news6.png",
        accent: "#16a34a",
    },
    {
        id: 8,
        category: "news",
        badge: "COMING",
        badgeColor: "#e11d48",
        title: "Premium Recliner Seats Arriving in August",
        description: "Our District 7 branch is upgrading all VIP seats to full leather recliners with USB charging and personal call buttons.",
        date: "May 20, 2025",
        image: "../../../news/news7.png",
        accent: "#e11d48",
    },
]

type Filter = "all" | "news" | "offer"

export default function NewsAndOffers() {
    const [filter, setFilter] = useState<Filter>("all")
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)
    const [expandedCard, setExpandedCard] = useState<number | null>(null)

    const filtered = filter === "all" ? NEWS_DATA : NEWS_DATA.filter((item) => item.category === filter)

    const filterBtn = (label: string, value: Filter, count: number) => (
        <button
            onClick={() => setFilter(value)}
            style={{
                padding: "8px 20px",
                borderRadius: "8px",
                border: `1px solid ${filter === value ? "#dc2626" : "rgba(255,255,255,0.08)"}`,
                backgroundColor: filter === value ? "rgba(220,38,38,0.12)" : "transparent",
                color: filter === value ? "#dc2626" : "#737373",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 200ms",
                display: "flex",
                alignItems: "center",
                gap: "8px",
            }}
        >
            {label}
            <span style={{
                fontSize: "11px",
                backgroundColor: filter === value ? "rgba(220,38,38,0.2)" : "rgba(255,255,255,0.06)",
                padding: "2px 8px",
                borderRadius: "9999px",
                fontWeight: 800,
            }}>
                {count}
            </span>
        </button>
    )

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
            <Header />

            {/* Hero */}
            <div style={{ padding: "60px 24px 40px", textAlign: "center", background: "linear-gradient(180deg, #0a0a1a 0%, #0a0a0a 100%)" }}>
                <div style={{ display: "inline-block", padding: "6px 20px", borderRadius: "9999px", border: "1px solid rgba(220,38,38,0.3)", backgroundColor: "rgba(220,38,38,0.08)", fontSize: "12px", fontWeight: 700, color: "#dc2626", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px" }}>
                    ✦ STAY UPDATED ✦
                </div>
                <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, margin: "0 0 12px", letterSpacing: "-1px" }}>
                    News & <span style={{ color: "#dc2626" }}>Offers</span>
                </h1>
                <p style={{ fontSize: "14px", color: "#737373", margin: 0, maxWidth: "460px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
                    Latest updates, exclusive deals, and everything happening at Cineflix.
                </p>
            </div>

            {/* Filter + Grid */}
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 60px" }}>
                {/* Filters */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px", flexWrap: "wrap" }}>
                    {filterBtn("All", "all", NEWS_DATA.length)}
                    {filterBtn("News", "news", NEWS_DATA.filter((n) => n.category === "news").length)}
                    {filterBtn("Offers", "offer", NEWS_DATA.filter((n) => n.category === "offer").length)}
                </div>

                {/* Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "20px" }}>
                    {filtered.map((item) => {
                        const isExpanded = expandedCard === item.id
                        return (
                            <div
                                key={item.id}
                                onMouseEnter={() => setHoveredCard(item.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                style={{
                                    borderRadius: "12px",
                                    border: `1px solid ${hoveredCard === item.id ? item.accent + "40" : "rgba(255,255,255,0.06)"}`,
                                    backgroundColor: "#111",
                                    overflow: "hidden",
                                    transition: "all 300ms",
                                    transform: hoveredCard === item.id ? "translateY(-3px)" : "none",
                                    cursor: "pointer",
                                }}
                                onClick={() => setExpandedCard(isExpanded ? null : item.id)}
                            >
                                <div style={{ position: "relative", overflow: "hidden", height: "200px" }}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            transition: "transform 500ms",
                                            transform: hoveredCard === item.id ? "scale(1.05)" : "scale(1)",
                                        }}
                                    />
                                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #111 0%, transparent 60%)", pointerEvents: "none" }} />
                                    <span style={{
                                        position: "absolute", top: "12px", left: "12px",
                                        fontSize: "10px", fontWeight: 800, color: "#fff",
                                        backgroundColor: item.badgeColor, padding: "4px 10px",
                                        borderRadius: "4px", letterSpacing: "1px",
                                    }}>
                                        {item.badge}
                                    </span>
                                    <span style={{
                                        position: "absolute", top: "12px", right: "12px",
                                        fontSize: "10px", fontWeight: 700,
                                        color: item.category === "offer" ? "#16a34a" : "#0891b2",
                                        backgroundColor: item.category === "offer" ? "rgba(22,163,74,0.15)" : "rgba(8,145,178,0.15)",
                                        padding: "4px 10px", borderRadius: "4px", letterSpacing: "0.5px",
                                        textTransform: "uppercase",
                                    }}>
                                        {item.category === "offer" ? "OFFER" : "NEWS"}
                                    </span>
                                </div>
                                <div style={{ padding: "20px" }}>
                                    <p style={{ margin: "0 0 8px", fontSize: "11px", color: "#525252", fontWeight: 600, letterSpacing: "0.5px" }}>
                                        {item.date}
                                    </p>
                                    <h3 style={{ margin: "0 0 10px", fontSize: "16px", fontWeight: 800, color: "#fff", lineHeight: 1.3 }}>
                                        {item.title}
                                    </h3>
                                    <p style={{
                                        margin: 0, fontSize: "13px", color: "#737373", lineHeight: 1.6,
                                        overflow: "hidden",
                                        maxHeight: isExpanded ? "200px" : "40px",
                                        transition: "max-height 300ms ease",
                                    }}>
                                        {item.description}
                                    </p>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "14px" }}>
                                        <span style={{ fontSize: "12px", fontWeight: 700, color: item.accent }}>
                                            {isExpanded ? "Show less" : "Read more"} →
                                        </span>
                                        <div style={{
                                            width: "6px", height: "6px", borderRadius: "50%",
                                            backgroundColor: item.category === "offer" ? "#16a34a" : "#0891b2",
                                        }} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {filtered.length === 0 && (
                    <div style={{ textAlign: "center", padding: "60px 0" }}>
                        <p style={{ fontSize: "16px", color: "#525252", fontWeight: 600 }}>No items found for this filter.</p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}