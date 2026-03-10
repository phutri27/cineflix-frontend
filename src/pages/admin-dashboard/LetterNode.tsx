import type { Option } from "@/api/admin/types/movie-response";

interface LetterNodeProp {
    movieOptionsData : Option[]
    handleDelete: (id: string) => void
    openEditModal: (id: string) => void
}

const dictionary = 
["A", "B", "C", "D", "E", "F", "G", "H", "I", 
"J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
"U", "V", "W", "X", "Y", "Z"]
export default function LetterNode({movieOptionsData, handleDelete, openEditModal}: LetterNodeProp){

    return (
        <div>
            {dictionary.map((letter) => {
                const optionForLetter = movieOptionsData?.filter(
                    (option) => option.name.charAt(0).toUpperCase() === letter
                );

                if (!optionForLetter || optionForLetter.length === 0) {
                    return null;
                }
                return (
                    <details key={letter} style={{ marginBottom: "1rem" }}>
                        <summary style={{ cursor: "pointer", fontWeight: "bold", fontSize: "1.2rem" }}>
                            {letter} ({optionForLetter.length})
                        </summary>
                        <div style={{ paddingLeft: "1rem", marginTop: "0.5rem" }}>
                            {optionForLetter.map((option) => (
                                <div key={option.id} style={{ display: "flex", gap: "10px", marginBottom: "5px" }}>
                                    <p>{option.name}</p>
                                    <button onClick={() => openEditModal(option.id)}>Edit</button>
                                    <button onClick={() => handleDelete(option.id)}>Delete</button>
                                </div>
                            ))}
                        </div>
                     </details>
                )
            })}
        </div>
    )
}