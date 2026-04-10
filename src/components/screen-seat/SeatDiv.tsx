import type React from "react";

export default function SeatDiv({style, children}: {style: string, children: React.ReactNode}){
    return (
        <div className={`border-2 ${style}`}>
            {children}
        </div>
    )
}