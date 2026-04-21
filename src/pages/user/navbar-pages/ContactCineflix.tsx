import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const CONTACTS = [
    { icon: "📞", title: "Hotline", value: "1900 6868", href: "tel:19006868", accent: "#dc2626", sub: "8 AM - 10 PM daily" },
    { icon: "✉️", title: "General Support", value: "support@cineflix.com", href: "mailto:support@cineflix.com", accent: "#0891b2", sub: "Reply within 24 hours" },
    { icon: "📣", title: "Marketing", value: "028 3820 8888", href: "tel:02838208888", accent: "#7c3aed", sub: "Partnerships & sponsorships" },
    { icon: "🎉", title: "Events", value: "028 3820 9999", href: "tel:02838209999", accent: "#d97706", sub: "Private screenings & rentals" },
    { icon: "🎁", title: "Promotions", value: "028 3820 7777", href: "tel:02838207777", accent: "#16a34a", sub: "Vouchers & gift cards" },
    { icon: "🏢", title: "Corporate Sales", value: "028 3820 6666", href: "tel:02838206666", accent: "#e11d48", sub: "Bulk orders & B2B" },
]

const FAQS = [
    { q: "How do I request a refund?", a: "Go to Booking History, select the booking, and click 'Request Refund'. Available up to 2 hours before showtime." },
    { q: "Can I change my seats after booking?", a: "Seat changes are allowed up to 1 hour before showtime. Contact our hotline at 1900 6868." },
    { q: "How do I book a private screening?", a: "Email events@cineflix.com with your preferred date, screen size, and expected guests." },
    { q: "What are membership benefits?", a: "Members earn points on every purchase, get birthday perks, and access exclusive screenings." },
]

export default function ContactCineflix() {
    const [hovered, setHovered] = useState<number | null>(null)
    const [openFAQ, setOpenFAQ] = useState<number | null>(null)

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
            <Header />

            {/* Hero */}
            <div style={{ padding: "60px 24px 40px", textAlign: "center", background: "linear-gradient(180deg, #1a0000 0%, #0a0a0a 100%)" }}>
                <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, margin: "0 0 12px", letterSpacing: "-1px" }}>
                    Contact <span style={{ color: "#dc2626" }}>Cineflix</span>
                </h1>
                <p style={{ fontSize: "14px", color: "#737373", margin: "0 0 24px" }}>Questions, feedback, or partnerships — we're here to help.</p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "14px 28px", borderRadius: "12px", backgroundColor: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)" }}>
                    <span style={{ fontSize: "24px" }}>📞</span>
                    <div style={{ textAlign: "left" }}>
                        <p style={{ margin: 0, fontSize: "11px", color: "#737373", fontWeight: 600 }}>HOTLINE</p>
                        <p style={{ margin: 0, fontSize: "22px", fontWeight: 900, color: "#dc2626", letterSpacing: "2px" }}>1900 6868</p>
                    </div>
                </div>
            </div>

            {/* Contact Grid */}
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "14px" }}>
                    {CONTACTS.map((c, i) => (
                        <a
                            key={i}
                            href={c.href}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                                display: "flex", alignItems: "center", gap: "14px",
                                padding: "18px 20px", borderRadius: "10px",
                                border: `1px solid ${hovered === i ? c.accent : "rgba(255,255,255,0.06)"}`,
                                backgroundColor: "#111", textDecoration: "none", color: "inherit",
                                transition: "all 250ms",
                                transform: hovered === i ? "translateY(-2px)" : "none",
                            }}
                        >
                            <span style={{ fontSize: "28px" }}>{c.icon}</span>
                            <div style={{ flex: 1 }}>
                                <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#fff" }}>{c.title}</p>
                                <p style={{ margin: "2px 0 0", fontSize: "11px", color: "#737373" }}>{c.sub}</p>
                            </div>
                            <span style={{ fontSize: "14px", fontWeight: 800, color: c.accent, letterSpacing: c.href.startsWith("tel") ? "1px" : "0" }}>
                                {c.value}
                            </span>
                        </a>
                    ))}
                </div>
            </div>

            {/* FAQ */}
            <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px 60px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 20px", textAlign: "center" }}>
                    Frequently Asked Questions
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {FAQS.map((faq, i) => (
                        <div key={i} style={{ borderRadius: "8px", border: `1px solid ${openFAQ === i ? "rgba(220,38,38,0.3)" : "rgba(255,255,255,0.06)"}`, overflow: "hidden", transition: "all 200ms" }}>
                            <button
                                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                                style={{ width: "100%", padding: "14px 16px", border: "none", backgroundColor: "transparent", color: "#fff", fontSize: "13px", fontWeight: 700, textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                            >
                                {faq.q}
                                <span style={{ color: "#dc2626", fontSize: "18px", transition: "transform 200ms", transform: openFAQ === i ? "rotate(45deg)" : "none", flexShrink: 0 }}>+</span>
                            </button>
                            {openFAQ === i && (
                                <p style={{ padding: "0 16px 14px", margin: 0, fontSize: "13px", color: "#a3a3a3", lineHeight: 1.6 }}>{faq.a}</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Office info */}
                <div style={{ marginTop: "32px", padding: "20px", borderRadius: "10px", backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
                    <p style={{ margin: "0 0 4px", fontSize: "13px", fontWeight: 700, color: "#fff" }}>Cineflix Headquarters</p>
                    <p style={{ margin: "0 0 8px", fontSize: "12px", color: "#737373" }}>100 Ve Ho, Tay Ho Ward, Ha Noi City</p>
                    <p style={{ margin: 0, fontSize: "12px", color: "#737373" }}>Office: Mon-Fri 9AM-6PM · Hotline: Daily 8AM-10PM</p>
                </div>
            </div>

            <Footer />
        </div>
    )
}