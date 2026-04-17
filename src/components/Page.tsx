export interface PageProp {
    totalPages: number
    page: number
    pageGroup: number
    handleChoosePage: (page: number) => void
    incrementPageGroup: () => void
    decrementPageGroup: () => void
}

export default function Page({
    totalPages, 
    page, 
    pageGroup, 
    handleChoosePage,
    incrementPageGroup,
    decrementPageGroup}: PageProp){

    return (
        <>
            <button
                onClick={decrementPageGroup}
                disabled={pageGroup === 0}
                className="h-8 w-8 rounded text-sm font-bold transition-colors text-neutral-400 hover:bg-neutral-800 hover:text-white disabled:text-neutral-700 disabled:cursor-not-allowed"
            >
                ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(pageGroup * 4, pageGroup * 4 + 4)
                .map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => handleChoosePage(pageNum)}
                        className={`h-8 w-8 rounded text-sm font-bold transition-colors ${
                            page === pageNum
                                ? "bg-red-600 text-white"
                                : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                        }`}
                    >
                        {pageNum}
                    </button>
                ))}
            <button
                onClick={incrementPageGroup}
                disabled={(pageGroup + 1) * 4 >= totalPages}
                className="h-8 w-8 rounded text-sm font-bold transition-colors text-neutral-400 hover:bg-neutral-800 hover:text-white disabled:text-neutral-700 disabled:cursor-not-allowed"
            >
                ›
            </button>
        </>
    )
}