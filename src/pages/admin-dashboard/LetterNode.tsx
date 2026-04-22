import type { Option } from "@/types/admin/movies/movie-type";
import { Pencil, Trash2, ChevronRight } from "lucide-react";
import { useState } from "react";

interface LetterNodeProp {
    movieOptionsData: Option[]
    handleDelete: (id: string) => void
    openEditModal: (id: string) => void
}

const dictionary = 
["A", "B", "C", "D", "E", "F", "G", "H", "I", 
"J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
"U", "V", "W", "X", "Y", "Z"]

export default function LetterNode({movieOptionsData, handleDelete, openEditModal}: LetterNodeProp){
    const [expandedLetter, setExpandedLetter] = useState<string | null>(null)

    const toggleLetter = (letter: string) => {
        setExpandedLetter((prev) => prev === letter ? null : letter)
    }

    return (
        <div className="flex flex-col gap-2">
            {dictionary.map((letter) => {
                const optionForLetter = movieOptionsData?.filter(
                    (option) => option.name.charAt(0).toUpperCase() === letter
                );

                if (!optionForLetter || optionForLetter.length === 0) {
                    return null;
                }

                const isExpanded = expandedLetter === letter

                return (
                    <div key={letter} className="bg-neutral-800/40 border border-neutral-700 rounded-lg overflow-hidden">
                        <button 
                            onClick={() => toggleLetter(letter)}
                            className="w-full flex items-center justify-between px-4 py-3 hover:bg-neutral-800/60 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <span className="h-8 w-8 rounded bg-neutral-700 flex items-center justify-center text-sm font-bold text-white">
                                    {letter}
                                </span>
                                <span className="text-sm text-neutral-400 font-medium">
                                    {optionForLetter.length} item{optionForLetter.length !== 1 && "s"}
                                </span>
                            </div>
                            <ChevronRight className={`h-4 w-4 text-neutral-500 transition-transform ${
                                isExpanded ? "rotate-90" : ""
                            }`} />
                        </button>

                        {isExpanded && (
                            <div className="border-t border-neutral-700">
                                {optionForLetter.map((option) => (
                                    <div 
                                        key={option.id} 
                                        className="flex items-center justify-between px-4 py-2.5 hover:bg-neutral-800/40 transition-colors"
                                    >
                                        <p className="text-sm text-neutral-200 font-medium">{option.name}</p>
                                        <div className="flex items-center gap-1">
                                            <button 
                                                onClick={() => openEditModal(option.id)}
                                                className="h-7 w-7 rounded flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-700 transition-colors"
                                            >
                                                <Pencil className="h-3.5 w-3.5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(option.id)}
                                                className="h-7 w-7 rounded flex items-center justify-center text-neutral-500 hover:text-red-500 hover:bg-red-950/50 transition-colors"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}