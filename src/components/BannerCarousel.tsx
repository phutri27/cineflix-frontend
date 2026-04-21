import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const bannerImages = [
    "../../carousel1.png",
    "../../carousel2.png",
    "../../carousel3.png",
    "../../carousel4.png",
    "../../carousel5.png",
]

export default function BannerCarousel() {
    const [current, setCurrent] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const total = bannerImages.length

    const goTo = useCallback((index: number) => {
        setCurrent(((index % total) + total) % total)
    }, [total])

    useEffect(() => {
        if (isPaused) return
        const interval = setInterval(() => {
            goTo(current + 1)
        }, 3500)
        return () => clearInterval(interval)
    }, [current, isPaused, goTo])

    return (
        <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
                position: "relative",
                width: "100%",
                maxWidth: "1280px",
                margin: "0 auto",
                overflow: "hidden",
                backgroundColor: "#0a0a0a",
            }}
        >
            <div
                style={{
                    display: "flex",
                    transition: "transform 600ms ease-in-out",
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {bannerImages.map((src, i) => (
                    <div
                        key={i}
                        style={{
                            flexShrink: 0,
                            width: "100%",
                            position: "relative",
                        }}
                    >
                        <img
                            src={src}
                            alt={`Banner ${i + 1}`}
                            style={{
                                width: "100%",
                                height: "320px",
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: "linear-gradient(to right, rgba(20,20,20,0.3) 0%, transparent 15%, transparent 85%, rgba(20,20,20,0.3) 100%)",
                                pointerEvents: "none",
                            }}
                        />
                    </div>
                ))}
            </div>
            <button
                onClick={() => goTo(current - 1)}
                aria-label="Previous banner"
                className="opacity-0 hover:opacity-100"
                style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "opacity 300ms",
                }}
            >
                <ChevronLeft size={20} />
            </button>
            <button
                onClick={() => goTo(current + 1)}
                aria-label="Next banner"
                className="opacity-0 hover:opacity-100"
                style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "opacity 300ms",
                }}
            >
                <ChevronRight size={20} />
            </button>
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    height: "3px",
                    zIndex: 10,
                }}
            >
                {bannerImages.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        style={{
                            flex: 1,
                            backgroundColor: i === current ? "#dc2626" : "rgba(255,255,255,0.15)",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                            transition: "background-color 300ms",
                        }}
                        aria-label={`Go to banner ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}